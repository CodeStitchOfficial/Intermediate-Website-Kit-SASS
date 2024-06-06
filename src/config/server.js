module.exports = {
    // An accessible variable to determine if the server is in production mode or not
    isProduction: process.env.ELEVENTY_ENV === "PROD",
};
