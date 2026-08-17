"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faGraduationCap,
	faAward,
	faTerminal,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import Edu1 from "@/public/image/education-1.jpg";
import Edu2 from "@/public/image/education-2.jpg";
import Edu3 from "@/public/image/education-3.jpg";
import Hr from "@/components/Hr";
import Reveal from "@/components/Reveal";

function Title() {
	return (
		<div className="mt-10 flex flex-col justify-start items-center w-full pl-6 md:pl-32">
			<Reveal className="flex justify-center items-center flex-col my-5 self-start">
				<Hr variant="long" />
				<h1 className="text-2xl md:text-3xl font-bold mt-3">Education & Milestones</h1>
			</Reveal>
		</div>
	);
}

export default function Education() {
	return (
		<>
			<Title />
			<div className="mx-auto container px-4 sm:px-6 md:px-10 mb-20">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="glass overflow-hidden">
						<div className="relative h-64 sm:h-72 w-full">
							<Image
								src={Edu1}
								alt="Education 1"
								fill
								className="object-cover opacity-80"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/80 via-transparent to-transparent" />
						</div>
						<div className="p-6 space-y-3">
							<div className="w-10 h-10 rounded-full bg-white/10 border border-white/25 text-cyan-300 flex items-center justify-center">
								<FontAwesomeIcon icon={faGraduationCap} />
							</div>
							<h3 className="text-xl font-bold text-white">Linux System Administration</h3>
							<p className="text-xs text-white/40 font-mono">Btech Academy Certificate</p>
							<p className="text-white/60 text-sm leading-relaxed">
								Certificate of Achievement in Linux System Administration from Btech Academy, demonstrating core Linux CLI, user management, and systems administration.
							</p>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="glass overflow-hidden">
						<div className="relative h-64 sm:h-72 w-full">
							<Image
								src={Edu2}
								alt="Docker & Containerization"
								fill
								className="object-cover opacity-80"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/80 via-transparent to-transparent" />
						</div>
						<div className="p-6 space-y-3">
							<div className="w-10 h-10 rounded-full bg-white/10 border border-white/25 text-cyan-300 flex items-center justify-center">
								<FontAwesomeIcon icon={faTerminal} />
							</div>
							<h3 className="text-xl font-bold text-white">Docker & Containerization</h3>
							<p className="text-xs text-white/40 font-mono">Managing Container Lifecycles</p>
							<p className="text-white/60 text-sm leading-relaxed">
								Hands-on management of Docker CLI, container lifecycles, image tagging, volume mounting, and containerized environment deployments.
							</p>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.4 }}
						className="glass overflow-hidden">
						<div className="relative h-64 sm:h-72 w-full">
							<Image
								src={Edu3}
								alt="Arduino & Microcontrollers"
								fill
								className="object-cover opacity-80"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/80 via-transparent to-transparent" />
						</div>
						<div className="p-6 space-y-3">
							<div className="w-10 h-10 rounded-full bg-white/10 border border-white/25 text-cyan-300 flex items-center justify-center">
								<FontAwesomeIcon icon={faAward} />
							</div>
							<h3 className="text-xl font-bold text-white">Arduino & Microcontrollers</h3>
							<p className="text-xs text-white/40 font-mono">Hardware Prototyping & Telemetry</p>
							<p className="text-white/60 text-sm leading-relaxed">
								Embedded hardware experiments, servo motor actuation, telemetry data interfaces, and Arduino C++ code prototyping.
							</p>
						</div>
					</motion.div>
				</div>
			</div>
		</>
	);
}
