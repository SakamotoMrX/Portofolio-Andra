"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CodepenIcon, WebhookIcon, ActivityIcon, MobileIcon } from "./icons";

const skillCategories = {
	system: {
		title: "Linux & System Admin",
		icon: WebhookIcon,
		description: "Core Linux administration, Virtual Machines, and Containerization",
		languages: [
			{ name: "Linux SysAdmin", highlight: true },
			{ name: "Virtual Machine", highlight: true },
			{ name: "Containerization", highlight: true },
			{ name: "Bash Scripting", highlight: true },
			{ name: "YAML Config", highlight: true },
		],
		tools: [
			"macOS",
			"Linux",
			"Windows",
			"Antigravity IDE",
			"Vim",
			"Nvim",
			"Lazygit",
			"Docker",
		],
	},
	web: {
		title: "WebDev & Deploying",
		icon: CodepenIcon,
		description: "Basic web technologies, Git version control, and deployment pipelines",
		languages: [
			{ name: "Basic Website", highlight: true },
			{ name: "Git & GitHub", highlight: true },
			{ name: "Deploying", highlight: true },
			{ name: "HTML / CSS", highlight: false },
			{ name: "JavaScript", highlight: false },
		],
		tools: [
			"Git",
			"GitHub",
			"Vercel",
			"SSH",
			"Terminal / Zsh",
		],
	},
	process: {
		title: "Process & Engineering",
		icon: ActivityIcon,
		description: "Software development lifecycle and agile methodologies",
		languages: [
			{ name: "SDLC", highlight: true },
			{ name: "Agile Methodology", highlight: true },
			{ name: "Version Control", highlight: true },
		],
		tools: [
			"GitHub Issues",
			"Kanban",
			"Agile Workflows",
		],
	},
	hardware: {
		title: "Hardware & Hobbies",
		icon: MobileIcon,
		description: "Hardware tinkering and Linux software exploration",
		languages: [
			{ name: "Arduino (hardware)", highlight: true },
			{ name: "Larping Linux (software)", highlight: true },
			{ name: "Indonesian (native)", highlight: false },
			{ name: "English (fluent)", highlight: false },
		],
		tools: [
			"Arduino IDE",
			"Microcontrollers",
			"Sensors",
			"Linux Distros",
		],
	},
};

function SkillCard({ skill, isSelected, onClick }) {
	const Icon = skill.icon;

	return (
		<motion.div
			onClick={onClick}
			className={`relative cursor-pointer group p-6 rounded-2xl transition-all duration-300 ${
				isSelected ? "glass !border-cyan-400/50 !shadow-cyan-500/20" : "glass hover:!border-white/20"
			}`}
			whileHover={{ scale: 1.03 }}
			whileTap={{ scale: 0.97 }}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}>
			<div className="relative z-10 flex flex-col items-center text-center space-y-4">
				<div className={`p-4 rounded-xl transition-all duration-300 ${
					isSelected ? "bg-cyan-400/20" : "bg-white/10"
				}`}>
					<Icon className="w-8 h-8 text-white" />
				</div>
				<div>
					<h3 className="font-semibold text-white text-lg mb-2">
						{skill.title}
					</h3>
					<p className="text-white/50 text-sm leading-relaxed">
						{skill.description}
					</p>
				</div>
			</div>
		</motion.div>
	);
}

const tagVariants = {
	hidden: { opacity: 0, scale: 0.8 },
	show: { opacity: 1, scale: 1 },
};

function SkillDetails({ selectedSkill }) {
	if (!selectedSkill) return null;

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.5 }}
			className="mt-12 space-y-8">
			<motion.div
				className="glass-static p-6 md:p-8"
				initial={{ opacity: 0, x: -50 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ delay: 0.2 }}>
				<h3 className="text-xl md:text-2xl font-semibold text-white mb-6 text-center">
					Skill Matrix & Competencies
				</h3>
				<motion.div
					key={selectedSkill.title}
					className="flex flex-wrap justify-center gap-3"
					variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } } }}
					initial="hidden"
					animate="show">
					{selectedSkill.languages.map((skill) => (
						<motion.span
							key={skill.name}
							variants={tagVariants}
							className={`glass-tag transition-all duration-300 cursor-default flex items-center gap-2 ${
								skill.highlight ? "!bg-cyan-500/20 !border-cyan-400/40 !text-cyan-300" : "!text-white/70"
							}`}>
							{skill.highlight && (
								<span className="text-cyan-300 text-[10px] animate-pulse">✦</span>
							)}
							{skill.name}
						</motion.span>
					))}
				</motion.div>
			</motion.div>

			<motion.div
				className="glass-static p-6 md:p-8"
				initial={{ opacity: 0, x: 50 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ delay: 0.4 }}>
				<h3 className="text-base md:text-xl font-medium text-white/50 mb-6 text-center uppercase tracking-wider">
					IDEs, Operating Systems & Tools
				</h3>
				<motion.div
					key={selectedSkill.title + "-tools"}
					className="flex flex-wrap justify-center gap-3"
					variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } } }}
					initial="hidden"
					animate="show">
					{selectedSkill.tools.map((tool) => (
						<motion.span
							key={tool}
							variants={tagVariants}
							className="glass-tag !text-white/60 !text-xs">
							{tool}
						</motion.span>
					))}
				</motion.div>
			</motion.div>
		</motion.div>
	);
}

export default function Skills() {
	const [selectedCategory, setSelectedCategory] = useState("system");
	return (
		<div className="relative">
			<div className="mx-auto container px-4 sm:px-6 py-12 md:py-20">
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center space-y-4 mb-12 md:mb-16">
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
						Skills & Technical Matrix
					</h2>
					<p className="text-white/50 max-w-2xl mx-auto text-base md:text-lg leading-relaxed px-4">
						Explore my technical skills in Linux SysAdmin, Virtualization, Containerization, and DevOps workflows.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
					{Object.entries(skillCategories).map(([key, skill], index) => (
						<motion.div
							key={key}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}>
							<SkillCard
								skill={skill}
								isSelected={selectedCategory === key}
								onClick={() => setSelectedCategory(key)}
							/>
						</motion.div>
					))}
				</div>

				<AnimatePresence mode="wait">
					<SkillDetails selectedSkill={skillCategories[selectedCategory]} />
				</AnimatePresence>
			</div>
		</div>
	);
}
