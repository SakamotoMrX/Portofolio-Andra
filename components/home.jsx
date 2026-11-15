// Copyright (C) 2025 Andra (SakamotoMrX)
// the homelab drawing on the home page
"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

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
