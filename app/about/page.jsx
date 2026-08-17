"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import Image from "next/image";
import FixedButton from "@/components/FixedButton";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Skills from "./components/skills/skills.jsx";
import Experience from "./components/experience.jsx";
import Education from "./components/education.jsx";
import Neofetch from "@/components/Neofetch.jsx";
import Hero from "@/public/image/about-4.jpg";
import Hr from "@/components/Hr";
import About from "./components/about/about.jsx";
import Reveal from "@/components/Reveal";

export default function Page() {
	useEffect(() => { window.scrollTo(0, 0); }, []);

	return (
		<main className="overflow-hidden">
			<FixedButton href="/#about">
				<FontAwesomeIcon icon={faChevronLeft} className="text-white" />
			</FixedButton>
			<div className="relative h-screen gap-4 p-6 md:p-10 flex justify-center items-center flex-col mb-10 overflow-hidden">
				<div className="z-0 mb-48 md:mb-0 md:absolute top-1/4 md:right-[10%] md:translate-y-4">
					<motion.div
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ duration: 0.8, ease: "circOut" }}
						className="relative w-[72vw] sm:w-[45vw] md:w-[40vw] max-w-[676px] h-auto mx-auto">
						<div className="glass-static rounded-2xl aspect-[3/2] shadow-2xl flex items-center justify-center p-3 border-2 border-white/15">
							<div className="rounded-2xl w-full h-full overflow-hidden relative">
								<Image src={Hero} alt="Andra Junior DevOps" fill sizes="(max-width: 768px) 80vw, 30vw" className="object-cover" priority />
								<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/25 via-transparent to-blue-400/25" />
							</div>
						</div>
					</motion.div>
				</div>
				<Reveal className="z-10 w-full absolute md:w-auto md:left-[10%] top-[55%] md:top-1/3 flex flex-col justify-center items-center md:items-start text-center md:text-start px-6 md:px-10 pt-4 md:pt-0">
					<h1 className="text-4xl sm:text-5xl md:text-8xl font-bold text-white">
						About Me
					</h1>
					<Hr />
					<p className="title text-base sm:text-xl mt-4 tracking-wider text-white/60 leading-[1.6rem] md:leading-[1.7rem] mb-5 max-w-xl">
						Andra (SakamotoMrX) &bull; Junior DevOps in Bogor, Indonesia
					</p>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, ease: "circOut" }}
						onClick={() => window.scrollTo({ top: 700, behavior: "smooth" })}
						className="mb-3">
						<Button variation="primary">Scroll Down</Button>
					</motion.div>
				</Reveal>
			</div>

			<About />
			<Neofetch />
			<Skills />
			<Experience />
			<Education />
		</main>
	);
}
