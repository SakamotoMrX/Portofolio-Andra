// Copyright (C) 2025 Andra (SakamotoMrX)
"use client";
import { forwardRef, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

import Button from "@/components/Button";
import Me from "@/public/image/hero.jpg";
import MeAbout from "@/public/image/about-1.jpg";
import Setup from "@/public/image/setup.jpg";
import ProjectAll from "@/public/image/projects-showcase-home.png";
import Hr from "@/components/Hr";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faInstagram, faFacebook, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faServer, faCubes, faRobot } from "@fortawesome/free-solid-svg-icons";

const Section = forwardRef(({ id, children }, ref) => (
	<section id={id} ref={ref} className="section">{children}</section>
));
Section.displayName = "Section";

const socialLinks = [
	{ icon: faEnvelope, href: "mailto:andrahijati@gmail.com?subject=Hello%20Andra", label: "Send email" },
	{ icon: faGithub, href: "https://github.com/SakamotoMrX", label: "GitHub profile" },
	{ icon: faInstagram, href: "https://www.instagram.com/andrahijati", label: "Instagram profile" },
	{ icon: faFacebook, href: "https://web.facebook.com/andra.nugroho.921", label: "Facebook profile" },
	{ icon: faDiscord, href: "https://discord.com/users/legacyy5030", label: "Discord profile" },
];

/* Section entrance — children stagger in place of manual delay chains */
const sectionVariants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.08, delayChildren: 0.18 } },
};

const fadeUp = {
	hidden: { opacity: 0, y: 30 },
	visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

/* Hero title — character-by-character reveal */
const HERO_TITLE = "Junior DevOps";
const charContainer = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.03 } },
};
const charFade = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

/* Contact icons — softer spring, staggered */
const iconsContainer = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};
const iconFade = {
	hidden: { opacity: 0, y: 30 },
	visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
};

/* Projects screenshot — wipe reveal. Driven by the section container's
   variant state (a clip-path element reports no intersection to
   IntersectionObserver, so it can't own a whileInView trigger) */
