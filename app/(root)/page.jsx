// Copyright (C) 2025 Andra (SakamotoMrX)
// ponytail: SIZE_OK — single-page composition of 4 static sections; split into _sections/* when section gains state/logic
"use client";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";

import DistressedLogo from "@/components/DistressedLogo";
import Neofetch from "@/components/Neofetch";
import { HeroScrollDemo } from "@/components/ui/container-scroll-demo";
import data from "@/json/data.json";

const projects = data.Projects.filter((p) => p.show);

const CATEGORY_MAP = { 1: "Infrastructure", 2: "Hardware", 9: "Website" };
const CATEGORY_OVERRIDE = {
  greenfog: "SaaS · Website",
  "macbar-monitor": "Software · macOS",
  "invoice-app": "SaaS · Website",
  "nexotech-enama": "Company Profile",
};
const getCategory = (p) => {
  if (CATEGORY_OVERRIDE[p.slug]) return CATEGORY_OVERRIDE[p.slug];
  if (!p.category?.length) return null;
  return p.category.map((id) => CATEGORY_MAP[id]).filter(Boolean).join(" · ");
};

const YEAR = new Date().getFullYear();

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50">{children}</p>
  );
}

function BlurText({ text, className = "", delay = 0, stagger = 0.07 }) {
  const words = text.split(" ");
  return (
    <motion.p
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, filter: "blur(8px)", y: 12 },
            visible: {
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
              transition: { duration: 0.6, ease: "easeOut" },
            },
          }}
          style={{ display: "inline-block", marginRight: "0.32em" }}
        >
          {w}
        </motion.span>
      ))}
    </motion.p>
  );
}

function MagneticLink({ href, children, variant = "primary", target, rel }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 100, damping: 15, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 100, damping: 15, mass: 0.5 });

  const onMove = (e) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * 0.28);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.32);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const cls =
    variant === "primary"
      ? "glass-btn px-7 py-3 text-xs font-semibold uppercase tracking-widest"
      : "glass-btn-outline px-7 py-3 text-xs font-semibold uppercase tracking-widest";

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.98 }}
      className={cls}
    >
      {children}
    </motion.a>
  );
}

const focusAreas = [
  {
    title: "Linux",
    desc: "SysAdmin, hardening, and servers that stay up without ceremony.",
  },
  {
    title: "Docker",
    desc: "Container workflows for repeatable, portable deployments.",
  },
  {
    title: "Automation",
    desc: "Bash, YAML, and tooling that turn ten steps into one command.",
  },
  {
    title: "Cloud tooling",
    desc: "VMs, Vercel deploys, and infrastructure that ships itself.",
  },
];

