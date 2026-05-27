import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { fetchImage, getBooks, openLibraryFetch, type OpenLibraryResult } from "../src/utils/open-library";

const cachePath = resolve(process.cwd(), ".openlibrary-cache.json");
const books = getBooks();

const existingCache: Record<string, OpenLibraryResult> = existsSync(cachePath)
	? (JSON.parse(readFileSync(cachePath, "utf8")) as Record<string, OpenLibraryResult>)
	: {};

const cache: Record<string, OpenLibraryResult> = {};

function createPlaceholderDataURL(title: string) {
	const safeTitle = title.replace(/[<>&"]/g, "");
	const svg = `
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" role="img" aria-label="${safeTitle}">
			<defs>
				<linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
					<stop offset="0%" stop-color="#ece7df"/>
					<stop offset="100%" stop-color="#c9c1b4"/>
				</linearGradient>
			</defs>
			<rect width="24" height="36" rx="2" fill="url(#g)"/>
			<rect x="2" y="2" width="20" height="32" rx="1.5" fill="rgba(255,255,255,0.35)"/>
		</svg>
	`;
	return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

for (const book of books) {
	const existing = existingCache[book.olid];
	const metadata = existing ?? (await openLibraryFetch(book.olid));

	cache[book.olid] = {
		...metadata,
		cover: metadata.cover ?? fetchImage(book.olid),
		blurDataURL: metadata.blurDataURL ?? createPlaceholderDataURL(metadata.title),
	};
}

writeFileSync(cachePath, `${JSON.stringify(cache, null, 2)}\n`, "utf8");
