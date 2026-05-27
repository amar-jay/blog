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

const markup = (title: string, description: string, pubDate: string) =>
	html`<div style="display: flex; flex-direction: column; width: 100%; height: 100%; padding: 16px; background-color: hsl(210, 6%, 12%);">
		<div style="display: flex; flex-direction: column; width: 100%; height: 100%; border: 1px solid hsl(210, 6%, 25%); padding: 64px; justify-content: space-between; border-radius: 20px; overflow: hidden; position: relative;">
			
			<div style="display: flex; flex-direction: column; justify-content: center; flex: 1; position: relative;">
				<div style="display: flex; align-items: center; margin-bottom: 32px;">
					<div style="display: flex; height: 48px; width: 8px; margin-right: 24px; background-color: hsl(20, 100%, 60%);"></div>
					<p style="display: flex; font-size: 30px; font-family: 'Lora', serif; color: hsl(203, 11%, 90%); opacity: 0.8; letter-spacing: 2px;">${pubDate.toUpperCase()}</p>
				</div>
				<h1 style="display: flex; font-size: 70px; font-weight: 700; line-height: 1.1; font-family: 'Lora', serif; color: white;">${title}</h1>
				<p style="display: flex; font-size: 30px; margin-top: 32px; line-height: 1.6; max-width: 85%; font-family: 'Lora', serif; color: hsl(203, 11%, 95%); opacity: 0.75;">${description}</p>
			</div>
			
			<div style="display: flex; align-items: center; justify-content: flex-end; border-top: 1px solid hsl(210, 6%, 25%); padding-top: 40px; position: relative;">
				<p style="display: flex; font-size: 32px; font-weight: 500; font-family: 'Lora', serif; color: white;">${siteConfig.author}</p>
			</div>
		</div>
	</div>`;

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
