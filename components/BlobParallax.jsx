// ponytail: subtle mouse parallax on bg blobs for depth feel
"use client";
import { useEffect, useRef } from "react";

export default function BlobParallax() {
	const rafRef = useRef(null);
	const mouseRef = useRef({ x: 0.5, y: 0.5 });
	const dirtyRef = useRef(false);

	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		if (window.matchMedia("(pointer: coarse)").matches) return;

		let cached = null;
		const onResize = () => {
			cached = null;
		};

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

			if (!cached) cached = document.querySelectorAll(".bg-blob-purple, .bg-blob-teal");
			const mx = (mouseRef.current.x - 0.5) * 2;
			const my = (mouseRef.current.y - 0.5) * 2;
			cached.forEach((w, i) => {
				const factor = 12 + i * 6;
				w.style.setProperty("--parallax-x", `${mx * factor}px`);
				w.style.setProperty("--parallax-y", `${my * factor}px`);
			});
		};

		window.addEventListener("mousemove", onMouse, { passive: true });
		window.addEventListener("resize", onResize, { passive: true });

		return () => {
			window.removeEventListener("mousemove", onMouse);
			window.removeEventListener("resize", onResize);
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
		};
	}, []);

	return null;
}
