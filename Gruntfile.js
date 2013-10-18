module.exports = function (grunt) {

  // Package configuration
  grunt.initConfig({

    // Metadata
    pkg: grunt.file.readJSON('package.json'),
    dest: '../intranet13/',





    recess: {
      dist: {
        options: {
          compile: true,
          compress: false,
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
