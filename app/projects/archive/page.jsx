// Copyright (C) 2025 Andra (SakamotoMrX)
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import Projects from "@/json/data.json";
import { Close, EASE } from "@/components/site";

const projects = Projects.Projects;

// a fixed scatter per frame, so the frames land in a different order from left to right
const delay = (i, j) => (((i * 7 + j * 13) % 9) / 9) * 0.4;

// every site as a run of whole screenshots, like a photographer's contact sheet
export default function Page() {
  return (
    <div className="home">
      <noscript>
        <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
      </noscript>
      <section className="archive-top">
        <h1>Every site, on one sheet</h1>
        <p>
          All {projects.length} sites Andra has shipped, each frame whole and at its natural shape. Each one opens the live site. <Link href="/projects">Back to the work</Link>
        </p>
      </section>
      <section className="sheet-runs">
        {projects.map((p, i) => (
          <div className="run-row" key={p.slug}>
            <div className="frames">
              {p.images.map((src, j) => (
                <motion.a
                  key={src}
                  data-reveal
                  href={p.preview}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: EASE, delay: delay(i, j) }}
                >
                  <Image src={src} alt={`${p.title}, screenshot ${j + 1}`} width={2880} height={1800} sizes="(max-width: 760px) 100vw, 33vw" />
                </motion.a>
              ))}
            </div>
            <p>
              <a href={p.preview} target="_blank" rel="noopener noreferrer">
                {p.title}
              </a>
              , {p.year}, {p.tech.join(", ")}
            </p>
          </div>
        ))}
      </section>
      <Close />
    </div>
  );
}
