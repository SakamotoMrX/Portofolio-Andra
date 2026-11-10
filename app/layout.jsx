import "./globals.css";
import { Fira_Code } from "next/font/google";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import { Analytics } from "@vercel/analytics/react";
import ReducedMotionProvider from "@/components/ReducedMotionProvider";

// General Sans (Indian Type Foundry, via Fontshare), self-hosted so the CSP stays closed
const generalSans = localFont({
	src: [
		{ path: "../public/fonts/GeneralSans-400.woff2", weight: "400" },
		{ path: "../public/fonts/GeneralSans-500.woff2", weight: "500" },
		{ path: "../public/fonts/GeneralSans-700.woff2", weight: "700" },
	],
	display: "swap",
	variable: "--font-general",
});

const firaCode = Fira_Code({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	display: "swap",
	variable: "--font-fira-code",
});

const SITE_URL =
	process.env.NEXT_PUBLIC_SITE_URL || "https://andra-portfolio.vercel.app";

export const metadata = {
	metadataBase: new URL(SITE_URL),
	title: "Andra | Junior DevOps",
	description:
		"Andra (SakamotoMrX) — Junior DevOps based in Bogor, Indonesia. Linux SysAdmin, Containerization, Git & GitHub enthusiast, and open-source tinkerer.",
	authors: [{ name: "Andra" }],
	applicationName: "Andra | Portfolio",
	icons: {
		icon: "/icon.svg",
		shortcut: "/icon.svg",
	},
	keywords: [
		"andra", "sakamotomrx", "junior devops", "linux sysadmin",
		"devops", "containerization", "bogor", "indonesia",
		"portfolio", "bash", "yaml", "git",
	],
	openGraph: {
		type: "website",
		url: SITE_URL,
		title: "Andra | Junior DevOps",
		siteName: "Andra | Portfolio",
		description:
			"Andra (SakamotoMrX) — Junior DevOps based in Bogor, Indonesia. Linux SysAdmin, Containerization, and open-source tinkerer.",
		images: [{ url: "/og-image.png", alt: "Andra Portfolio", width: 1200, height: 630 }],
	},
	twitter: {
		card: "summary_large_image",
		title: "Andra | Junior DevOps",
		description: "Andra (SakamotoMrX) — Junior DevOps based in Bogor, Indonesia.",
		images: ["/og-image.png"],
	},
};

const jsonLd = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: "Andra",
	url: SITE_URL,
	jobTitle: "Junior DevOps",
	address: { "@type": "PostalAddress", addressLocality: "Bogor", addressCountry: "ID" },
	sameAs: [
		"https://github.com/SakamotoMrX",
		"https://www.instagram.com/andrahijati/",
		"https://web.facebook.com/andra.nugroho.921",
	],
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className={`${generalSans.variable} ${firaCode.variable}`}>
			<body className="relative">
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
				<Navbar />
				<ReducedMotionProvider>
					<main>{children}</main>
				</ReducedMotionProvider>
				<Analytics />
			</body>
		</html>
	);
}