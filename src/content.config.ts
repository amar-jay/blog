import { defineCollection } from "astro:content";
import { z } from 'astro/zod'
import { glob } from "astro/loaders"; // Required for Astro 6

function removeDupsAndLowerCase(array: string[]) {
    if (!array.length) return array;
    const lowercaseItems = array.map((str) => str.toLowerCase());
    return Array.from(new Set(lowercaseItems));
}

const post = defineCollection({
    // 1. We switch to 'loader' for Astro 6
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/post" }),
    schema: ({ image }) =>
        z.object({
            title: z.string().min(1),
            description: z.string().min(30),
            // 2. Use coerce for cleaner date handling
            publishDate: z.coerce.date(),
            updatedDate: z.coerce.date().optional(),
            coverImage: z
                .object({
                    src: image(),
                    alt: z.string(),
                })
                .optional(),
            draft: z.boolean().default(false),
            tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
            ogImage: z.string().optional(),
        }),
});

const project = defineCollection({
    // 3. Define the loader for projects
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/project" }),
    schema: z.object({
        title: z.string().min(5),
        github: z.string().min(1),
        tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
    }),
});

export const collections = { post, project };