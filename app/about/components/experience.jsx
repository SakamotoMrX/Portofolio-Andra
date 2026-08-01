"use client";
import Hr from "@/components/Hr";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const experiences = [
	{
		id: 1,
		startDate: "2025",
		endDate: "Present",
		company: "Independent DevOps Lab",
		position: "Junior DevOps & Systems Administrator",
		type: "Personal Lab & Freelance",
		location: "Bogor, Indonesia",
		description:
			"Managing Linux server environments, automating containerized application deployments, building custom Bash/YAML infrastructure scripts, and orchestrating virtual machines.",
		skills: ["Linux SysAdmin", "Virtual Machine", "Containerization", "Bash", "YAML", "Git & GitHub"],
	},
	{
		id: 2,
		startDate: "2025",
		endDate: "",
		company: "Hardware & Software Lab",
		position: "Embedded Systems & Linux Tinkerer",
		type: "Self-Directed",
		location: "Bogor, Indonesia",
		description:
			"Explored microcontrollers and sensor integration using Arduino IDE, while actively configuring Linux desktop & server environments using Vim, Nvim, and CLI tools.",
		skills: ["Arduino IDE", "Vim", "Nvim", "Lazygit", "Linux Software"],
	},
	{
		id: 3,
		startDate: "15 Years 5 Months Ago",
		endDate: "Present",
		company: "Technology Exploration Journey",
		position: "Self-Taught Tech Enthusiast",
		type: "Continuous Learning",
		location: "Bogor, Indonesia",
		description:
			"Over 15 years and 5 months of hands-on exploration in computer systems, operating systems (macOS, Linux, Windows), networking, and software development lifecycles.",
		skills: ["macOS", "Linux", "Windows", "SDLC & Agile"],
	},
];

const formatDateRange = ({ startDate, endDate }) =>
	endDate ? `${startDate} - ${endDate}` : startDate;

function Title() {
	return (
		<div className="mt-10 flex flex-col justify-start items-center w-full pl-6 md:pl-32">
			<div className="flex justify-center items-center flex-col my-5 self-start">
				<Hr variant="long" />
				<h1 className="text-2xl md:text-3xl font-bold mt-3">DevOps & Tech Experience</h1>
			</div>
		</div>
	);
}

export default function Experience() {
	const [activeTab, setActiveTab] = useState(1);

	return (
		<>
			<Title />
			<div className="relative mx-auto container gap-4 px-4 sm:px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 mb-20">
				<div className="md:col-span-4 flex flex-col space-y-2 mb-6 md:mb-0">
					{experiences.map((exp) => (
						<button
							key={exp.id}
							onClick={() => setActiveTab(exp.id)}
							className={`text-left p-4 rounded-xl transition-all duration-300 ${
								activeTab === exp.id
									? "glass !border-white/50 !shadow-white/10 translate-x-2"
									: "glass hover:!border-white/20"
							}`}>
							<div className="text-xs text-white/50 font-mono">
								{formatDateRange(exp)}
							</div>
							<div className="font-bold text-base mt-1 text-white">{exp.position}</div>
							<div className="text-xs text-white/40">{exp.company}</div>
						</button>
					))}
				</div>

				<div className="md:col-span-8 glass-static p-5 sm:p-8">
					<AnimatePresence mode="wait">
						{experiences
							.filter((exp) => exp.id === activeTab)
							.map((exp) => (
								<motion.div
									key={exp.id}
									initial={{ opacity: 0, y: 15 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -15 }}
									transition={{ duration: 0.3 }}
									className="space-y-4">
									<div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-2">
										<div>
											<h3 className="text-xl md:text-2xl font-bold text-white">{exp.position}</h3>
											<p className="text-white/60 text-sm md:text-base font-medium">{exp.company} &bull; <span className="text-white/40 text-xs md:text-sm">{exp.type}</span></p>
										</div>
										<div className="text-right sm:text-right">
											<span className="inline-block px-3 py-1 bg-white/10 text-white/70 text-xs font-mono rounded-full border border-white/10">
												{exp.location}
											</span>
											<p className="text-xs text-white/40 mt-1 font-mono">{formatDateRange(exp)}</p>
										</div>
									</div>

									<p className="text-white/70 leading-relaxed text-justify text-base pt-2">
										{exp.description}
									</p>

									<div className="pt-4">
										<h4 className="text-xs uppercase font-bold text-white/40 tracking-wider mb-3">Skills & Domain Focus</h4>
										<div className="flex flex-wrap gap-2">
											{exp.skills.map((skill) => (
												<span
													key={skill}
													className="glass-tag !bg-white/10 !border-white/30 !text-white/70 !text-xs">
													{skill}
												</span>
											))}
										</div>
									</div>
								</motion.div>
							))}
					</AnimatePresence>
				</div>
			</div>
		</>
	);
}
