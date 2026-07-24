"use client";

import { motion } from "framer-motion";
import { neofetchData } from "@/data/neofetch";

function FastfetchAsciiLogo() {
	return (
		<div className="flex flex-col items-center justify-center select-none font-mono">
			<pre className="font-bold leading-tight tracking-tight text-[11px] sm:text-xs text-left">
				<span className="text-cyan-400">{`         ./o.         \n`}</span>
				<span className="text-cyan-400">{`        ./sssso-       \n`}</span>
				<span className="text-cyan-400">{`       \`:ossssss:\`     \n`}</span>
				<span className="text-sky-400">{`     \`:+sssssssss+:\`   \n`}</span>
				<span className="text-sky-400">{`    \`-/osssssssssss/   \n`}</span>
				<span className="text-sky-400">{`  \`:+ssssssssssssssss+ \n`}</span>
				<span className="text-blue-400">{` \`-ssyhhhhhhdhhhhhhys+ \n`}</span>
				<span className="text-blue-400">{`   .osyyhhyyyyyyyyso.  \n`}</span>
				<span className="text-indigo-400">{`     .osyyyyyyysso.    \n`}</span>
				<span className="text-indigo-400">{`       .-/osssso/-.    \n`}</span>
				<span className="text-indigo-400">{`          \`-\`-\`        `}</span>
			</pre>
		</div>
	);
}

function FastfetchRow({ label, value, keyColor = "text-sky-400" }) {
	return (
		<div className="flex flex-col sm:flex-row sm:items-baseline w-full font-mono text-xs sm:text-sm py-0.5 gap-0.5 sm:gap-0 overflow-hidden">
			<span className={`font-bold shrink-0 ${keyColor}`}>{label}</span>
			<span className="hidden sm:inline-block flex-1 border-b border-dotted border-white/10 mx-1.5 min-w-[8px] translate-y-[-3px]"></span>
			<span className="shrink sm:shrink-0 font-medium text-white/80 sm:text-right break-words min-w-0">{value}</span>
		</div>
	);
}

export default function Neofetch() {
	const data = neofetchData;

	const containerVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.04 } },
	};

	const itemVariants = {
		hidden: { opacity: 0, x: -8 },
		visible: { opacity: 1, x: 0, transition: { duration: 0.25 } },
	};

	return (
		<section className="w-full py-12 px-4 sm:px-8 max-w-5xl mx-auto font-['Fira_Code',monospace]">
			<motion.div
				className="glass-static relative overflow-hidden font-mono scanline"
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.2 }}>

				{/* Terminal Window Titlebar */}
				<div className="flex items-center justify-between border-b border-white/10 pb-3 mb-6">
					<div className="flex items-center space-x-2">
						<span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
						<span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
						<span className="w-3 h-3 rounded-full bg-[#27c93f]" />
					</div>
					<div className="text-xs text-white/40 font-mono tracking-wide">
						fastfetch — andra@SakamotoMrX
					</div>
					<div className="w-12" />
				</div>

				{/* Main Grid */}
				<div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
					{/* Left: ASCII Logo */}
					<motion.div
						className="md:col-span-4 flex flex-col items-center justify-center p-4 rounded-lg"
						style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
						variants={itemVariants}>
						<FastfetchAsciiLogo />
						<div className="mt-4 text-[11px] text-white/30 font-mono tracking-widest uppercase">
							Linux DevOps Host
						</div>
					</motion.div>

					{/* Right: Spec Output */}
					<motion.div className="md:col-span-8 flex flex-col space-y-1" variants={itemVariants}>
						<div className="font-mono text-sm sm:text-base font-bold pb-1">
							<span className="text-emerald-400">{data.user}</span>
							<span className="text-white/80">@</span>
							<span className="text-emerald-400">{data.host}</span>
						</div>

						<div className="text-white/20 font-mono text-xs sm:text-sm tracking-tighter pb-2 border-b border-white/10 mb-2">
							----------------------------------------
						</div>

						<FastfetchRow label="OS" value={data.os} keyColor="text-sky-400" />
						<FastfetchRow label="Host" value={data.location} keyColor="text-sky-400" />
						<FastfetchRow label="Uptime" value={data.uptime} keyColor="text-sky-400" />
						<FastfetchRow label="Shell" value={data.shell} keyColor="text-sky-400" />
						<FastfetchRow label="IDE" value={data.ide.join(", ")} keyColor="text-sky-400" />

						<div className="pt-2" />
						<FastfetchRow label="Languages.Scripting" value={data.languages.scripting.join(", ")} keyColor="text-cyan-400" />
						<FastfetchRow label="Languages.Human" value={data.languages.human.join(", ")} keyColor="text-cyan-400" />

						<div className="pt-2" />
						<FastfetchRow label="Skills.System" value={data.skills.system.join(", ")} keyColor="text-teal-400" />
						<FastfetchRow label="Skills.WebDev" value={data.skills.webdev.join(", ")} keyColor="text-teal-400" />
						<FastfetchRow label="Skills.Process" value={data.skills.process.join(", ")} keyColor="text-teal-400" />

						<div className="pt-2" />
						<FastfetchRow label="Hobbies" value={data.hobbies.join(" • ")} keyColor="text-amber-400" />

						<div className="pt-2" />
						<FastfetchRow label="Contact.Email" value={data.contact.email} keyColor="text-purple-400" />
						<FastfetchRow label="Contact.Discord" value={data.contact.discord} keyColor="text-purple-400" />
						<FastfetchRow label="Contact.Instagram" value={data.contact.instagram} keyColor="text-purple-400" />
						<FastfetchRow label="Contact.Facebook" value={data.contact.facebook} keyColor="text-purple-400" />

						{/* Color palette */}
						<div className="pt-4 flex flex-col space-y-1 font-mono">
							<div className="flex gap-1.5">
								<span className="w-5 h-3 bg-[#1e222a] rounded-sm" />
								<span className="w-5 h-3 bg-[#e06c75] rounded-sm" />
								<span className="w-5 h-3 bg-[#98c379] rounded-sm" />
								<span className="w-5 h-3 bg-[#d19a66] rounded-sm" />
								<span className="w-5 h-3 bg-[#61afef] rounded-sm" />
								<span className="w-5 h-3 bg-[#c678dd] rounded-sm" />
								<span className="w-5 h-3 bg-[#56b6c2] rounded-sm" />
								<span className="w-5 h-3 bg-[#abb2bf] rounded-sm" />
							</div>
							<div className="flex gap-1.5">
								<span className="w-5 h-3 bg-[#5c6370] rounded-sm" />
								<span className="w-5 h-3 bg-[#be5046] rounded-sm" />
								<span className="w-5 h-3 bg-[#a5e075] rounded-sm" />
								<span className="w-5 h-3 bg-[#e5c07b] rounded-sm" />
								<span className="w-5 h-3 bg-[#4db5ff] rounded-sm" />
								<span className="w-5 h-3 bg-[#de98f3] rounded-sm" />
								<span className="w-5 h-3 bg-[#4cd4e0] rounded-sm" />
								<span className="w-5 h-3 bg-[#ffffff] rounded-sm" />
							</div>
						</div>
					</motion.div>
				</div>
			</motion.div>
		</section>
	);
}
