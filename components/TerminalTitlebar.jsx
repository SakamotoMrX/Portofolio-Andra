"use client";

import { motion } from "framer-motion";

export default function TerminalTitlebar({ label }) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
      <div className="flex items-center space-x-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
      </div>
      <div className="text-[10px] sm:text-xs text-white/40 tracking-wide font-['Helvetica Neue','Helvetica',sans-serif]">
        {label}
      </div>
      <div className="w-8" />
    </div>
  );
}
