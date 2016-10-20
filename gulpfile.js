var gulp  = require('gulp');
var shell = require('gulp-shell');
var postcss = require('gulp-postcss');
var atImport = require("postcss-import");
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

gulp.task('css', function () {
    var processors = [
        atImport(),
        autoprefixer({browsers: ['last 2 version']}),
        cssnano(),
    ];
    return gulp.src('./_css/*.css')
        // init sourcemaps
        .pipe(sourcemaps.init())
        // postcss
        .pipe(postcss(processors))
        // write sourcemaps
        .pipe(sourcemaps.write('.'))
        // write final css
        .pipe(gulp.dest('./css'));
});

gulp.task('jekyll', shell.task([
  'bundle exec jekyll build'
]))

// Static Server + watching scss/html files
gulp.task('serve', ['jekyll'], function() {

    browserSync.init({
        server: "./_site"
    });

    gulp.watch(["*.html", "_posts/*.md"], ['jekyll']);
    gulp.watch("_site/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['jekyll']);
