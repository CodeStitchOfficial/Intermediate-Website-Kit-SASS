module.exports = {
    outputFileExtension: "css",
    compile: (inputContent) => {
        return () => {
            return inputContent;
        };
    },
};
