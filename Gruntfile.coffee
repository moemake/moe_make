'use strict'

module.exports = (grunt) ->
    grunt.initConfig
        sass:
            build:
                files: [
                    { expand: true, cwd: "./src/scss", src: ["**/*.scss"], dest: "./public/css", ext: ".css" }
                ]
        compass: 
            build:
                options:
                    # noLineComments: true 
                    cssDir: './public/css'
                    sassDir: './src/scss'
                    imagesDir: './src/img'
                    generatedImagesDir: './public/img/sprites'
                    httpGeneratedImagesPath: "../../img/smart/sprites"
        watch:
            compass: 
                files: ['./src/scss/*.scss']
                tasks: ['compass:build']
                options:
                    nospawn: true
        clean:
            css: [
                'public/css'
            ]

    grunt.loadNpmTasks 'grunt-contrib-sass'
    grunt.loadNpmTasks 'grunt-contrib-watch'
    grunt.loadNpmTasks 'grunt-contrib-clean'
    grunt.loadNpmTasks 'grunt-newer'
    grunt.loadNpmTasks 'grunt-contrib-compass';

    grunt.registerTask 'default', ['clean:css', 'compass:build', 'watch']
