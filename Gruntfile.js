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
          'css/style.min.css' : '_sass/style.scss'
        }
      },
      dev: {
        options: {
          style: 'expanded'
        },
          files: {
            'css/style.css': '_sass/style.scss'
        }
      }
    },




    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9'],
        map: true
      },
      dist: {
        src: 'css/style.min.css'
      },
      dev: {
        src: 'css/style.css'
      },
    },





    usebanner: {
      options: {
        position: 'bottom',
        banner: '<%= banner %>'
      },
      files: {
        src: ['css/style.min.css', 'css/style.css']
      }
    },





    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      dist: [
        'css/style.min.css'
      ],
      dev: [
        'css/style.css'
      ]
    },









    concat: {
      options: {
        separator: ';',
        banner: '<%= banner %>',
      },
      header_js: {
        src: [
          'javascripts/_typekit.js'
        ],
        dest: 'javascripts/header.js',
      },
      footer_js: {
        src: [
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/fitvids/jquery.fitvids.js',
          'javascripts/_fitvids.footer.js',
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





    validation: {
    options: {
      },
    files: {
        src: ['_site/*.html']
      }
    },





    hologram: {
      generate: {
        options: {
          config: 'hologram_config.yml'
        }
      }
    },





    watch: {
      sass: {
        files: '_sass/**/*.scss',
        tasks: ['sass','autoprefixer',  'usebanner', 'csslint', 'hologram']
      },
      js: {
        files: 'javascripts/**/*.js',
        tasks: ['concat', 'hologram']
      },
      hologram: {
        files: 'css/*.md',
        tasks: ['hologram']
      },
      jekyll: {
        files: ['index.html', '*.html', '*.md', '_data/*.*', '_layouts/*.html', '_includes/*.html', '_posts/*.*', 'css/*.css','javascripts/*.js'],
        tasks: ['jekyll:dev', 'validation']
      }
    },





    browserSync: {
      files: {
        src : ['_site/css/*.css', '_site/*.html', '_site/<%= grunt.template.today("yyyy") %>/**/*.html']
      },
      options: {
        watchTask: true,
        ghostMode: {
          clicks: true,
          scroll: true,
          links: true,
          forms: true
        },
        server: {
          baseDir: '_site'
        }
      }
    },





  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-html-validation');
  grunt.loadNpmTasks('grunt-hologram');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');

  // Default task(s).
  grunt.registerTask('default', ['sass', 'autoprefixer', 'usebanner', 'concat', 'jekyll:dev', 'hologram', 'browserSync', 'watch']);
  grunt.registerTask('validate', ['sass', 'autoprefixer', 'usebanner', 'csslint', 'concat', 'jekyll:dev', 'validation']);
  grunt.registerTask('build', ['sass', 'autoprefixer', 'usebanner', 'csslint', 'concat', 'jekyll:dist', 'validation', 'hologram']);

};
