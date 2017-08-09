var gulp = require('gulp');
var beep = require('beepbeep');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');

var onError = function (err) {
  beep([0, 0, 0]);
  gutil.log(gutil.colors.green(err));
};

// SASS
gulp.task('sass', function() {
  return gulp.src([
    './scss/app.scss'
  ])
  .pipe(plumber({ errorHandler: onError }))
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./css'))
  .pipe(livereload());
});

// HTML
gulp.task('html', function() {
  return gulp
    .src(['./*.html', './templates/**/*.html'])
    .pipe(livereload());
});

// PRIMARY WATCHER
gulp.task('default', function() {
  livereload.listen();
  // gulp.watch(['./scss/_mixins.scss', './scss/_styles.scss', './scss/app.scss'], ['sass']);
  gulp.watch('./*.html', ['html']);
})

gulp.task('build', function() {
  gulp.start('sass');
});
