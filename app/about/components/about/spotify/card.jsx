import React, { useEffect, useState } from "react";
import getNowPlayingItem from "./fetch";
import PlayingAnimation from "./animation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";

const Card = () => {
	const [loading, setLoading] = useState(true);
	const [result, setResult] = useState({});
	const isEnabled = process.env.NEXT_PUBLIC_SPOTIFY_ENABLED === "true";

	useEffect(() => {
		if (!isEnabled) {
			setLoading(false);
			return;
		}

		const fetchData = async () => {
			try {
				const results = await Promise.all([getNowPlayingItem()]);
				setResult(results[0] || {});
			} catch (e) {
				console.error("Spotify fetch error", e);
			} finally {
				setLoading(false);
			}
		};
		fetchData();

		const intervalId = setInterval(fetchData, 60 * 1000);
		return () => clearInterval(intervalId);
	}, [isEnabled]);

	if (!isEnabled) return null;

	return (
		<div className="mt-3 flex justify-center w-full">
			{loading ? (
				<div className="flex justify-center mb-8">
					<div className="loader ease-linear rounded-full border-4 border-t-4 border-black h-12 w-12 mb-4"></div>
				</div>
			) : (
				<div className="relative w-full mb-8 grid grid-cols-2 gap-2 p-4 rounded-lg glass-static">
					{result.isPlaying && (
						<Image
							src={result.albumImageUrl}
							alt="backgroundImage"
							fill
							className="z-0 opacity-20 absolute object-cover rounded-lg"
						/>
					)}
					<div className="z-10 flex items-center">
						<FontAwesomeIcon
							icon={faSpotify}
							className="text-[#1DB954] text-4xl md:text-5xl me-3 md:me-5"
						/>
						<p className="font-semibold text-sm md:text-base text-white/80 me-3 md:me-5">
							{result.isPlaying ? "Now playing" : "Currently offline"}
						</p>
						{result.isPlaying && <PlayingAnimation />}
					</div>
					{result.isPlaying && (
						<div className="z-10 rounded-lg ms-3 md:ms-5">
							<div className="flex items-center space-x-4">
								<div className="overflow-hidden">
									<a
										href={result.songUrl ? encodeURI(result.songUrl) : "#"}
										target="_blank"
										className="block font-semibold w-full truncate text-teal-400 hover:text-teal-300 transition-colors text-sm md:text-base">
										{result.title}
									</a>
									<p className="truncate text-white/50 text-xs md:text-sm">
										{result.artist}
									</p>
								</div>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Card;
