"use client";

import { motion } from "framer-motion";
import { neofetchData } from "@/data/neofetch";

function FastfetchAsciiLogo() {
	return (
		<div className="flex flex-col items-center justify-center select-none">
			<pre className="font-mono font-bold leading-tight tracking-tight text-[11px] sm:text-xs text-left text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.3)]">
{`                     ..'
                  ,xNMM.
                .OMMMMo
                lMM"
      .;loddo:.  .olloddol;.
    cKMMMMMMMMMMNWMMMMMMMMMM0:
  .KMMMMMMMMMMMMMMMMMMMMMMMWd.
  XMMMMMMMMMMMMMMMMMMMMMMMX.
;MMMMMMMMMMMMMMMMMMMMMMMM:
:MMMMMMMMMMMMMMMMMMMMMMMM:
.MMMMMMMMMMMMMMMMMMMMMMMMX.
 kMMMMMMMMMMMMMMMMMMMMMMMMWd.
 'XMMMMMMMMMMMMMMMMMMMMMMMMMMk
  'XMMMMMMMMMMMMMMMMMMMMMMMMK.
    kMMMMMMMMMMMMMMMMMMMMMMd
     ;KMMMMMMMWXXWMMMMMMMk.
       "cooc*"    "*coo'"`}
			</pre>
		</div>
	);
}

function FastfetchRow({ label, value }) {
	return (
		<div className="flex justify-between items-baseline w-full text-xs sm:text-sm py-0.5">
			<span className="font-medium shrink-0 text-yellow-400/90">{label}</span>
			<span className="text-white/80 text-right ml-4 break-words max-w-[60%]">{value}</span>
		</div>
	);
}

function SectionDivider() {
	return <div className="border-t border-white/5 my-2" />;
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
		<section className="w-full py-10 md:py-12 px-3 sm:px-8 max-w-5xl mx-auto font-['-apple-system','BlinkMacSystemFont','SF Pro Display','Helvetica Neue','Helvetica','Arial',sans-serif]">
			<motion.div
				className="glass-static relative scanline p-4 sm:p-8"
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.2 }}>

				{/* Terminal Window Titlebar */}
				<div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 md:mb-6">
					<div className="flex items-center space-x-1.5 md:space-x-2">
						<span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ff5f56]" />
						<span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ffbd2e]" />
						<span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#27c93f]" />
					</div>
					<div className="text-[10px] md:text-xs text-white/40 tracking-wide font-mono">
						fastfetch — andra@SakamotoMrX
					</div>
					<div className="w-8 md:w-12" />
				</div>

				{/* Main Grid */}
				<div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
					{/* Left: ASCII Logo */}
					<motion.div
						className="md:col-span-5 flex flex-col items-center justify-center p-3 md:p-4 rounded-lg"
						style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
						variants={itemVariants}>
						<FastfetchAsciiLogo />
						<div className="mt-3 md:mt-4 text-[10px] md:text-[11px] text-white/30 tracking-widest uppercase font-['Helvetica Neue','Helvetica',sans-serif]">
							MacBook Air (M1, 2020)
						</div>
					</motion.div>

					{/* Right: Spec Output */}
					<motion.div className="md:col-span-7 flex flex-col" variants={itemVariants}>
						<div className="text-xs sm:text-sm md:text-base font-bold pb-2">
							<span className="text-yellow-400 font-['Helvetica Neue','Helvetica',sans-serif]">{data.user}</span>
							<span className="text-white/80 font-['Helvetica Neue','Helvetica',sans-serif]">@</span>
							<span className="text-yellow-400 font-['Helvetica Neue','Helvetica',sans-serif]">{data.host}</span>
						</div>

						<FastfetchRow label="OS" value={data.os} />
						<FastfetchRow label="Host" value={data.location} />
						<FastfetchRow label="Uptime" value={data.uptime} />
						<FastfetchRow label="Shell" value={data.shell} />
						<FastfetchRow label="IDE" value={data.ide.join(", ")} />

						<SectionDivider />
						<FastfetchRow label="Languages.Scripting" value={data.languages.scripting.join(", ")} />
						<FastfetchRow label="Languages.Human" value={data.languages.human.join(", ")} />

						<SectionDivider />
						<FastfetchRow label="Skills.System" value={data.skills.system.join(", ")} />
						<FastfetchRow label="Skills.WebDev" value={data.skills.webdev.join(", ")} />
						<FastfetchRow label="Skills.Process" value={data.skills.process.join(", ")} />

						<SectionDivider />
						<FastfetchRow label="Hobbies" value={data.hobbies.join(" • ")} />

						<SectionDivider />
						<FastfetchRow label="Contact.Email" value={data.contact.email} />
						<FastfetchRow label="Contact.Discord" value={data.contact.discord} />
						<FastfetchRow label="Contact.Instagram" value={data.contact.instagram} />
						<FastfetchRow label="Contact.Facebook" value={data.contact.facebook} />
					</motion.div>
				</div>
			</motion.div>
		</section>
	);
}
