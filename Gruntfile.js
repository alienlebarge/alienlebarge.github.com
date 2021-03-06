module.exports = function (grunt) {

  // Package configuration
  grunt.initConfig({

    // Metadata
    pkg: grunt.file.readJSON('package.json'),





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





    copy: {
      enhance: {
        src: 'bower_components/enhance/*.js',
        dest: '_js/enhance.js',
      },
    },





    uglify: {
      all_js: {
        options: {
          mangle: false,
        },
        files: {
          'javascripts/all.min.js': [
            '_js/typekit.js',
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/iconic/js/iconic.min.js',
            'bower_components/fitvids/jquery.fitvids.js',
            '_js/fitvids.footer.js',
            '_js/google-analytics.js',
            '_js/iconic.js'
            ]
        }
      },
      enhance: {
        files: {
          '_includes/enhance.min.js': ['_js/enhance.js'],
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
                url: "_site/index.html",
                width: 1200,
                height: 900,
                outputfile: "_includes/critical.css",
                filename: "css/style.min.css", // Using path.resolve( path.join( ... ) ) is a good idea here
                buffer: 800*1024,
                ignoreConsole: false
            }
        }
    },





    watch: {
      sass: {
        files: '_sass/**/*.scss',
        tasks: ['sass','autoprefixer', 'hologram']
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
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-html-validation');
  grunt.loadNpmTasks('grunt-criticalcss');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task
  grunt.registerTask('default', 'Build everything', function() {
      grunt.log.subhead("Build everything !".magenta);
      grunt.task.run('init');
      grunt.task.run('html');
      grunt.task.run('css');
      grunt.task.run('html');
      grunt.task.run('js');
      grunt.task.run('watch');
    });

  // init
  grunt.registerTask('init', 'Set file used to build the site', function() {
    grunt.log.subhead('init'.magenta);
    grunt.task.run('copy:enhance');
    grunt.task.run('uglify:enhance');
  });

  // HTML
  grunt.registerTask('html', 'Build HTML files', function() {
    grunt.log.subhead('Build HTML files'.magenta);
    grunt.task.run('jekyll:dev');
  });

  // CSS
  grunt.registerTask('css', 'Build CSS files', function() {
    grunt.log.subhead('Build CSS files'.magenta);
    grunt.task.run('sass');
    grunt.task.run('autoprefixer');
    grunt.task.run('criticalcss');
    //grunt.task.run('csslint');
  });

  // JS
  grunt.registerTask('js', 'Build js files', function() {
    grunt.log.subhead('Build Javascripts files'.magenta);
    grunt.task.run('uglify:all_js');
  });

  // Styleguide
  grunt.registerTask('styleguide', 'Build js files', function() {
    grunt.log.subhead('Build Styleguide'.magenta);
    grunt.task.run('hologram');
  });

};
