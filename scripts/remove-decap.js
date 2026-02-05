const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { collectFiles } = require("./utils/collect-files.js");

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
	// Remove destination if it already exists
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

// ─── Core Decap Removal ─────────────────────────────────────────────────────

function removeDecapCore() {
	console.log("\n--- Removing Decap CMS core files ---\n");

	// 1. Move src/admin/ → scripts/deleted/admin/
	moveItem("src/admin", path.join(destinationDir, "admin"));

	// 2. Update .eleventy.js – remove admin passthrough
	updateFile(".eleventy.js", [
		{
			pattern: /\s*eleventyConfig\.addPassthroughCopy\("\.\/src\/admin"\);\s*\/\/.*\n?/,
			replacement: "\n",
		},
	]);

	// 3. Update package.json – remove watch:cms, decap-server, simplify start
	const pkgPath = resolvePath("package.json");
	if (fs.existsSync(pkgPath)) {
		let pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
		let changed = false;

		// Remove watch:cms script
		if (pkg.scripts && pkg.scripts["watch:cms"]) {
			delete pkg.scripts["watch:cms"];
			changed = true;
		}

		// Simplify start script: run-p watch:* → just run watch:eleventy
		if (pkg.scripts && pkg.scripts.start && pkg.scripts.start.includes("run-p watch:*")) {
			pkg.scripts.start = "npm run watch:eleventy";
			changed = true;
		}

		// Remove decap-server dependency
		if (pkg.dependencies && pkg.dependencies["decap-server"]) {
			delete pkg.dependencies["decap-server"];
			changed = true;
		}
		if (pkg.devDependencies && pkg.devDependencies["decap-server"]) {
			delete pkg.devDependencies["decap-server"];
			changed = true;
		}

		if (changed) {
			fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, "\t") + "\n", "utf8");
			console.log("Updated package.json");
		} else {
			console.log("No changes needed for package.json");
		}
	}

	// 4. Update robots.html – remove Disallow: /admin/ line
	updateFile("src/robots.html", [
		{
			pattern: /Disallow: \/admin\/\n?/,
			replacement: "",
		},
	]);

	// 5. Update src/_redirects – remove /admin redirect lines
	const redirectsPath = resolvePath("src/_redirects");
	if (fs.existsSync(redirectsPath)) {
		let content = fs.readFileSync(redirectsPath, "utf8");
		const original = content;
		content = content.replace(/.*\/admin.*\n?/g, "");
		if (content !== original) {
			fs.writeFileSync(redirectsPath, content, "utf8");
			console.log("Updated src/_redirects");
		} else {
			console.log("No changes needed for src/_redirects");
		}
	}
}

// ─── Blog Removal ────────────────────────────────────────────────────────────

function removeBlog() {
	console.log("\n--- Removing blog content ---\n");

	// Move blog content directory
	moveItem("src/content/blog", path.join(destinationDir, "blog"));

	// Move blog page
	moveItem("src/content/pages/blog.html", path.join(destinationDir, "blog-page.html"));

	// Move post layout
	moveItem("src/_includes/layouts/post.html", path.join(destinationDir, "post-layout.html"));

	// Move blog components
	moveItem("src/_includes/components/featured-posts.html", path.join(destinationDir, "featured-posts.html"));
	moveItem("src/_includes/components/post-schema.html", path.join(destinationDir, "post-schema.html"));

	// Move blog SASS
	moveItem("src/assets/sass/blog.scss", path.join(destinationDir, "blog.scss"));

	// Move blog images
	moveItem("src/assets/images/blog", path.join(destinationDir, "images-blog"));

	// Move cabinets.jpg (used as blog banner in post.html and blog.html)
	moveItem("src/assets/images/cabinets.jpg", path.join(destinationDir, "cabinets.jpg"));

	// Update header – remove blog <li> nav link
	updateFile("src/_includes/sections/header.html", [
		{
			pattern: /\s*<li class="cs-li">\s*<a href="\/blog\/"[^>]*>[\s\S]*?Blog[\s\S]*?<\/a>\s*<\/li>/,
			replacement: "",
		},
	]);

	// Update footer – remove blog <li> nav link
	updateFile("src/_includes/sections/footer.html", [
		{
			pattern: /\s*<li class="cs-nav-li">\s*<a class="cs-nav-link" href="\/blog\/">Blog<\/a>\s*<\/li>/,
			replacement: "",
		},
	]);
}

// ─── Scan & Report ───────────────────────────────────────────────────────────

async function scanForReferences(removedBlog) {
	console.log("\nScanning for remaining references...");

	const files = [];
	const srcDir = path.join(process.cwd(), "src");

	try {
		await collectFiles(files, srcDir);
	} catch (error) {
		console.error(`Error collecting files: ${error}`);
		return { decapRefs: [], blogRefs: [] };
	}

	const decapRefs = [];
	const blogRefs = [];

	for (const file of files) {
		try {
			const content = fs.readFileSync(file, "utf-8");

			if (/decap|netlify-cms/i.test(content)) {
				decapRefs.push(file);
			}

			if (removedBlog && /\/blog\/|blog\.html|blog\.scss|featured-posts|post-schema/i.test(content)) {
				blogRefs.push(file);
			}
		} catch {
			continue;
		}
	}

	if (decapRefs.length > 0) {
		console.log(`\nFound ${decapRefs.length} file(s) with remaining Decap CMS references:`);
		decapRefs.forEach((f) => console.log(`   - ${path.relative(process.cwd(), f)}`));
	}

	if (blogRefs.length > 0) {
		console.log(`\nFound ${blogRefs.length} file(s) with remaining blog references:`);
		blogRefs.forEach((f) => console.log(`   - ${path.relative(process.cwd(), f)}`));
	}

	return { decapRefs, blogRefs };
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
	const confirmed = await ask("Are you sure you want to remove Decap CMS from this project? (y/n): ");
	if (!confirmed) {
		console.log("Operation cancelled.");
		process.exit(0);
	}

	const removeBlogContent = await ask("Do you also want to remove all blog-related content? (y/n): ");

	// Create destination directory
	ensureDir(destinationDir);

	// Always remove Decap core
	removeDecapCore();

	// Conditionally remove blog
	if (removeBlogContent) {
		removeBlog();
	}

	// Scan for leftovers
	const { decapRefs, blogRefs } = await scanForReferences(removeBlogContent);

	console.log("\n...done!\n");
	console.log("=================================================");
	console.log(" Successfully removed Decap CMS from the project");
	console.log("=================================================\n");

	if (decapRefs.length > 0 || (blogRefs.length > 0 && removeBlogContent)) {
		console.log("Manual cleanup needed:");
		if (decapRefs.length > 0) {
			console.log("   - Review files with Decap CMS references listed above");
		}
		if (blogRefs.length > 0 && removeBlogContent) {
			console.log("   - Review files with remaining blog references listed above");
		}
		console.log();
	}

	console.log("Next steps:");
	if (removeBlogContent) {
		console.log("1. Run your build to ensure everything works");
		console.log("2. All removed files are in scripts/deleted/ if you need to restore them\n");
	} else {
		console.log("1. Blog content remains intact - you can manage posts locally via markdown");
		console.log("2. Run your build to ensure everything works");
		console.log("3. All removed files are in scripts/deleted/ if you need to restore them\n");
	}
}

main();
