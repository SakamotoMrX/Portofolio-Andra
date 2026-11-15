// Copyright (C) 2025 Andra (SakamotoMrX)
// moves borrowed from the reference sites; each one has a still version for reduced motion
"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";

const EASE = [0.23, 1, 0.32, 1];

// the reduced-motion preference, read only after mount so the server and the first client render agree
export function useCalm() {
  const pref = useReducedMotion();
  const [calm, setCalm] = useState(false);
  useEffect(() => setCalm(!!pref), [pref]);
  return calm;
}

// the marquee runs faster while the page is scrolled fast (after Made with GSAP)
export function useVelocityMarquee(ref) {
  const reduce = useCalm();
  const { scrollY } = useScroll();
  const speed = useSpring(useVelocity(scrollY), { damping: 40, stiffness: 300 });
  useMotionValueEvent(speed, "change", (v) => {
    if (reduce || !ref.current) return;
    // playbackRate keeps the rows' position; changing animation-duration would make them jump
    const rate = 1 + Math.min(3, Math.abs(v) / 800);
    ref.current.getAnimations({ subtree: true }).forEach((a) => (a.playbackRate = rate));
  });
}

// cards lean into a fast scroll and straighten when it stops (after Jesper Landberg)
export function useSkew(max = 6) {
  const reduce = useCalm();
  const { scrollY } = useScroll();
  const v = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const skew = useTransform(v, [-2500, 0, 2500], [max, 0, -max], { clamp: true });
  return reduce ? 0 : skew;
}

// a one-line headline split at the comma, each half sliding in from its own edge (after Made with GSAP)
export function SplitTitle({ left, right, delay = 0 }) {
  const from = (x) => ({ opacity: 0, x });
  const go = { opacity: 1, x: 0 };
  return (
    <h1 className="split" aria-label={`${left} ${right}`}>
      <motion.span aria-hidden="true" data-reveal initial={from("-18vw")} animate={go} transition={{ duration: 1.1, ease: EASE, delay }}>
        {left}
      </motion.span>{" "}
      <motion.span aria-hidden="true" data-reveal initial={from("18vw")} animate={go} transition={{ duration: 1.1, ease: EASE, delay: delay + 0.08 }}>
        {right}
      </motion.span>
    </h1>
  );
}

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const DECODE_MS = 700;

// a heading settles out of random glyphs, left to right, the first time it is seen (after Haoqi Design)
export function Decode({ text, as: Tag = "h2", ...rest }) {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useCalm();
  const [shown, setShown] = useState(text);
  useEffect(() => {
    if (!seen || reduce) return;
    const start = performance.now();
    let raf;
    const frame = (t) => {
      const settled = Math.floor(((t - start) / DECODE_MS) * text.length);
      setShown([...text].map((c, i) => (i < settled || c === " " ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)])).join(""));
      if (settled < text.length) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [seen, reduce, text]);
  return (
    <Tag ref={ref} {...rest}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{shown}</span>
    </Tag>
  );
}

// a statement fills from grey to full ink word by word as it crosses the screen (after White Desert, ERA Residence)
export function InkFill({ text, className }) {
  const ref = useRef(null);
  const reduce = useCalm();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} p={scrollYProgress} at={i / words.length} still={reduce}>
          {w}
        </Word>
      ))}
    </p>
  );
}
function Word({ p, at, still, children }) {
  const opacity = useTransform(p, [at, at + 0.15], [0.2, 1]);
  return (
    <>
      <motion.span style={still ? undefined : { opacity }}>{children}</motion.span>{" "}
    </>
  );
}

// a control leans a little towards the pointer and springs back when it leaves (after Haoqi Design)
export function Magnet({ children, strength = 0.3 }) {
  const reduce = useCalm();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16 });
  const sy = useSpring(y, { stiffness: 220, damping: 16 });
  if (reduce) return children;
  const move = (e) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  };
  const leave = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.span className="magnet" style={{ x: sx, y: sy }} onPointerMove={move} onPointerLeave={leave}>
      {children}
    </motion.span>
  );
}

// each digit rolls up a column of 0-9 to its value the first time it is seen (after Paul Kalkbrenner, Revelatio)
// the column is drawn by CSS, so the page text stays the plain figure; the server renders the final value
export function Roll({ to }) {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useCalm();
  const [armed, setArmed] = useState(false);
  useEffect(() => setArmed(!reduce), [reduce]);
  return (
    <span ref={ref} className="roll" aria-label={String(to)}>
      {String(to)
        .split("")
        .map((d, i) => {
          const ready = armed && !seen;
          return (
            <span key={i} className="col" aria-hidden="true">
              <motion.span
                initial={false}
                animate={{ y: ready ? "0em" : `${-Number(d)}em` }}
                transition={ready ? { duration: 0 } : { duration: 1.2, ease: EASE, delay: i * 0.08 }}
              />
            </span>
          );
        })}
    </span>
  );
}