export default function Page() {
  const heroRef = useRef(null);
  const shouldReduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  // GPU-only: transform + opacity only — never width/height/margin
  const yLogo = useTransform(scrollYProgress, [0, 1], [0, shouldReduce ? 0 : 72]);
  const scaleLogo = useTransform(scrollYProgress, [0, 1], [1, shouldReduce ? 1 : 0.92]);
  const opacityLogo = useTransform(scrollYProgress, [0, 1], [1, shouldReduce ? 1 : 0.45]);

  // ponytail: hero blob parallax lives in BlobParallax.jsx (mounted in layout) — single mousemove listener

  return (
    <div>
      <section
        id="home"
        ref={heroRef}
        className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden py-20"
      >
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-blobs" aria-hidden="true">
          <div className="bg-blob-purple" />
          <div className="bg-blob-teal" />
        </div>

        <motion.div
          style={
            shouldReduce ? undefined : { y: yLogo, scale: scaleLogo, opacity: opacityLogo }
          }
          className="relative z-10 flex w-full justify-center overflow-x-clip contain-paint"
        >
          <DistressedLogo text="ANDRA" className="w-[min(180vw,2160px)] shrink-0 text-[#121212]" />
        </motion.div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-10">
          <BlurText
            text="Junior DevOps & Infrastructure Automation"
            delay={0.12}
            stagger={0.07}
            className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-black/60"
          />
          <BlurText
            text="I automate the boring parts so the servers stay boring — the way infrastructure should be."
            delay={0.42}
            stagger={0.06}
            className="mt-4 max-w-xl text-lg leading-relaxed text-black/70 md:text-xl"
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <MagneticLink
              href="https://github.com/SakamotoMrX"
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
            >
              GitHub →
            </MagneticLink>
            <MagneticLink href="#projects" variant="outline">
              View Projects
            </MagneticLink>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mt-14 hidden items-center gap-2 font-mono text-[11px] tracking-widest text-black/30 md:flex"
          >
            <span className="h-6 w-px bg-black/15" />
            scroll — parallax engages on fine pointer only
          </motion.div>
        </div>
      </section>

      <section id="container-scroll-demo" className="relative">
        <HeroScrollDemo />
      </section>

      <section id="about" className="py-28 md:py-40">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
          <Reveal>
            <SectionLabel>01 — About</SectionLabel>
          </Reveal>
          <div className="mt-6">
            <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[1fr_auto]">
              <div>
                <Reveal delay={0.1}>
                  <h2 className="text-4xl font-bold leading-[1.05] md:text-6xl">
                    Linux first.<br />Automation always.
                  </h2>
                </Reveal>
                <Reveal delay={0.2}>
                  <p className="mt-4 max-w-xl text-lg text-black/70">
                    Junior DevOps from Bogor, Indonesia.{" "}
                    <strong className="font-bold text-black">15yrs old</strong>, Vocational High
                    School in boAsh, condensed into servers that stay up and deploys that don&rsquo;t
                    need babysitting.
                  </p>
                </Reveal>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                whileHover={{ scale: 1.02 }}
                className="overflow-hidden rounded-2xl border border-black/15"
              >
                <Image
                  src="/image/hero.jpg"
                  alt="Andra"
                  width={320}
                  height={420}
                  className="object-cover grayscale transition-[filter,transform] duration-700 hover:grayscale-0"
                />
              </motion.div>
            </div>
          </div>
          <div className="mt-14">
            {focusAreas.map((area, i) => (
              <Reveal key={area.title} delay={Math.min(i * 0.05, 0.18)}>
                <div className="grid grid-cols-1 gap-2 border-t border-black/10 py-6 md:grid-cols-12 md:items-baseline">
                  <span className="font-mono text-xs text-black/40 md:col-span-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-2xl font-bold md:col-span-4">{area.title}</h3>
                  <p className="text-black/60 md:col-span-6">{area.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="py-28 md:py-40">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
          <Reveal>
            <SectionLabel>02 — Projects</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 text-4xl font-bold leading-[1.05] md:text-6xl">
              Ship it, then automate it.
            </h2>
          </Reveal>
          <div className="mt-14">
            {projects.map((p, i) => {
              const cat = getCategory(p);
              return (
                <Reveal key={p.slug} delay={Math.min(i * 0.03, 0.36)}>
                  <article className="group grid grid-cols-1 gap-6 border-t border-black/10 py-10 md:grid-cols-12">
                    <span className="font-mono text-xs text-black/40 md:col-span-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="md:col-span-5">
                      {cat && (
                        <p className="font-mono text-[11px] uppercase tracking-widest text-black/40">
                          {cat}
                        </p>
                      )}
                      <h3 className="text-2xl font-bold md:text-3xl">{p.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-black/60">{p.desc[0]}</p>
                    </div>
                    <div className="md:col-span-3">
                      <p className="font-mono text-xs text-black/40">{p.year}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {p.tech.map((t) => (
                          <span
                            key={t}
                            className="border border-black/15 px-2 py-0.5 font-mono text-[11px] text-black/60"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-2 md:col-span-3 md:items-end">
                      {p.slug === "macbar-monitor" && p.code && (
                        <a
                          href={p.code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold uppercase tracking-widest underline-offset-4 transition-colors hover:underline"
                        >
                          Code →
                        </a>
                      )}
                      {p.preview && (
                        <a
                          href={p.preview}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold uppercase tracking-widest underline-offset-4 transition-colors hover:underline"
                        >
                          Preview →
                        </a>
                      )}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="system" className="py-28 md:py-40">
        <Neofetch />
      </section>

      <section id="contact" className="py-28 md:py-40">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
          <Reveal>
            <SectionLabel>04 — Contact</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href="mailto:andrahijati@gmail.com?subject=Hello%20Andra"
              className="mt-6 block break-words text-3xl font-bold leading-tight underline-offset-8 transition-colors hover:underline md:text-6xl"
            >
              andrahijati@gmail.com
            </a>
          </Reveal>
          <div className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-black/10 pt-8">
            <span className="text-xl font-bold uppercase tracking-[0.35em]">Andra</span>
            <div className="flex flex-wrap gap-x-10 gap-y-3">
              <a
                href="https://github.com/SakamotoMrX"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold uppercase tracking-widest text-black/60 transition-colors hover:text-[#121212]"
              >
                GitHub
              </a>
              <a
                href="https://www.instagram.com/andrahijati"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold uppercase tracking-widest text-black/60 transition-colors hover:text-[#121212]"
              >
                Instagram
              </a>
              <a
                href="mailto:andrahijati@gmail.com"
                className="text-xs font-semibold uppercase tracking-widest text-black/60 transition-colors hover:text-[#121212]"
              >
                Email
              </a>
            </div>
          </div>
          <Reveal delay={0.1}>
            <p className="mt-16 text-xs text-black/40">© {YEAR} Andra — built with Next.js. All rights reserved.</p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
