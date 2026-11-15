// Copyright (C) 2025 Andra (SakamotoMrX)
"use client";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import Projects from "@/json/data.json";
import { Close, EASE } from "@/components/site";

const projects = Projects.Projects;

// a fixed scatter per frame, so the frames land in a different order from left to right
const delay = (i, j) => (((i * 7 + j * 13) % 9) / 9) * 0.4;

// every site as a run of whole screenshots, like a photographer's contact sheet
export default function Page() {
  const reduce = useReducedMotion();
  return (
    <div className="home">
      <noscript>
        <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
      </noscript>
      <section className="archive-top">
        <h1>Archive</h1>
        <p>
          Every site Andra has built, each as its screenshots at their natural size. Each frame opens the live site. <Link href="/projects">Back to the work</Link>
        </p>
      </section>
      <section className="sheet-runs">
        {projects.map((p, i) => (
          <div className="run-row" key={p.slug}>
            <p>
              <a href={p.preview} target="_blank" rel="noopener noreferrer">
                {p.title}
              </a>
              , {p.year}, {p.tech.join(", ")}
            </p>
            <div className="frames">
              {p.images.map((src, j) => (
                <motion.a
                  key={src}
                  data-reveal
                  href={p.preview}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: EASE, delay: delay(i, j) }}
                >
                  <Image src={src} alt={`${p.title}, screenshot ${j + 1}`} width={2880} height={1800} sizes="200px" />
                </motion.a>
              ))}
            </div>
          </div>
        ))}
      </section>
      <Close />
    </div>
  );
}
