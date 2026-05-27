import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function toTitleCase(str: string) {
	return str
		.trim()
		.split(/\s+/)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(" ");
}

export { getFormattedDate } from "./date";
export { elementHasClass, rootInDarkMode, isMobile } from "./domElement";
export { generateToc } from "./generateToc";
export type { TocItem } from "./generateToc";
