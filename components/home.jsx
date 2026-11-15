// Copyright (C) 2025 Andra (SakamotoMrX)
// pieces only the home page uses
"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { buildLine } from "@/lib/build.mjs";
import { Reveal, Shot, Status, projects } from "@/components/site";

export const STAGES = ["Commit", "Build", "Test", "Preview", "Live"];
// 16 Docker + 12 Bash + 6 TKJ modules, as listed on the three course sites
export const COURSES = [["Docker", 16], ["Bash", 12], ["TKJ", 6]];
export const MODULES = COURSES.reduce((n, [, m]) => n + m, 0);
const COURSE_SLUGS = ["docker", "bash", "tkj"];

const BUILT = `live boredandra.vercel.app, ${buildLine({ sha: process.env.BUILD_SHA, at: process.env.BUILD_AT })}`;
const STEP_MS = 550;

// the visitor runs the pipeline once; the last line names the commit this page was built from
export function Deploy() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(-1);
  const [runs, setRuns] = useState(0);
  const timer = useRef(null);
  useEffect(() => () => clearInterval(timer.current), []);

  const running = step >= 0 && step < STAGES.length;
  const run = () => {
    setRuns((n) => n + 1);
    if (reduce) return setStep(STAGES.length);
    setStep(0);
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      setStep((s) => {
        if (s + 1 >= STAGES.length) clearInterval(timer.current);
        return s + 1;
      });
    }, STEP_MS);
  };
  const state = (i) => (step < 0 ? "wait" : i < step ? "done" : i === step ? "run" : "wait");

  return (
    <div className="deploy" data-ui>
      <button type="button" className="btn" onClick={run} disabled={running}>
        {running ? "Deploying…" : runs ? "Deploy again" : "Deploy this site"}
      </button>
      <ol className="pills" aria-hidden="true">
        {STAGES.map((s, i) => (
          <li key={s} data-s={step >= STAGES.length ? "done" : state(i)}>
            {s}
          </li>
        ))}
      </ol>
      <p className="result small" aria-live="polite">
        {running ? `${STAGES[step].toLowerCase()}…` : BUILT}
      </p>
    </div>
  );
}

// the counts behind the claim, itemised like a till receipt
export function Receipt({ up, done }) {
  const sites = projects.filter((p) => !COURSE_SLUGS.includes(p.slug)).length;
  const rows = [
    ["Company and business sites", sites],
    ["Courses written", COURSES.length],
    ...COURSES.map(([name, n]) => [`${name} modules`, n]),
    ["Certificates", 2],
  ];
  return (
    <div className="receipt-wrap">
      <div className="tickets">
        {[
          ["Sites live", projects.length],
          ["Online now", done ? `${up}/${projects.length}` : "…"],
        ].map(([label, n], i) => (
          <Reveal className="ticket" key={label} i={i}>
            <b>{n}</b>
            <span className="small">{label}</span>
          </Reveal>
        ))}
      </div>
      <dl className="receipt">
        {rows.map(([label, n], i) => (
          <Reveal key={label} i={i * 0.6}>
            <dt>{label}</dt>
            <i aria-hidden="true" />
            <dd>{n}</dd>
          </Reveal>
        ))}
        <Reveal className="total" i={rows.length * 0.6}>
          <dt>Total</dt>
          <i aria-hidden="true" />
          <dd>
            {projects.length} sites, {MODULES} modules
          </dd>
        </Reveal>
      </dl>
    </div>
  );
}

// the titles are the navigation; the active one shows its site whole beside the list
export function WorkList({ status }) {
  const [at, setAt] = useState(0);
  return (
    <div className="worklist">
      <ul>
        {projects.map((p, i) => (
          <li key={p.slug} data-active={i === at}>
            <a href={p.preview} target="_blank" rel="noopener noreferrer" onMouseEnter={() => setAt(i)} onFocus={() => setAt(i)}>
              <b>{p.title}</b>
              <span className="small">
                {p.year}, {p.tech.slice(0, 2).join(", ")}
              </span>
            </a>
            <div className="inline-shot">
              <Shot src={p.thumbnail} alt={`${p.title}, the live site`} w={2880} h={1800} sizes="(max-width: 760px) 100vw, 1px" />
            </div>
          </li>
        ))}
      </ul>
      <div className="stage" aria-hidden="true">
        {projects.map((p, i) => (
          <Shot key={p.slug} src={p.thumbnail} alt="" w={2880} h={1800} sizes="40vw" data-on={i === at} />
        ))}
        <Status s={status[projects[at].slug]} />
      </div>
    </div>
  );
}
