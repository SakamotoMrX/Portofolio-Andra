"use client";

import { neofetchData } from "@/data/neofetch";

const d = neofetchData;

const ASCII_ART = `       ..'
     ,xNMM.
   .OMMMMo
   lMM"
  .;loddo:.  .olloddol;
cKMMMMMMMMMMNWMMMMMMMMMM0:
.KMMMMMMMMMMMMMMMMMMMMMMMWd.
XMMMMMMMMMMMMMMMMMMMMMMMX.
MMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMM
.MMMMMMMMMMMMMMMMMMMMMMMMX.
 kMMMMMMMMMMMMMMMMMMMMMMMMWd.
 'XMMMMMMMMMMMMMMMMMMMMMMMMMMk
  'XMMMMMMMMMMMMMMMMMMMMMMMMK.
    kMMMMMMMMMMMMMMMMMMMMMMd
     ;KMMMMMMMWXXWMMMMMMMk.
       "cooc*"    "*coo'"`;

const COLORS = [
  "#0d0d0d", "#e74c3c", "#2ecc71", "#f1c40f",
  "#3498db", "#9b59b6", "#1abc9c", "#ecf0f1",
];

function Label({ children }) {
  return (
    <span className="inline-block w-[11ch] shrink-0 text-cyan-400 font-medium">
      {children}
    </span>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex">
      <Label>{label}</Label>
      <span className="text-neutral-200">{value}</span>
    </div>
  );
}

function ContactLink({ label, href, value }) {
  return (
    <div className="flex">
      <Label>{label}</Label>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-neutral-200 underline decoration-neutral-600 underline-offset-2 transition-colors hover:text-cyan-400 hover:decoration-cyan-400/40"
      >
        {value}
      </a>
    </div>
  );
}

export default function Neofetch() {
  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="mb-8 px-1">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50">
          03 — System
        </p>
        <h2 className="mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">
          The machine behind the work.
        </h2>
      </div>

      {/* Terminal Window */}
      <div className="rounded-2xl border border-neutral-800/80 bg-neutral-950/80 backdrop-blur-md shadow-2xl overflow-hidden">
        {/* Title Bar */}
        <div className="flex items-center justify-between border-b border-neutral-800/60 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56] shadow-[0_0_6px_rgba(255,95,86,0.4)]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e] shadow-[0_0_6px_rgba(255,189,46,0.4)]" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f] shadow-[0_0_6px_rgba(39,201,63,0.4)]" />
          </div>
          <span className="font-mono text-xs text-neutral-500">
            andra@SakamotoMrX: ~
          </span>
          <div className="w-12" />
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Left: ASCII Logo (40%) */}
          <div className="md:col-span-5 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-neutral-800/40 p-6 md:p-8">
            <pre className="font-mono text-[10px] sm:text-xs leading-tight text-cyan-400 select-none">
              {ASCII_ART}
            </pre>
            <p className="mt-4 font-mono text-[10px] text-neutral-600 uppercase tracking-widest">
              MacBook Air (M1, 2020)
            </p>
          </div>

          {/* Right: Specs (60%) */}
          <div className="md:col-span-7 p-6 md:p-8 font-mono text-xs sm:text-sm leading-relaxed">
            {/* User */}
            <div className="mb-3">
              <span className="text-violet-400 font-bold">{d.user}</span>
              <span className="text-neutral-500">@</span>
              <span className="text-violet-400 font-bold">{d.host}</span>
            </div>

            {/* System */}
            <Row label="OS" value={d.os} />
            <Row label="Host" value={d.location} />
            <Row label="Uptime" value={d.uptime} />
            <Row label="Shell" value={d.shell} />
            <Row label="IDE" value={d.ide.join(", ")} />

            <div className="my-3 border-t border-neutral-800/40" />

            <Row label="Languages.Scripting" value={d.languages.scripting.join(", ")} />
            <Row label="Languages.Human" value={d.languages.human.join(", ")} />

            <div className="my-3 border-t border-neutral-800/40" />

            <Row label="Skills.System" value={d.skills.system.join(", ")} />
            <Row label="Skills.WebDev" value={d.skills.webdev.join(", ")} />
            <Row label="Skills.Process" value={d.skills.process.join(", ")} />

            <div className="my-3 border-t border-neutral-800/40" />

            <Row label="Hobbies" value={d.hobbies.join(" \u00b7 ")} />

            <div className="my-3 border-t border-neutral-800/40" />

            <ContactLink label="Contact.Email" href={`mailto:${d.contact.email}`} value={d.contact.email} />
            <ContactLink label="Contact.Discord" href="#" value={d.contact.discord} />
            <ContactLink label="Contact.Instagram" href={`https://instagram.com/${d.contact.instagram.replace("@", "")}`} value={d.contact.instagram} />
            <ContactLink label="Contact.Facebook" href={`https://facebook.com/${d.contact.facebook}`} value={d.contact.facebook} />

            {/* Color Palette */}
            <div className="mt-4 flex gap-1">
              {COLORS.map((c) => (
                <div
                  key={c}
                  className="h-4 w-full first:rounded-l last:rounded-r"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
