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
          'javascripts/_mail-protection.footer.js',
          'javascripts/_iconic.js',
          'javascripts/_google-analytics.js'
          ],
        dest: 'javascripts/footer.js',
      },
    },





    copy: {
      styleguide: {
        src: [
          'stylesheets/style.css',
          'stylesheets/index.md'
        ],
        dest: '_hologram/_css/'
      }
    },





    clean: {
      styleguide: ['styleguide']
    },






    hologram: {
      generate: {
        options: {
          config: '_hologram/hologram_config.yml'
        }
      }
    },





    exec: {
      build: {
        cmd: 'jekyll build'
      },
      serve: {
        cmd: 'jekyll serve --watch'
      }
    },





    watch: {
      css: {
        files: 'stylesheets/**/*.scss',
        tasks: ['sass', 'usebanner', 'concat', 'clean', 'hologram']
      }
    }






  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-hologram');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task(s).
  grunt.registerTask('default', ['sass', 'usebanner', 'concat', 'exec:serve']);
  grunt.registerTask('build', ['sass', 'usebanner', 'concat', 'clean', 'hologram']);


};
