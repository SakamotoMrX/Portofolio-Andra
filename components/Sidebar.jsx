"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faFolderOpen, faEnvelope } from "@fortawesome/free-solid-svg-icons";
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
		<div className="fixed z-40 left-4 max-md:hidden"
			style={{ top: "50%", transform: "translateY(-50%)" }}>
			<div className="flex flex-col items-center gap-5 py-8 px-3 rounded-full shadow-2xl"
				style={{
					background: "rgba(255, 255, 255, 0.04)",
					backdropFilter: "blur(24px)",
					WebkitBackdropFilter: "blur(24px)",
					border: "1px solid rgba(255, 255, 255, 0.08)",
					boxShadow: "0 8px 40px rgba(0,0,0,0.3), 0 0 80px rgba(255,255,255,0.02), inset 0 1px 0 rgba(255,255,255,0.06)",
				}}>
				<ul id="sidebar" className="flex flex-col items-center gap-5">
					{navItems.map((item) => (
						<li key={item.anchor} data-menuanchor={item.anchor} className="relative">
							<a
								href={`/#${item.anchor}`}
								aria-label={item.label}
								className="relative flex items-center justify-center w-10 h-10">
								{activeAnchor === item.anchor && (
									<div className="absolute inset-0 rounded-xl bg-white/10" />
								)}
								<div
									className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-200 ${
										activeAnchor === item.anchor
											? "opacity-100 scale-100 bg-white/60"
											: "opacity-0 scale-0"
									}`}
								/>
								<FontAwesomeIcon
									icon={item.icon}
									className={`relative z-10 text-lg transition-all duration-200 ${
										activeAnchor === item.anchor
											? "text-white"
											: "text-white/40 hover:text-white/70"
									}`}
								/>
							</a>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Sidebar;
