"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function EqBar({ bars = 3, color = "#14b8a6", height = 32 }) {
  const prefersReducedMotion = useReducedMotion();

  const animateProps = prefersReducedMotion
    ? {}
    : {
        initial: { scaleY: 0.6 },
        animate: { scaleY: [0.6, 1, 0.7, 0.9, 0.5] },
        transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
      };

  return (
    <div className="flex items-end justify-between gap-1 h-8 sm:h-10">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          {...animateProps}
          style={{ delay: i * -2 }}
          className="w-1.5 sm:w-2 bg-white/80 rounded-full origin-bottom transition-transform"
        />
      ))}
    </div>
  );
}
