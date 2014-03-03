module.exports = function (config) {
    config.set({
        basePath: __dirname,
        frameworks: ['jasmine'],
        files: [
            'test/**/*.test.js',
            'build/typertext.js'
        ]
    });
};