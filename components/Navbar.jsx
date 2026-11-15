"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import Mark from "@/components/Mark";
import { useCalm } from "@/components/motion";

const links = [
	{ href: "/projects", label: "Work" },
	{ href: "/#skills", label: "Skills" },
	{ href: "/#certificates", label: "Certificates" },
	{ href: "/#about", label: "About" },
	{ href: "/#contact", label: "Contact" },
];

export default function Navbar() {
	// past the first few pixels the bar gets its ground and sits tighter
	const [stuck, setStuck] = useState(false);
	// a thin line under the bar fills as the page is read (after Seasats, LxL)
	const { scrollYProgress } = useScroll();
	const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
	const reduce = useCalm();
	useEffect(() => {
		const on = () => setStuck(window.scrollY > 24);
		on();
		window.addEventListener("scroll", on, { passive: true });
		return () => window.removeEventListener("scroll", on);
	}, []);
	return (
		<header className="nav" data-stuck={stuck}>
			<Link href="/" className="wordmark" aria-label="Andra, home">
				<Mark />
			</Link>
			<nav aria-label="Main">
				<ul>
					{links.map((l) => (
						<li key={l.href}>
							<Link href={l.href}>{l.label}</Link>
						</li>
					))}
				</ul>
			</nav>
			<motion.i className="progress" aria-hidden="true" style={{ scaleX: reduce ? scrollYProgress : progress }} />
		</header>
	);
}
