// Copyright (C) 2025 Andra (SakamotoMrX)
// moves borrowed from the reference sites; each one has a still version for reduced motion
"use client";
import { useMotionValueEvent, useReducedMotion, useScroll, useSpring, useVelocity } from "framer-motion";

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
