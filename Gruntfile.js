module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-typescript');

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

    var sauceBrowsers = [];
    for (var operatingSystem in sauceConf) {
        for (var browser in sauceConf[operatingSystem]) {
            for (var i = sauceConf[operatingSystem][browser].low; i < sauceConf[operatingSystem][browser].high; i++) {
                sauceBrowsers.push((operatingSystem + "_" + browser + "_" + i).toLowerCase().replace(" ", "-"));
            }
        }
    }

    //TODO integrate with Sauce
    var travisBrowsers = [];//sauceBrowsers.slice(0);
    travisBrowsers.push("PhantomJS");

    grunt.initConfig({
        karma: {
            local: {
                configFile: "karma.conf.js",
                singleRun: true,
                browsers: ["Chrome", "PhantomJS"]
            },
            "local-min": {
                configFile: "karma.conf.js",
                singleRun: true,
                browsers: ["Chrome", "PhantomJS"]
            },
            travis: {
                configFile: "karma.conf.js",
                singleRun: true,
                browsers: travisBrowsers
            },
            "travis-min": {
                configFile: "karma.conf.min.js",
                singleRun: true,
                browsers: travisBrowsers
            },
            watch: {
                autoWatch: true,
                configFile: "karma.conf.js",
                browsers: ["PhantomJS", "Chrome"]
            }
        },
        typescript: {
            base: {
                src: ["lib/**/*.ts"],
                dest: "build/typertext.js",
                options: {
                    declaration: true,
                    "sourcemap": true
                }
            }
        },
        uglify: {
            base: {
                options: {
                    sourceMap: true,
                    sourceMapIncludeSources: true,
                    inSourceMap: "<%= typescript.base.dest%>.map",
                    sourceMapName: "build/typertext.min.js.map",
                    mangle: true,
                    beautify: false,
                    compress: true
                },
                files: {
                    'build/typertext.min.js': [
                        '<%= typescript.base.dest %>'
                    ]
                }
            }
        }
    });

    grunt.registerTask('default', ['typescript']);

    grunt.registerTask('build', ['build:base']);
    grunt.registerTask('build:base', ['typescript:base', 'uglify:base']);

    grunt.registerTask('test', ['karma:local']);
    grunt.registerTask('test:local', ['karma:local','karma:local']);
    grunt.registerTask('test:travis', ['build:base', 'karma:travis', 'karma:travis-min']);
};