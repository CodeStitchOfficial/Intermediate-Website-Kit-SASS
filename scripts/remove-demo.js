const fs = require("fs");
const path = require("path");
const readline = require("readline");

const destinationDir = path.join(process.cwd(), "scripts", "deleted");

// ─── Helpers ─────────────────────────────────────────────────────────────────

function resolvePath(p) {
	return path.join(process.cwd(), p);
}

function ensureDir(dir) {
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}
}

function moveItem(src, dest) {
	const fullSrc = resolvePath(src);
	if (!fs.existsSync(fullSrc)) {
		console.log(`File not found: ${src}`);
		return false;
	}
	ensureDir(path.dirname(dest));
	if (fs.existsSync(dest)) {
		fs.rmSync(dest, { recursive: true, force: true });
	}
	fs.renameSync(fullSrc, dest);
	console.log(`Moved ${src} → ${path.relative(process.cwd(), dest)}`);
	return true;
}

function updateFile(filePath, replacements) {
	const fullPath = resolvePath(filePath);
	if (!fs.existsSync(fullPath)) {
		console.log(`File not found: ${filePath}`);
		return;
	}

	let content = fs.readFileSync(fullPath, "utf8");
	const originalContent = content;

	for (const { pattern, replacement } of replacements) {
		content = content.replace(pattern, replacement);
	}

	if (content !== originalContent) {
		fs.writeFileSync(fullPath, content, "utf8");
		console.log(`Updated ${filePath}`);
	} else {
		console.log(`No changes needed for ${filePath}`);
	}
}

function ask(question) {
	return new Promise((resolve) => {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});
		rl.question(question, (answer) => {
			rl.close();
			resolve(answer.toLowerCase() === "y");
		});
	});
}

// ─── Move Demo Pages ─────────────────────────────────────────────────────────

function moveDemoPages() {
	console.log("\n--- Moving demo pages ---\n");
	const dest = path.join(destinationDir, "pages-demo");

	const pages = [
		"about.html",
		"contact.html",
		"reviews.html",
		"project-one.html",
		"project-two.html",
	];

	let count = 0;
	for (const page of pages) {
		if (moveItem(`src/content/pages/${page}`, path.join(dest, page)))
			count++;
	}
	console.log(`Moved ${count} demo page(s)`);
}

// ─── Move Demo SASS Files ────────────────────────────────────────────────────

function moveDemoSass() {
	console.log("\n--- Moving demo SASS files ---\n");
	const dest = path.join(destinationDir, "sass-demo");

	const sassFiles = [
		"about.scss",
		"contact.scss",
		"reviews.scss",
		"projects.scss",
	];

	let count = 0;
	for (const file of sassFiles) {
		if (moveItem(`src/assets/sass/${file}`, path.join(dest, file))) count++;
	}
	console.log(`Moved ${count} demo SASS file(s)`);
}

// ─── Move Demo Images ────────────────────────────────────────────────────────

function moveDemoImages() {
	console.log("\n--- Moving demo images ---\n");
	const dest = path.join(destinationDir, "images-demo");

	// Note: cabinets.jpg is kept because blog templates (post.html, blog.html) use it as a banner image.
	// It will be moved when remove-decap is run with blog removal.
	const images = ["landing.jpg", "construction.jpg"];
	let count = 0;

	for (const img of images) {
		if (moveItem(`src/assets/images/${img}`, path.join(dest, img))) count++;
	}

	// Move portfolio/ folder
	if (moveItem("src/assets/images/portfolio", path.join(dest, "portfolio")))
		count++;

	// Move gallery/ folder if it exists
	if (moveItem("src/assets/images/gallery", path.join(dest, "gallery")))
		count++;

	console.log(`Moved ${count} demo image(s)/folder(s)`);
}

// ─── Move Demo SVGs ──────────────────────────────────────────────────────────

function moveDemoSvgs() {
	console.log("\n--- Moving demo SVGs ---\n");
	const dest = path.join(destinationDir, "svgs-demo");

	const svgs = [
		"quote.svg",
		"s1.svg",
		"s2.svg",
		"s3.svg",
		"s4.svg",
		"stars.svg",
	];

	let count = 0;
	for (const svg of svgs) {
		if (moveItem(`src/assets/svgs/${svg}`, path.join(dest, svg))) count++;
	}
	console.log(`Moved ${count} demo SVG(s)`);
}

// ─── Move Demo Sections ──────────────────────────────────────────────────────

function moveDemoSections() {
	console.log("\n--- Moving demo sections ---\n");
	const dest = path.join(destinationDir, "sections-demo");

	moveItem("src/_includes/sections/cta.html", path.join(dest, "cta.html"));
}

// ─── Simplify Index ──────────────────────────────────────────────────────────

