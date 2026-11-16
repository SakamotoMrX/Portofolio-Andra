// Copyright (C) 2025 Andra (SakamotoMrX)
// the homelab drawing on the home page
"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useCalm } from "@/components/motion";

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

export default function Homelab() {
  const ref = useRef(null);
  const reduce = useCalm();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const seen = useInView(ref, { once: true, amount: 0.35 });
  // drawn on the server and without JavaScript; hidden only once the page can play the drawing in
  const [armed, setArmed] = useState(false);
  useEffect(() => setArmed(!reduce), [reduce]);
  const drawn = !armed || seen;
  const at = Object.fromEntries(LAB.nodes.map(([id, x, y]) => [id, [x + NODE_W / 2, y + 22]]));
  const chain = "Laptop to a Linux VM host running Docker with a web app and nginx; Prometheus scrapes Docker and feeds Grafana; GitHub pushes run GitHub Actions, which deploy to Vercel.";
  return (
    <div className="lab" ref={ref}>
      <motion.svg viewBox="0 0 820 380" role="img" aria-label={`Homelab: ${chain}`} style={reduce ? undefined : { scale }}>
        {/* lines draw in one after another, then data runs along the live ones (after Illoca, Heron AI) */}
        {LAB.links.map(([a, b], i) => {
          const live = LAB.live.includes(`${a}-${b}`);
          const d = `M${at[a][0]} ${at[a][1]} L${at[b][0]} ${at[b][1]}`;
          return (
            <g key={a + b}>
              <motion.path
                d={d}
                className={live ? "live" : ""}
                initial={false}
                animate={{ pathLength: drawn ? 1 : 0 }}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.12, ease: [0.23, 1, 0.32, 1] }}
              />
              {live && armed && seen && (
                <circle r="6" className="packet">
                  <animateMotion dur="1.6s" repeatCount="indefinite" begin={`${1.6 + i * 0.12}s`} path={d} />
                </circle>
              )}
            </g>
          );
        })}
        {LAB.nodes.map(([id, x, y, label], i) => (
          <motion.g key={id} initial={false} animate={drawn ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }} transition={{ duration: 0.5, delay: i * 0.06 }}>
            <rect x={x} y={y} width={NODE_W} height="44" rx="22" />
            <text x={x + NODE_W / 2} y={y + 27} textAnchor="middle">
              {label}
            </text>
          </motion.g>
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

// certificates dealt like playing cards: each arrives from below, turned, and settles into a fan (after Made with GSAP)
export function Fan({ children }) {
  const ref = useRef(null);
  const reduce = useCalm();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center 0.6"] });
  const cards = Array.isArray(children) ? children : [children];
  return (
    <div className="fan" ref={ref}>
      {cards.map((card, i) => (
        <FanCard key={i} p={scrollYProgress} i={i} n={cards.length} still={reduce}>
          {card}
        </FanCard>
      ))}
    </div>
  );
}
function FanCard({ p, i, n, still, children }) {
  const start = i / (n + 1);
  const end = start + 0.55;
  const side = i - (n - 1) / 2;
  const y = useTransform(p, [start, end], [180, 0]);
  const rotate = useTransform(p, [start, end], [side * 14 + 8, side * 4]);
  return <motion.div className="fan-card" style={still ? undefined : { y, rotate }}>{children}</motion.div>;
}

// a sticky list: the item whose panel is in view lights up, the others dim (after Cerebrium)
export function SkillList({ groups }) {
  const [at, setAt] = useState(0);
  return (
    <div className="skill-list">
      <ol aria-label="Areas">
        {groups.map(([title], i) => (
          <li key={title} data-on={i === at}>
            <a href={`#area-${i}`}>{title}</a>
          </li>
        ))}
      </ol>
      <div className="panels">
        {groups.map(([title, items], i) => (
          <Panel key={title} id={`area-${i}`} onSeen={() => setAt(i)}>
            <h3>{title}</h3>
            <ul>
              {items.map(([name, note]) => (
                <li key={name}>
                  <span>{name}</span>
                  <span className="muted small">{note}</span>
                </li>
              ))}
            </ul>
          </Panel>
        ))}
      </div>
    </div>
  );
}
function Panel({ id, onSeen, children }) {
  const ref = useRef(null);
  const seen = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (seen) onSeen();
  }, [seen, onSeen]);
  return (
    <div className="panel" id={id} ref={ref}>
      {children}
    </div>
  );
}
