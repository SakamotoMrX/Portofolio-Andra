"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faFolderOpen, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const navItems = [
	{ icon: faHome, label: "Go to Home section", anchor: "home" },
	{ icon: faUser, label: "Go to About section", anchor: "about" },
	{ icon: faFolderOpen, label: "Go to Projects section", anchor: "projects" },
	{ icon: faEnvelope, label: "Go to Contact section", anchor: "contact" },
];

const Sidebar = () => {
	const [activeAnchor, setActiveAnchor] = useState("home");

	useEffect(() => {
		const sections = navItems
			.map((item) => document.getElementById(item.anchor))
			.filter(Boolean);
		if (!sections.length) return undefined;

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
				if (visible) setActiveAnchor(visible.target.id);
			},
			{ threshold: [0.45, 0.7] }
		);

		sections.forEach((section) => observer.observe(section));
		return () => observer.disconnect();
	}, []);

	return (
		<div className="hidden md:flex fixed z-40 h-[50vh] w-14 flex-col justify-between items-center p-4 left-0 top-1/4 rounded-e-3xl glass-static">
			<ul id="sidebar" className="flex flex-col justify-evenly items-center h-full">
				{navItems.map((item) => (
					<li key={item.anchor} data-menuanchor={item.anchor}>
						<a
							href={`/#${item.anchor}`}
							aria-label={item.label}
							className="relative flex items-center justify-center w-10 h-10">
							{activeAnchor === item.anchor && (
								<motion.div
									layoutId="sidebar-active"
									className="absolute inset-0 rounded-xl"
									style={{
										background: "rgba(20, 184, 166, 0.15)",
										border: "1px solid rgba(20, 184, 166, 0.2)",
									}}
									transition={{ type: "spring", stiffness: 350, damping: 30 }}
								/>
							)}
							<FontAwesomeIcon
								icon={item.icon}
								className={`relative z-10 text-xl transition-all duration-300 ${
									activeAnchor === item.anchor
										? "scale-110 text-teal-400"
										: "scale-100 text-white/50 hover:text-white/80"
								}`}
							/>
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Sidebar;