function simplifyIndex() {
	console.log("\n--- Simplifying index.html ---\n");
	const indexPath = resolvePath("src/index.html");

	const content = `---
title: "Welcome"
description: "Your new website"
permalink: "/"
tags: "sitemap"
---

{% extends "layouts/base.html" %}

{% block head %}
    <style>
        #welcome {
            padding: 100px 16px;
        }
        #welcome .cs-container {
            max-width: 1280px;
            margin: 0 auto;
        }
        #welcome .cs-content {
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
        }
        #welcome h1 {
            margin-bottom: 24px;
            font-size: clamp(2rem, 5vw, 3rem);
        }
        #welcome p {
            margin-bottom: 16px;
            font-size: 1.125rem;
            line-height: 1.6;
        }
        #welcome code {
            padding: 2px 8px;
            background: #f4f4f4;
            border-radius: 4px;
            font-family: monospace;
        }
        #welcome a {
            color: var(--primary);
            text-decoration: underline;
        }
        #welcome a:hover {
            opacity: 0.8;
        }
    </style>
{% endblock %}

{% block body %}
    <section id="welcome">
        <div class="cs-container">
            <div class="cs-content">
                <h1>Welcome to Your New Website</h1>
                <p>
                    This template has been stripped to its bare minimum. All demo content
                    has been moved to <code>scripts/deleted/</code> and can be safely deleted
                    once you no longer need it.
                </p>
                <p>
                    Get started by reading the
                    Quick Start Guide
                    section in the README.
                </p>
            </div>
        </div>
    </section>
{% endblock %}
`;

	fs.writeFileSync(indexPath, content, "utf8");
	console.log("Simplified src/index.html");
}

// ─── Update Header ───────────────────────────────────────────────────────────

function updateHeader() {
	console.log("\n--- Updating header ---\n");

	updateFile("src/_includes/sections/header.html", [
		// Remove About nav item
		{
			pattern:
				/\s*<li class="cs-li">\s*<a href="\/about\/"[^>]*>[\s\S]*?About[\s\S]*?<\/a>\s*<\/li>/,
			replacement: "",
		},
		// Remove Projects dropdown (entire <li class="cs-li cs-dropdown">...</li>)
		{
			pattern: /\s*<li class="cs-li cs-dropdown">[\s\S]*?<\/ul>\s*<\/li>/,
			replacement: "",
		},
		// Remove Reviews nav item
		{
			pattern:
				/\s*<li class="cs-li">\s*<a href="\/reviews\/"[^>]*>[\s\S]*?Reviews[\s\S]*?<\/a>\s*<\/li>/,
			replacement: "",
		},
		// Remove Contact mobile nav item (cs-hide-on-desktop)
		{
			pattern:
				/\s*<li class="cs-li cs-hide-on-desktop">\s*<a href="\/contact\/"[^>]*>[\s\S]*?Contact[\s\S]*?<\/a>\s*<\/li>/,
			replacement: "",
		},
		// Remove Contact Us CTA button
		{
			pattern:
				/\s*<a href="\/contact\/" class="cs-button-solid cs-nav-button">Contact Us<\/a>/,
			replacement: "",
		},
	]);
}

// ─── Update Footer ───────────────────────────────────────────────────────────

function updateFooter() {
	console.log("\n--- Updating footer ---\n");

	updateFile("src/_includes/sections/footer.html", [
		// Remove About link
		{
			pattern:
				/\s*<li class="cs-nav-li">\s*<a class="cs-nav-link" href="\/about\/">About<\/a>\s*<\/li>/,
			replacement: "",
		},
		// Remove Reviews link
		{
			pattern:
				/\s*<li class="cs-nav-li">\s*<a class="cs-nav-link" href="\/reviews\/">Reviews<\/a>\s*<\/li>/,
			replacement: "",
		},
		// Remove Contact link
		{
			pattern:
				/\s*<li class="cs-nav-li">\s*<a class="cs-nav-link" href="\/contact\/">Contact<\/a>\s*<\/li>/,
			replacement: "",
		},
		// Remove entire Projects nav section
		{
			pattern:
				/\s*<ul class="cs-nav">\s*<li class="cs-nav-li">\s*<span class="cs-header">Projects<\/span>\s*<\/li>[\s\S]*?<\/ul>/,
			replacement: "",
		},
	]);
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
	const confirmed = await ask(
		"This will remove all demo content and strip the template to bare minimum. Continue? (y/n): ",
	);

	if (!confirmed) {
		console.log("Operation cancelled.");
		process.exit(0);
	}

	// Create destination directory
	ensureDir(destinationDir);

	// Move all demo content
	moveDemoPages();
	moveDemoSass();
	moveDemoImages();
	moveDemoSvgs();
	moveDemoSections();

	// Update files
	simplifyIndex();
	updateHeader();
	updateFooter();

	console.log("\n...done!\n");
	console.log("=================================================");
	console.log(" Successfully removed demo content");
	console.log("=================================================\n");

	console.log("Next steps:");
	console.log("- Review removed files in scripts/deleted/");
	console.log("- Run 'npm start' to start building your site");
	console.log("- To remove Decap CMS/blog: 'npm run remove-decap'\n");
}

main();
