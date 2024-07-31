//import type { Config } from "tailwindcss";

import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}"],
	corePlugins: {
		// disable aspect ratio as per docs -> @tailwindcss/aspect-ratio
		aspectRatio: false,
		borderOpacity: false,
		fontVariantNumeric: false,
		ringOffsetColor: false,
		ringOffsetWidth: false,
		scrollSnapType: false,
		textOpacity: false,
		// disable some core plugins as they are included in the css, even when unused
		touchAction: false,
	},
	darkMode: ["class", '[data-theme="dark"]'],
	plugins: [
		require("tailwindcss-animate"),
		require("@tailwindcss/typography"),
		require("@tailwindcss/aspect-ratio"),
		plugin(function ({ addComponents }) {
			addComponents({
				".blog-link": {
					"&:hover": {
						backgroundImage:
							"linear-gradient(transparent,transparent 4px,hsl(var(--theme-link)) 4px,hsl(var(--theme-link)))",
					},
					"@apply bg-[size:100%_6px] bg-bottom bg-repeat-x": {},
					backgroundImage:
						"linear-gradient(transparent,transparent 5px,hsl(var(--theme-text)) 5px,hsl(var(--theme-text)))",
				},
				".title": {
					"@apply text-2xl font-serif font-semibold text-accent-2": {},
				},
			});
		}),
	],
	theme: {
		extend: {
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
			colors: {
				accent: "var(--theme-accent)",
				"accent-2": "var(--theme-accent-2)",
				background: "var(--theme-bg) / <alpha-value>",
				border: "var(--border)",
				card: {
					DEFAULT: "var(--card)",
					foreground: "var(--card-foreground)",
				},
				/*
				destructive: {
					DEFAULT: "var(--destructive)",
					foreground: "hsl(var(--destructive-foreground))",
				},
        */
				foreground: "var(--foreground)",
				input: "var(--input)",
				link: "var(--theme-link)",
				muted: {
					DEFAULT: "var(--muted)",
					foreground: "var(--muted-foreground)",
				},
				popover: {
					DEFAULT: "var(--popover)",
					foreground: "hsl(var(--popover-foreground))",
				},
				primary: {
					DEFAULT: "var(--primary))",
					foreground: "var(--primary-foreground)",
				},
				quote: "var(--theme-quote)",
				ring: "var(--ring)",
				secondary: {
					DEFAULT: "var(--secondary)",
					foreground: "var(--secondary-foreground)",
				},
				textColor: "var(--theme-text)",
			},

			fontFamily: {
				// Add any custom fonts here
				sans: ["Raleway", ...fontFamily.sans],
				serif: ["Lora", ...fontFamily.serif],
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			// Remove above once tailwindcss exposes theme type
			// transitionProperty: {
			// 	height: "height",
			// },
      // Remove above once tailwindcss exposes theme type
			typography: (theme) => ({
				DEFAULT: {
					css: {
						a: {
							"@apply text-link underline cursor-pointer": "",
						},
						blockquote: {
							borderLeftWidth: "0",
						},
						code: {
							border: "1px dotted #666",
							borderRadius: "2px",
						},
						hr: {
							borderTopStyle: "dashed",
						},
						strong: {
							"@apply font-bold text-link": "",
						},
						sup: {
							"@apply ms-0.5": "",
							a: {
								"&:after": {
									content: "']'",
								},
								"&:before": {
									content: "'['",
								},
								"&:hover": {
									"@apply text-link no-underline bg-none": "",
								},
								"@apply bg-none": "",
							},
						},
						"tbody tr": {
							borderBottomWidth: "none",
						},
						tfoot: {
							borderTop: "1px dashed #666",
						},
						thead: {
							borderBottomWidth: "none",
						},
						"thead th": {
							borderBottom: "1px dashed #666",
							fontWeight: "700",
						},
					},
				},
				blog: {
					css: {
						"--tw-prose-body": theme("colors.textColor"),
						"--tw-prose-bold": theme("colors.textColor"),
						"--tw-prose-bullets": theme("colors.textColor"),
						"--tw-prose-code": theme("colors.quote"),
						"--tw-prose-headings": theme("colors.accent-2 / 1"),
						"--tw-prose-hr": "0.5px dashed #666",
						"--tw-prose-links": theme("colors.link"),
						"--tw-prose-quotes": theme("colors.quote / 1"),
						"--tw-prose-th-borders": "#666",
					},
				},
				sm: {
					css: {
						code: {
							fontSize: theme("fontSize.sm")[0],
							fontWeight: "400",
						},
					},
				},
			}),
		},
	},
};
