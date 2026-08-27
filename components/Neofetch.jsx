"use client";
import { motion } from "framer-motion";

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.25 },
  },
};

const blockVariants = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const lineVariants = {
  hidden: { opacity: 0 },
  visible: (i) => ({
    opacity: 1,
    transition: { delay: i * 0.04, duration: 0.35, ease: "easeOut" },
  }),
};

export default function Neofetch() {
  return (
    <div className="w-full max-w-5xl mx-auto px-6 md:px-10">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
        03 — System
      </p>
      <h2 className="mt-4 text-4xl font-bold leading-[1.05] text-black md:text-6xl">
        The machine behind the work.
      </h2>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={gridVariants}
        className="scanline glass-static mt-16 overflow-hidden rounded-[20px] border border-black/10 bg-[rgba(18,18,18,0.02)] p-6 md:p-10"
      >
        <div className="mb-8 flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57] opacity-80" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e] opacity-80" />
          <span className="h-3 w-3 rounded-full bg-[#28c941] opacity-80" />
          <span className="ml-3 font-mono text-[11px] tracking-widest text-black/40">
            andra@sakamotormrx — zsh — 80×24
          </span>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:gap-x-16 md:gap-y-10">
          <div className="space-y-8">
            <Block label="Identity" lines={["andra@SakamotoMrX", "MacBook Air (M1, 2020)"]} />
            <Block label="Location" lines={["Bogor, Indonesia"]} />
            <Block label="Environment" lines={["OS — Linux / macOS / Windows", "Shell — zsh / bash"]} />
          </div>
          <div className="space-y-8">
            <Block label="Stack" lines={["Next.js, Git, Vercel, Docker", "Prometheus, Grafana, Bash, YAML"]} />
            <Block
              label="Skills"
              lines={[
                "Linux SysAdmin, Virtual Machines",
                "SDLC & Agile",
                "Arduino & Hardware",
                "Networking, Kubernetes",
                "Agentic AI Power User",
              ]}
            />
          </div>
        </div>

        <motion.p
          variants={blockVariants}
          className="mt-10 font-mono text-xs text-black/45"
        >
          <span className="text-[#b08968]">➜</span> ./deploy --prod --boring
          <span className="terminal-cursor ml-1 align-middle" />
        </motion.p>
      </motion.div>
    </div>
  );
}

function Block({ label, lines }) {
  return (
    <motion.div variants={blockVariants}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-2">
        {label}
      </p>
      <div className="space-y-0.5">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            custom={i}
            variants={lineVariants}
            className="font-mono text-sm text-black md:text-[15px]"
          >
            {line}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
}
