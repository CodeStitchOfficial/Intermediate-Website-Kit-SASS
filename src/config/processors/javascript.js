const esbuild = require("esbuild");
const { glob } = require("glob");

const isProduction = process.env.ELEVENTY_ENV === "PROD";

module.exports = async function () {
    const files = await glob("src/assets/js/**/*.js");
    await esbuild.build({
        entryPoints: files,
        outdir: "./public/assets/js",
        write: true,
        bundle: true,
        minify: isProduction,
        sourcemap: !isProduction,
        target: isProduction ? "es6" : "esnext",
    });
};
