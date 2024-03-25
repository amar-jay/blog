import rss from "@astrojs/rss";
import { siteConfig } from "@/site-config";
import { getAllPosts } from "@/utils";

const SITE = import.meta.env.SITE;

// set up some custom XML tags to inject into the RSS feed
//const customDataTags = [
  // enable Atom feed, as some RSS readers use that format
  // https://www.fpds.gov/wiki/index.php/FAADC_Atom_Feed_Specifications_V_1.0
  // enable language metadata
//  `<language>en-us</language>`,
//];

export const GET = async () => {
	const posts = await getAllPosts();

	return rss({
		title: siteConfig.title,
		description: siteConfig.description,
		site: SITE,
    items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.publishDate,
			link: `posts/${post.slug}`,
		})),

//    customData: `<atom:link href="https://amar-jay.vercel.app/rss.xml" rel="self" type="application/rss+xml" />`,
  });
};
