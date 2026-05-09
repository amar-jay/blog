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

function extractDescription(workData: any): string | null {
	const desc = workData?.description;
	if (!desc) return null;
	return typeof desc === "string" ? desc : desc.value ?? null;
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

		const description = extractDescription(work);

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
