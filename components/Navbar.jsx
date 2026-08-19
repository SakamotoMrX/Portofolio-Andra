"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const links = [
	{ href: "#about", label: "About" },
	{ href: "#projects", label: "Projects" },
	{ href: "#system", label: "System" },
	{ href: "#contact", label: "Contact" },
];

export default function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 40);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	const frosted = scrolled || open;

	return (
		<header
			className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
				frosted
					? "backdrop-blur-[12px] bg-[#f6f5f0]/85 border-b border-black/5"
					: "bg-transparent border-b border-transparent"
			}`}
		>
			<nav className="flex h-16 w-full items-center justify-between px-5 md:px-10">
				<div className="hidden items-center gap-8 md:flex">
					{links.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className="text-xs font-semibold uppercase tracking-widest text-black/60 transition-colors hover:text-[#121212]"
						>
							{link.label}
						</Link>
					))}
					<a
						href="https://github.com/SakamotoMrX"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="GitHub profile"
						className="text-black/60 transition-colors hover:text-[#121212]"
					>
						<FontAwesomeIcon icon={faGithub} className="text-lg" />
					</a>
				</div>

				<button
					type="button"
					aria-label={open ? "Close menu" : "Open menu"}
					aria-expanded={open}
					onClick={() => setOpen((v) => !v)}
					className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
				>
					<span
						className={`h-px w-6 bg-[#121212] transition-transform duration-300 ${
							open ? "translate-y-[3.5px] rotate-45" : ""
						}`}
					/>
					<span
						className={`h-px w-6 bg-[#121212] transition-transform duration-300 ${
							open ? "-translate-y-[3.5px] -rotate-45" : ""
						}`}
					/>
				</button>
			</nav>

			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, y: -8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -8 }}
						transition={{ duration: 0.2 }}
						className="border-b border-black/5 bg-[#f6f5f0] px-6 pb-6 pt-2 md:hidden"
					>
						<div className="flex flex-col gap-1">
							{links.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									onClick={() => setOpen(false)}
									className="py-3 text-sm font-semibold uppercase tracking-widest text-[#121212]"
								>
									{link.label}
								</Link>
							))}
							<a
								href="https://github.com/SakamotoMrX"
								target="_blank"
								rel="noopener noreferrer"
								onClick={() => setOpen(false)}
								className="py-3 text-sm font-semibold uppercase tracking-widest text-[#121212]"
							>
								GitHub
							</a>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}