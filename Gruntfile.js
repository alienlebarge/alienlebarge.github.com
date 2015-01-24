module.exports = function (grunt) {

  // Package configuration
  grunt.initConfig({

    // Metadata
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
            ' * <%= pkg.name %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright 2014-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
            ' */\n',





    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'stylesheets/style.min.css' : 'stylesheets/style.scss'
        }
      },
      dev: {
        options: {
          style: 'expanded'
        },
          files: {
            'stylesheets/style.css': 'stylesheets/style.scss'
        }
      }
    },




    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9'],
        map: true
      },
      dist: {
        src: 'stylesheets/style.min.css'
      },
      dev: {
        src: 'stylesheets/style.css'
      },
    },





    usebanner: {
      options: {
        position: 'top',
        banner: '<%= banner %>'
      },
      files: {
        src: ['stylesheets/style.min.css', 'stylesheets/style.css']
      }
    },





    concat: {
      options: {
        separator: ';',
        banner: '<%= banner %>',
      },
      footer_js: {
        src: [
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/fitvids/jquery.fitvids.js',
          'javascripts/_fitvids.footer.js',
          'javascripts/_iconic.js',
          'javascripts/_google-analytics.js'
          ],
        dest: 'javascripts/footer.js',
      },
    },





    jekyll: {                             // Task
      dist: {                             // Target
        options: {                        // Target options
          dest: '_site',
          config: '_config.yml'
        }
      },
      dev : {
        options : {
          dest: '_site',
          config: '_config-dev.yml'
        }
      }
    },





    watch: {
      css: {
        files: 'stylesheets/**/*.scss',
        tasks: ['sass','usebanner','concat']
      }
    }






  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['sass', 'autoprefixer', 'usebanner', 'concat', 'jekyll:dev']);
  grunt.registerTask('build', ['sass', 'autoprefixer', 'usebanner', 'concat']);

};
