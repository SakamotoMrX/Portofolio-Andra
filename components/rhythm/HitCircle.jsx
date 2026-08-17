"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function HitCircle({ radius = 64, onHit }) {
  const prefersReducedMotion = useReducedMotion();

  // Animation states
  const approachRing = prefersReducedMotion
    ? {}
    : {
        initial: { scale: 1.55, opacity: 0.9 },
        animate: { scale: 1, opacity: 0 },
        transition: { duration: 0.35, ease: "easeOut" }
      };

  const hitCircle = prefersReducedMotion
    ? {}
    : {
        initial: { scale: 1 },
        animate: { scale: [1, 1.12, 1] },
        transition: { duration: 0.12, repeat: Infinity }
      };

  const ripple = prefersReducedMotion
    ? {}
    : {
        initial: { scale: 0.8, opacity: 0.35 },
        animate: { scale: 1.6, opacity: 0 },
        transition: { duration: 0.5, ease: "easeOut" }
      };

  return (
    <div className="relative flex items-center justify-center">
      {/* Approach ring */}
      <motion.div
        className="absolute border-2 border-accent rounded-full pointer-events-none"
        style={{ width: radius * 3.1, height: radius * 3.1 }}
        {...approachRing}
      />
      
      {/* Hit circle */}
      <a
        href="#"
        aria-label="Osu! hit circle - click to hit"
        className="relative z-10 w-[64px] h-[64px] rounded-full bg-white/10 border-4 border-white/20 flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-accent"
        onClick={(e) => {
          e.preventDefault();
          if (onHit) onHit();
        }}>
        <motion.div
          className="absolute inset-0 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors"
          {...hitCircle}
        />
        
        {/* Ripple effect on hit */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          {...ripple}
        />
        
        {/* Center dot */}
        <div className="w-2 h-2 bg-accent rounded-full z-20" />
      </a>
    </div>
  );
}
