import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export { getFormattedDate } from "./date";
export { elementHasClass, rootInDarkMode, isMobile } from "./domElement";
export { generateToc } from "./generateToc";
export type { TocItem } from "./generateToc";
export { default as openLibraryFetch } from "./open-library";
