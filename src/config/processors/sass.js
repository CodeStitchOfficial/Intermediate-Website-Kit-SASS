const { glob } = require("glob");
const fs = require("fs");
const path = require("path");

const sass = require("sass");
const postcss = require("postcss");

const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

const isProduction = process.env.ELEVENTY_ENV === "PROD";

// PostCSS processor - add more plugins here as you see fit. cssnano won't run in development.
const processor = postcss([autoprefixer(), ...(isProduction ? [cssnano({ preset: "default" })] : [])]);

module.exports = async function () {
    // Make the public CSS directory
    fs.mkdirSync("./public/assets/css", { recursive: true });

    // Get SASS files
    const filenames = await glob("src/assets/sass/**/*.scss");

    // Filter out partials (files starting with _)
    const sassFiles = filenames
        .filter((file) => !path.basename(file).startsWith("_"))
        .map((file) => ({
            path: file,
        }));

    // Setup an array of promises for better build performance.
    const processPromises = sassFiles.map(async (file) => {
        try {
            const filename = path.basename(file.path, path.extname(file.path));
            const cssPath = `./public/assets/css/${filename}.css`;
            const mapPath = `./public/assets/css/${filename}.css.map`;

            // Step 1 - Compile the SCSS. Generate a source map if we're in development
            const sassResult = sass.compile(file.path, {
                sourceMap: !isProduction,
                sourceMapIncludeSources: !isProduction,
                style: "expanded",
                loadPaths: ["src/assets/scss"],
            });

            // Step 2 - Run the generated CSS through PostCSS for autoprefixer
            const postcssResult = await processor.process(sassResult.css, {
                from: file.path,
                to: cssPath,
                map: isProduction
                    ? false
                    : {
                          prev: sassResult.sourceMap ? JSON.stringify(sassResult.sourceMap) : undefined,
                          inline: false,
                          annotation: true,
                      },
            });

            // Step 3 - Write the CSS to a file
            fs.writeFileSync(cssPath, postcssResult.css);

            // Step 4 - If there's a map, write that too
            if (postcssResult.map && !isProduction) {
                fs.writeFileSync(mapPath, postcssResult.map.toString());
            }
        } catch (error) {
            console.error(`Error processing ${file.path}:`, error);
        }
    });

    await Promise.all(processPromises);
};
