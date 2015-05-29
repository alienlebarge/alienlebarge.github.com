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





    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      header_js: {
        files: {
          'javascripts/header.min.js': ['_js/typekit.js']
        }
      },
      footer_js: {
        files: {
          'javascripts/footer.min.js': [
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/fitvids/jquery.fitvids.js',
            '_js/fitvids.footer.js',
            '_js/google-analytics.js'
            ]
        }
      }
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
          config: '_config-dev.yml',
          drafts: true
        }
      },
      serve: {
        options : {
          dest: '_site',
          config: '_config-dev.yml',
          serve: true,
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





    criticalcss: {
        custom: {
            options: {
                url: "http://localhost:4000",
                width: 1200,
                height: 900,
                outputfile: "css/critical.css",
                filename: "css/style.min.css", // Using path.resolve( path.join( ... ) ) is a good idea here
                buffer: 800*1024,
                ignoreConsole: false
            }
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
        tasks: ['sass','autoprefixer', 'usebanner', 'hologram']
      },
      js: {
        files: 'javascripts/**/*.js',
        tasks: ['uglify', 'hologram']
      },
      hologram: {
        files: 'css/*.md',
        tasks: ['hologram']
      },
      jekyll: {
        files: ['*.html', '*.md', '_data/*.yml', '_layouts/*.html', '_includes/*.html', '_posts/*.*', 'css/*.css', 'javascripts/*.js'],
        tasks: ['jekyll:dev', 'validation']
      }
    },





  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-html-validation');
  grunt.loadNpmTasks('grunt-criticalcss');
  grunt.loadNpmTasks('grunt-hologram');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  //grunt.registerTask('default', ['sass', 'autoprefixer', 'usebanner', 'uglify', 'jekyll:dev', 'hologram', 'watch']);
  //grunt.registerTask('validate', ['sass', 'autoprefixer', 'usebanner', 'csslint', 'uglify', 'jekyll:dev', 'validation']);
  //grunt.registerTask('build', ['sass', 'autoprefixer', 'usebanner', 'csslint', 'uglify', 'jekyll:dist', 'validation', 'hologram']);

  // Default task
  grunt.registerTask('default', 'Build everything', function() {
      grunt.log.subhead("Build everything !".magenta);
      grunt.task.run('css');
      grunt.task.run('js');
      grunt.task.run('html');
      grunt.task.run('styleguide');
      grunt.task.run('watch');
    });

  // CSS
  grunt.registerTask('css', 'Build CSS files', function() {
    grunt.log.subhead('Here come the styles'.magenta);
    grunt.task.run('sass');
    grunt.task.run('autoprefixer');
    grunt.task.run('usebanner');
    //grunt.task.run('csslint');
  });

  // Critical CSS
  grunt.registerTask('critical', 'Build CSS files', function() {
    grunt.log.subhead('There is critical things in life'.magenta);
    grunt.task.run('css');
    grunt.task.run('jekyll:serve');
    grunt.task.run('criticalcss');
  });

  // JS
  grunt.registerTask('js', 'Build js files', function() {
    grunt.log.subhead('Magic JavaScripts'.magenta);
    grunt.task.run('uglify');
  });

  // HTML
  grunt.registerTask('html', 'Build HTML files', function() {
    grunt.log.subhead('Static HTML is fantastic'.magenta);
    grunt.task.run('jekyll:dev');
  });

  // Styleguide
  grunt.registerTask('styleguide', 'Build js files', function() {
    grunt.log.subhead('We all need a guide'.magenta);
    grunt.task.run('hologram');
  });

};
