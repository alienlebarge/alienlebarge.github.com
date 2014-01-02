module.exports = function (grunt) {

  // Package configuration
  grunt.initConfig({

    // Metadata
    pkg: grunt.file.readJSON('package.json'),





    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'css/style.css' : 'css/style.scss'
        }
      }
    },





    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass']
      }
    }






  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['sass']);

};
