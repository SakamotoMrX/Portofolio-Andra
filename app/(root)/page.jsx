// Copyright (C) 2025 Andra (SakamotoMrX)
"use client";
import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import Button from "@/components/Button";
import Me from "@/public/image/hero.jpg";
import MeAbout from "@/public/image/about-1.jpg";
import Setup from "@/public/image/setup.jpg";
import ProjectAll from "@/public/image/projects-showcase.png";
import Hr from "@/components/Hr";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faInstagram, faFacebook, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Section = ({ id, children }) => <section id={id} className="section">{children}</section>;

const socialLinks = [
	{ icon: faEnvelope, href: "mailto:andrahijati@gmail.com?subject=Hello%20Andra", label: "Send email" },
	{ icon: faGithub, href: "https://github.com/SakamotoMrX", label: "GitHub profile" },
	{ icon: faInstagram, href: "https://www.instagram.com/andrahijati", label: "Instagram profile" },
	{ icon: faFacebook, href: "https://web.facebook.com/andra.nugroho.921", label: "Facebook profile" },
	{ icon: faDiscord, href: "https://discord.com/users/legacyy5030", label: "Discord profile" },
];

const MyPage = () => {
	useEffect(() => {
		document.documentElement.classList.add("home-snap");
		return () => document.documentElement.classList.remove("home-snap");
	}, []);

	return (
		<div>
			{/* Section 1: Hero */}
			<Section id="home">
				<div className="mx-auto w-[88%] md:w-[82%] max-w-screen-2xl grid grid-cols-1 md:grid-cols-3 gap-4 p-6 md:p-10 overflow-hidden relative z-20">
					<motion.div
						className="col-span-2 flex flex-col justify-center items-center md:items-start text-center md:text-start"
						initial={{ x: -100, opacity: 0 }}
						whileInView={{ x: 0, opacity: 1 }}
						transition={{ type: "spring" }}>
						{/* Mobile avatar */}
						<div className="block md:hidden col-span-1 mx-auto mb-8 mt-6">
							<div className="glass-static rounded-full h-52 w-52 sm:h-64 sm:w-64 overflow-hidden shadow-xl">
								<Image src={Me} width={600} height={600} className="rounded-full w-full h-full object-cover" alt="Andra" />
							</div>
						</div>
						<motion.h3
							className="uppercase text-base sm:text-xl mb-2 font-normal tracking-[.3rem] md:tracking-[.5rem] text-teal-400/70"
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{ delay: 0.2, type: "spring" }}>
							Andra (SakamotoMrX)
						</motion.h3>
						<motion.h1
							className="text-3xl sm:text-4xl md:text-6xl lg:text-6xl 2xl:text-8xl font-bold my-2 md:my-5"
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{ delay: 0.3, type: "spring" }}>
							Junior DevOps
						</motion.h1>
						<motion.p
							className="title text-sm sm:text-md 2xl:text-xl mt-4 tracking-wider leading-[1.6rem] md:leading-[1.7rem] max-w-2xl"
							style={{ color: "var(--text-secondary)" }}
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{ delay: 0.4, type: "spring" }}>
							Hi! I&rsquo;m Andra, a Junior DevOps based in Bogor, Indonesia with over 15 years 5 months of hands-on technology exploration. Specialized in Linux SysAdmin, Virtual Machines, Containerization, Bash scripting, and open-source systems.
						</motion.p>
						<motion.div
							className="buttons flex flex-row justify-center items-center space-x-4 mt-8 md:mt-10 z-30 relative"
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{ delay: 0.5, type: "spring" }}>
							<Button variation="primary" href="/about">About Me</Button>
							<Button variation="secondary" href="#contact">Contact Me</Button>
						</motion.div>
					</motion.div>
						<motion.div
							className="hidden md:flex col-span-1 mx-auto justify-center items-center"
							initial={{ x: 100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{ delay: 0.7, type: "spring" }}>
							<div className="relative w-[36vw] max-w-[420px] h-auto">
								<div className="glass-static rounded-full aspect-square shadow-2xl flex items-center justify-center p-3 border-2 border-white/15">
									<div className="rounded-full w-full h-full overflow-hidden relative">
										<Image src={Me} width={600} height={750} alt="Andra" className="w-full h-full object-cover" priority />
										<div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/25 via-transparent to-blue-400/25" />
									</div>
								</div>
								<div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-center">
									<p className="text-white/60 text-sm">Andra (SakamotoMrX)</p>
									<p className="text-cyan-300 text-xs">Junior DevOps</p>
								</div>
							</div>
						</motion.div>
				</div>
			</Section>

			{/* Section 2: About Overview */}
			<Section id="about">
				<div className="mx-auto w-[88%] md:w-[82%] max-w-screen-2xl grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 p-6 md:p-10 overflow-hidden relative z-20 items-center">
					<div className="col-span-2 flex flex-col justify-center items-center md:items-start text-center md:text-start">
						<motion.h1
							className="text-4xl sm:text-5xl md:text-8xl font-bold"
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{ delay: 0.1, type: "spring" }}>
							About Me
						</motion.h1>
						<Hr />
						<motion.p
							className="title text-base sm:text-xl mt-4 tracking-wider leading-[1.6rem] md:leading-[1.7rem] mb-5 max-w-2xl"
							style={{ color: "var(--text-secondary)" }}
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{ delay: 0.2, type: "spring" }}>
							Linux SysAdmin, Containerization, and hardware tinkering (Arduino). Check out my Fastfetch specs.
						</motion.p>
						<motion.div
							initial={{ y: 40, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.3, type: "spring" }}>
							<Button variation="primary" href="/about">Learn More & Fastfetch</Button>
						</motion.div>
					</div>
					<div className="col-span-1 flex justify-center items-center mt-4 md:mt-0">
						<motion.div
							className="relative glass-static rounded-2xl overflow-hidden h-[300px] sm:h-[340px] md:h-[520px] w-full max-w-[400px] md:max-w-[500px] shadow-2xl"
							initial={{ x: 100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{ delay: 0.4, type: "spring" }}>
							<Image src={MeAbout} fill sizes="(max-width: 768px) 80vw, 30vw" className="object-cover" alt="Andra DevOps" priority />
							<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
							<div className="absolute bottom-0 left-0 p-12">
								<h3 className="text-white text-4xl font-bold mb-4">About Me</h3>
								<p className="text-white/80 text-2xl">Linux SysAdmin & DevOps Specialist</p>
							</div>
						</motion.div>
					</div>
				</div>
			</Section>

			{/* Section 3: Projects Preview */}
			<Section id="projects">
				<div className="mx-auto w-[88%] md:w-[94%] max-w-[1800px] grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 p-6 md:p-10 overflow-hidden relative z-20 items-center">
					<div className="col-span-1 flex flex-col justify-center items-center md:items-start text-center md:text-start">
						<motion.h1
							className="text-4xl sm:text-5xl md:text-8xl font-bold my-2 md:my-5"
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{ delay: 0.1, type: "spring" }}>
							My Projects
						</motion.h1>
						<Hr />
						<motion.p
							className="title text-base sm:text-xl mt-4 tracking-wider leading-[1.6rem] md:leading-[1.7rem] mb-5 max-w-2xl"
							style={{ color: "var(--text-secondary)" }}
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{ delay: 0.2, type: "spring" }}>
							Server automation tools, Linux scripts, and IoT experiments.
						</motion.p>
						<motion.div
							initial={{ y: 40, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.3, type: "spring" }}>
							<Button variation="primary" href="/projects">Explore Projects</Button>
						</motion.div>
					</div>
					<div className="col-span-1 flex justify-center items-center w-full mt-4 md:mt-0">
						<motion.div
							className="relative aspect-[16/9] w-full max-w-[1600px] glass-static rounded-3xl overflow-hidden shadow-2xl border-2 border-white/10"
							initial={{ x: 100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{ delay: 0.4, type: "spring" }}>
							<Image src={ProjectAll} fill sizes="(max-width: 768px) 80vw, 30vw" className="object-cover" alt="Projects" priority />
							<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
							<div className="absolute bottom-0 left-0 p-14">
								<h3 className="text-white text-5xl font-bold mb-4">My Projects</h3>
								<p className="text-white/80 text-2xl">Server automation & Linux tools</p>
							</div>
						</motion.div>
					</div>
				</div>
			</Section>

			{/* Section 4: Contact */}
			<Section id="contact">
				<div className="mx-auto w-[88%] md:w-[94%] max-w-[1800px] grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 p-6 md:p-10 overflow-hidden relative z-20 items-center">
					<div className="col-span-1 flex flex-col justify-center items-center md:items-start text-center md:text-start">
						<motion.h1
							className="text-4xl sm:text-5xl md:text-8xl font-bold my-2 md:my-5"
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{ delay: 0.1, type: "spring" }}>
							Get In Touch
						</motion.h1>
						<Hr />
						<motion.p
							className="title text-base sm:text-xl mt-4 tracking-wider leading-[1.6rem] md:leading-[1.7rem] md:mb-5 max-w-2xl"
							style={{ color: "var(--text-secondary)" }}
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{ delay: 0.2, type: "spring" }}>
							Feel free to connect or collaborate on Linux SysAdmin & DevOps projects.
						</motion.p>
						<motion.p
							className="title text-base sm:text-xl mt-4 tracking-wider leading-[1.6rem] md:leading-[1.7rem] mb-5"
							style={{ color: "var(--accent)" }}
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{ delay: 0.3, type: "spring" }}>
							<a href="mailto:andrahijati@gmail.com?subject=Hello%20Andra" className="hover:underline break-all">
								andrahijati@gmail.com
							</a>
						</motion.p>
						{/* Social Icons */}
						<div className="flex justify-center items-center space-x-3 md:space-x-4 mb-5">
							{socialLinks.map((social, i) => (
								<motion.a
									key={social.label}
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={social.label}
									className="glass-icon flex justify-center items-center w-12 h-12 md:w-14 md:h-14 text-white/70 hover:text-teal-400"
									initial={{ y: 30, opacity: 0 }}
									whileInView={{ y: 0, opacity: 1 }}
									transition={{
										type: "spring",
										stiffness: 100,
										damping: 20,
										delay: 0.1 + i * 0.08,
									}}>
									<FontAwesomeIcon icon={social.icon} className="text-xl md:text-2xl" />
								</motion.a>
							))}
						</div>
					</div>
					<div className="col-span-1 flex justify-center items-center w-full mt-4 md:mt-0">
						<motion.div
							className="relative aspect-[16/9] w-full max-w-[760px] glass-static rounded-2xl overflow-hidden shadow-2xl"
							initial={{ x: 100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{ delay: 0.4, type: "spring" }}>
							<Image src={Setup} fill sizes="(max-width: 768px) 80vw, 30vw" className="object-cover" alt="Andra Workspace Setup" />
						</motion.div>
					</div>
				</div>
			</Section>
		</div>
	);
};

export default MyPage;
