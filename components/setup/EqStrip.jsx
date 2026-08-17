"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function EqStrip({ preset, source, bands }) {
  const prefersReducedMotion = useReducedMotion();

  // Static bars for reduced motion
  const animateProps = prefersReducedMotion
    ? {}
    : {
        initial: { scaleY: 0.6 },
        whileInView: { scaleY: 1 },
        viewport: { once: true },
        transition: { duration: 0.5, staggerChildren: 0.05 }
      };

  return (
    <div className="glass-static p-6 rounded-xl border border-white/10">
      <div className="mb-4">
        <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Equalizer</div>
        <div className="text-accent font-medium">{preset}</div>
        <div className="text-white/40 text-xs">{source}</div>
      </div>
      
      <div className="flex items-end justify-between gap-1 h-24">
        {bands.map((band, i) => (
          <motion.div
            key={i}
            {...animateProps}
            className="w-full bg-white/10 rounded-t-sm relative group"
            style={{ originY: 0 }}
            transition={{ delay: i * 0.02 }}>
            {/* Gain level indicator */}
            <div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-accent/60 to-accent/90 rounded-t-sm transition-all"
              style={{
                height: `${Math.max(10, 50 + band.gain * 5)}%`,
                opacity: 0.8 + Math.abs(band.gain) * 0.1
              }}
            />
            {/* Tooltip */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {band.freq}Hz: {band.gain > 0 ? '+' : ''}{band.gain}dB
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
