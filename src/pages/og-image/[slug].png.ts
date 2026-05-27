import type { APIContext, InferGetStaticPropsType } from "astro";
import type { ReactNode } from "react";
import satori, { type SatoriOptions } from "satori";
import { html } from "satori-html";
import { Resvg } from "@resvg/resvg-js";
import { siteConfig } from "@/site-config.ts";
import { getFormattedDate } from "@/utils";
import { entryIdToSlug, getAllPosts } from "@/utils/post";

import Lora from "@/assets/Lora-regular.ttf";

const ogOptions: SatoriOptions = {
	width: 1200,
	height: 630,
	fonts: [
		{
			name: "Lora",
			data: Buffer.from(Lora),
			weight: 400,
			style: "normal",
		},
		{
			name: "Lora",
			data: Buffer.from(Lora),
			weight: 700,
			style: "normal",
		},
	],
};

const markup = (title: string, description: string, pubDate: string) => {
	const truncatedDescription =
		description.length > 180 ? `${description.substring(0, 177)}...` : description;

	// Aggressive font scaling for the title
	const titleFontSize = title.length > 50 ? (title.length > 70 ? "48px" : "56px") : "64px";
	
	// Aggressive font scaling for the description
	const descriptionFontSize = description.length > 120 ? (description.length > 160 ? "24px" : "28px") : "32px";

	return html`<div style="display: flex; flex-direction: column; width: 100%; height: 100%; padding: 20px; background-color: hsl(210, 6%, 12%); font-family: 'Lora', serif;">
		<div style="display: flex; flex-direction: column; width: 100%; height: 100%; border: 1px solid hsl(210, 6%, 25%); padding: 60px; border-radius: 12px; overflow: hidden; position: relative; justify-content: space-between;">
			
			<div style="display: flex; flex-direction: column; flex: 1; justify-content: center;">
				<div style="display: flex; align-items: center; margin-bottom: 24px;">
					<div style="display: flex; height: 40px; width: 6px; margin-right: 20px; background-color: hsl(20, 100%, 60%);"></div>
					<p style="display: flex; font-size: 24px; color: hsl(203, 11%, 80%); opacity: 0.9; letter-spacing: 0.1em; margin: 0;">${pubDate.toUpperCase()}</p>
				</div>
				
				<h1 style="display: flex; font-size: ${titleFontSize}; font-weight: 700; line-height: 1.2; color: white; margin: 0;">${title}</h1>
				
				<p style="display: flex; font-size: ${descriptionFontSize}; margin-top: 24px; line-height: 1.5; max-width: 95%; color: hsl(203, 11%, 90%); opacity: 0.8; margin-bottom: 0;">${truncatedDescription}</p>
			</div>
			
			<div style="display: flex; align-items: center; justify-content: flex-end; border-top: 1px solid hsl(210, 6%, 20%); padding-top: 32px; margin-top: 20px;">
				<p style="display: flex; font-size: 28px; font-weight: 500; color: white; margin: 0;">${siteConfig.author}</p>
			</div>
		</div>
	</div>`;
};

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export async function GET(context: APIContext) {
	const { title, pubDate, description } = context.props as Props;

	const postDate = getFormattedDate(pubDate, {
		weekday: "long",
		month: "long",
	});
	const svg = await satori(markup(title, description, postDate) as unknown as ReactNode, ogOptions);
	const png = new Resvg(svg).render().asPng();
	return new Response(new Uint8Array(png), {
		headers: {
			"Content-Type": "image/png",
			"Cache-Control": "public, max-age=31536000, immutable",
		},
	});
}

export async function getStaticPaths() {
	const posts = await getAllPosts();
	return posts
		.filter(({ data }) => !data.ogImage)
		.map((post) => ({
			params: { slug: entryIdToSlug(post.id) },
			props: {
				title: post.data.title,
				description: post.data.description,
				pubDate: post.data.updatedDate ?? post.data.publishDate,
			},
		}));
}
