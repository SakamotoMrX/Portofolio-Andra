// Copyright (C) 2025 Andra (SakamotoMrX)
// pieces the home page and the work page share
"use client";
import { Fragment, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import data from "@/json/data.json";

export const projects = data.Projects.filter((p) => p.show);
export const MAIL = "mailto:andrahijati@gmail.com?subject=Internship%20for%20Andra";

export const EASE = [0.23, 1, 0.32, 1];
export const HIDDEN = { opacity: 0, y: 14, filter: "blur(10px)" };
export const SHOWN = { opacity: 1, y: 0, filter: "blur(0px)" };
const ONCE = { once: true, amount: 0.3 };

// each word arrives out of a blur, one after another
export function Words({ text, as = "h2", delay = 0, mount, ...rest }) {
  const Tag = as;
  return (
    <Tag {...rest}>
      {text.split(" ").map((w, i) => (
        <Fragment key={i}>
          <motion.span
            data-reveal
            className="w"
            initial={HIDDEN}
            {...(mount ? { animate: SHOWN } : { whileInView: SHOWN, viewport: { once: true, amount: 0.6 } })}
            transition={{ duration: 0.5, ease: EASE, delay: delay + i * 0.05 }}
          >
            {w}
          </motion.span>{" "}
        </Fragment>
      ))}
    </Tag>
  );
}

export function Reveal({ children, i = 0, as = "div", ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      data-reveal
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={ONCE}
      transition={{ duration: 0.6, ease: EASE, delay: i * 0.07 }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// pictures are shown whole and still; the motion belongs to the type and the interface around them
export function Shot({ src, alt, w, h, sizes, priority, as: Tag = "div", children, ...rest }) {
  return (
    <Tag className="shot" {...rest}>
      <Image src={src} alt={alt} width={w} height={h} sizes={sizes} priority={priority} />
      {children}
    </Tag>
  );
}

// shortcut: a no-cors fetch only proves the host answered, not that it returned 200; upgrade to a server-side check if a real status code is needed.
async function ping(url) {
  const t = performance.now();
  try {
    await fetch(url, { mode: "no-cors", cache: "no-store", signal: AbortSignal.timeout(8000) });
    return { state: "up", ms: Math.round(performance.now() - t) };
  } catch {
    return { state: "down" };
  }
}

export function Status({ s }) {
  return (
    <span className="status small" data-state={s?.state}>
      <i aria-hidden="true" />
      {!s ? "Checking" : s.state === "up" ? `Online, ${s.ms} ms` : "Not responding"}
    </span>
  );
}

export function Card({ p, s, feature, active }) {
  return (
    <Reveal as="article" className={feature ? "card field" : "card"} data-active={active}>
      <Shot as="a" href={p.preview} target="_blank" rel="noopener noreferrer" src={p.thumbnail} alt={`${p.title}, the live site`} w={2880} h={1800} sizes="(max-width: 760px) 100vw, 60vw" />
      <div className="meta">
        <h3>
          <a href={p.preview} target="_blank" rel="noopener noreferrer">
            {p.title}
          </a>
        </h3>
        <Status s={s} />
        <p>{p.desc[0]}</p>
        <p className="small muted">{p.tech.join(", ")}</p>
      </div>
    </Reveal>
  );
}

// every listed site, pinged once from the visitor's browser
export function useStatus() {
  const [status, setStatus] = useState({});
  useEffect(() => {
    projects.forEach((x) => ping(x.preview).then((r) => setStatus((m) => ({ ...m, [x.slug]: r }))));
  }, []);
  const checked = Object.values(status);
  const up = checked.filter((s) => s.state === "up").length;
  const done = checked.length === projects.length;
  return { status, up, done, online: done ? `${up} of ${projects.length} sites online now` : "Checking the sites" };
}

// the ask and the lime ground that close both pages
export function Close() {
  return (
    <>
      <section id="contact" className="cta">
        <div className="field">
          <Reveal className="sheet">
            <Words text="Looking for an intern?" />
            <div>
              <p>I&apos;m looking for an internship in DevOps, system administration or web development. Email me and I&apos;ll reply with anything you need.</p>
              <div className="actions">
                <a className="btn" href={MAIL}>
                  Email Andra
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="foot">
        <ul className="links">
          <li><a href="mailto:andrahijati@gmail.com">andrahijati@gmail.com</a></li>
          <li><a href="https://github.com/SakamotoMrX" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a href="https://www.instagram.com/andrahijati" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          <li><a href="https://web.facebook.com/andra.nugroho.921" target="_blank" rel="noopener noreferrer">Facebook</a></li>
        </ul>
        <motion.p className="name" aria-hidden="true" initial="hide" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
          {"Andra".split("").map((c, i) => (
            <motion.span key={i} data-reveal variants={{ hide: { y: "100%" }, show: { y: 0 } }} transition={{ duration: 0.8, ease: EASE, delay: i * 0.06 }}>
              {c}
            </motion.span>
          ))}
        </motion.p>
        <div className="bottom small">
          <span>Junior DevOps</span>
          <span>Bogor, {new Date().getFullYear()}</span>
        </div>
      </footer>
    </>
  );
}
