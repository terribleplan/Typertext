module.exports = function (config) {
    var sauceConf = {
        linux: {opera: {low: 12, high: 12}, googlechrome: {low: 26, high: 32}, firefox: {low: 3, high: 27}},
        "OS X 10.9": {googlechrome: {low: 31, high: 31}, firefox: {low: 4, high: 26}},
        "OS X 10.8": {googlechrome: {low: 27, high: 32}, safari: {low: 6, high: 6}},
        "OS X 10.6": {googlechrome: {low: 27, high: 32}, safari: {low: 5, high: 5}, firefox: {low: 3, high: 27}},
        "Windows XP": {googlechrome: {low: 26, high: 32}, safari: {low: 3, high: 5}, opera: {low: 9, high: 12}, firefox: {low: 4, high: 27}},
        "Windows 7": {googlechrome: {low: 26, high: 32}, safari: {low: 5, high: 5}, opera: {low: 9, high: 12}, firefox: {low: 4, high: 27}},
        "Windows 8": {googlechrome: {low: 26, high: 32}, opera: {low: 9, high: 10}, firefox: {low: 4, high: 27}},
        "Windows 8.1": {googlechrome: {low: 26, high: 32}, opera: {low: 9, high: 10}, firefox: {low: 4, high: 27}}
    };

    var sauceBrowsers = {};
    for (var operatingSystem in sauceConf) {
        for (var browser in sauceConf[operatingSystem]) {
            for (var i = sauceConf[operatingSystem][browser].low; i < sauceConf[operatingSystem][browser].high; i++) {
                sauceBrowsers[(operatingSystem + "_" + browser + "_" + i).toLowerCase().replace(" ", "-")] = {
                    base: "SauceLabs",
                    browserName: browser,
                    platform: operatingSystem,
                    version: "" + i
                }
            }
        }
    }
    config.set({
        sauceLabs: {
            startConnect: true,
            testName: 'TypertextTests',
            recordScreenshots: false
        },
        basePath: __dirname,
        frameworks: ['jasmine'],
        files: [
            'test/**/*.test.js',
            'build/typertext.js'
        ],
        plugins: [
            'karma-jasmine',
            "karma-phantomjs-launcher",
            'karma-sauce-launcher',
            'karma-chrome-launcher'
        ],
        customLaunchers: sauceBrowsers
    });
};