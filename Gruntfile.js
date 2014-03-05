module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 9001
                }
            }
        },
        watch: {
            livereload: true,
            files: ['src/**/*.js', 'assets/**/*.css', 'index.html']
        }
    });

    // Load the used grunt tasks
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['connect', 'watch:files']);

};
