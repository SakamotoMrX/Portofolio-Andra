"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons";

export default function Footer() {
	return (
		<div className="flex justify-center items-center flex-col overflow-hidden px-6">
			{/* CTA Section */}
			<div className="glass-static w-full max-w-4xl mx-auto my-16 md:my-20 px-8 py-12 md:py-16 text-center">
				<motion.p
					className="text-sm md:text-base font-medium tracking-[0.3rem] md:tracking-[0.5rem] uppercase mb-3"
					style={{ color: "var(--text-secondary)" }}
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.15, duration: 0.5 }}>
					Want something like this?
				</motion.p>
				<Link
					href="/#contact"
					className="inline-block group"
					aria-label="Get in touch with Andra">
					<motion.h1
						className="text-3xl sm:text-5xl md:text-7xl font-medium leading-none text-white group-hover:text-teal-400 transition-colors duration-300"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3, duration: 0.5 }}>
						Get In Touch{" "}
						<FontAwesomeIcon
							icon={faArrowAltCircleRight}
							className="text-3xl sm:text-5xl ml-2 inline-block group-hover:translate-x-1 transition-transform duration-300"
						/>
					</motion.h1>
				</Link>
				<motion.p
					className="text-xs md:text-sm mt-6"
					style={{ color: "var(--text-dim)" }}
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ delay: 0.5, duration: 0.5 }}>
					Collaborate, connect, or just say hello.
				</motion.p>
			</div>

			{/* Copyright */}
			<footer className="flex justify-center items-center pb-8">
				<p style={{ color: "var(--text-dim)" }} className="text-xs sm:text-sm tracking-wide">
					&copy;{new Date().getFullYear()} &mdash;{" "}
					<span className="text-sm sm:text-base" style={{ color: "var(--text-secondary)" }}>Andra</span>
				</p>
			</footer>
		</div>
	);
}
