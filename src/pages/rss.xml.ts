import rss from "@astrojs/rss";
import { siteConfig } from "@/site-config";
import { getAllPosts } from "@/utils";

const SITE = import.meta.env.SITE;

export const GET = async () => {
	const posts = await getAllPosts();
  const reversed_posts = posts.reverse()

	return rss({
		title: siteConfig.title,
		description: siteConfig.description,
		site: SITE,
    items: reversed_posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.publishDate,
			link: `posts/${post.slug}`,
		})),

//    customData: `<atom10:link xmlns:atom10="http://www.w3.org/2005/Atom" rel="self" type="application/rss+xml" href="${SITE}rss.xml" />`
  });
};
