'use strict'

# see http://qiita.com/shinnn/items/57327006390f2181f550
licenseRegexp = /^\!|^@preserve|^@cc_on|\bMIT\b|\bMPL\b|\bGPL\b|\(c\)|License|Copyright|three\.js/mi;

isLicenseComment = do()->
  _prevCommentLine = 0;

  return (node, comment)->
    if (licenseRegexp.test(comment.value) || comment.line is 1 || comment.line is _prevCommentLine + 1)
        _prevCommentLine = comment.line
        return true

    _prevCommentLine = 0
    return false

module.exports = (grunt) ->
    grunt.initConfig
        cssmin:
            dist:
                files:
                    'public/css/dist/all.css': ['public/css/common.css', 'public/css/style.css']

        concat:
            options:
                separator: ';'
            dist:
                src: ['public/js/vendor/lodash/dist/lodash.min.js', 'public/js/vendor/jquery/dist/jquery.min.js']
                dest: 'public/js/vendor.js'

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
                tasks: ['compass:build', 'cssmin:dist']
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
    grunt.loadNpmTasks 'grunt-contrib-compass'
    grunt.loadNpmTasks 'grunt-contrib-concat'
    grunt.loadNpmTasks 'grunt-contrib-cssmin'

    grunt.registerTask 'default', ['concat', 'clean:css', 'compass:build', 'cssmin', 'watch']
