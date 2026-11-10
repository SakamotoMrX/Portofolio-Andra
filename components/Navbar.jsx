import Link from "next/link";

const links = [
	{ href: "/#about", label: "About" },
	{ href: "/#work", label: "Work" },
	{ href: "/#contact", label: "Contact" },
];

export default function Navbar() {
	return (
		<header className="nav">
			<Link href="/" className="wordmark">
				Andra
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
