import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ORANGE = "#f97316";
const DARK_BG = "#1f2124";
const ACCENT_DARK = "#2a2d31";

/**
 * Generates a simple, bold orange circle icon.
 * Matches the inline favicon SVG in BaseHead.astro:
 *   <circle cx="8" cy="8" r="8" fill="#f97316"/>
 */
async function generateCircleIcon(size: number, outPath: string) {
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="${size}" height="${size}">
		<circle cx="8" cy="8" r="7.5" fill="${ORANGE}"/>
	</svg>`;

	await sharp(Buffer.from(svg))
		.resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
		.png()
		.toFile(outPath);

	console.log(`  Icon: ${path.basename(outPath)} (${size}x${size})`);
}

/**
 * Generates the full set of PWA icons in recommended sizes.
 * All icons use the same simple orange circle for brand consistency.
 */
async function generateIcons(publicDir: string) {
	// Most important + useful sizes for modern devices + Android/iOS/desktop
	const iconSizes = [48, 72, 96, 128, 144, 192, 256, 384, 512];

	console.log("\nGenerating PWA icons (simple orange circle matching favicon)...");

	for (const size of iconSizes) {
		const filename = `${size}x${size}.png`;
		await generateCircleIcon(size, path.join(publicDir, filename));
	}

	// Apple recommends 180×180 for apple-touch-icon
	await generateCircleIcon(180, path.join(publicDir, "apple-touch-icon.png"));

	console.log("Icons complete.");
}

/**
 * Creates high-quality, on-brand screenshot images for the install prompt.
 * These are stylized to match the site's dark theme + orange accent rather than
 * being literal full-page renders (much more reliable and still very effective).
 */
async function generateScreenshots(publicDir: string) {
	const screenshotsDir = path.join(publicDir, "screenshots");
	fs.mkdirSync(screenshotsDir, { recursive: true });

	console.log("\nGenerating branded PWA screenshots...");

	// Narrow / mobile portrait (good for phones)
	const narrowSvg = `
	<svg width="1080" height="1920" xmlns="http://www.w3.org/2000/svg">
		<rect width="1080" height="1920" fill="${DARK_BG}"/>
		
		<!-- Header -->
		<rect x="0" y="0" width="1080" height="220" fill="#25282c"/>
		<circle cx="140" cy="110" r="52" fill="${ORANGE}"/>
		<text x="230" y="135" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="68" font-weight="700" fill="#f1f1f3">amar jay</text>
		
		<!-- Intro -->
		<text x="100" y="320" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="44" fill="#c5c7cc">Personal blog on engineering,</text>
		<text x="100" y="375" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="44" fill="#c5c7cc">systems, silicon &amp; design.</text>
		
		<!-- Post cards -->
		${[0, 1, 2, 3, 4].map((i) => {
			const y = 460 + i * 270;
			return `
				<rect x="80" y="${y}" width="920" height="230" rx="18" fill="${ACCENT_DARK}"/>
				<rect x="120" y="${y + 36}" width="140" height="26" rx="6" fill="#3a3e43"/>
				<text x="120" y="${y + 105}" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="40" font-weight="600" fill="#f0f0f3">Systems note ${i + 1}</text>
				<text x="120" y="${y + 155}" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="30" fill="#71757a">Mar 2025  ·  8 min read</text>
			`;
		}).join("")}
		
		<!-- Bottom bar -->
		<rect x="0" y="1820" width="1080" height="100" fill="#25282c"/>
		<text x="540" y="1880" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="32" fill="#8a8e94" text-anchor="middle">Home   ·   Posts   ·   Projects   ·   Books</text>
	</svg>`;

	await sharp(Buffer.from(narrowSvg))
		.png({ quality: 92, compressionLevel: 8 })
		.toFile(path.join(screenshotsDir, "narrow.png"));
	console.log("  ✓ narrow.png  (1080×1920, form_factor: narrow)");

	// Wide / desktop landscape
	const wideSvg = `
	<svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
		<rect width="1920" height="1080" fill="${DARK_BG}"/>
		
		<!-- Top hero -->
		<rect x="0" y="0" width="1920" height="380" fill="#25282c"/>
		<circle cx="220" cy="190" r="85" fill="${ORANGE}"/>
		<text x="370" y="175" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="82" font-weight="700" fill="#f1f1f3">amar jay</text>
		<text x="370" y="250" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="38" fill="#a1a5ab">Technical writing • Embedded systems • Independent research</text>
		
		<!-- Grid of content cards -->
		${[0, 1, 2].map((i) => {
			const x = 100 + i * 580;
			return `
				<rect x="${x}" y="460" width="540" height="480" rx="22" fill="${ACCENT_DARK}"/>
				<rect x="${x + 40}" y="510" width="130" height="26" rx="5" fill="#3a3e43"/>
				<text x="${x + 40}" y="600" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="38" font-weight="600" fill="#ededf0">Deep dive #${i + 1}</text>
				<text x="${x + 40}" y="660" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" fill="#8a8e94">Hardware, software, and the</text>
				<text x="${x + 40}" y="695" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" fill="#8a8e94">human systems around them.</text>
				
				<rect x="${x + 40}" y="760" width="460" height="7" rx="3" fill="#3a3e43"/>
				<rect x="${x + 40}" y="790" width="320" height="7" rx="3" fill="#3a3e43"/>
			`;
		}).join("")}
		
		<!-- Subtle footer -->
		<text x="960" y="1020" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" fill="#5f6369" text-anchor="middle">https://amarjay.com</text>
	</svg>`;

	await sharp(Buffer.from(wideSvg))
		.png({ quality: 92, compressionLevel: 8 })
		.toFile(path.join(screenshotsDir, "wide.png"));
	console.log("  ✓ wide.png   (1920×1080, form_factor: wide)");

	console.log("Screenshots complete.");
}

async function main() {
	const publicDir = path.join(process.cwd(), "public");

	await generateIcons(publicDir);
	await generateScreenshots(publicDir);

	console.log("\n✅ All PWA assets regenerated.");
	console.log("   Icons: 48px → 512px + apple-touch-icon");
	console.log("   Screenshots: /screenshots/narrow.png + wide.png");
	console.log("   You can now update manifest.webmanifest to reference the new assets.");
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});