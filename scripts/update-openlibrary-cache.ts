import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { fetchImage, getBooks, openLibraryFetch, type OpenLibraryResult } from "../src/utils/open-library";

const cachePath = resolve(process.cwd(), ".openlibrary-cache.json");
const books = getBooks();

const existingCache: Record<string, OpenLibraryResult> = existsSync(cachePath)
	? (JSON.parse(readFileSync(cachePath, "utf8")) as Record<string, OpenLibraryResult>)
	: {};

const cache: Record<string, OpenLibraryResult> = {};

const genericBookCover = (
  title: string,
  color: string,
  textColor: string
) => `<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 240 360"
  role="img"
  aria-label="${title.replace(/"/g, '&quot;')}"
>
  <defs>
    <linearGradient id="cover" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${color}" />
      <stop offset="100%" stop-color="rgba(0,0,0,.15)" />
    </linearGradient>

    <linearGradient id="spine" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(0,0,0,.25)" />
      <stop offset="100%" stop-color="rgba(255,255,255,.1)" />
    </linearGradient>
  </defs>

  <rect
    width="240"
    height="360"
    rx="10"
    fill="url(#cover)"
  />

  <rect
    x="0"
    y="0"
    width="24"
    height="360"
    rx="10"
    fill="url(#spine)"
  />

  <rect
    x="8"
    y="8"
    width="224"
    height="344"
    rx="6"
    fill="none"
    stroke="rgba(255,255,255,.2)"
  />

  <rect
    x="48"
    y="70"
    width="144"
    height="2"
    fill="${textColor}"
    opacity=".4"
  />

  <text
    x="120"
    y="150"
    text-anchor="middle"
    fill="${textColor}"
    font-family="Inter, system-ui, sans-serif"
    font-size="22"
    font-weight="700"
  >
    ${title}
  </text>

  <rect
    x="80"
    y="285"
    width="80"
    height="4"
    rx="2"
    fill="${textColor}"
    opacity=".4"
  />
</svg>`;

for (const book of books) {
	const existing = existingCache[book.olid];
	const metadata = existing ?? (await openLibraryFetch(book.olid));
	cache[book.olid] = {
		...metadata,
		cover: metadata.cover ?? fetchImage(book.olid),
		blurDataURL: metadata.blurDataURL ?? genericBookCover(metadata.title, book.spineColor, book.textColor),
	};
}

writeFileSync(cachePath, `${JSON.stringify(cache, null, 2)}\n`, "utf8");
