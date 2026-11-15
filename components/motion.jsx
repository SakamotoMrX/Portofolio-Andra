// Copyright (C) 2025 Andra (SakamotoMrX)
// moves borrowed from the reference sites; each one has a still version for reduced motion
"use client";
import { useEffect, useState } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll, useSpring, useVelocity } from "framer-motion";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const DECODE_MS = 600;

// text settles out of random glyphs, left to right (after Haoqi Design)
export function Decode({ text }) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(text);
  useEffect(() => {
    if (reduce) return setShown(text);
    const start = performance.now();
    let raf;
    const frame = (t) => {
      const settled = Math.floor(((t - start) / DECODE_MS) * text.length);
      setShown(
        [...text].map((c, i) => (i < settled || c === " " ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)])).join(""),
      );
      if (settled < text.length) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [text, reduce]);
  return (
    <span aria-label={text}>
      <span aria-hidden="true">{shown}</span>
    </span>
  );
}

// the marquee runs faster while the page is scrolled fast (after Made with GSAP)
export function useVelocityMarquee(ref) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const speed = useSpring(useVelocity(scrollY), { damping: 40, stiffness: 300 });
  useMotionValueEvent(speed, "change", (v) => {
    if (reduce || !ref.current) return;
    // playbackRate keeps the rows' position; changing animation-duration would make them jump
    const rate = 1 + Math.min(3, Math.abs(v) / 800);
    ref.current.getAnimations({ subtree: true }).forEach((a) => (a.playbackRate = rate));
  });
}
