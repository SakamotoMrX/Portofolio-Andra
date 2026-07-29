import { motion } from "framer-motion";

const PlayingAnimation = () => {
	return (
		<div className="relative flex justify-between w-4 h-8 space-x-[3px]">
			<motion.span
				className="w-[3px] h-full bg-[#1DB954] rounded-full origin-bottom"
				animate={{ scaleY: [0.3, 1, 0.5, 0.75, 0.5] }}
				transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
			/>
			<motion.span
				className="w-[3px] h-full bg-[#1DB954] rounded-full origin-bottom"
				animate={{ scaleY: [0.3, 1, 0.5, 0.75, 0.5] }}
				transition={{ duration: 2.2, repeat: Infinity, delay: -2, ease: "easeInOut" }}
			/>
			<motion.span
				className="w-[3px] h-full bg-[#1DB954] rounded-full origin-bottom"
				animate={{ scaleY: [0.3, 1, 0.5, 0.75, 0.5] }}
				transition={{ duration: 2.2, repeat: Infinity, delay: -3.7, ease: "easeInOut" }}
			/>
		</div>
	);
};

export default PlayingAnimation;
