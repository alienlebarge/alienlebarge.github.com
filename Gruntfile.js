module.exports = function (grunt) {

  // Package configuration
  grunt.initConfig({

    // Metadata
    pkg: grunt.file.readJSON('package.json'),





    recess: {
      dist: {
        options: {
          compile: true,
          compress: true,
        },
        files: {
          'css/main.css': ['less/main.less']
        }
      }
    }






  });

  grunt.loadNpmTasks('grunt-recess');

  // Default task(s).
  grunt.registerTask('default', ['recess']);

};
