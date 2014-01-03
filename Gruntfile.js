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
          'stylesheets/style.css' : 'stylesheets/sass/style.scss'
        }
      }
    },





    exec: {
      build: {
        cmd: 'jekyll build'
      },
      serve: {
        cmd: 'jekyll serve --watch'
      },
      deploy: {
        cmd: 'rsync --progress -a --delete -e "ssh -q" _site/ myuser@host:mydir/'
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
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['sass', 'exec:build']);

};
