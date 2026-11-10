"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Mark from "@/components/Mark";

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
		</header>
	);
}
