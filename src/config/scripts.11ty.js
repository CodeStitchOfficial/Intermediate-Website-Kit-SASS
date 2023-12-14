const esbuild = require("esbuild");
const isProduction = process.env.ELEVENTY_ENV === "PROD";

module.exports = class {
    constructor() {
        this.options = {
            entryPoints: ["src/assets/js/app.js"],
            bundle: true,
            minify: isProduction,
            outdir: "public/assets/js",
            sourcemap: !isProduction,
            target: isProduction ? "es6" : "esnext",
        };
    }

    data() {
        return {
            permalink: false,
            eleventyExcludeFromCollections: true,
        };
    }

    async render() {
        // if we're running in production, build once. else, build and watch for changes
        if (isProduction) {
            esbuild.build(this.options);
        } else {
            let ctx = await esbuild.context(this.options);

            await ctx.watch();

            let { host, port } = await ctx.serve({
                servedir: "public/assets/js",
            });
        }
    }
};
