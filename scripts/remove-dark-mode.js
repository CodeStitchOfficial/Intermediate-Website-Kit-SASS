const fs = require("fs");
const path = require("path");

const paths = {
	baseHtml: "src/_includes/layouts/base.html",
	headerHtml: "src/_includes/sections/header.html",
	rootSass: "src/assets/sass/root.scss",
	darkJs: "src/assets/js/dark.js",
	navJs: "src/assets/js/nav.js",
};

function resolvePath(p) {
	return path.join(process.cwd(), p);
}

function removeFile(filePath) {
	const fullPath = resolvePath(filePath);
	if (fs.existsSync(fullPath)) {
		fs.unlinkSync(fullPath);
		console.log(`Deleted ${filePath}`);
	} else {
		console.log(`File not found: ${filePath}`);
	}
}

function updateFile(filePath, replacements) {
	const fullPath = resolvePath(filePath);
	if (!fs.existsSync(fullPath)) {
		console.log(`File not found: ${filePath}`);
		return;
	}

	let content = fs.readFileSync(fullPath, "utf8");
	let originalContent = content;

	replacements.forEach(({ pattern, replacement, name }) => {
		content = content.replace(pattern, replacement);
	});

	if (content !== originalContent) {
		fs.writeFileSync(fullPath, content, "utf8");
		console.log(`Updated ${filePath}`);
	} else {
		console.log(`No changes needed for ${filePath}`);
	}
}

// Helper to remove a CSS block by selector, handling balanced braces
function removeCssBlock(content, selector) {
	let result = content;

	// Escaping selector for use in new RegExp
	const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	// Match selector followed by anything until {
	const selectorRegex = new RegExp(
		`\\s*${escapedSelector}(?:\\s+[^{,]+)?\\s*\\{`,
		"g",
	);

	let match;
	while ((match = selectorRegex.exec(result)) !== null) {
		const startIndex = match.index;
		const openBraceIndex = result.indexOf("{", startIndex);

		let braceCount = 1;
		let i = openBraceIndex + 1;
		while (braceCount > 0 && i < result.length) {
			if (result[i] === "{") braceCount++;
			else if (result[i] === "}") braceCount--;
			i++;
		}

		if (braceCount === 0) {
			// Remove from match start to end brace
			result = result.substring(0, startIndex) + result.substring(i);
			// Reset regex to search from beginning since string changed
			selectorRegex.lastIndex = 0;
		} else {
			// Unbalanced, skip
			selectorRegex.lastIndex = startIndex + 1;
		}
	}
	return result;
}

// Custom SASS cleaner
function cleanSass(filePath) {
	const fullPath = resolvePath(filePath);
	if (!fs.existsSync(fullPath)) {
		console.log(`File not found: ${filePath}`);
		return;
	}

	let content = fs.readFileSync(fullPath, "utf8");
	const originalContent = content;

	// 1. Remove Dark Mode variables in :root
	content = content.replace(/--dark:\s*#[0-9a-fA-F]+;\s*/g, "");
	content = content.replace(/--medium:\s*#[0-9a-fA-F]+;\s*/g, "");
	content = content.replace(/--accent:\s*#[0-9a-fA-F]+;\s*/g, "");

	// 2. Remove "Dark Mode" comments (single-line and multi-line CodeStitch section headers)
	// Uses [\s\S] instead of a character range so newlines inside multi-line comments are matched
	content = content.replace(
		/\/\*(?:(?!\*\/)[\s\S])*?[Dd]ark [Mm]ode(?:(?!\*\/)[\s\S])*?\*\/\s*/g,
		"",
	);

	// 3. Remove dark mode specific blocks
	content = removeCssBlock(content, "body.dark-mode");
	content = removeCssBlock(content, "#dark-mode-toggle");

	// 4. Remove .cs-dark/.dark utility classes (only useful with dark mode)
	content = removeCssBlock(content, ".cs-dark");

	// 5. Remove .cs-dark, .dark comma-separated block (removeCssBlock can't handle comma-separated selectors)
	content = content.replace(
		/\n?\s*\.cs-dark,\s*\n?\s*\.dark\s*\{[^}]*\}/g,
		"",
	);

	// 6. Remove nested &.dark blocks (e.g. inside .cs-logo-img)
	content = content.replace(/\n?\s*&\.dark\s*\{[^}]*\}/g, "");

	// 7. Remove the dark mode background-color transition on html/body
	content = content.replace(
		/\s*transition:\s*background-color\s+0\.3s;\s*/g,
		"\n",
	);

	// 8. Remove Empty Media Queries (generic)
	// We run this multiple times to catch media queries that become empty after their content is removed
	const emptyMediaRegex = /@media[^{]+\{\s*\}/g;
	let loopCount = 0;
	while (emptyMediaRegex.test(content) && loopCount < 5) {
		content = content.replace(emptyMediaRegex, "");
		loopCount++;
	}

	// 9. Clean up multiple empty lines
	content = content.replace(/\n{3,}/g, "\n\n");

	if (content !== originalContent) {
		fs.writeFileSync(fullPath, content, "utf8");
		console.log(`Deep cleaned ${filePath}`);
	} else {
		console.log(`No deeper changes needed for ${filePath}`);
	}
}

// --- EXECUTION ---

// 1. Remove dark.js
removeFile(paths.darkJs);

// 2. Update base.html
updateFile(paths.baseHtml, [
	{
		name: "Remove dark.js script tag",
		pattern: /\s*<script defer src="\/assets\/js\/dark.js"><\/script>/g,
		replacement: "",
	},
]);

// 3. Update nav.js - remove dark mode config and element lookup
updateFile(paths.navJs, [
	{
		name: "Remove darkModeToggle config entry",
		pattern: /\s*darkModeToggle:\s*"#dark-mode-toggle",?/g,
		replacement: "",
	},
	{
		name: "Remove darkModeToggle element lookup",
		pattern:
			/\s*darkModeToggle:\s*document\.querySelector\(CONFIG\.SELECTORS\.darkModeToggle\),?/g,
		replacement: "",
	},
]);

// 4. Update header.html - remove toggle comment and button together
updateFile(paths.headerHtml, [
	{
		name: "Dark mode toggle comment and button",
		pattern:
			/\s*<!--Dark Mode toggle[\s\S]*?-->\s*<button[^>]*id="dark-mode-toggle"[\s\S]*?<\/button>/gi,
		replacement: "",
	},
]);

// 5. Update root.scss file description to remove dark mode mention
updateFile(paths.rootSass, [
	{
		name: "Remove dark mode from file description",
		pattern: /dark mode styles, /gi,
		replacement: "",
	},
]);

// 6. Update all SASS files using the smart cleaner
const sassDir = resolvePath("src/assets/sass");
if (fs.existsSync(sassDir)) {
	const sassFiles = fs
		.readdirSync(sassDir)
		.filter((file) => file.endsWith(".scss"));
	sassFiles.forEach((file) => {
		cleanSass(path.join("src/assets/sass", file));
	});
}

console.log("Dark mode removal script completed.");
