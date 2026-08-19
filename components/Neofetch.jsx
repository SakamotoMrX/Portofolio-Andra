"use client";

export default function Neofetch() {
  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Section Header */}
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
        03 — System
      </p>
      <h2 className="mt-4 text-4xl font-bold leading-[1.05] text-black md:text-6xl">
        The machine behind the work.
      </h2>

      {/* Typographic Grid */}
      <div className="mt-16 grid grid-cols-1 gap-x-16 gap-y-10 md:grid-cols-2">
        <div className="space-y-8">
          <Block
            label="Identity"
            lines={["andra@SakamotoMrX", "MacBook Air (M1, 2020)"]}
          />
          <Block
            label="Location"
            lines={["Bogor, Indonesia"]}
          />
          <Block
            label="Environment"
            lines={["OS — Linux / macOS / Windows", "Shell — zsh / bash"]}
          />
          <Block
            label="Tooling"
            lines={["Neovim, Antigravity IDE, Vim, Lazygit"]}
          />
        </div>

        <div className="space-y-8">
          <Block
            label="Stack"
            lines={["Next.js, Git, Vercel, Docker", "Bash, YAML"]}
          />
          <Block
            label="Skills"
            lines={[
              "Linux SysAdmin, Virtual Machines",
              "SDLC & Agile",
              "Arduino & Hardware",
            ]}
          />
        </div>
      </div>
    </div>
  );
}

function Block({ label, lines }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-2">
        {label}
      </p>
      <div className="space-y-0.5">
        {lines.map((line, i) => (
          <p key={i} className="text-base text-black md:text-lg">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
