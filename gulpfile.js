var gulp  = require('gulp');
var shell = require('gulp-shell');
var browserSync = require('browser-sync').create();

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
