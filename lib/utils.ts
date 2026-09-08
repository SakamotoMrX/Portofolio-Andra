import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn — shadcn utility wrapper.
 * Merges clsx + tailwind-merge to resolve Tailwind class conflicts cleanly.
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
