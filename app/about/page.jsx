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

export default function Page() {
	useEffect(() => { window.scrollTo(0, 0); }, []);

	return (
		<main className="overflow-hidden">
			<FixedButton href="/#about">
				<FontAwesomeIcon icon={faChevronLeft} className="text-white pr-10" />
			</FixedButton>
			<div className="relative h-screen gap-4 p-10 flex justify-center items-center flex-col mb-10 overflow-hidden">
				<div className="z-0 mb-48 md:mb-0 md:absolute top-1/4 md:right-[10%] md:-translate-y-16">
					<motion.div
						initial={{ scale: 1 }}
						animate={{ scale: 1.6 }}
						transition={{ ease: "circOut", duration: 1 }}
						className="glass-static rounded-sm h-[400px] md:h-[600px] w-[80vw] md:w-[30vw] overflow-hidden">
						<Image src={Hero} alt="Andra Junior DevOps" fill sizes="(max-width: 768px) 80vw, 30vw" className="object-cover opacity-60" />
					</motion.div>
				</div>
				<div className="z-10 w-full absolute md:w-auto md:left-[10%] top-[60%] md:top-1/3 flex flex-col justify-center items-start text-start px-10 pt-4 md:pt-0">
					<h1 className="text-5xl md:text-8xl font-bold text-white">
						About Me
					</h1>
					<Hr />
					<p className="title text-xl mt-4 tracking-wider text-white/60 leading-[1.7rem] mb-5">
						Andra (SakamotoMrX) &bull; Junior DevOps in Bogor, Indonesia
					</p>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, ease: "circOut" }}
						onClick={() => window.scrollTo({ top: 800, behavior: "smooth" })}
						className="mb-3">
						<Button variation="primary">Scroll Down</Button>
					</motion.div>
				</div>
			</div>

			<About />
			<Neofetch />
			<Skills />
			<Experience />
			<Education />
		</main>
	);
}
