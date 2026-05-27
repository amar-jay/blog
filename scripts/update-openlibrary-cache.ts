import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { fetchImage, getBooks, openLibraryFetch, type OpenLibraryResult } from "../src/utils/open-library";

const cachePath = resolve(process.cwd(), ".openlibrary-cache.json");
const books = getBooks();
const cache: Record<string, OpenLibraryResult> = {};

for (const book of books) {
	const metadata = await openLibraryFetch(book.olid);
	cache[book.olid] = {
		...metadata,
		cover: metadata.cover ?? fetchImage(book.olid),
	};
}

writeFileSync(cachePath, `${JSON.stringify(cache, null, 2)}\n`, "utf8");
