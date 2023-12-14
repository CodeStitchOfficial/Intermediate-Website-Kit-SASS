// imports
const pluginEleventyNavigation = require("@11ty/eleventy-navigation");
const pluginMinifier = require("@sherby/eleventy-plugin-files-minifier");
const pluginSitemap = require("@quasibit/eleventy-plugin-sitemap");
const configCssExtension = require("./src/config/cssExtension");
const configSitemap = require("./src/config/sitemap");
const configServer = require("./src/config/server");
const filterPostDate = require("./src/config/postDate");

module.exports = function (eleventyConfig) {
    // setting up CSS as an eleventy template extension (not supported in base 11ty)
    eleventyConfig.addTemplateFormats("css");
    eleventyConfig.addExtension("css", configCssExtension);

    // adds the official eleventy navigation plugin for a scalable navigation
    eleventyConfig.addPlugin(pluginEleventyNavigation);

    // adds a minifier when `npm run build` is run, so code is only minified in production
    if (configServer.isProduction) {
        eleventyConfig.addPlugin(pluginMinifier);
    }

    eleventyConfig.addPlugin(pluginSitemap, configSitemap);

    eleventyConfig.setServerOptions(configServer);

    // passthroughs allow non-template (html, njk) files to be put into /public
    // here, we individually specify what folders are passed through. this prevents sass files from being deployed unnecessarily
    eleventyConfig.addPassthroughCopy("./src/assets/css");
    eleventyConfig.addPassthroughCopy("./src/assets/favicons");
    eleventyConfig.addPassthroughCopy("./src/assets/fonts");
    eleventyConfig.addPassthroughCopy("./src/assets/images");
    eleventyConfig.addPassthroughCopy("./src/assets/svgs");

    // other important files are passed through. this allows the CMS, redirects, robots.txt and sitemap to be present in the deployed project
    eleventyConfig.addPassthroughCopy("./src/admin");
    eleventyConfig.addPassthroughCopy("./src/_redirects");
    eleventyConfig.addPassthroughCopy({ "./src/robots.txt": "/robots.txt" });

    // normally, 11ty will render dates on blog posts in full JSDate format (Fri Dec 02 18:00:00 GMT-0600)
    // this filter allows dates to be converted into a normal, locale format. view the docs to learn more (https://moment.github.io/luxon/api-docs/index.html#datetime)
    eleventyConfig.addFilter("postDate", filterPostDate);

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
