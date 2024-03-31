import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export { getFormattedDate } from "./date";
export { elementHasClass, toggleClass, rootInDarkMode } from "./domElement";
export {
	getAllPosts,
	getAllProjectsClient,
  getAllProjectsServer,
	sortMDByDate,
	getUniqueTags,
	getUniqueTagsWithCount,
} from "./post";
export { generateToc } from "./generateToc";
export type { TocItem } from "./generateToc";
export { getWebmentionsForUrl } from "./webmentions";
