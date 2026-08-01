"use client";
import { MotionConfig } from "framer-motion";

export default function ReducedMotionProvider({ children }) {
	return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
