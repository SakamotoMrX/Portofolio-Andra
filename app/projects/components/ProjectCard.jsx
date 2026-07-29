import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import BlurImage from "@/public/image/placeholder/blur.jpg";

export default function ProjectCard({ project, index }) {
	return (
		<Link href={"projects/" + project.slug}>
			<motion.div
				className="glass relative flex justify-center items-start flex-col mb-5 w-full h-auto py-8 md:py-12 px-6 md:px-10 aspect-video overflow-hidden group"
				initial={{ opacity: 0, x: -200 }}
				whileInView={{ opacity: 1, x: 0 }}
				transition={{ type: "spring", stiffness: 80, damping: 20 }}>
				<Image
					src={project.thumbnail}
					alt={`${project.title} project preview`}
					fill
					placeholder="blur"
					className="opacity-20 group-hover:opacity-40 transition-all duration-500 object-cover"
					blurDataURL={BlurImage.src}
				/>
				<div className="absolute top-0 left-0 px-3 md:px-4 py-1.5 md:py-2 glass-tag rounded-none">
					<h4 className="text-white text-xs md:text-sm">{project.year}</h4>
				</div>
				<div className="relative z-10 transition-all duration-500 opacity-100 group-hover:opacity-100 text-center">
					<h1 className="text-2xl md:text-3xl font-bold mb-3 text-white group-hover:text-teal-400 transition-colors duration-300">
						{project.title}
					</h1>
					<p className="text-white/70 mb-4 text-sm md:text-base">
						{project.desc[0].length > 125
							? `${project.desc[0].slice(0, 125)}...`
							: project.desc[0]}
					</p>
					<div className="flex justify-center items-center flex-row mt-5 flex-wrap gap-2">
						{project.tech.map((t, i) => (
							<span key={i} className="glass-tag text-[10px] md:text-xs">{t}</span>
						))}
					</div>
				</div>
			</motion.div>
		</Link>
	);
}
