// imports
const pluginEleventyNavigation = require("@11ty/eleventy-navigation");
const pluginMinifier = require("@sherby/eleventy-plugin-files-minifier");
const pluginSitemap = require("@quasibit/eleventy-plugin-sitemap");

const configCssExtension = require("./src/config/cssExtension");
const configSitemap = require("./src/config/sitemap");
const configServer = require("./src/config/server");

const filterPostDate = require("./src/config/postDate");

module.exports = function (eleventyConfig) {
    // EXTENSIONS - Recognising non-default languages as templates
    // Setting up CSS files to be recognised as a template language, and can be passed through eleventy. This allows our minifier to read CSS files and minify them
    eleventyConfig.addTemplateFormats("css");
    eleventyConfig.addExtension("css", configCssExtension);
    // END EXTENSIONS

    // PLUGINS - Adds additional eleventy functionality
    // Sets up the eleventy navigation plugin for a scalable navigation as used in _includes/components/header.html
    // https://github.com/11ty/eleventy-navigation
    eleventyConfig.addPlugin(pluginEleventyNavigation);

    // Automatically generate a sitemap, using the domain in _data/client.json
    // https://www.npmjs.com/package/@quasibit/eleventy-plugin-sitemap
    eleventyConfig.addPlugin(pluginSitemap, configSitemap);

    // When in production ("npm run build" is ran), minify all HTML, CSS, JSON, XML, XSL and webmanifest files.
    // https://github.com/benjaminrancourt/eleventy-plugin-files-minifier
    if (configServer.isProduction) {
        eleventyConfig.addPlugin(pluginMinifier);
    }
    // END PLUGINS

    // SERVER - Set how the eleventy dev server is run, using the options from https://www.11ty.dev/docs/dev-server/
    eleventyConfig.setServerOptions(configServer);
    // END SERVER

    // PASSTHROUGHS - "Pass through" source files to /public, without being processed by eleventy
    // Individually specify what asset folders are passed through. SASS is processed by it's compiler into ./src and passed through as a template for minification
    eleventyConfig.addPassthroughCopy("./src/assets/css");
    eleventyConfig.addPassthroughCopy("./src/assets/favicons");
    eleventyConfig.addPassthroughCopy("./src/assets/fonts");
    eleventyConfig.addPassthroughCopy("./src/assets/images");
    eleventyConfig.addPassthroughCopy("./src/assets/svgs");
    eleventyConfig.addPassthroughCopy("./src/assets/js");

    // Other required folders are passed through
    eleventyConfig.addPassthroughCopy("./src/admin");
    eleventyConfig.addPassthroughCopy("./src/_redirects");
    eleventyConfig.addPassthroughCopy({ "./src/robots.txt": "/robots.txt" });
    // END PASSTHROUGHS

    // FILTERS - Modify data in template files at build time
    // Converts dates from JSDate format (Fri Dec 02 18:00:00 GMT-0600) to a locale format. More info in docs - https://moment.github.io/luxon/api-docs/index.html#datetime
    eleventyConfig.addFilter("postDate", filterPostDate);
    // END FILTERS

    // SHORTCODES - Output data using JS at build-time
    // Gets the current year, which can be outputted with {% year %}. Used for the footer copyright. Updates with every build.
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
    // END SHORTCODES

    return {
        dir: {
            input: "src",
            output: "public",
            includes: "_includes",
            data: "_data",
        },
        htmlTemplateEngine: "njk",
    };
};
