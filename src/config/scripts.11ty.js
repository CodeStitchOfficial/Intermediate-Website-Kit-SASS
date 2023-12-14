const serverConfig = require("./server");
const esbuild = require("esbuild");

module.exports = class {
    constructor() {
        this.options = {
            entryPoints: ["src/assets/js/app.js"],
            bundle: true,
            minify: serverConfig.isProduction,
            outdir: "public/assets/js",
            sourcemap: !serverConfig.isProduction,
            target: serverConfig.isProduction ? "es6" : "esnext",
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
        if (serverConfig.isProduction) {
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
