module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-typescript');

    grunt.initConfig({
        karma: {
            phantom: {
                configFile: "karma.conf.js",
                singleRun: true,
                browsers: ["PhantomJS"]
            },
            chrome: {
                configFile: "karma.conf.js",
                singleRun: true,
                browsers: ["Chrome"]
            },
            watch: {
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
        }
    });

    grunt.registerTask('default', ['typescript']);

    grunt.registerTask('test', ['typescript', 'karma:phantom', 'karma:chrome']);
    grunt.registerTask('test:travis', ['typescript', 'karma:phantom']);
};