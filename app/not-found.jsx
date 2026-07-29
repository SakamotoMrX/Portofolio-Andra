"use client"
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const NotFound = () => (
	<div className="min-h-screen flex items-center justify-center p-6">
		<div className="glass-static max-w-md w-full p-10 md:p-14 text-center">
			<h2 className="uppercase text-xs tracking-[8px] text-white/40 mb-4">
				Page not found
			</h2>
			<h1 className="text-7xl md:text-8xl font-bold text-white mb-6 font-jost">
				404
			</h1>
			<p className="text-white/50 text-sm mb-10 max-w-xs mx-auto">
				The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
			</p>
			<Link
				href="/"
				className="glass-btn inline-flex items-center gap-2 px-6 py-3 text-sm">
				<FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
				Back to Home
			</Link>
		</div>
	</div>
);

export default NotFound;
