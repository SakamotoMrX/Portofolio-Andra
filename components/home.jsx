// Copyright (C) 2025 Andra (SakamotoMrX)
// pieces only the home page uses
"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { buildLine, latencyBars } from "@/lib/build.mjs";
import { Decode } from "@/components/motion";
import { Loop, Reveal, Shot, Status, projects } from "@/components/site";

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
    if (running) return;
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
      <button type="button" className="btn" onClick={run} aria-disabled={running}>
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
        {running ? `${STAGES[step].toLowerCase()}…` : <Decode key={runs} text={BUILT} />}
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
            <dd>{n}</dd>
          </Reveal>
        ))}
        <Reveal className="total" i={rows.length * 0.6}>
          <dt>Total</dt>
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

export function Interlude() {
  return (
    <section className="interlude">
      <div className="head">
        <h2>Containers, the real kind</h2>
        <Reveal as="p">Docker borrowed the idea from shipping: pack it once, and it runs the same on every ship.</Reveal>
      </div>
      <div className="pair">
        <Reveal as="figure">
          <Loop name="container-ship" w={854} h={480} label="A container ship sailing past, filmed in Oulu, Finland" />
          <figcaption className="small">A container ship leaving Oulu, Finland.</figcaption>
        </Reveal>
        <div className="stack">
          <Reveal as="figure" i={1}>
            <Shot src="/media/cape-town-port.jpg" alt="The Port of Cape Town from the air, rows of containers on the quay" w={1920} h={1107} sizes="(max-width: 760px) 100vw, 33vw" />
            <figcaption className="small">The Port of Cape Town.</figcaption>
          </Reveal>
          <Reveal as="figure" i={2}>
            <Shot src="/media/emma-maersk.jpg" alt="The container ship Emma Maersk behind a meadow with grazing cows" w={1920} h={1117} sizes="(max-width: 760px) 100vw, 33vw" />
            <figcaption className="small">Emma Maersk, seen across a meadow.</figcaption>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// shortcut: the lab layout is drawn from the skills list, not from Andra's real rack; confirm the nodes with him.
const LAB = {
  nodes: [
    ["laptop", 40, 150, "Laptop"],
    ["vm", 230, 150, "Linux VM host"],
    ["docker", 430, 150, "Docker"],
    ["web", 640, 80, "web app"],
    ["nginx", 640, 220, "nginx"],
    ["prom", 430, 320, "Prometheus"],
    ["graf", 640, 320, "Grafana"],
    ["gh", 40, 30, "GitHub"],
    ["actions", 230, 30, "GitHub Actions"],
    ["vercel", 430, 30, "Vercel"],
  ],
  links: [["laptop", "vm"], ["vm", "docker"], ["docker", "web"], ["docker", "nginx"], ["prom", "docker"], ["prom", "graf"], ["gh", "actions"], ["actions", "vercel"], ["laptop", "gh"]],
  live: ["actions-vercel", "prom-graf"],
};
const NODE_W = 150;
// the same lab as three readable chains, for screens too narrow for the drawing
const CHAINS = ["Laptop → Linux VM host → Docker → web app, nginx", "Prometheus → Grafana, watching Docker", "GitHub → GitHub Actions → Vercel"];

export function Homelab() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const at = Object.fromEntries(LAB.nodes.map(([id, x, y]) => [id, [x + NODE_W / 2, y + 22]]));
  const chain = "Laptop to a Linux VM host running Docker with a web app and nginx; Prometheus scrapes Docker and feeds Grafana; GitHub pushes run GitHub Actions, which deploy to Vercel.";
  return (
    <div className="lab" ref={ref}>
      <motion.svg viewBox="0 0 820 380" role="img" aria-label={`Homelab: ${chain}`} style={reduce ? undefined : { scale }}>
        {LAB.links.map(([a, b]) => (
          <line key={a + b} x1={at[a][0]} y1={at[a][1]} x2={at[b][0]} y2={at[b][1]} className={LAB.live.includes(`${a}-${b}`) ? "live" : ""} />
        ))}
        {LAB.nodes.map(([id, x, y, label]) => (
          <g key={id}>
            <rect x={x} y={y} width={NODE_W} height="44" rx="22" />
            <text x={x + NODE_W / 2} y={y + 27} textAnchor="middle">
              {label}
            </text>
          </g>
        ))}
      </motion.svg>
      <ul className="lab-list">
        {CHAINS.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </div>
  );
}

// a dashboard panel built from the same pings the status chips use
export function Latency({ status }) {
  const bars = latencyBars(status, projects.map((p) => ({ slug: p.slug, host: new URL(p.preview).host })));
  const checked = Object.keys(status).length;
  return (
    <div className="latency" data-ui>
      <h3>Response time from your browser</h3>
      <ul>
        {bars.map((b, i) => (
          <li key={b.host}>
            <span className="host small">{b.host}</span>
            {b.ms != null && <span className="bar" style={{ "--p": b.pct / 100 }} />}
            <span className="ms small">{b.ms != null ? `${b.ms} ms` : status[projects[i].slug] ? "not responding" : "checking"}</span>
          </li>
        ))}
      </ul>
      <p className="small muted">{checked < projects.length ? "Checking each site…" : "Measured once, as this page loaded."}</p>
    </div>
  );
}
