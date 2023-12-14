module.exports = {
    watch: ["src/**/*.html", "src/**/*.scss", "src/**/*.js"],
    isProduction: process.env.ELEVENTY_ENV === "production",
};
