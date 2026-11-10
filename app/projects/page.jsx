// Copyright (C) 2025 Andra (SakamotoMrX)
"use client";
import { useRef, useState } from "react";

import Assistant from "@/components/Assistant";
import { Card, Close, MAIL, Reveal, Words, projects, useStatus } from "@/components/site";

const last = projects.length - 1;

// a grid on a wide screen; on a phone one swipeable row, so eight sites take one screen instead of eight
function Deck({ status }) {
  const ref = useRef(null);
  const [at, setAt] = useState(0);
  const onScroll = () => {
    const el = ref.current;
    const mid = el.scrollLeft + el.clientWidth / 2;
    const dist = [...el.children].map((k) => Math.abs(k.offsetLeft + k.offsetWidth / 2 - mid));
    setAt(dist.indexOf(Math.min(...dist)));
  };
  const go = (n) => ref.current.children[at + n]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });

  return (
    <>
      <div className="grid deck" ref={ref} onScroll={onScroll}>
        {projects.map((p, i) => (
          <Card key={p.slug} p={p} s={status[p.slug]} feature={i === 0 || i === last} active={i === at} />
        ))}
      </div>
      <div className="deck-nav">
        <button type="button" aria-label="Previous site" onClick={() => go(-1)} disabled={at === 0}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 12H5M11 6l-6 6 6 6" />
          </svg>
        </button>
        <span className="rail" style={{ "--f": (at + 1) / projects.length }} />
        <span className="small">
          {at + 1} / {projects.length}
        </span>
        <button type="button" aria-label="Next site" onClick={() => go(1)} disabled={at === last}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </>
  );
}

export default function Page() {
  const { status, online } = useStatus();
  return (
    <div className="home">
      <noscript>
        <style>{`[data-reveal]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
      </noscript>

      <section className="work-top">
        <Words as="h1" text={`${projects.length} sites shipped.`} mount delay={0.1} />
        <div>
          <Reveal as="p" className="lead" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }}>
            All from {projects[0].year}: company sites, a booking system, a Quran reader and three courses I wrote. Each one opens the live site.
          </Reveal>
          <div className="actions">
            <a className="btn" href={MAIL}>
              Email Andra
            </a>
            <span className="chip" data-ui aria-live="polite">
              {online}
            </span>
          </div>
        </div>
      </section>

      <section id="work">
        <Deck status={status} />
      </section>

      <Close />
      <Assistant />
    </div>
  );
}
