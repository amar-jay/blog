import { defineConfig } from "astro/config";
import fs from "node:fs";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import rehypeUnwrapImages from "rehype-unwrap-images";
import rehypeExternalLinks from "rehype-external-links";
import { remarkReadingTime } from "./src/utils/remark-reading-time";
import icon from "astro-icon";
import expressiveCode from "astro-expressive-code";
import { expressiveCodeOptions } from "./src/site-config";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import react from "@astrojs/react";
// import db from "@astrojs/db";
import tailwindcss from "@tailwindcss/vite";
import { env } from "node:process";
//import vercel from '@astrojs/vercel/static';

// https://astro.build/config
export default defineConfig({
	// set up port as 3000 if dev
	server:
		env.NODE_ENV === "development"
			? {
					port: 5173,
				}
			: {},
	// ! Please remember to replace the following site property with your own domain
	site: "https://amarjay.com/",
	//output: 'static',
	//adapter: vercel(),
	markdown: {
		remarkPlugins: [remarkReadingTime, remarkMath],
		rehypePlugins: [
			rehypeKatex,
			rehypeUnwrapImages,
			[
				rehypeExternalLinks,
				{
					target: "_blank",
					rel: ["nofollow, noopener, noreferrer"],
				},
			],
		],
		remarkRehype: {
			footnoteLabel: "References",
			footnoteLabelProperties: {
				className: [""],
			},
		},
	},
	integrations: [
		expressiveCode(expressiveCodeOptions),
		icon(),
		sitemap({
			serialize(item) {
				const url = new URL(item.url);
				const segments = url.pathname.split("/").filter(Boolean);

				// Remove paginated URLs (e.g., /posts/2/)
				if (segments.some((segment) => !isNaN(Number(segment)))) {
					return undefined as any;
				}

				if (item.url.includes("/posts/")) {
					const slug = segments.pop();
					if (slug && slug !== "posts") {
						const possibleFiles = [
							`src/content/post/${slug}.md`,
							`src/content/post/${slug}.mdx`,
							`src/content/post/${slug}/index.md`,
							`src/content/post/${slug}/index.mdx`,
						];
						for (const file of possibleFiles) {
							if (fs.existsSync(file)) {
								const content = fs.readFileSync(file, "utf-8");
								const match = content.match(/(?:updatedDate|publishDate):\s*["']?([^"'\n]+)["']?/);
								if (match) {
									try {
										item.lastmod = new Date(match[1] as string).toISOString();
									} catch {
										item.lastmod = fs.statSync(file).mtime.toISOString();
									}
								} else {
									item.lastmod = fs.statSync(file).mtime.toISOString();
								}
								break;
							}
						}
					}
				}
				
				delete item.priority;
				return item;
			},
		}),
		mdx(),
		react(),
		// db(),
	],
	image: {
		domains: [
			"webmention.io",
			"manans-site.vercel.app",
			"fonts.googleapis.com",
			"avatars.githubusercontent.com",
			"covers.openlibrary.org/",
		],
	},
	// https://docs.astro.build/en/guides/prefetch/
	prefetch: true,
	vite: {
		plugins: [rawFonts([".ttf", ".woff"]), tailwindcss()],
		optimizeDeps: {
			exclude: ["@resvg/resvg-js"],
		},
	},
});
function rawFonts(ext: Array<string>) {
	return {
		name: "vite-plugin-raw-fonts",
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore:next-line
		transform(_: string, id: string) {
			if (ext.some((e) => id.endsWith(e))) {
				const buffer = fs.readFileSync(id);
				return {
					code: `export default ${JSON.stringify(buffer)}`,
					map: null,
				};
			}
		},
	};
}
