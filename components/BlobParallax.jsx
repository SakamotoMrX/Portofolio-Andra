// ponytail: subtle mouse parallax on bg blobs for depth feel
"use client";
import { useEffect, useRef } from "react";

export default function BlobParallax() {
	const rafRef = useRef(null);
	const mouseRef = useRef({ x: 0.5, y: 0.5 });
	const dirtyRef = useRef(false);

	useEffect(() => {
		const onMouse = (e) => {
			mouseRef.current = {
				x: e.clientX / window.innerWidth,
				y: e.clientY / window.innerHeight,
			};
			dirtyRef.current = true;
			if (!rafRef.current) {
				rafRef.current = requestAnimationFrame(animate);
			}
		};

		const animate = () => {
			rafRef.current = null;
			if (!dirtyRef.current) return;
			dirtyRef.current = false;

			const wrappers = document.querySelectorAll(".bg-blob-orb-wrapper");
			const mx = (mouseRef.current.x - 0.5) * 2;
			const my = (mouseRef.current.y - 0.5) * 2;
			wrappers.forEach((w, i) => {
				const factor = 12 + i * 6;
				w.style.setProperty("--parallax-x", `${mx * factor}px`);
				w.style.setProperty("--parallax-y", `${my * factor}px`);
			});
		};

		window.addEventListener("mousemove", onMouse, { passive: true });

		return () => {
			window.removeEventListener("mousemove", onMouse);
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
		};
	}, []);

	return null;
}
