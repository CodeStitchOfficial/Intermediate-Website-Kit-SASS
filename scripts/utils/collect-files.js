const { readdir } = require("fs/promises");
const { resolve, extname } = require("path");

const ALLOWED_EXTENSIONS = [".html", ".njk", ".scss", ".md", ".ts", ".js", ".mjs", ".cjs"];

// Collect files with specific extensions
async function collectFiles(files, dir) {
	const dirents = await readdir(dir, { withFileTypes: true });
	for (const dirent of dirents) {
		const res = resolve(dir, dirent.name);
		if (dirent.isDirectory() && dirent.name !== "js") {
			await collectFiles(files, res);
		} else if (dirent.isFile() && ALLOWED_EXTENSIONS.includes(extname(res))) {
			files.push(res);
		}
	}
}

module.exports = { collectFiles };
