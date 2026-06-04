import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { text } from "node:stream/consumers";

export type OpenLibraryResult = {
	title: string;
	description: string;
	author: string;
	cover: string;
	publishedDate: string | null;
	// Small base64-encoded blurred placeholder (data URL) to be used as a blur-up background
	blurDataURL?: string | null;
};

export type OpenLibraryCache = Record<string, OpenLibraryResult>;

export function loadOpenLibraryCache(cachePath = ".openlibrary-cache.json"): OpenLibraryCache {
	const filePath = resolve(process.cwd(), cachePath);
	const raw = readFileSync(filePath, "utf8");
	return JSON.parse(raw) as OpenLibraryCache;
}

export async function openLibraryFetch(olid: string): Promise<OpenLibraryResult> {
	if (!olid) {
		throw new Error("No OLID provided");
	}

	const cover = `https://covers.openlibrary.org/b/olid/${olid}-M.jpg`;
	const res = await fetch(`https://openlibrary.org/books/${olid}.json`, {
		signal: AbortSignal.timeout(20000),
	});

	if (!res.ok) throw new Error(`Failed to fetch book: ${olid}`);
	const edition = await res.json();

	const title = edition?.title ?? null;
	if (!title) {
		throw new Error(`No title found for book: ${olid}`);
	}
	const publishedDate = edition?.publish_date ?? null;

	const authorKey = edition?.authors?.[0]?.author?.key || edition?.authors?.[0]?.key;

	let description =
		typeof edition?.description === "string"
			? edition.description
			: (edition?.description?.value ?? null);
	if (!description) {
		const desc = await verboseDescriptionFetch(olid);
		description = desc.description;
		if (!description) {
			throw new Error(`No description found for book: ${olid}`);
		}
	}

	let author = "";
	if (authorKey) {
		const authRes = await fetch(`https://openlibrary.org${authorKey}.json`, {
			signal: AbortSignal.timeout(10000),
		});
		if (!authRes.ok) {
			throw new Error(`Failed to fetch author: ${authorKey}`);
		}

		const authorData = await authRes.json();
		author = authorData?.name ?? "";
		if (!author) {
			throw new Error(`No author found for book: ${olid}`);
		}
	}

	return {
		title,
		description: description,
		author,
		cover,
		publishedDate,
	};
}

export function getBooks() {
	return [
		{
			olid: "OL49348290M",
			spineColor: "#000000",
			textColor: "#ffffff",
			readDate: new Date("2026-04-25"),
		},
		{
			olid: "OL28302486M",
			spineColor: "#ffffff",
			textColor: "#000000",
			readDate: new Date("2025-05-15"),
		},
		{
			olid: "OL38058519M",
			spineColor: "#ffffff",
			textColor: "#4a3d12",
			readDate: new Date("2024-01-20"),
		},
		{
			olid: "OL27444262M",
			spineColor: "#228B22",
			textColor: "#ffffff",
			readDate: new Date("2023-10-05"),
		},
		{
			olid: "OL32815550M",
			spineColor: "#b91c1c",
			textColor: "#ffffff",
			readDate: new Date("2023-09-10"),
		},
		{
			olid: "OL6594179M",
			spineColor: "#a68842",
			textColor: "#000000",
			readDate: new Date("2023-07-01"),
		},
		{
			olid: "OL31988297M",
			spineColor: "#918f0c",
			textColor: "#ffffff",
			readDate: new Date("2023-06-05"),
		},
		// {
		// 	olid: "OL12551182W",
		// 	spineColor: "#2f4f4f",
		// 	textColor: "#ffffff",
		// 	readDate: new Date("2022-12-15"),
		// },
		{
			olid: "OL28940575M",
			spineColor: "#c4c36e",
			textColor: "#000000",
			readDate: new Date("2021-08-30"),
		},
		{
			olid: "OL3174961M",
			spineColor: "#4a3d12",
			textColor: "#ffffff",
			readDate: new Date("2021-02-15"),
		},
		{
			olid: "OL40231981M",
			spineColor: "#1591EA",
			textColor: "#ffffff",
			readDate: new Date("2020-12-10"),
		},
		{
			olid: "OL26234146M",
			spineColor: "#ebd9a0",
			textColor: "#000000",
			readDate: new Date("2020-03-10"),
		},
		{
			olid: "OL40274783M",
			spineColor: "#cccc00",
			textColor: "#000000",
			readDate: new Date("2019-11-05"),
		},
		{
			olid: "OL26242482M",
			spineColor: "#d97706",
			textColor: "#ffffff",
			readDate: new Date("2019-08-15"),
		},
		{
			olid: "OL51566464M",
			spineColor: "#C5A596",
			textColor: "#ffffff",
			readDate: new Date("2018-11-20"),
		},
	] as const;
}

export function fetchImage(olid: string) {
	return `https://covers.openlibrary.org/b/olid/${olid}-M.jpg`;
}

export async function verboseDescriptionFetch(olid: string): Promise<{
	description: string | null;
	source: "openlibrary" | "generated" | null;
}> {
	if (!olid) {
		return { description: null, source: null };
	}

	try {
		// 1. Edition
		const editionRes = await fetch(`https://openlibrary.org/books/${olid}.json`, {
			signal: AbortSignal.timeout(10000),
		});
		if (!editionRes.ok) return { description: null, source: null };
		const edition = await editionRes.json();

		const workKey = edition?.works?.[0]?.key;
		if (!workKey) {
			return { description: null, source: null };
		}

		// 2. Work
		const workRes = await fetch(`https://openlibrary.org${workKey}.json`, {
			signal: AbortSignal.timeout(10000),
		});
		if (!workRes.ok) return { description: null, source: null };
		const work = await workRes.json();

		// 3. Try real description first
		const rawDescription =
			typeof work?.description === "string" ? work.description : (work?.description?.value ?? null);

		if (rawDescription && rawDescription.length > 200) {
			return {
				description: rawDescription,
				source: "openlibrary",
			};
		}

		// 4. Fallback: excerpts (sometimes more detailed)
		const excerpt = work?.excerpts?.[0]?.text ?? work?.excerpts?.[0]?.excerpt ?? null;

		// 5. Subjects fallback
		const subjects: string[] = work?.subjects ?? [];

		// 6. Authors
		const authorKey = work?.authors?.[0]?.author?.key;
		let authorName: string | null = null;

		if (authorKey) {
			try {
				const aRes = await fetch(`https://openlibrary.org${authorKey}.json`, {
					signal: AbortSignal.timeout(5000),
				});
				if (aRes.ok) {
					const a = await aRes.json();
					authorName = a?.name ?? null;
				}
			} catch {}
		}

		// 7. Construct generated verbose description
		const generatedParts: string[] = [];

		if (work?.title) {
			generatedParts.push(`${work.title} is a book`);
		}

		if (authorName) {
			generatedParts.push(`written by ${authorName}`);
		}

		if (subjects.length) {
			generatedParts.push(`It covers themes like ${subjects.slice(0, 5).join(", ")}`);
		}

		if (excerpt) {
			generatedParts.push(`Excerpt: ${excerpt}`);
		}

		const generated = generatedParts.join(". ");

		return {
			description: generated.length > 50 ? generated : null,
			source: generated.length > 50 ? "generated" : null,
		};
	} catch (err) {
		return { description: null, source: null };
	}
}
