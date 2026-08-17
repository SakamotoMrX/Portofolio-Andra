"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const navVariant = {
	open: {
		clipPath: "circle(2000px at calc(100% - 40px) 40px)",
		transition: { type: "tween", duration: 0.5, ease: [0.22, 1, 0.36, 1] },
	},
	closed: {
		clipPath: "circle(0px at calc(100% - 40px) 40px)",
		transition: { delay: 0.3, type: "tween", duration: 0.3, ease: [0.4, 0, 1, 1] },
	},
};

const itemVariants = {
	open: (custom) => ({
		opacity: 1, x: 0,
		transition: { delay: custom, type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] },
	}),
	closed: { opacity: 0, x: -80, transition: { type: "tween", duration: 0.2 } },
};

const NavItems = ({ isNavOpen, setIsNavOpen }) => {
	const handleItemClick = () => setIsNavOpen(false);

	const links = [
		{ href: "/about", label: "About" },
		{ href: "/setup", label: "Setup" },
		{ href: "/projects", label: "Projects" },
		{ href: "/interests", label: "Interests" },
		{ href: "/#contact", label: "Contact" },
	];

	return (
		<motion.div
			className={`fixed z-[45] w-full h-screen flex items-center justify-center overflow-hidden ${
				isNavOpen ? "pointer-events-auto" : "pointer-events-none"
			}`}
			variants={navVariant}
			animate={isNavOpen ? "open" : "closed"}
			initial={false}>
			<div className="relative flex flex-col items-center min-h-[100vh] min-w-[100vw] glass-nav" style={{ borderRadius: 0, borderBottom: "none", boxShadow: "none" }}>
				<div className="flex flex-col items-center space-y-10 my-auto z-50 px-6">
					<motion.h1
						variants={itemVariants}
						animate={isNavOpen ? "open" : "closed"}
						className="text-5xl md:text-6xl font-bold text-white">
						Menu
					</motion.h1>
					{links.map((link, i) => (
						<Link key={link.href} href={link.href}>
							<div onClick={handleItemClick} className="text-xl md:text-2xl font-bold py-3 min-h-[48px] flex items-center">
								<motion.h2
									className="text-white hover:text-teal-400 transition-colors"
									variants={itemVariants}
									animate={isNavOpen ? "open" : "closed"}
									custom={(i + 1) * 0.1}>
									{link.label}
								</motion.h2>
							</div>
						</Link>
					))}
				</div>
			</div>
		</motion.div>
	);
};

const Navbar = () => {
	const navRef = useRef(null);
	const [isNavOpen, setIsNavOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	// Scroll-direction-aware scroll handler with rAF throttling
	useEffect(() => {
		let lastScrollY = window.scrollY;
		let ticking = false;
		const THRESHOLD = 15;

		const onScroll = () => {
			const currentScrollY = window.scrollY;
			setScrolled(currentScrollY > 20);

			if (!ticking) {
				requestAnimationFrame(() => {
					const delta = currentScrollY - lastScrollY;
					if (Math.abs(delta) > THRESHOLD) {
						const dir = delta > 0 ? "down" : "up";
						document.documentElement.dataset.scrollDir = dir;
						lastScrollY = currentScrollY;
					}
					ticking = false;
				});
				ticking = true;
			}
		};

		// Close menu on scroll start
		const onScrollStart = () => {
			if (isNavOpen) {
				setIsNavOpen(false);
			}
		};

		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("scroll", onScrollStart, { passive: true, once: true });
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("scroll", onScrollStart);
		};
	}, [isNavOpen]);

	const toggleNav = useCallback(() => {
		setIsNavOpen((prev) => !prev);
	}, []);

	return (
		<>
			<nav
				ref={navRef}
				className={`navbar px-4 md:px-24 w-screen fixed top-0 left-0 right-0 z-50 ${
					isNavOpen ? "navbar-menu-open " : ""
				}${
					scrolled || isNavOpen
						? "glass-nav"
						: "bg-transparent"
				}`}>
				<div className="flex flex-row justify-between items-center h-16">
					<Link href="/#home" aria-label="Andra home" className="ml-12 md:ml-0">
						<Image
							src="/image/andra-logo.png"
							alt="Andra logo"
							width={42}
							height={42}
							className="h-9 w-9 md:h-10 md:w-10 object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
						/>
					</Link>
					<button
						aria-label={isNavOpen ? "Close menu" : "Open menu"}
						className="glass-icon w-12 h-12 flex flex-col justify-center items-center space-y-1.5"
						onClick={toggleNav}>
						<div className={`w-5 md:w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
							isNavOpen ? "rotate-45 translate-y-[3px]" : ""
						}`} />
						<div className={`w-5 md:w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
							isNavOpen ? "-rotate-45 -translate-y-[3px]" : ""
						}`} />
					</button>
				</div>
			</nav>
			<NavItems isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
		</>
	);
};

export default Navbar;
