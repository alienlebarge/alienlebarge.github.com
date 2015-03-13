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





    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      dist: [
        'stylesheets/style.min.css'
      ],
      dev: [
        'stylesheets/style.css'
      ]
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





    htmllint: {
      options: {
        ignore: [
          'Attribute "autocomplete" not allowed on element "button" at this point.',
          'Attribute "autocomplete" not allowed on element "input" at this point.',
          'Element "img" is missing required attribute "src".'
        ]
      },
      src: '_site/index.html'
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
        files: 'stylesheets/**/*.scss',
        tasks: ['sass','autoprefixer', 'csslint','usebanner', 'hologram']
      },
      js: {
        files: 'javascripts/**/*.js',
        tasks: ['concat', 'hologram']
      },
      hologram: {
        files: 'stylesheets/*.md',
        tasks: ['hologram']
      },
      jekyll: {
        files: ['index.html', '*.html', '*.md', '_data/*.*', '_layouts/*.html', '_includes/*.html', '_posts/*.*', 'stylesheets/*.css','javascripts/*.js'],
        tasks: ['jekyll:dev', 'htmllint']
      }
    },





    browserSync: {
      files: {
        src : ['_site/stylesheets/*.css', '_site/*.html', '_site/<%= grunt.template.today("yyyy") %>/**/*.html']
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
  grunt.loadNpmTasks('grunt-htmllint');
  grunt.loadNpmTasks('grunt-hologram');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');

  // Default task(s).
  grunt.registerTask('default', ['sass', 'autoprefixer', 'csslint', 'usebanner', 'concat', 'jekyll:dev', 'htmllint', 'hologram', 'browserSync', 'watch']);
  grunt.registerTask('build', ['sass', 'autoprefixer', 'csslint', 'usebanner', 'concat', 'jekyll:dist', 'htmllint', 'hologram']);

};
