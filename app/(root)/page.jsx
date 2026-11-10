// Copyright (C) 2025 Andra (SakamotoMrX)
"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

import data from "@/json/data.json";

const projects = data.Projects.filter((p) => p.show);

// Critically damped: nothing here follows a flick, so nothing overshoots.
const SPRING = { type: "spring", bounce: 0, duration: 0.6 };

const facts = [
  ["Based in", "Bogor, Indonesia"],
  ["Age", "15"],
  ["School", "Vocational high school"],
  ["Machine", "MacBook Air (M1, 2020)"],
];

const stack = [
  [
    "Infrastructure",
    [
      ["Linux", "sysadmin, hardening"],
      ["Docker", "containers"],
      ["Kubernetes", "orchestration"],
      ["Virtual machines", "labs"],
      ["Networking", "routing, services"],
      ["Prometheus", "metrics"],
      ["Grafana", "dashboards"],
      ["Bash", "glue"],
      ["YAML", "pipelines"],
    ],
  ],
  [
    "Development",
    [
      ["Git", "version control"],
      ["GitHub Actions", "CI/CD"],
      ["Vercel", "preview deploys"],
      ["Next.js", "web apps"],
      ["React", "interfaces"],
      ["TypeScript", "typed JavaScript"],
      ["Astro", "static sites"],
      ["Swift", "macOS apps"],
      ["Arduino", "hardware"],
    ],
  ],
];

const habits = [
  ["Linux on every server I manage.", "Certified in Linux System Administration by Btech Academy."],
  ["Containers keep every deploy repeatable.", "I wrote a 16-module Docker course on the subject."],
  ["Repeated work gets a script.", "12 modules of shell scripting, published as a course."],
  ["Monitoring tells me before a client does.", "Prometheus collects the metrics, Grafana shows them."],
  ["Every change is previewed before it goes live.", `${projects.length} sites running on Vercel and enama.my.id.`],
];

function Reveal({ children, i = 0, className, as = "div" }) {
  const Tag = motion[as];
  return (
    <Tag
      data-reveal
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ ...SPRING, delay: i * 0.08 }}
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

