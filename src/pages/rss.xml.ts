import rss from "@astrojs/rss";
import { siteConfig } from "@/site-config";
import { getAllPosts } from "@/utils/post";

function normalizeSiteUrl(rawSite: string | undefined) {
	if (!rawSite) return undefined;

	try {
		return new URL(rawSite).href;
	} catch {
		return new URL(`https://${rawSite}`).href;
	}
}

const SITE = normalizeSiteUrl(import.meta.env.SITE);
const entryIdToSlug = (id: string) => id.replace(/\/index\.(md|mdx)$/, "").replace(/\.(md|mdx)$/, "");

export const GET = async () => {
	const posts = await getAllPosts();
  const reversed_posts = posts.reverse();

	return rss({
		title: siteConfig.title,
		description: siteConfig.description,
		site: SITE ?? "https://amarjay.com/",
    items: reversed_posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.publishDate,
			link: `posts/${entryIdToSlug(post.id)}`,
		})),

//    customData: `<atom10:link xmlns:atom10="http://www.w3.org/2005/Atom" rel="self" type="application/rss+xml" href="${SITE}rss.xml" />`
  });
};
