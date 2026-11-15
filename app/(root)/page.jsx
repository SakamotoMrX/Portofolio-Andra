// Copyright (C) 2025 Andra (SakamotoMrX)
"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import Assistant from "@/components/Assistant";
import Homelab, { Fan, SkillList, Spotlight } from "@/components/home";
import { InkFill, Magnet, Roll, SplitTitle, useCalm, useSkew, useVelocityMarquee } from "@/components/motion";
import Mark from "@/components/Mark";
import { tools } from "@/data/site.mjs";
import { Card, Close, EASE, MAIL, Reveal, Shot, Status, Words, projects, useStatus } from "@/components/site";

// the moment the intro columns start to lift; the first screen arrives with them
const T0 = 1.75;

// 16 Docker + 12 Bash + 6 TKJ modules, as listed on the three course sites
const MODULES = 34;

// the words the intro plays through
const STAGES = ["Commit", "Build", "Test", "Preview", "Live"];

export default function Page() {
  const { status, up, done, online } = useStatus();

  // with reduced motion there is no intro to wait for
  const reduce = useCalm();
  // the delay only times the entrance; reading the media query directly avoids a 1.75s wait before useCalm settles
  const t0 = typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : T0;
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  // the sheet steps back into the field as the page moves on
  const sheetScale = useTransform(scrollYProgress, [0, 1], [1, 0.93]);
  // the title lifts away a little faster than the sheet
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const titleFade = useTransform(scrollYProgress, [0, 0.7], [1, 0.2]);

  const featured = projects[projects.length - 1];
  const trio = [
    [projects[0].thumbnail, `${projects[0].title}, the live site`, 2880, 1800, <Status key="s" s={status[projects[0].slug]} />],
    [featured.thumbnail, `${featured.title}, the live site`, 2880, 1800, online],
    ["/image/certs/btech-linux-sysadmin.jpg", "Certificate of achievement, Linux System Administration, Btech Academy", 2000, 1413, "Linux System Administration"],
  ];
  const skew = useSkew();
  const marqueeRef = useRef(null);
  useVelocityMarquee(marqueeRef);
  const names = tools.flatMap(([, items]) => items.map(([n]) => n));

  return (
    <div className="home">
      <noscript>
        <style>{`[data-reveal]{opacity:1!important;transform:none!important;filter:none!important;clip-path:none!important}.intro{display:none}`}</style>
      </noscript>

      <div className="intro" aria-hidden="true">
        <div className="cols">
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="play">
          <Mark className="mark" />
          <div className="rail" />
          <p className="words">
            <span>
              {STAGES.map((w) => (
                <b key={w}>{w}</b>
              ))}
            </span>
          </p>
          <p className="count" />
        </div>
      </div>

      <section ref={heroRef} className="hero field">
        <motion.div className="sheet" style={{ scale: sheetScale }}>
          <motion.div style={reduce ? undefined : { y: titleY, opacity: titleFade }}>
            <SplitTitle left="Junior DevOps," right="ready to intern." delay={t0} />
          </motion.div>
          <Reveal as="p" className="lead" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE, delay: t0 + 0.25 }}>
            I&apos;m Andra, 15, a vocational student in Bogor. I have shipped {projects.length} live websites and keep them running with Linux, Docker and CI/CD.
          </Reveal>
          <Reveal className="actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE, delay: t0 + 0.33 }}>
            <Magnet>
              <a className="btn" href={MAIL}>
                Email Andra
              </a>
            </Magnet>
            <Magnet>
              <Link className="btn quiet" href="/projects">
                See the work
              </Link>
            </Magnet>
          </Reveal>
          <div className="trio">
            {trio.map(([src, alt, w, h, chip], i) => (
              <Reveal key={src} style={{ skewY: skew }} initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: t0 + 0.4 + i * 0.09 }}>
                <Shot src={src} alt={alt} w={w} h={h} sizes="(max-width: 760px) 100vw, 40vw" priority>
                  <span className="chip" data-ui>
                    {chip}
                  </span>
                </Shot>
              </Reveal>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="proof">
        <div>
          <Words text="Shipped, and still running." />
          <Reveal as="p">All {projects.length} sites are live. Your browser is checking each one as you read this.</Reveal>
        </div>
        <div className="tickets">
          {[
            ["Sites live", <Roll key="c" to={projects.length} />],
            ["Online now", done ? `${up}/${projects.length}` : "…"],
            ["Course modules written", <Roll key="c" to={MODULES} />],
            ["Certificates", <Roll key="c" to={2} />],
          ].map(([label, n], i) => (
            <Reveal className="ticket" key={label} i={i}>
              <b>{n}</b>
              <span className="small">{label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="work">
        <div className="head">
          <Words text="Selected work" />
          <Reveal as="p">
            {projects.length} sites shipped in {projects[0].year}: company sites, a booking system, a Quran reader and three courses I wrote.
          </Reveal>
        </div>
        <div className="grid">
          <Card p={projects[0]} s={status[projects[0].slug]} feature />
        </div>
        <Reveal>
          <Link className="more" href="/projects">
            <b>See all {projects.length} sites</b>
            <i aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </i>
            <span className="thumbs">
              {projects.slice(1).map((p) => (
                <Image key={p.slug} src={p.thumbnail} alt={`${p.title}, the live site`} width={2880} height={1800} sizes="(max-width: 760px) 25vw, 13vw" />
              ))}
            </span>
          </Link>
        </Reveal>
      </section>

      <section className="marquee" aria-hidden="true" ref={marqueeRef}>
        {[names, [...names].reverse()].map((row, r) => (
          <div className="row" key={r}>
            {[...row, ...row].map((n, i) => (
              <b key={i}>{n}</b>
            ))}
          </div>
        ))}
      </section>

      <section className="stack">
        <Words text="The stack, one at a time" />
        <Spotlight names={names} />
      </section>


      <section id="skills" className="skills field">
        <div className="sheet">
          <Words text="What I work with" />
          <Homelab />
          <SkillList groups={tools} />
        </div>
      </section>

      <section id="certificates" className="certs">
        <div className="head">
          <Words text="Certified, and you can check" />
          <Reveal as="p">Two courses finished so far, one on Linux servers and one on cloud computing.</Reveal>
        </div>
        <Fan>
          <figure>
            <Shot src="/image/certs/btech-linux-sysadmin.jpg" alt="Certificate of achievement for Andra Hijati, Linux System Administration, Btech Academy" w={2000} h={1413} sizes="(max-width: 760px) 100vw, 58vw" />
            <Reveal as="figcaption">
              <h3>Linux System Administration</h3>
              <span className="muted">Btech Academy, certificate C01001-00000-46787</span>
            </Reveal>
          </figure>
          <figure>
            <Shot src="/image/certs/ibm-cloud-fundamentals.jpg" alt="IBM SkillsBuild certificate for Andra Hijati Nugroho, Cloud Computing Fundamentals" w={1650} h={1275} sizes="(max-width: 760px) 100vw, 42vw" />
            <Reveal as="figcaption">
              <h3>Cloud Computing Fundamentals</h3>
              <span className="muted">
                IBM SkillsBuild, issued 30 September 2026.{" "}
                <a href="https://www.credly.com/badges/28adb695-2c73-40e3-9d81-4533712f8fd0" target="_blank" rel="noopener noreferrer">
                  Verify on Credly
                </a>
              </span>
            </Reveal>
          </figure>
        </Fan>
      </section>

      <section id="about" className="about">
        <Reveal>
          <Shot src="/image/hero.jpg" alt="Andra in a white shirt among rubber trees" w={1024} h={702} sizes="(max-width: 760px) 100vw, 56vw" />
        </Reveal>
        <div>
          <Words text="About Andra" />
          <InkFill className="lead" text="I study at a vocational high school in Bogor and build websites for local businesses outside class. I like the part after launch most: the server, the pipeline, the dashboards that say it is still up." />
          <Reveal className="bench">
            <Shot src="/image/education-3.jpg" alt="Arduino board wired with jumper cables next to a laptop" w={1024} h={576} sizes="(max-width: 760px) 50vw, 20vw" />
            <p>Electronics on the side: Arduino boards, usually wired up right next to the terminal.</p>
          </Reveal>
        </div>
      </section>

      <Close />
      <Assistant />
    </div>
  );
}
