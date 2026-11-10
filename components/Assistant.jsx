// Copyright (C) 2025 Andra (SakamotoMrX)
// The site assistant: a small chat that answers questions about Andra and nothing else (rules in lib/assistant.mjs)
"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { CONTACT } from "@/lib/assistant.mjs";

const EASE = [0.23, 1, 0.32, 1];
const HELLO = "Ask me about Andra's work, skills or certificates. Bisa juga dalam bahasa Indonesia.";
const STARTERS = ["What has Andra shipped?", "Which tools does he use?", "How do I contact him?"];
// a visitor gets this many questions per page load; the server keeps its own, stricter count
const MAX_QUESTIONS = 12;
const PROBLEMS = {
  503: "The assistant isn't switched on yet. You can still reach Andra directly.",
  429: "That's a lot of questions. Try again in a few minutes.",
};

export default function Assistant() {
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const input = useRef(null);
  const log = useRef(null);
  const asked = turns.filter((t) => t.role === "user").length;
  const full = asked >= MAX_QUESTIONS;

  useEffect(() => {
    if (open) input.current?.focus();
  }, [open]);
  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight });
  }, [turns, busy]);

  async function ask(question) {
    const text = question.trim();
    if (!text || busy || full) return;
    const next = [...turns, { role: "user", text }];
    setTurns(next);
    setDraft("");
    setBusy(true);
    let answer = "Couldn't get an answer. Try again.";
    try {
      // notes about failures are shown to the visitor but never sent back upstream
      const r = await fetch("/api/ask", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next.filter((t) => !t.note) }),
      });
      let contact = r.status === 503;
      if (r.ok) ({ text: answer, contact } = await r.json());
      else if (PROBLEMS[r.status]) answer = PROBLEMS[r.status];
      setTurns([...next, { role: "model", text: answer, note: !r.ok, contact }]);
    } catch {
      setTurns([...next, { role: "model", text: answer, note: true }]);
    }
    setBusy(false);
  }

  return (
    <div className="ask" onKeyDown={(e) => e.key === "Escape" && setOpen(false)}>
      <AnimatePresence>
        {open && (
          <motion.div
            className="ask-panel"
            role="dialog"
            aria-label="Ask about Andra"
            data-ui
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <p className="ask-head">Ask about Andra</p>
            <div className="ask-log" ref={log} aria-live="polite">
              <p data-role="model">{HELLO}</p>
              {turns.map((t, i) => (
                <Fragment key={i}>
                  <p data-role={t.role}>{t.text}</p>
                  {t.contact && (
                    <div className="ask-actions">
                      <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
                        WhatsApp
                      </a>
                      <a href={CONTACT.email}>Email</a>
                    </div>
                  )}
                </Fragment>
              ))}
              {busy && (
                <p data-role="model" className="ask-dots" aria-label="Writing an answer">
                  <i />
                  <i />
                  <i />
                </p>
              )}
            </div>
            {!turns.length && (
              <div className="ask-starters">
                {STARTERS.map((q) => (
                  <button type="button" key={q} onClick={() => ask(q)}>
                    {q}
                  </button>
                ))}
              </div>
            )}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(draft);
              }}
            >
              <input
                ref={input}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                maxLength={300}
                disabled={full}
                aria-label="Your question"
                placeholder={full ? "That's the limit for this visit" : "Which sites did he build?"}
              />
              <button type="submit" aria-label="Send question" disabled={busy || full || !draft.trim()}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 19V5M6 11l6-6 6 6" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <button type="button" className="ask-toggle" aria-expanded={open} aria-label={open ? "Close the assistant" : "Ask about Andra"} onClick={() => setOpen((o) => !o)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 5h16v11H9l-5 4z" />}
        </svg>
      </button>
    </div>
  );
}
