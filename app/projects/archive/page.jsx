"use client";
import { motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import FixedButon from "@/components/FixedButton";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Projects from "@/json/data.json";
import Link from "next/link";

export default function Page() {
	const projects = Projects.Projects;
	return (
		<>
			<main className="overflow-hidden">
				<FixedButon href="/projects">
					<FontAwesomeIcon icon={faChevronLeft} className="text-white" />
				</FixedButon>
				<div className="min-h-screen w-full mt-10 md:mt-0 px-4 sm:px-6 md:p-10 flex justify-center items-center flex-col mb-10">
					<div className="flex justify-center items-center flex-col my-5 self-start">
						<motion.div
							className="bg-gray-700 w-28 h-1 rounded-full mb-3 self-start"
							initial={{
								opacity: 0,
								x: -250,
							}}
							animate={{
								opacity: 1,
								x: 50,
							}}
							transition={{
								delay: 0.5,
								duration: 1,
								type: "spring",
							}}></motion.div>
						<motion.div
							className="bg-gray-700 w-28 h-1 rounded-full"
							initial={{
								opacity: 0,
								x: 200,
							}}
							animate={{
								opacity: 1,
								x: 0,
							}}
							transition={{
								delay: 0.5,
								duration: 1,
								type: "spring",
							}}></motion.div>
						<motion.h1
							className="text-3xl font-bold mt-3"
							initial={{
								opacity: 0,
								x: -200,
							}}
							animate={{
								opacity: 1,
								x: 0,
							}}
							transition={{
								delay: 0.7,
								duration: 1,
								type: "spring",
							}}>
							Archive
						</motion.h1>
					</div>

					<div className="w-full max-w-6xl mx-auto px-0 md:px-10">
						{/* Archive table — responsive with scroll on mobile */}
						<div className="overflow-x-auto">
							<table className="w-full glass-static" style={{ borderRadius: '12px', overflow: 'hidden' }}>
								<thead>
									<tr className="border-b border-white/10">
										<th className="text-start text-white/60 text-xs md:text-sm uppercase tracking-wider py-3 px-3 md:px-4">Year</th>
										<th className="text-start text-white/60 text-xs md:text-sm uppercase tracking-wider py-3 px-3 md:px-4">Title</th>
										<th className="text-start text-white/60 text-xs md:text-sm uppercase tracking-wider py-3 px-3 md:px-4 hidden md:table-cell">Technology</th>
										<th className="text-start text-white/60 text-xs md:text-sm uppercase tracking-wider py-3 px-3 md:px-4">Link</th>
									</tr>
								</thead>
								<tbody>
									{projects.map((project, index) => (
										<tr
											key={index}
											className="border-b border-white/5 hover:bg-white/[0.02] transition-all duration-300">
											<td className="text-white/80 text-sm md:text-base py-3 px-3 md:px-4 whitespace-nowrap">{project.year}</td>
											<td className="py-3 px-3 md:px-4">
												<Link href={`/projects/${project.slug}`} className="text-white hover:text-teal-400 transition-colors text-sm md:text-base font-medium">
													{project.title}
												</Link>
											</td>
											<td className="text-white/60 text-xs md:text-sm py-3 px-3 md:px-4 hidden md:table-cell max-w-xs truncate">{project.tech.join(", ")}</td>
											<td className="py-3 px-3 md:px-4">
												<div className="flex flex-row items-center gap-2">
													{project.code && (
														<a href={project.code} title="Link to GitHub" className="glass-icon w-9 h-9 md:w-10 md:h-10 flex items-center justify-center text-white/60 hover:text-teal-400">
															<FontAwesomeIcon icon={faGithub} className="text-sm md:text-base" />
														</a>
													)}
													{project.preview && (
														<a href={project.preview} title="Link to project preview" className="glass-icon w-9 h-9 md:w-10 md:h-10 flex items-center justify-center text-white/60 hover:text-teal-400">
															<FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-sm md:text-base" />
														</a>
													)}
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
