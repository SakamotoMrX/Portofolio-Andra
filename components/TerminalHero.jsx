"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/Button";
import TerminalTitlebar from "./TerminalTitlebar";
import RepoRow from "./RepoRow";
import Reveal from "./Reveal";

export default function TerminalHero({ repos, os, wm, editor }) {
  const prefersReducedMotion = useReducedMotion();
  
  // Terminal lines data
  const lines = [
    { type: "prompt", text: `$ whoami`, output: <span>{os.user}@{os.host}</span> },
    { type: "prompt", text: `$ echo $EDITOR`, output: <span className="font-mono">{editor}</span> },
    { type: "prompt", text: `$ cat /etc/os-release`, output: (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-accent font-mono">PRETTY_NAME</span>
          <span className="text-white/70">&ldquo;{os.distro}&rdquo;</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-accent font-mono">WINDOW_MANAGER</span>
          <span className="text-white/70">{wm}</span>
        </div>
        <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-white/60">
          ARCH
        </div>
      </div>
    )},
    { type: "prompt", text: `$ gh repo list`, output: (
      <div className="flex flex-col gap-1">
        {repos.map((repo, i) => (
          <RepoRow
            key={i}
            name={repo.name}
            desc={repo.desc}
            url={repo.url}
            lang={repo.lang}
            stars={repo.stars}
          />
        ))}
      </div>
    )}
  ];

  const [activeLine, setActiveLine] = useState(0);
  
  // Auto-scroll to latest line
  const linesContainerRef = useRef(null);
  useEffect(() => {
    if (linesContainerRef.current) {
      linesContainerRef.current.scrollTop = linesContainerRef.current.scrollHeight;
    }
  }, [activeLine, lines]);

  // Typewriter effect
  const [typedLines, setTypedLines] = useState([]);
  
  useEffect(() => {
    if (prefersReducedMotion) {
      // Render all lines static
      setTypedLines(lines.map(line => ({
        ...line,
        outputVisible: true
      })));
      return;
    }

    let timeoutId;
    let currentLineIndex = 0;
    const startTime = Date.now();

    const showLine = (index) => {
      if (index >= lines.length) return;

      const line = lines[index];
      const typingDelay = index === 0 ? 500 : 400 + (index * 300);
      const outputDelay = typingDelay + (line.type === "prompt" ? 800 : 600);

      // Show prompt
      timeoutId = setTimeout(() => {
        setTypedLines(prev => [...prev, { ...line, outputVisible: false }]);
        setActiveLine(index);

        // Show output
        timeoutId = setTimeout(() => {
          setTypedLines(prev => {
            const newLines = [...prev];
            newLines[index] = { ...line, outputVisible: true };
            return newLines;
          });
          setActiveLine(index + 1);
          showLine(index + 1);
        }, outputDelay);
      }, currentLineIndex === 0 ? 0 : 500);

      currentLineIndex++;
    };

    showLine(0);

    return () => clearTimeout(timeoutId);
  }, [lines, prefersReducedMotion]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 w-full max-w-screen-2xl p-6 md:p-10">
      {/* Left: Heading + Copy + CTAs */}
      <Reveal className="col-span-1 md:col-span-5 flex flex-col justify-center">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="uppercase text-base sm:text-xl mb-2 font-normal tracking-[0.3rem] md:tracking-[0.5rem] text-teal-400/70">
          Andra (SakamotoMrX)
        </motion.h3>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-6xl 2xl:text-8xl font-bold my-2 md:my-5">
          <span className="inline-block text-accent">Junior DevOps</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm sm:text-md 2xl:text-xl mt-4 tracking-wider leading-[1.6rem] md:leading-[1.7rem] max-w-2xl text-white/55">
          Linux SysAdmin, containerization, and hardware tinkering — Bogor, Indonesia.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="buttons flex flex-row justify-start items-center space-x-4 mt-8 md:mt-10">
          <Button variation="primary" href="/about">About Me</Button>
          <Button variation="secondary" href="#contact">Contact Me</Button>
        </motion.div>
      </Reveal>

      {/* Right: Terminal Window */}
      <Reveal className="col-span-1 md:col-span-7">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-static scanline rounded-xl overflow-hidden shadow-2xl">
          <TerminalTitlebar label="zsh — andra@SakamotoMrX" />
          
          <div
            ref={linesContainerRef}
            className="max-h-[60vh] overflow-y-auto p-4 sm:p-6"
            style={{ scrollbarWidth: "thin", scrollbarColor: "var(--accent) transparent" }}>
            <div className="flex flex-col gap-4 font-['Helvetica Neue','Helvetica',sans-serif]">
              {typedLines.map((line, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-2">
                  <span className="text-accent font-mono whitespace-nowrap">
                    {line.type === "prompt" && line.text}
                  </span>
                  <span className="text-white/80">
                    {line.outputVisible && line.output}
                  </span>
                </div>
              ))}
              
              {/* Blinking cursor */}
              <div className="flex items-center gap-2 text-accent font-mono mt-2">
                <span>$</span>
                <span className="terminal-cursor" />
              </div>
            </div>
          </div>
        </motion.div>
      </Reveal>
    </div>
  );
}