function Work() {
  const [sel, setSel] = useState(0);
  const [status, setStatus] = useState({});
  const p = projects[sel];
  const s = status[p.slug];

  useEffect(() => {
    projects.forEach((x) => ping(x.preview).then((r) => setStatus((m) => ({ ...m, [x.slug]: r }))));
  }, []);

  return (
    <section id="work">
      <Reveal className="names">
        <h2>Selected work: </h2>
        <ul>
          {projects.map((x, i) => (
            <li key={x.slug}>
              <a
                href={x.preview}
                target="_blank"
                rel="noopener noreferrer"
                aria-current={i === sel}
                onMouseEnter={() => setSel(i)}
                onFocus={() => setSel(i)}
                // first tap chooses, the second one visits
                onClick={(e) => {
                  if (i !== sel) {
                    e.preventDefault();
                    setSel(i);
                  }
                }}
              >
                {x.title}
                <span className="frame" aria-hidden="true">
                  <Image src={x.thumbnail} alt="" width={96} height={60} />
                </span>
              </a>
              {i < projects.length - 1 ? ", " : "."}
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="chosen">
        <Reveal className="shot" i={1}>
          <AnimatePresence initial={false}>
            <motion.div
              key={p.slug}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <Image
                src={p.thumbnail}
                alt={`${p.title}, first screen of the live site`}
                fill
                sizes="(max-width: 760px) 100vw, 58vw"
              />
            </motion.div>
          </AnimatePresence>
        </Reveal>
        <Reveal i={2}>
          <h3>{p.title}</h3>
          <p className="desc">{p.desc[0]}</p>
          <div className="meta small">
            <span className="soft">{p.tech.join(", ")}</span>
            <span className="status" data-state={s?.state} aria-live="polite">
              <i aria-hidden="true" />
              {!s
                ? "Checking availability"
                : s.state === "up"
                  ? `Online, responded in ${s.ms} ms`
                  : "Not responding right now"}
            </span>
          </div>
          <a className="btn" href={p.preview} target="_blank" rel="noopener noreferrer">
            Visit {p.preview.replace("https://", "")}
          </a>
        </Reveal>
      </div>

      <Reveal as="p" className="work-note small soft" i={3}>
        {projects.length} projects, {p.year}. Availability is checked from your browser when this page loads.
      </Reveal>
    </section>
  );
}

function How() {
  const [on, setOn] = useState([false, true, false, false, true]);
  return (
    <section id="how" className="how">
      <Reveal as="h2">How I work.</Reveal>
      {habits.map(([line, then], i) => (
        <Reveal key={line} i={i}>
          <div className="band" data-on={on[i]} onClick={() => setOn((a) => a.map((v, j) => (j === i ? !v : v)))}>
            <div>
              <p className="line" id={`habit-${i}`}>
                {line}
              </p>
              <p className="then">{then}</p>
            </div>
            <button
              type="button"
              role="switch"
              data-ui
              aria-checked={on[i]}
              aria-labelledby={`habit-${i}`}
              className="switch"
            >
              <motion.span layout transition={{ type: "spring", bounce: 0, duration: 0.3 }} />
            </button>
          </div>
        </Reveal>
      ))}
    </section>
  );
}

export default function Page() {
  const reduce = useReducedMotion();
  const heroRef = useRef(null);
  const photosRef = useRef(null);
  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const { scrollYProgress: photoP } = useScroll({ target: photosRef, offset: ["start end", "end start"] });
  // the wordmark is heavy: it gives a few percent as the first screen leaves
  const wordScale = useTransform(heroP, [0, 1], [1, reduce ? 1 : 0.94]);
  const photoScale = useTransform(photoP, [0, 1], [reduce ? 1 : 1.12, 1]);

  return (
    <div className="home">
      <noscript>
        <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
      </noscript>

      <section ref={heroRef} className="hero">
        <div className="hero-copy">
          <Reveal as="p">
            Junior DevOps from Bogor, Indonesia. I take websites from first commit to live server, and keep them running after launch.
          </Reveal>
          <Reveal i={1}>
            <a className="btn" href="#work">
              See the work
            </a>
          </Reveal>
        </div>
        <motion.h1 style={{ scale: wordScale }}>ANDRA</motion.h1>
      </section>

      <section id="about" className="about">
        <Reveal as="dl" className="facts small">
          {facts.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
          <Image src="/image/hero.jpg" alt="Andra, in a white shirt among rubber trees" width={600} height={800} />
        </Reveal>
        <div className="lede">
          <Reveal as="h2" i={1}>
            From first commit
            <br />
            to live server.
          </Reveal>
          <Reveal as="p" i={2}>
            I&rsquo;m 15 and study at a vocational high school in Bogor. Outside class I build websites
            for local businesses and look after the servers and deployments behind them. Most of my time
            goes to Linux, Docker and the scripts that turn a release into a routine job.
          </Reveal>
        </div>
        <Reveal as="p" className="small spacer">
          Stack
        </Reveal>
        <div className="stack small">
          {stack.map(([title, items], c) => (
            <Reveal key={title} i={c + 1}>
              <h3>{title}</h3>
              <ul>
                {items.map(([name, note]) => (
                  <li key={name}>
                    <span>{name}</span>
                    <span className="soft">{note}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      <div ref={photosRef} className="photos">
        <Reveal as="figure">
          <div>
            <motion.div style={{ scale: photoScale, height: "100%" }}>
              <Image src="/image/setup.jpg" alt="Laptop beside a monitor running Fedora in a terminal" width={1024} height={559} />
            </motion.div>
          </div>
          <figcaption className="small soft">
            My desk: Fedora on the monitor, and my Linux System Administration certificate from Btech
            Academy on the laptop.
          </figcaption>
        </Reveal>
        <Reveal as="figure" i={1}>
          <div>
            <motion.div style={{ scale: photoScale, height: "100%" }}>
              <Image src="/image/education-3.jpg" alt="Arduino board wired with jumper cables next to a laptop" width={1024} height={576} />
            </motion.div>
          </div>
          <figcaption className="small soft">An Arduino project on the bench, wired up next to the laptop.</figcaption>
        </Reveal>
      </div>
      </section>


      <Work />
      <How />

      <footer id="contact" className="close">
        <div className="top small">
          <h2>Say hello</h2>
          <p>Andra. Junior DevOps and infrastructure automation.</p>
          <p>Bogor, Indonesia. UTC+7.</p>
          <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            Back to top
          </a>
        </div>
        <div>
          <Reveal>
            <a className="mail" href="mailto:andrahijati@gmail.com?subject=Hello%20Andra">
              andrahijati
              <br />
              @gmail.com
            </a>
          </Reveal>
          <div className="bottom small">
            <ul>
              <li><a href="https://github.com/SakamotoMrX" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="https://www.instagram.com/andrahijati" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://web.facebook.com/andra.nugroho.921" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="/docs/cv.pdf">CV (PDF)</a></li>
            </ul>
            <span>Discord: legacyy5030</span>
            <span>Bogor, {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
