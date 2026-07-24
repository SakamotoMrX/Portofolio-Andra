import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import BlurImage from "@/public/image/placeholder/blur.jpg";

export default function ProjectCard({ project, index, activeCategory }) {
	return (
		<>
			{project.category.includes(parseInt(activeCategory)) && (
				<Link href={"projects/" + project.slug} key={index}>
					<motion.div
						className="glass relative flex justify-center items-start flex-col mb-5 md:px-10 w-full h-auto py-20 px-5 md:py-2 aspect-video overflow-hidden"
						initial={{ opacity: 0, x: -200 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ type: "spring" }}>
						<Image
							src={project.thumbnail}
							alt={`${project.title} project preview`}
							fill
							placeholder="blur"
							className="opacity-15 group-hover:opacity-100 transition-all ease duration-500 object-cover"
							blurDataURL={BlurImage.src}
						/>
						<div className="absolute top-0 left-0 px-4 py-2 glass-tag rounded-none">
							<h4 className="text-white text-sm">{project.year}</h4>
						</div>
						<div className="relative z-10 transition-all ease duration-500 opacity-100 text-center group-hover/tes:opacity-0">
							<h1 className="text-3xl font-bold mb-3 text-white">{project.title}</h1>
							<p className="text-white/70 mb-4">
								{project.desc[0].length > 125
									? `${project.desc[0].slice(0, 125)}...`
									: project.desc[0]}
							</p>
							<div className="flex justify-center items-center flex-row mt-5 flex-wrap gap-2">
								{project.tech.map((t, index) => (
									<span key={index} className="glass-tag">{t}</span>
								))}
							</div>
						</div>
					</motion.div>
				</Link>
			)}
		</>
	);
}
