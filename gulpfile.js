var gulp  = require('gulp')
var shell = require('gulp-shell')

gulp.task('jekyll', shell.task([
  'bundle exec jekyll build'
]))

gulp.task('default', ['jekyll']);
