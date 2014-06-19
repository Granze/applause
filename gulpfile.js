'use strict';

var gulp = require('gulp'),
    plug = require('gulp-load-plugins')(),
    wiredep = require('wiredep'),
    buildFolder = 'presentation',
    srcPaths = {
      styles: ['app/styles/*.scss'],
      scripts: ['app/scripts/{,*/}*.js'],
      images: 'app/images/*.*'
    },
    destPaths = {
      styles: [buildFolder + '/styles/*.scss'],
      scripts: [buildFolder + '/scripts/{,*/}*.js'],
      images: buildFolder + '/images/*.*'
    };

gulp.task('clean', function() {
  return gulp.src(buildFolder, {read: false})
    .pipe(plug.clean());
});

gulp.task('styles', function() {
  return gulp.src(srcPaths.styles)
    .pipe(plug.sass())
    .pipe(plug.autoprefixer())
    .pipe(plug.csso())
    .pipe(gulp.dest('app/styles'));
});

gulp.task('scripts', function() {
  return gulp.src(srcPaths.scripts)
    .pipe(plug.changed(destPaths.scripts))
    .pipe(plug.jshint('.jshintrc'))
    .pipe(plug.jshint.reporter('jshint-stylish'));
});

gulp.task('images', function() {
  return gulp.src(srcPaths.images)
    .pipe(plug.changed(destPaths.images))
    .pipe(plug.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('app/images'));
});

gulp.task('connect', function() {

});

gulp.task('prepare', function() {
  return gulp.src()
    .pipe(plug.notify({message: 'Build complete!'}));
});

gulp.task('watch', function() {

});

gulp.task('default', [
  'styles',
  'script',
  'images',
  'connect',
  'watch'
]);

gulp.task('build', ['clean'], function() {
  gulp.start('styles', 'script', 'images');
});


// 'bower-install',
// 'useminPrepare',
// 'autoprefixer',
// 'concat',
// 'ngmin',
// 'copy:dist',
// 'cssmin',
// 'uglify',
// 'usemin'
