"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import Image from "next/image";

import ProjectAll from "@/public/image/projects-showcase.png";
import Hr from "@/components/Hr";
import ProjectCard from "./components/ProjectCard";
import Projects from "@/json/data.json";
import FixedButton from "@/components/FixedButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const category = {
	1: "DevOps & SysAdmin",
	2: "Hardware & IoT",
	9: "Other",
};

export default function Page() {
	const [activeCategory, setActiveCategory] = useState("1");
	const projects = Projects.Projects.filter((item) => item.show === true);

	useEffect(() => { window.scrollTo(0, 0); }, []);

	return (
		<main className="overflow-hidden">
			<FixedButton href="/#projects">
				<FontAwesomeIcon icon={faChevronLeft} className="text-white" />
			</FixedButton>
			<div className="relative h-screen w-screen gap-4 p-6 md:p-10 flex justify-center items-center flex-col mb-10 overflow-hidden">
				<div className="z-0 mb-48 md:mb-0 md:absolute top-1/4 md:right-[10%] md:-translate-y-16">
					<motion.div
						initial={{ scale: 1 }}
						animate={{ scale: 1.6 }}
						transition={{ duration: 1, ease: "circOut" }}
						className="glass-static rounded-sm h-[300px] sm:h-[400px] md:h-[600px] w-[85vw] sm:w-[80vw] md:w-[30vw] overflow-hidden">
						<Image
							src={ProjectAll}
							alt="Projects Showcase"
							fill
							className="object-cover opacity-60"
							sizes="(max-width: 768px) 80vw, 30vw"
						/>
					</motion.div>
				</div>
				<div className="z-10 w-full absolute md:w-auto md:left-[10%] top-[55%] md:top-1/3 flex flex-col justify-center items-center md:items-start text-center md:text-start px-6 md:px-10 pt-4 md:pt-0">
					<h1 className="text-4xl sm:text-5xl md:text-8xl font-bold text-white">
						My Projects
					</h1>
					<Hr />
					<p className="title text-base sm:text-xl mt-4 tracking-wider text-white/60 leading-[1.6rem] md:leading-[1.7rem] mb-5 max-w-xl">
						Automated scripts, Linux server deployments, and hardware projects.
					</p>
					<motion.div
						initial={{ opacity: 0, y: 100 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, ease: "circOut" }}
						onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}
						className="mb-3">
						<Button variation="primary">Scroll Down</Button>
					</motion.div>
				</div>
			</div>

			<div className="mt-10 flex flex-col justify-start items-center w-full pl-10 md:pl-32">
				<div className="flex justify-center items-center flex-col my-5 self-start">
					<Hr variant="long" />
					<h1 className="text-3xl font-bold mt-3">Projects Showcase</h1>
				</div>
			</div>

			<motion.div
				initial={{ opacity: 0, x: 200 }}
				whileInView={{ opacity: 1, x: 0 }}
				transition={{ type: "spring" }}
				className="flex flex-row justify-center items-start flex-wrap gap-2 md:gap-5 my-5 px-4 md:px-0">
				{Object.keys(category).map((key) => (
					<button
						key={key}
						className={`px-4 py-2.5 rounded-lg cursor-pointer transition-all duration-300 text-sm md:text-base ${
							activeCategory === key
								? "glass-btn text-white"
								: "glass-btn-outline text-white/60"
						}`}
						onClick={() => setActiveCategory(key)}>
						{category[key]}
					</button>
				))}
			</motion.div>

			<div className="w-full mx-auto container gap-4 px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 mb-10 cursor-pointer">
				{projects
					.filter((project) => project.category.includes(parseInt(activeCategory)))
					.map((project, index) => (
					<ProjectCard project={project} key={index} />
				))}
			</div>
		</main>
	);
}
