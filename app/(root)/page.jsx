// Copyright (C) 2025 Andra (SakamotoMrX)
"use client";
import Image from "next/image";
import { motion } from "framer-motion";

import DistressedLogo from "@/components/DistressedLogo";
import Neofetch from "@/components/Neofetch";
import data from "@/json/data.json";

const projects = data.Projects.filter((p) => p.show);

/* Section entrance — fade/slide on first view, once */
function Reveal({ children, className = "", delay = 0 }) {
	return (
		<motion.div
			className={className}
			initial={{ opacity: 0, y: 24 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.15 }}
			transition={{ duration: 0.6, ease: "easeOut", delay }}
		>
			{children}
		</motion.div>
	);
}

function SectionLabel({ children }) {
	return (
		<p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50">{children}</p>
	);
}

const focusAreas = [
	{
		title: "Linux",
		desc: "SysAdmin, hardening, and servers that stay up without ceremony.",
	},
	{
		title: "Docker",
		desc: "Container workflows for repeatable, portable deployments.",
	},
	{
		title: "Automation",
		desc: "Bash, YAML, and tooling that turn ten steps into one command.",
	},
	{
		title: "Cloud tooling",
		desc: "VMs, Vercel deploys, and infrastructure that ships itself.",
	},
];

const HAS_REAL_IMAGE = (thumb) =>
	Boolean(thumb) &&
	thumb !== "/image/projects-showcase.jpg" &&
	thumb !== "/image/projects-showcase-home.png";

