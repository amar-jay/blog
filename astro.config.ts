import { defineConfig } from "astro/config";
import fs from "node:fs";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import remarkUnwrapImages from "remark-unwrap-images";
import rehypeExternalLinks from "rehype-external-links";
import { remarkReadingTime } from "./src/utils/remark-reading-time";
import icon from "astro-icon";
import expressiveCode from "astro-expressive-code";
import { expressiveCodeOptions } from "./src/site-config";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import react from "@astrojs/react";
import db from "@astrojs/db";
//import vercel from '@astrojs/vercel/static';

// https://astro.build/config
export default defineConfig(
	{
		// ! Please remember to replace the following site property with your own domain
		site: "https://amarjay.com/",
		//output: 'static',
		//adapter: vercel(),
		markdown:
			{
				remarkPlugins:
					[
						remarkUnwrapImages,
						remarkReadingTime,
						remarkMath,
					],
				rehypePlugins:
					[
						rehypeKatex,
						[
							rehypeExternalLinks,
							{
								target:
									"_blank",
								rel: [
									"nofollow, noopener, noreferrer",
								],
							},
						],
					],
				remarkRehype:
					{
						footnoteLabelProperties:
							{
								className:
									[
										"",
									],
							},
					},
			},
		integrations:
			[
				expressiveCode(
					expressiveCodeOptions
				),
				icon(),
				tailwind(
					{
						applyBaseStyles:
							false,
					}
				),
				sitemap(),
				mdx(),
				react(),
				db(),
			],
		image:
			{
				domains:
					[
						"webmention.io",
						"manans-site.vercel.app",
						"fonts.googleapis.com",
						"avatars.githubusercontent.com",
					],
			},
		// https://docs.astro.build/en/guides/prefetch/
		prefetch:
			true,
		vite: {
			plugins:
				[
					rawFonts(
						[
							".ttf",
							".woff",
						]
					),
				],
			optimizeDeps:
				{
					exclude:
						[
							"@resvg/resvg-js",
						],
				},
		},
	}
);
function rawFonts(
	ext: Array<string>
) {
	return {
		name: "vite-plugin-raw-fonts",
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore:next-line
		transform(
			_,
			id
		) {
			if (
				ext.some(
					e =>
						id.endsWith(
							e
						)
				)
			) {
				const buffer =
					fs.readFileSync(
						id
					);
				return {
					code: `export default ${JSON.stringify(
						buffer
					)}`,
					map: null,
				};
			}
		},
	};
}
