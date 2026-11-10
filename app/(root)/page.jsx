// Copyright (C) 2025 Andra (SakamotoMrX)
"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

import data from "@/json/data.json";

const projects = data.Projects.filter((p) => p.show);
// the panels carry six; the two course sites that share a template with Docker Fundamental go in one line
const PANELS = 6;
const panels = projects.filter((p) => !["tkj", "bash"].includes(p.slug)).slice(0, PANELS);
const rest = projects.filter((p) => !panels.includes(p));

const SPRING = { type: "spring", bounce: 0, duration: 0.6 };

const passes = [
  ["/image/hero.jpg", "Andra in a white shirt among rubber trees", "22% 50%", "Andra", "Junior DevOps, 15", "I study at a vocational high school in Bogor and build websites for local businesses outside class."],
  ["/image/setup.jpg", "Laptop beside a monitor running Fedora in a terminal", "30% 50%", "The desk", "Fedora, two screens", "Where the servers and deployments behind those websites get looked after."],
  ["/image/education-3.jpg", "Arduino board wired with jumper cables next to a laptop", "50% 50%", "The bench", "Arduino and hardware", "Electronics on the side, usually wired up right next to the laptop."],
];

const steps = [
  ["First, a commit.", "Every change starts in Git, small enough to review.", "$ git push origin main"],
  ["Then it builds and tests itself.", "GitHub Actions runs the build and the checks on every push.", "$ pnpm build && pnpm test"],
  ["Then a preview to look at.", "Vercel gives each change its own URL before anything goes live.", "$ vercel deploy"],
  ["Then it goes live, and stays up.", "After launch I watch it with Prometheus and Grafana.", "$ vercel deploy --prod"],
];

// which pipeline rows are done / running at each step
const pipeline = [
  ["Commit", "pushed to main", 0, 0],
  ["Build", "compiled", 1, 1],
  ["Test", "checks passed", 1, 1],
  ["Preview", "URL ready", 2, 2],
  ["Live", "in production", 3, 4],
];
const rowState = (from, doneAfter, active) => (active > doneAfter ? "done" : active >= from ? (active === 3 && from === 3 ? "done" : "run") : "wait");

const tools = [
  ["Infrastructure", [["Linux", "sysadmin, hardening"], ["Docker", "containers"], ["Kubernetes", "orchestration"], ["Virtual machines", "labs"], ["Networking", "routing, services"], ["Prometheus", "metrics"], ["Grafana", "dashboards"], ["Bash", "scripts"], ["YAML", "pipelines"]]],
  ["Development", [["Git", "version control"], ["GitHub Actions", "CI/CD"], ["Vercel", "preview deploys"], ["Next.js", "web apps"], ["React", "interfaces"], ["TypeScript", "typed JavaScript"], ["Astro", "static sites"], ["Swift", "macOS apps"], ["Arduino", "hardware"]]],
];

function Reveal({ children, i = 0, className, as = "div", ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      data-reveal
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ ...SPRING, delay: i * 0.08 }}
      {...rest}
    >
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

function Status({ s }) {
  return (
    <span className="status small" data-state={s?.state}>
      <i aria-hidden="true" />
      {!s ? "Checking" : s.state === "up" ? `Online, ${s.ms} ms` : "Not responding"}
    </span>
  );
}

function Panel({ p, s }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // the picture drifts slower than the page, so the fixed row reads like a plate being turned
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-7%", "7%"]);
  return (
    <article className="panel" ref={ref}>
      <motion.div style={{ y }}>
        <Image src={p.thumbnail} alt={`${p.title}, the live site`} width={1440} height={900} sizes="130vw" />
      </motion.div>
      <div className="row">
        <span className="small muted">{p.year}</span>
        <h3>
          <a href={p.preview} target="_blank" rel="noopener noreferrer">
            {p.title}
          </a>
        </h3>
        <Status s={s} />
      </div>
    </article>
  );
}

function Work() {
  const [status, setStatus] = useState({});
  useEffect(() => {
    panels.forEach((x) => ping(x.preview).then((r) => setStatus((m) => ({ ...m, [x.slug]: r }))));
  }, []);

  return (
    <section id="work">
      <div className="work-open">
        <Reveal as="h2">Selected work</Reveal>
        <Reveal as="p" i={1}>
          {projects.length} sites shipped in {projects[0].year}. Each one is checked from your browser as
          you read this.
        </Reveal>
      </div>
      {panels.map((p) => (
        <Panel key={p.slug} p={p} s={status[p.slug]} />
      ))}
      <p className="also">
        Also live:{" "}
        {rest.map((p, i) => (
          <span key={p.slug}>
            <a href={p.preview} target="_blank" rel="noopener noreferrer">
              {p.title}
            </a>
            {i < rest.length - 1 ? " and " : "."}
          </span>
        ))}
      </p>
    </section>
  );
}

