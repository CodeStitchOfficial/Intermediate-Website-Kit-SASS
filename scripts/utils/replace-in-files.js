const fs = require("fs");
const { join } = require("path");

/**
 * Search through files in passed folder (including subdirectories) and replace text
 * @param {string} path - folder path to search through
 * @param {string} regex - regex string to match
 * @param {string} replacement - replacement text to replace each regex match with
 * @param {boolean} logging - whether to log updated files
 */
function replaceInFiles(path, regex, replacement, logging = false) {
	const files = fs.readdirSync(path);
	for (const file of files) {
		const filePath = join(path, file);
		const stats = fs.statSync(filePath);
		if (stats.isDirectory()) {
			// Recursively process subdirectories
			replaceInFiles(filePath, regex, replacement);
		} else {
			try {
				// Read file content
				const content = fs.readFileSync(filePath, "utf-8");
				// Create regex object from string
				const searchRegex = new RegExp(regex, "g");
				// Replace matches
				const updatedContent = content.replace(searchRegex, replacement);
				// Only write if content changed
				if (content !== updatedContent) {
					fs.writeFileSync(filePath, updatedContent, "utf-8");
					if (logging) {
						console.log(`Updated ${filePath}`);
					}
				}
			} catch (error) {
				console.error(`Error processing file ${filePath}:`, error);
			}
		}
	}
}

module.exports = { replaceInFiles };
