'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    del = require('del'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    buildFolder = 'presentation',
    assetsFolder = 'assets',
    srcPaths = {
      scss: assetsFolder + '/styles/main.scss',
      theme: assetsFolder + '/theme/*.scss',
      css: assetsFolder + '/styles/main.css',
      scripts: assetsFolder + '/scripts/{,*/}*.js',
      images: assetsFolder + '/images/*.*'
    };

gulp.task('clean', function(cb) {
  del([buildFolder], cb);
});

gulp.task('styles', function() {
  gulp.src(srcPaths.scss)
    .pipe($.sass({errLogToConsole: true}))
    .pipe($.autoprefixer('last 2 version'))
    .pipe(gulp.dest(assetsFolder + '/styles'))
    .pipe(reload({stream:true}));
});

gulp.task('theme', function() {
  gulp.src(srcPaths.theme)
    .pipe($.sass({errLogToConsole: true}))
    .pipe($.autoprefixer('last 2 version'))
    .pipe(gulp.dest(assetsFolder + '/theme'))
    .pipe(reload({stream:true}));
});

gulp.task('scripts', function() {
  gulp.src([srcPaths.scripts, 'gulpfile.js', '!assets/scripts/vendor/*.js'])
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter(require('jshint-stylish')));
});

gulp.task('fonts', function () {
  gulp.src('theme/fonts/*.*')
    .pipe(gulp.dest('presentation/theme/fonts'));
});

gulp.task('images', function() {
  gulp.src('assets/images/*.*')
    .pipe(gulp.dest('presentation/assets/images'));
});

gulp.task('themeMove', function() {
  gulp.src('assets/theme/**/*.*')
    .pipe(gulp.dest('presentation/assets/theme'));
});

gulp.task('prepare', ['styles', 'scripts'], function() {
  var assets = $.useref.assets();

  gulp.src('*.html')
    .pipe(assets)
    .pipe($.if('*.js', $.ngAnnotate()))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe(gulp.dest(buildFolder));
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('bump', function(){
  gulp.src(['./bower.json', './package.json', './bower-dist.json'])
    .pipe($.bump())
    .pipe(gulp.dest('./'));
});

gulp.task('tag', ['bump'], function(){
  var version = require('./bower.json').version;
  $.git.tag('v' + version, function(err) {
    if (err) {
      throw err;
    } else {
      console.log('tag created');
    }
  });
});

gulp.task('bowerDist', function(){
  gulp.src('bower-dist.json')
    .pipe($.rename('bower.json'))
    .pipe(gulp.dest('presentation'));
});

gulp.task('push', ['tag'], function(){
  $.git.push('bower', 'master', {args: ' --tags --dry-run'}, function(err) {
    if (err) {
      throw err;
    } else {
      console.log('pushed to repo');
    }
  });
});

gulp.task('build', ['clean'], function() {
  gulp.start(['prepare', 'images', 'fonts', 'themeMove']);
});

gulp.task('bower', ['build'], function(){
  gulp.start(['tag', 'push']);
});

gulp.task('watch', function() {
  gulp.start(['browserSync', 'styles', 'theme', 'scripts']);
  gulp.watch(srcPaths.scss, ['styles']);
  gulp.watch(srcPaths.theme, ['theme']);
  gulp.watch(srcPaths.scripts, ['scripts', browserSync.reload]);
});
