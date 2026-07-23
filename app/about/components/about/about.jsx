import Image from "next/image";
import Card from "./spotify/card";
import { motion } from "framer-motion";
import Me1 from "@/public/image/about-1.jpg";
import Me2 from "@/public/image/about-2.jpg";
import Me3 from "@/public/image/about-3.jpg";
import Hr from "@/components/Hr";

function Title() {
	return (
		<div className="mt-10 flex flex-col justify-start items-center w-full pl-10 md:pl-32">
			<div className="flex justify-center items-center flex-col my-5 self-start ">
				<Hr variant="long"></Hr>
				<h1 className="text-3xl font-bold mt-3">Who Am I?</h1>
			</div>
		</div>
	);
}

export default function About() {
	return (
		<>
			<Title />
			<div className="relative mx-auto container gap-8 px-6 sm:px-10 grid grid-cols-1 md:grid-cols-2 mb-16 md:mb-24">
				<div className="flex justify-center items-center flex-col mb-8 md:mb-0">
					<div className="images relative w-full h-[360px] sm:h-[440px] max-w-md mx-auto">
						<div className="absolute top-6 left-4 w-[52%] aspect-square grayscale hover:grayscale-0 transition-all ease duration-300 z-10 shadow-lg rounded-lg overflow-hidden border-2 border-white">
							<motion.div
								initial={{ opacity: 0, scale: 0.8, y: 20 }}
								whileInView={{
									opacity: 1,
									scale: 1,
									y: 0,
								}}
								className="relative w-full h-full">
								<Image
									src={Me1}
									alt="Andra photo 1"
									fill
									sizes="(max-width: 768px) 50vw, 25vw"
									className="object-cover"
								/>
							</motion.div>
						</div>
						<div className="absolute top-2 right-4 w-[40%] aspect-square grayscale hover:grayscale-0 transition-all ease duration-300 z-0 shadow-md rounded-lg overflow-hidden border-2 border-white">
							<motion.div
								initial={{
									opacity: 0,
									scale: 0.8,
									x: 20,
								}}
								whileInView={{
									opacity: 1,
									scale: 1,
									x: 0,
								}}
								transition={{ delay: 0.2 }}
								className="relative w-full h-full">
								<Image
									src={Me2}
									alt="Andra photo 2"
									fill
									sizes="(max-width: 768px) 40vw, 20vw"
									className="object-cover"
								/>
							</motion.div>
						</div>
						<div className="absolute bottom-4 right-10 w-[48%] aspect-square grayscale hover:grayscale-0 transition-all ease duration-300 z-20 shadow-xl rounded-lg overflow-hidden border-2 border-white">
							<motion.div
								initial={{
									opacity: 0,
									scale: 0.8,
									y: 20,
								}}
								whileInView={{
									opacity: 1,
									scale: 1,
									y: 0,
								}}
								transition={{
									delay: 0.4,
								}}
								className="relative w-full h-full">
								<Image
									src={Me3}
									alt="Andra photo 3"
									fill
									sizes="(max-width: 768px) 45vw, 22vw"
									className="object-cover"
								/>
							</motion.div>
						</div>
					</div>
				</div>
				<motion.div
					className="flex justify-center items-start flex-col mb-5 md:px-10"
					initial={{
						opacity: 0,
						x: 200,
					}}
					whileInView={{
						opacity: 1,
						x: 0,
					}}
					transition={{
						delay: 0.5,
						type: "spring",
					}}>
					<h2 className="text-2xl font-bold tracking-wider mb-3">
						Andra (SakamotoMrX)
					</h2>
					<p className="text-gray-600 text-justify title text-lg leading-relaxed">
						I am a{" "}
						<span className="text-black font-medium">
							Junior DevOps practitioner & Linux enthusiast{" "}
						</span>
						based in{" "}
						<span className="text-black font-medium">
							Bogor, Indonesia
						</span>
						. Over the course of 15 years and 5 months of hands-on technological exploration, my core focus has centered on{" "}
						<span className="text-black font-medium">
							Linux System Administration, Virtualization, and Containerization
						</span>
						.
						<br />
						<br />
						My daily toolkit revolves around{" "}
						<span className="text-black font-medium">
							Antigravity IDE, Vim, Nvim, Lazygit, and Arduino IDE
						</span>
						. When I&rsquo;m not crafting Bash scripts or YAML environment configurations, I spend my time Larping Linux (software) and working with Arduino microcontrollers (hardware).
					</p>
					<Card />
				</motion.div>
			</div>
		</>
	);
}