export default function Page() {
	return (
		<div>
			{/* Hero */}
			<section id="home" className="flex min-h-screen items-center">
				<div className="mx-auto w-full max-w-6xl px-6 pt-24 md:px-10">
					<Reveal className="flex w-full justify-center">
						<DistressedLogo
							text="ANDRA"
							className="h-auto w-[min(96vw,1920px)] text-[#121212]"
						/>
					</Reveal>
					<Reveal delay={0.1}>
						<p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-black/60">
							Junior DevOps &amp; Infrastructure Automation
						</p>
					</Reveal>
					<Reveal delay={0.2}>
						<p className="mt-4 max-w-xl text-lg text-black/70 md:text-xl">
							I automate the boring parts so the servers stay boring — the way
							infrastructure should be.
						</p>
					</Reveal>
					<Reveal delay={0.3}>
						<div className="mt-10 flex flex-wrap gap-4">
							<a
								href="https://github.com/SakamotoMrX"
								target="_blank"
								rel="noopener noreferrer"
								className="bg-[#121212] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-[#f6f5f0] transition-colors hover:bg-black/80"
							>
								GitHub
							</a>
							<a
								href="#projects"
								className="border border-black/20 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-[#121212] transition-colors hover:border-black"
							>
								View Projects
							</a>
						</div>
					</Reveal>
				</div>
			</section>

			{/* About */}
			<section id="about" className="py-28 md:py-40">
				<div className="mx-auto w-full max-w-6xl px-6 md:px-10">
					<Reveal>
						<SectionLabel>01 — About</SectionLabel>
					</Reveal>
					<Reveal delay={0.1}>
						<h2 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.05] md:text-6xl">
							Linux first. Automation always.
						</h2>
					</Reveal>
					<Reveal delay={0.2}>
						<p className="mt-6 max-w-xl text-lg text-black/70">
							Junior DevOps from Bogor, Indonesia. Fifteen years of tinkering,
							condensed into servers that stay up and deploys that don&rsquo;t
							need babysitting.
						</p>
					</Reveal>
					<div className="mt-14">
						{focusAreas.map((area, i) => (
							<Reveal key={area.title} delay={i * 0.05}>
								<div className="grid grid-cols-1 gap-2 border-t border-black/10 py-6 md:grid-cols-12 md:items-baseline">
									<span className="font-mono text-xs text-black/40 md:col-span-2">
										{String(i + 1).padStart(2, "0")}
									</span>
									<h3 className="text-2xl font-bold md:col-span-4">{area.title}</h3>
									<p className="text-black/60 md:col-span-6">{area.desc}</p>
								</div>
							</Reveal>
						))}
					</div>
				</div>
			</section>

			{/* Projects */}
			<section id="projects" className="py-28 md:py-40">
				<div className="mx-auto w-full max-w-6xl px-6 md:px-10">
					<Reveal>
						<SectionLabel>02 — Projects</SectionLabel>
					</Reveal>
					<Reveal delay={0.1}>
						<h2 className="mt-6 text-4xl font-bold leading-[1.05] md:text-6xl">
							Ship it, then automate it.
						</h2>
					</Reveal>
					<div className="mt-14">
						{projects.map((p, i) => (
							<Reveal key={p.slug} delay={i * 0.04}>
								<article className="grid grid-cols-1 gap-6 border-t border-black/10 py-10 md:grid-cols-12">
									<span className="font-mono text-xs text-black/40 md:col-span-1">
										{String(i + 1).padStart(2, "0")}
									</span>
									<div className="md:col-span-5">
										<h3 className="text-2xl font-bold md:text-3xl">{p.title}</h3>
										<p className="mt-3 text-sm leading-relaxed text-black/60">
											{p.desc[0]}
										</p>
									</div>
									<div className="md:col-span-3">
										<p className="font-mono text-xs text-black/40">{p.year}</p>
										<div className="mt-3 flex flex-wrap gap-2">
											{p.tech.map((t) => (
												<span
													key={t}
													className="border border-black/15 px-2 py-0.5 font-mono text-[11px] text-black/60"
												>
													{t}
												</span>
											))}
										</div>
									</div>
									<div className="flex flex-col items-start gap-2 md:col-span-3 md:items-end">
										{p.code && (
											<a
												href={p.code}
												target="_blank"
												rel="noopener noreferrer"
												className="text-xs font-semibold uppercase tracking-widest underline-offset-4 transition-colors hover:underline"
											>
												Code →
											</a>
										)}
										{p.preview && (
											<a
												href={p.preview}
												target="_blank"
												rel="noopener noreferrer"
												className="text-xs font-semibold uppercase tracking-widest underline-offset-4 transition-colors hover:underline"
											>
												Preview →
											</a>
										)}
										{HAS_REAL_IMAGE(p.thumbnail) && (
											<Image
												src={p.thumbnail}
												alt={p.title}
												width={640}
												height={400}
												className="mt-4 w-full max-w-[420px] border border-black/10 object-cover"
											/>
										)}
									</div>
								</article>
							</Reveal>
						))}
					</div>
				</div>
			</section>

			{/* System / Neofetch */}
			<section id="system" className="py-28 md:py-40">
				<div className="mx-auto w-full max-w-6xl px-6 md:px-10">
					<Reveal>
						<SectionLabel>03 — System</SectionLabel>
					</Reveal>
					<Reveal delay={0.1}>
						<h2 className="mt-6 text-4xl font-bold leading-[1.05] md:text-6xl">
							The machine behind the work.
						</h2>
					</Reveal>
					<Reveal delay={0.2}>
						<Neofetch />
					</Reveal>
				</div>
			</section>

			{/* Contact / Footer */}
			<section id="contact" className="py-28 md:py-40">
				<div className="mx-auto w-full max-w-6xl px-6 md:px-10">
					<Reveal>
						<SectionLabel>04 — Contact</SectionLabel>
					</Reveal>
					<Reveal delay={0.1}>
						<a
							href="mailto:andrahijati@gmail.com?subject=Hello%20Andra"
							className="mt-6 block break-words text-3xl font-bold leading-tight underline-offset-8 transition-colors hover:underline md:text-6xl"
						>
							andrahijati@gmail.com
						</a>
					</Reveal>
					<div className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-black/10 pt-8">
						<span className="text-xl font-bold uppercase tracking-[0.35em]">Andra</span>
						<div className="flex flex-wrap gap-x-10 gap-y-3">
							<a
								href="https://github.com/SakamotoMrX"
								target="_blank"
								rel="noopener noreferrer"
								className="text-xs font-semibold uppercase tracking-widest text-black/60 transition-colors hover:text-[#121212]"
							>
								GitHub
							</a>
							<a
								href="https://www.instagram.com/andrahijati"
								target="_blank"
								rel="noopener noreferrer"
								className="text-xs font-semibold uppercase tracking-widest text-black/60 transition-colors hover:text-[#121212]"
							>
								Instagram
							</a>
							<a
								href="mailto:andrahijati@gmail.com"
								className="text-xs font-semibold uppercase tracking-widest text-black/60 transition-colors hover:text-[#121212]"
							>
								Email
							</a>
						</div>
					</div>
					<Reveal delay={0.1}>
						<p className="mt-16 text-xs text-black/40">
							© {new Date().getFullYear()} Andra — built with Next.js. All rights
							reserved.
						</p>
					</Reveal>
				</div>
			</section>
		</div>
	);
}