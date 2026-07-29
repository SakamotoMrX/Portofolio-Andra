"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import NProgress from "nprogress";
import "../app/nprogress.css";

export default function TopProgressbar() {
	const pathname = usePathname();

	useEffect(() => {
		NProgress.start();
		const timer = setTimeout(() => NProgress.done(), 400);
		return () => {
			clearTimeout(timer);
			NProgress.done();
		};
	}, [pathname]);

	return null;
}
