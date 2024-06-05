module.exports = {
    // Fixes an issue where the dev website breaks when making JS changes
    watch: ["public/**/*.js"],

    // An accessible variable to determine if the server is in production mode or not
    isProduction: process.env.NODE_ENV === "production",
};