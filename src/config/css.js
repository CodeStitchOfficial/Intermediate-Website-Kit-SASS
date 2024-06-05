module.exports = {
    // All .css files will be recognised as a language. No modification will happen, but this allows the CSS files to be minified, separately, via the minification plugin (which can only minify template files)
    outputFileExtension: "css",
    compile: (inputContent) => {
        return () => {
            return inputContent;
        };
    },
};
