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
		<div className="hidden md:flex fixed z-40 h-auto w-14 flex-col justify-between items-center py-5 px-3 left-4 top-1/2 -translate-y-1/2 rounded-[24px] shadow-2xl"
			style={{
				background: "rgba(255, 255, 255, 0.04)",
				backdropFilter: "blur(20px)",
				WebkitBackdropFilter: "blur(20px)",
				border: "1px solid rgba(255, 255, 255, 0.08)",
				boxShadow: "0 8px 40px rgba(0,0,0,0.25), 0 0 60px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.06)",
			}}>
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
									className="absolute inset-0 rounded-[14px]"
									style={{
										background: "rgba(255, 255, 255, 0.06)",
										border: "1px solid rgba(255, 255, 255, 0.08)",
									}}
									transition={{ type: "spring", stiffness: 350, damping: 30 }}
								/>
							)}
							<motion.div
								className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
								animate={{
									opacity: activeAnchor === item.anchor ? 1 : 0,
									scale: activeAnchor === item.anchor ? 1 : 0.3,
									background: activeAnchor === item.anchor ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0)",
								}}
								transition={{ duration: 0.2 }}
							/>
							<FontAwesomeIcon
								icon={item.icon}
								className={`relative z-10 text-lg transition-all duration-300 ${
									activeAnchor === item.anchor
										? "text-white"
										: "text-white/50 hover:text-white/80"
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
