type OpenLibraryResult = {
	title: string | null;
	description: string | null;
	author: string | null;
	cover: string | null;
	publishedDate: string | null;
};

async function fetchJSON(url: string) {
	const res = await fetch(url);
	if (!res.ok) throw new Error(`Failed request: ${url}`);
	return res.json();
}

export default async function openLibraryFetch(olid: string): Promise<OpenLibraryResult> {
	if (!olid) {
		return {
			title: null,
			description: null,
			author: null,
			cover: null,
			publishedDate: null,
		};
	}

	try {
		const edition = await fetchJSON(
			`https://openlibrary.org/books/${olid}.json`
		);

		const title = edition?.title ?? null;
		const publishedDate = edition?.publish_date ?? null;

		const cover = `https://covers.openlibrary.org/b/olid/${olid}-M.jpg`;

		const workKey = edition?.works?.[0]?.key;
		if (!workKey) {
			return {
				title,
				description: null,
				author: null,
				cover,
				publishedDate,
			};
		}

		const work = await fetchJSON(
			`https://openlibrary.org${workKey}.json`
		);

		const description =
			typeof work?.description === "string"
				? work.description
				: work?.description?.value ?? null;

		const authorKey =
			work?.authors?.[0]?.author?.key ||
			edition?.authors?.[0]?.key;

		let author: string | null = null;

		if (authorKey) {
			const authorData = await fetchJSON(
				`https://openlibrary.org${authorKey}.json`
			);
			author = authorData?.name ?? null;
		}

		return {
			title,
			description,
			author,
			cover,
			publishedDate,
		};
	} catch (err) {
		console.error(err);

		return {
			title: null,
			description: null,
			author: null,
			cover: `https://covers.openlibrary.org/b/olid/${olid}-M.jpg`,
			publishedDate: null,
		};
	}
}

export function getBooks() {
	return [
		{
			title: "Dune",
			slug: "/books/dune",
			spineColor: "#d97706",
			textColor: "#ffffff",
			olid: "OL26242482M",
			coverImage: fetchImage("OL26242482M"),
		},
		{
			title: "The Martian",
			slug: "/books/the-martian",
			spineColor: "#b91c1c",
			textColor: "#ffffff",
			olid: "OL32815550M",
			coverImage: fetchImage("OL32815550M"),
		},
		{
			title: "Neuromancer",
			slug: "/books/neuromancer",
			spineColor: "#228B22",
			textColor: "#ffffff",
			olid: "OL27444262M",
			coverImage: fetchImage("OL27444262M"),
		},
		{
			title: "Foundation",
			slug: "/books/foundation",
			spineColor: "#C5A596",
			textColor: "#ffffff",
			olid: "OL51566464M",
			coverImage: fetchImage("OL51566464M"),
		},
		{
			title: "1984",
			slug: "/books/1984",
			spineColor: "#0f172a",
			textColor: "#ffffff",
			olid: "OL3174961M",
			coverImage: fetchImage("OL3174961M"),
		},
		{
			title: "The Rosie Proect",
			slug: "/books/rosie-project",
			spineColor: "#1591EA",
			textColor: "#ffffff",
			olid: "OL40231981M",
			coverImage: fetchImage("OL40231981M"),
		},
	] as const;
}

export function fetchImage(olid: string) {
	return `https://covers.openlibrary.org/b/olid/${olid}-M.jpg`;
}

export async function verboseDescriptionFetch(
	olid: string,
): Promise<{
	description: string | null;
	source: "openlibrary" | "generated" | null;
}> {
	if (!olid) {
		return { description: null, source: null };
	}

	try {
		// 1. Edition
		const edition = await fetchJSON(
			`https://openlibrary.org/books/${olid}.json`,
		);

		const workKey = edition?.works?.[0]?.key;
		if (!workKey) {
			return { description: null, source: null };
		}

		// 2. Work
		const work = await fetchJSON(
			`https://openlibrary.org${workKey}.json`,
		);

		// 3. Try real description first
		const rawDescription =
			typeof work?.description === "string"
				? work.description
				: work?.description?.value ?? null;

		if (rawDescription && rawDescription.length > 200) {
			return {
				description: rawDescription,
				source: "openlibrary",
			};
		}

		// 4. Fallback: excerpts (sometimes more detailed)
		const excerpt =
			work?.excerpts?.[0]?.text ??
			work?.excerpts?.[0]?.excerpt ??
			null;

		// 5. Subjects fallback (very useful)
		const subjects: string[] = work?.subjects ?? [];

		// 6. Authors
		const authorName =
			work?.authors?.[0]?.author?.key
				? await (async () => {
						try {
							const a = await fetchJSON(
								`https://openlibrary.org${work.authors[0].author.key}.json`,
							);
							return a?.name ?? null;
						} catch {
							return null;
						}
				  })()
				: null;

		// 7. Construct generated verbose description
		const generatedParts: string[] = [];

		if (work?.title) {
			generatedParts.push(`${work.title} is a novel`);
		}

		if (authorName) {
			generatedParts.push(`written by ${authorName}`);
		}

		if (subjects.length) {
			generatedParts.push(
				`It explores themes such as ${subjects
					.slice(0, 8)
					.join(", ")}`,
			);
		}

		if (excerpt) {
			generatedParts.push(`Excerpt context: ${excerpt}`);
		}

		const generated = generatedParts.join(". ");

		return {
			description: generated.length > 50 ? generated : null,
			source: generated.length > 50 ? "generated" : null,
		};
	} catch (err) {
		console.error(err);
		return { description: null, source: null };
	}
}