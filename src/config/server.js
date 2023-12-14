module.exports = {
    watch: ["src/**/*.html", "src/**/*.css", "src/**/*.js"],
    isProduction: process.env.ELEVENTY_ENV === "PROD",
};
