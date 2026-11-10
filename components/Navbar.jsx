import Link from "next/link";

const links = [
	{ href: "/#work", label: "Work" },
	{ href: "/#about", label: "About" },
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
					<li className="wide">
						<a href="https://github.com/SakamotoMrX" target="_blank" rel="noopener noreferrer">
							GitHub
						</a>
					</li>
				</ul>
			</nav>
		</header>
	);
}