const clipReveal = {
	hidden: { clipPath: "inset(0 100% 0 0)" },
	visible: { clipPath: "inset(0 0% 0 0)", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const MyPage = () => {
	const prefersReducedMotion = useReducedMotion();

	/* Scroll targets for parallax (3 useScroll instances total) */
	const heroRef = useRef(null);
	const aboutRef = useRef(null);
	const projectsRef = useRef(null);

	const heroScroll = useScroll({ target: heroRef, offset: ["start end", "end start"] });
	const avatarY = useTransform(heroScroll.scrollYProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["10%", "-10%"]);

	const aboutScroll = useScroll({ target: aboutRef, offset: ["start end", "end start"] });
	const aboutY = useTransform(aboutScroll.scrollYProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["8%", "-8%"]);

	const projectsScroll = useScroll({ target: projectsRef, offset: ["start end", "end start"] });
	const projectsY = useTransform(projectsScroll.scrollYProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["8%", "-8%"]);

	useEffect(() => {
		document.documentElement.classList.add("home-snap");
		return () => document.documentElement.classList.remove("home-snap");
	}, []);

	return (
		<div>
			{/* Section 1: Hero */}
			<Section id="home" ref={heroRef}>
				<motion.div
					className="mx-auto w-[88%] md:w-[82%] max-w-screen-2xl grid grid-cols-1 md:grid-cols-3 gap-4 p-6 md:p-10 overflow-hidden relative z-20"
					variants={sectionVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ amount: 0.2 }}>
					<div className="col-span-2 flex flex-col justify-center items-center md:items-start text-center md:text-start">
						{/* Mobile avatar */}
						<div className="block md:hidden col-span-1 mx-auto mb-8 mt-6">
							<div className="glass-static rounded-full h-52 w-52 sm:h-64 sm:w-64 overflow-hidden shadow-xl">
								<Image src={Me} width={600} height={600} className="rounded-full w-full h-full object-cover" alt="Andra" />
							</div>
						</div>
						<motion.h3
							variants={fadeUp}
							className="uppercase text-base sm:text-xl mb-2 font-normal tracking-[.3rem] md:tracking-[.5rem] text-teal-400/70">
							Andra (SakamotoMrX)
						</motion.h3>
						<motion.h1
							variants={charContainer}
							aria-label={HERO_TITLE}
							className="text-3xl sm:text-4xl md:text-6xl lg:text-6xl 2xl:text-8xl font-bold my-2 md:my-5">
							{HERO_TITLE.split("").map((ch, i) => (
								<motion.span key={i} variants={charFade} aria-hidden="true" className="inline-block">
									{ch === " " ? "\u00A0" : ch}
								</motion.span>
							))}
						</motion.h1>
						<motion.p
							variants={fadeUp}
							className="title text-sm sm:text-md 2xl:text-xl mt-4 tracking-wider leading-[1.6rem] md:leading-[1.7rem] max-w-2xl"
							style={{ color: "var(--text-secondary)" }}>
							Hi! I&rsquo;m Andra, a Junior DevOps based in Bogor, Indonesia with over 15 years 5 months of hands-on technology exploration. Specialized in Linux SysAdmin, Virtual Machines, Containerization, Bash scripting, and open-source systems.
						</motion.p>
						<motion.div variants={fadeUp} className="buttons flex flex-row justify-center items-center space-x-4 mt-8 md:mt-10 z-30 relative">
							<Button variation="primary" href="/about">About Me</Button>
							<Button variation="secondary" href="#contact">Contact Me</Button>
						</motion.div>
					</div>
					{/* Desktop avatar with parallax */}
					<motion.div
						className="hidden md:flex col-span-1 mx-auto justify-center items-center"
						style={{ y: avatarY }}
						initial={{ x: 100, opacity: 0 }}
						whileInView={{ x: 0, opacity: 1 }}
						viewport={{ amount: 0.2 }}
						transition={{ type: "spring", stiffness: 200, damping: 24, delay: 0.35 }}>
						<div className="relative w-[36vw] max-w-[420px] h-auto">
							<div className="glass-static rounded-full aspect-square shadow-2xl flex items-center justify-center p-3 border-2 border-white/15">
								<div className="rounded-full w-full h-full overflow-hidden relative">
									<Image src={Me} width={600} height={750} alt="Andra" className="w-full h-full object-cover" priority />
									<div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/25 via-transparent to-blue-400/25" />
								</div>
							</div>
				</div>
				</motion.div>
				</motion.div>
			</Section>

			{/* Section 2: About Overview */}
			<Section id="about" ref={aboutRef}>
				<motion.div
					className="mx-auto w-[88%] md:w-[82%] max-w-screen-2xl grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 p-6 md:p-10 overflow-hidden relative z-20 items-center"
					variants={sectionVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ amount: 0.2 }}>
					<div className="col-span-2 flex flex-col justify-center items-center md:items-start text-center md:text-start">
						<motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-8xl font-bold">
							About Me
						</motion.h1>
						<Hr />
						<motion.p
							variants={fadeUp}
							className="title text-base sm:text-xl mt-4 tracking-wider leading-[1.6rem] md:leading-[1.7rem] mb-5 max-w-2xl"
							style={{ color: "var(--text-secondary)" }}>
							Linux SysAdmin, Containerization, and hardware tinkering (Arduino). Check out my Fastfetch specs.
						</motion.p>
						<motion.div variants={fadeUp}>
							<Button variation="primary" href="/about">Learn More & Fastfetch</Button>
						</motion.div>
						<motion.h2 variants={fadeUp} className="text-base sm:text-lg font-bold uppercase tracking-[.3rem] text-teal-400 mt-10 mb-5">What I Do</motion.h2>
						<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
							<motion.div variants={fadeUp} className="glass p-5 sm:p-6 h-full">
								<FontAwesomeIcon icon={faServer} className="text-3xl text-teal-400 mb-3" />
								<h3 className="font-bold text-white text-base sm:text-lg mb-2">Linux SysAdmin</h3>
								<p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>Server administration, hardening, and everyday Linux operations, done right.</p>
							</motion.div>
							<motion.div variants={fadeUp} className="glass p-5 sm:p-6 h-full">
								<FontAwesomeIcon icon={faCubes} className="text-3xl text-teal-400 mb-3" />
								<h3 className="font-bold text-white text-base sm:text-lg mb-2">Containerization</h3>
								<p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>Docker packaging and container workflows for repeatable deployments.</p>
							</motion.div>
							<motion.div variants={fadeUp} className="glass p-5 sm:p-6 h-full">
								<FontAwesomeIcon icon={faRobot} className="text-3xl text-teal-400 mb-3" />
								<h3 className="font-bold text-white text-base sm:text-lg mb-2">Automation</h3>
								<p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>Bash scripts and tooling that turn repetitive chores into one command.</p>
							</motion.div>
						</div>
					</div>
					<div className="col-span-1 flex justify-center items-center mt-4 md:mt-0">
						<motion.div
							className="relative glass-static rounded-2xl overflow-hidden h-[300px] sm:h-[340px] md:h-[520px] w-full max-w-[400px] md:max-w-[500px] shadow-2xl"
							initial={{ x: 100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							viewport={{ amount: 0.2 }}
							transition={{ type: "spring", stiffness: 200, damping: 24, delay: 0.2 }}>
							{/* Parallax image — 120% tall, keeps frame covered while drifting */}
							<motion.div style={{ y: aboutY }} className="absolute inset-x-0 -inset-y-[10%]">
								<Image src={MeAbout} fill sizes="(max-width: 768px) 80vw, 30vw" className="object-cover" alt="Andra DevOps" priority />
							</motion.div>
						</motion.div>
					</div>
				</motion.div>
			</Section>

			{/* Section 3: Projects Preview */}
			<Section id="projects" ref={projectsRef}>
				<motion.div
					className="mx-auto w-[88%] md:w-[82%] max-w-screen-2xl grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 p-6 md:p-10 overflow-hidden relative z-20 items-center"
					variants={sectionVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ amount: 0.2 }}>
					<div className="col-span-2 flex flex-col justify-center items-center md:items-start text-center md:text-start">
						<motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-8xl font-bold my-2 md:my-5">
							My Projects
						</motion.h1>
						<Hr />
						<motion.p
							variants={fadeUp}
							className="title text-base sm:text-xl mt-4 tracking-wider leading-[1.6rem] md:leading-[1.7rem] mb-5 max-w-2xl"
							style={{ color: "var(--text-secondary)" }}>
							Server automation tools, Linux scripts, and IoT experiments.
						</motion.p>
						<motion.div variants={fadeUp}>
							<Button variation="primary" href="/projects">Explore Projects</Button>
						</motion.div>
					</div>
					<div className="col-span-2 flex justify-center items-center w-full mt-4 md:mt-0">
						{/* Screenshot — clip-path wipe reveal (variants, driven by section container) + inner parallax */}
						<motion.div
							variants={clipReveal}
							className="relative aspect-[16/9] w-full max-w-[1600px] glass-static rounded-3xl overflow-hidden shadow-2xl border-2 border-white/10">
							<motion.div style={{ y: projectsY }} className="absolute inset-x-0 -inset-y-[10%]">
								<Image src={ProjectAll} fill sizes="(max-width: 768px) 80vw, 30vw" className="object-cover" alt="Projects" priority />
							</motion.div>
						</motion.div>
					</div>


				</motion.div>
			</Section>

			{/* Section 4: Contact */}
			<Section id="contact">
				<motion.div
					className="mx-auto w-[88%] md:w-[82%] max-w-screen-2xl grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 p-6 md:p-10 overflow-hidden relative z-20 items-center"
					variants={sectionVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ amount: 0.2 }}>
					<div className="col-span-2 flex flex-col justify-center items-center md:items-start text-center md:text-start">
						<motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-8xl font-bold my-2 md:my-5">
							Get In Touch
						</motion.h1>
						<Hr />
						<motion.p
							variants={fadeUp}
							className="title text-base sm:text-xl mt-4 tracking-wider leading-[1.6rem] md:leading-[1.7rem] md:mb-5 max-w-2xl"
							style={{ color: "var(--text-secondary)" }}>
							Feel free to connect or collaborate on Linux SysAdmin & DevOps projects.
						</motion.p>
						<motion.p
							variants={fadeUp}
							className="title text-base sm:text-xl mt-4 tracking-wider leading-[1.6rem] md:leading-[1.7rem] mb-5"
							style={{ color: "var(--accent)" }}>
							<a href="mailto:andrahijati@gmail.com?subject=Hello%20Andra" className="group relative inline-block break-all">
								andrahijati@gmail.com
								<motion.span
									className="absolute left-0 -bottom-1 h-[2px] w-full origin-left bg-white/60 group-hover:bg-white transition-colors"
									initial={{ scaleX: 0 }}
									whileInView={{ scaleX: 1 }}
									viewport={{ amount: 0.8 }}
									transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
								/>
							</a>
						</motion.p>
						{/* Social Icons — staggered */}
						<motion.div
							variants={iconsContainer}
							className="flex justify-center items-center space-x-3 md:space-x-4 mb-5">
							{socialLinks.map((social) => (
								<motion.a
									key={social.label}
									variants={iconFade}
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={social.label}
									className="glass-icon flex justify-center items-center w-12 h-12 md:w-14 md:h-14 text-white/70 hover:text-teal-400">
									<FontAwesomeIcon icon={social.icon} className="text-xl md:text-2xl" />
								</motion.a>
							))}
						</motion.div>
					</div>
					<div className="col-span-2 flex justify-center items-center w-full mt-4 md:mt-0">
						<motion.div
							variants={fadeUp}
							className="relative aspect-[16/9] w-full max-w-[760px] glass-static rounded-2xl overflow-hidden shadow-2xl">
							<Image src={Setup} fill sizes="(max-width: 768px) 80vw, 30vw" className="object-cover" alt="Andra Workspace Setup" />
						</motion.div>
					</div>
				</motion.div>
			</Section>
		</div>
	);
};

export default MyPage;