function How() {
  const [active, setActive] = useState(0);
  return (
    <section id="how" className="how">
      <div>
        <h2>How a site ships</h2>
        {steps.map(([line, more], i) => (
          <motion.div
            key={line}
            className="step"
            data-active={i === active}
            // the sentence crossing the middle of the screen drives the deploy
            onViewportEnter={() => setActive(i)}
            viewport={{ margin: "-45% 0px -45% 0px" }}
          >
            <p>{line}</p>
            <p>{more}</p>
          </motion.div>
        ))}
      </div>
      <div className="deploy" data-ui aria-live="polite">
        <ol>
          {pipeline.map(([name, note, from, doneAfter]) => (
            <li key={name} data-s={rowState(from, doneAfter, active)}>
              <i aria-hidden="true" />
              <span>{name}</span>
              <span>{note}</span>
            </li>
          ))}
        </ol>
        <pre>
          <code>{steps[active][2]}</code>
        </pre>
      </div>
    </section>
  );
}

export default function Page() {
  const reduce = useReducedMotion();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end end"] });
  // the opening reaches the edges in three quarters of the scroll, then the picture holds
  const open = useTransform(scrollYProgress, [0, 0.75], [0, reduce ? 0 : 1], { clamp: true });
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, reduce ? 1 : 0]);
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, reduce ? 0 : -48]);
  const placeOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, reduce ? 0 : 1]);

  return (
    <div className="home">
      <noscript>
        <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
      </noscript>

      <section ref={heroRef} className="hero">
        <div className="stage">
          <motion.div className="window" style={{ "--p": open }}>
            <div className="window-in">
              <Image
                src="/image/place/gunung-salak.jpg"
                alt="Mount Salak rising over forest, seen from Bogor"
                width={1920}
                height={1282}
                sizes="100vw"
                priority
              />
            </div>
          </motion.div>
          <motion.div className="hero-text" style={{ opacity: textOpacity, y: textY }}>
            <h1>
              <span>
                <i>Andra ships</i>
              </span>
              <span>
                <i>websites.</i>
              </span>
            </h1>
            <div className="hero-side">
              <p>Junior DevOps in Bogor. From first commit to live server, and kept running after launch.</p>
              <a className="btn" href="#work">
                See the work
              </a>
            </div>
          </motion.div>
          <motion.p className="hero-place small" style={{ opacity: placeOpacity }}>
            Mount Salak, seen from Bogor, where I work.
          </motion.p>
        </div>
      </section>

      <section id="about" className="about">
        <h2 className="pin">About Andra</h2>
        <div className="passes">
          {passes.map(([src, alt, pos, name, role, text]) => (
            <Reveal as="figure" className="pass" key={src}>
              <div>
                <Image src={src} alt={alt} width={800} height={1000} sizes="(max-width: 760px) 72vw, 28vw" style={{ objectPosition: pos }} />
              </div>
              <figcaption>
                <p className="lead">{name}</p>
                <p className="small muted">{role}</p>
                <p>{text}</p>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </section>

      <Work />
      <How />

      <section id="tools" className="tools">
        <h2>What I work with</h2>
        <div className="lists">
          {tools.map(([title, items], c) => (
            <div key={title}>
              <h3>{title}</h3>
              <ul>
                {items.map(([name, note]) => (
                  <li key={name}>
                    <span>{name}</span>
                    <span className="muted">{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <footer id="contact" className="close">
        <div className="top">
          <div>
            <h2>
              Have a site
              <br />
              to ship?
            </h2>
            <a className="btn" href="mailto:andrahijati@gmail.com?subject=A%20site%20to%20ship">
              Email Andra
            </a>
          </div>
          <ul className="links">
            <li><a href="https://github.com/SakamotoMrX" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a href="https://www.instagram.com/andrahijati" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://web.facebook.com/andra.nugroho.921" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="/docs/cv.pdf">CV (PDF)</a></li>
          </ul>
        </div>
        <div className="bottom small">
          <span>andrahijati@gmail.com</span>
          <span>
            Photograph of Mount Salak by{" "}
            <a href="https://commons.wikimedia.org/w/index.php?curid=49048617" target="_blank" rel="noopener noreferrer">
              Hiroshi sanjuro
            </a>
            , CC BY-SA 4.0
          </span>
          <span>Bogor, {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}
