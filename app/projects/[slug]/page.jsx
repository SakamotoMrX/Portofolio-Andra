"use client";
import { useState, useEffect, use, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import jsonData from "@/json/data.json";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import NotFound from "@/app/not-found";
import Image from "next/image";
import BlurImage from "@/public/image/placeholder/blur.jpg";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

function ProjectImage({ src, alt, index }) {
	const [loaded, setLoaded] = useState(false);
	const handleLoad = useCallback(() => setLoaded(true), []);

	return (
		<div className="relative mb-5 max-w-7xl mx-auto w-full">
			{!loaded && (
				<div className="absolute inset-0 animate-pulse bg-neutral-300 rounded" />
			)}
			<Image
				src={src}
				alt={alt}
				width={1920}
				height={1080}
				className={`h-auto w-full object-contain transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
				placeholder="blur"
				blurDataURL={BlurImage.src}
				loading={index === 0 ? "eager" : "lazy"}
				onLoad={handleLoad}
			/>
		</div>
	);
}

function ScrollDownButton() {
  const [isAtBottom, setIsAtBottom] = useState(false);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop < document.documentElement.scrollHeight - document.documentElement.clientHeight) {

      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
				setIsAtBottom(true);

    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
			setIsAtBottom(false);
    }
  };

  return (
    <div className="fixed bottom-5 left-0 right-0 flex justify-center items-center mb-10">
      <motion.div
        className="h-12 w-12 glass-icon rounded-full flex justify-center items-center cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleScroll}
      >
        <FontAwesomeIcon
          icon={isAtBottom ? faChevronUp : faChevronDown}
          className="text-white/70 text-xl"
        />
      </motion.div>
    </div>
  );
}


function Page(props) {
    const params = use(props.params);
    const router = useRouter();
    const [data, setData] = useState(null);
    useEffect(() => {
		const selectedData = jsonData.Projects.find(
			(item) => item.slug === params.slug
		);
		if (selectedData === undefined) {
			setData("404");
		} else {
			setData(selectedData);
		}
	}, [params.slug]);

    if (data === "404") {
		return (
			<>
				<NotFound />
			</>
		);
	} else if (!data) {
		return (
			<div className="relative min-h-screen w-full gap-4 p-4 md:p-10 flex justify-center items-center flex-col mb-10">
				<div className="min-h-screen flex justify-center items-center w-full max-w-6xl">
					<div className="mx-auto grid grid-cols-1 md:grid-cols-2 w-full gap-4 md:gap-8 px-2">
						<div className="glass-static p-6 md:p-10 flex justify-center items-start flex-col mb-5 space-y-6 md:space-y-10">
							<div className="animate-pulse bg-white/10 h-8 w-3/4 rounded"></div>
							<div className="animate-pulse bg-white/10 h-8 w-1/2 rounded"></div>
							<div className="animate-pulse bg-white/10 h-8 w-1/3 rounded"></div>
							<div className="animate-pulse bg-white/10 h-8 w-2/3 rounded"></div>
							<div className="animate-pulse bg-white/10 h-8 w-1/2 rounded"></div>
						</div>
						<div className="glass-static p-6 md:p-10 flex justify-start items-start flex-col mb-5">
							<div className="animate-pulse bg-white/10 h-6 w-1/3 rounded mb-6"></div>
							<div className="animate-pulse bg-white/10 h-24 w-full rounded"></div>
							<div className="animate-pulse bg-white/10 h-24 w-full rounded mt-4"></div>
						</div>
					</div>
				</div>
				{/* images */}
				<div className="mx-auto grid grid-cols-1 p-4 md:p-20 w-full max-w-6xl">
					<div className="w-full h-auto aspect-video">
						<div className="animate-pulse bg-white/10 h-full w-full rounded-xl"></div>
					</div>
				</div>
			</div>
		);
	}
	return (
		<div className="relative min-h-screen w-full gap-4 p-4 md:p-10 flex justify-center items-center flex-col mb-10">
			<button
				onClick={() => router.back()}
				className="fixed top-2 left-2 md:left-10 flex justify-center items-center rounded-full p-3 md:p-4 transition duration-300 ease-in-out z-50 glass-icon"
				aria-label="Go back">
				<FontAwesomeIcon
					icon={faChevronLeft}
					className="text-white/70"
				/>
			</button>
			<ScrollDownButton />
			<div className="min-h-screen flex justify-center items-center w-full">
				<div className="mx-auto grid grid-cols-1 md:grid-cols-2 mt-10 md:mt-0 w-full max-w-6xl px-2 md:px-0">
					<div className="min-h-screen sm:min-h-0 flex justify-center items-start flex-col mb-5 space-y-8 md:space-y-10 mx-auto w-full glass-static p-6 md:p-10">
						<div>
							<h2 className="uppercase font-normal text-sm md:text-lg tracking-[4px] md:tracking-[8px] text-white/40">
								Project
							</h2>
							<h1 className="text-3xl md:text-4xl font-bold text-white mt-2">
								{data.title}
							</h1>
						</div>
						<div>
							<h2 className="uppercase font-normal text-sm md:text-lg tracking-[4px] md:tracking-[8px] text-white/40">
								Technology
							</h2>
							<p className="text-lg md:text-2xl font-medium text-white/80 mt-2">
								{data.tech.join(", ")}
							</p>
						</div>
						<div>
							<h2 className="uppercase font-normal text-sm md:text-lg tracking-[4px] md:tracking-[8px] text-white/40">
								Year
							</h2>
							<p className="text-lg md:text-2xl font-medium text-white/80 mt-2">
								{data.year}
							</p>
						</div>
						{data.preview && (
							<div>
								<h2 className="uppercase font-normal text-sm md:text-lg tracking-[4px] md:tracking-[8px] text-white/40">
									Preview
								</h2>
								<p className="text-lg md:text-2xl font-medium mt-2">
									<a
										href={data.preview}
										target="_blank"
										rel="noopener noreferrer"
										className="text-teal-400 hover:text-teal-300 transition-colors">
										Preview{" "}
										<FontAwesomeIcon
											icon={faArrowUpRightFromSquare}
											className="ml-2 md:ml-3 text-sm md:text-base"
										/>
									</a>
								</p>
							</div>
						)}
						{data.code && (
							<div>
								<h2 className="uppercase font-normal text-sm md:text-lg tracking-[4px] md:tracking-[8px] text-white/40">
									Source Code
								</h2>
								<p className="text-lg md:text-2xl font-medium mt-2">
									<a
										href={data.code}
										target="_blank"
										rel="noopener noreferrer"
										className="text-teal-400 hover:text-teal-300 transition-colors">
										Github{" "}
										<FontAwesomeIcon
											icon={faGithub}
											className="ml-2 md:ml-3 text-sm md:text-base"
										/>
									</a>
								</p>
							</div>
						)}
					</div>
					<div className="flex justify-start items-start flex-col mb-5 glass-static p-6 md:p-10">
						<h2 className="uppercase font-normal text-sm md:text-lg tracking-[4px] md:tracking-[8px] text-white/40">
							Description
						</h2>
						{data.desc.map((desc, index) => (
							<p
								key={index}
								className="text-base md:text-xl text-justify tracking-wide font-normal text-white/70 mb-5 mt-4 leading-relaxed">
								{desc}
							</p>
						))}
					</div>
				</div>
			</div>
			{/* images */}
			<div className="mx-auto grid grid-cols-1 p-4 md:p-20 w-full max-w-6xl">
				<div className="w-full h-auto text-center flex flex-col justify-center">
					{data.images.map((image, index) => (
						<ProjectImage
							key={index}
							src={image}
							alt={`Project Image ${index + 1}`}
							index={index}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default Page;
