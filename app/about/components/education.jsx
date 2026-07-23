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

function Title() {
	return (
		<div className="mt-10 flex flex-col justify-start items-center w-full pl-10 md:pl-32">
			<div className="flex justify-center items-center flex-col my-5 self-start">
				<Hr variant="long" />
				<h1 className="text-3xl font-bold mt-3">Education & Milestones</h1>
			</div>
		</div>
	);
}

export default function Education() {
	return (
		<>
			<Title />
			<div className="mx-auto container px-10 mb-20">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{/* Card 1 */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="bg-white/40 border border-gray-300/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
						<div className="relative h-64 sm:h-72 w-full bg-slate-300">
							<Image
								src={Edu1}
								alt="Education 1"
								fill
								className="object-cover"
							/>
						</div>
						<div className="p-6 space-y-3">
							<div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
								<FontAwesomeIcon icon={faGraduationCap} />
							</div>
							<h3 className="text-xl font-bold text-black">Linux System Administration</h3>
							<p className="text-xs text-gray-500 font-mono">Btech Academy Certificate</p>
							<p className="text-gray-600 text-sm leading-relaxed">
								Certificate of Achievement in Linux System Administration from Btech Academy, demonstrating core Linux CLI, user management, and systems administration.
							</p>
						</div>
					</motion.div>

					{/* Card 2 */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="bg-white/40 border border-gray-300/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
						<div className="relative h-64 sm:h-72 w-full bg-slate-300">
							<Image
								src={Edu2}
								alt="Docker & Containerization"
								fill
								className="object-cover"
							/>
						</div>
						<div className="p-6 space-y-3">
							<div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
								<FontAwesomeIcon icon={faTerminal} />
							</div>
							<h3 className="text-xl font-bold text-black">Docker & Containerization</h3>
							<p className="text-xs text-gray-500 font-mono">Managing Container Lifecycles</p>
							<p className="text-gray-600 text-sm leading-relaxed">
								Hands-on management of Docker CLI, container lifecycles, image tagging, volume mounting, and containerized environment deployments.
							</p>
						</div>
					</motion.div>

					{/* Card 3 */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.4 }}
						className="bg-white/40 border border-gray-300/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
						<div className="relative h-64 sm:h-72 w-full bg-slate-300">
							<Image
								src={Edu3}
								alt="Arduino & Microcontrollers"
								fill
								className="object-cover"
							/>
						</div>
						<div className="p-6 space-y-3">
							<div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
								<FontAwesomeIcon icon={faAward} />
							</div>
							<h3 className="text-xl font-bold text-black">Arduino & Microcontrollers</h3>
							<p className="text-xs text-gray-500 font-mono">Hardware Prototyping & Telemetry</p>
							<p className="text-gray-600 text-sm leading-relaxed">
								Embedded hardware experiments, servo motor actuation, telemetry data interfaces, and Arduino C++ code prototyping.
							</p>
						</div>
					</motion.div>
				</div>
			</div>
		</>
	);
}
