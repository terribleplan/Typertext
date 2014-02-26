module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-typescript');

    grunt.initConfig({
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
};