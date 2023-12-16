// Excludes all asset files from being in eleventy collections. This will prevent any asset paths from appearing in collections.all, which is used for sitemap generation
module.exports = () => {
    return {
        eleventyExcludeFromCollections: true,
    };
};
