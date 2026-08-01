"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE_SELECTOR =
	"a, button, [role='button'], .glass-btn, .glass-icon, .glass-card";

export default function CursorFollower() {
	const x = useMotionValue(-100);
	const y = useMotionValue(-100);

	// Dot tracks the cursor tightly
	const dotX = useSpring(x, { stiffness: 1500, damping: 80, mass: 0.3 });
	const dotY = useSpring(y, { stiffness: 1500, damping: 80, mass: 0.3 });

	// Ring trails with a softer lag
	const ringX = useSpring(x, { stiffness: 100, damping: 15, mass: 0.5 });
	const ringY = useSpring(y, { stiffness: 100, damping: 15, mass: 0.5 });

	const ringScale = useSpring(1, { stiffness: 300, damping: 20 });
	const ringOpacity = useSpring(0.35, { stiffness: 300, damping: 20 });

	useEffect(() => {
		const onMove = (e) => {
			x.set(e.clientX);
			y.set(e.clientY);
		};

		const onOver = (e) => {
			const interactive = e.target.closest?.(INTERACTIVE_SELECTOR);
			if (interactive) {
				ringScale.set(1.8);
				ringOpacity.set(0.9);
			} else {
				ringScale.set(1);
				ringOpacity.set(0.35);
			}
		};

		window.addEventListener("mousemove", onMove, { passive: true });
		document.addEventListener("mouseover", onOver, { passive: true });
		return () => {
			window.removeEventListener("mousemove", onMove);
			document.removeEventListener("mouseover", onOver);
		};
	}, [x, y, ringScale, ringOpacity]);

	return (
		<div className="cursor-follower" aria-hidden="true">
			<motion.div className="cursor-dot" style={{ x: dotX, y: dotY }} />
			<motion.div
				className="cursor-ring"
				style={{
					x: ringX,
					y: ringY,
					scale: ringScale,
					opacity: ringOpacity,
				}}
			/>
		</div>
	);
}
