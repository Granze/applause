'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    wiredep = require('wiredep').stream,
    del = require('del'),
    config = require('./config.json').config,
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    buildFolder = 'presentation',
    assetsFolder = 'assets',
    srcPaths = {
      scss: assetsFolder + 'styles/main.scss',
      theme: assetsFolder + 'styles/' + config.theme + '*.{scss,css}',
      css: assetsFolder + 'styles/main.css',
      scripts: assetsFolder + 'scripts/{,*/}*.js',
      images: assetsFolder + 'images/*.*',
      fonts: assetsFolder + 'fonts',
      slides: 'slides.html',
      bower: 'bower_components'
    },
    destPaths = {
      styles: buildFolder + '/styles',
      scripts: buildFolder + '/scripts',
      images: buildFolder + '/images'
    };

gulp.task('bump', function(){
  gulp.src(['./bower.json', './package.json'])
    .pipe($.bump())
    .pipe(gulp.dest('./'));
});

gulp.task('clean', function(cb) {
  del([buildFolder], cb);
});

gulp.task('config', function() {
  gulp.src('config.json')
    .pipe($.ngConstant({'name': 'applauseConfig'}))
    .pipe(gulp.dest('scripts/services'));
});

gulp.task('styles', function() {
  return gulp.src([srcPaths.scss, srcPaths.theme])
    .pipe($.sass({errLogToConsole: true}))
    .pipe($.autoprefixer('last 2 version'))
    .pipe($.concat('main.css'))
    .pipe(gulp.dest('styles'))
    .pipe(reload({stream:true}));
});

gulp.task('scripts', function() {
  return gulp.src([srcPaths.scripts, 'gulpfile.js', !assetsFolder + 'scripts/services/config.js', !assetsFolder + 'scripts/vendor/*.js'])
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter(require('jshint-stylish')));
});

gulp.task('wiredep', function() {
  gulp.src(srcPaths.scss)
    .pipe(wiredep({
      directory: srcPaths.bower
    }))
    .pipe(gulp.dest('styles'));

  gulp.src('index.html')
    .pipe(wiredep({
      directory: srcPaths.bower
    }))
    .pipe(gulp.dest('/'));
});

gulp.task('fonts', function () {
  gulp.src(srcPaths.fonts + '/*.*')
    .pipe(gulp.dest(buildFolder + '/fonts'));
});

gulp.task('images', function() {
  return gulp.src(srcPaths.images)
    .pipe(gulp.dest(destPaths.images));
});

gulp.task('prepare', ['styles', 'scripts', 'config', 'fonts'], function() {
  var jsFilter = $.filter('**/*.js'),
      cssFilter = $.filter('**/*.css');

  return gulp.src('*.html')
    .pipe($.useref.assets('/'))
    .pipe(jsFilter)
    .pipe($.ngAnnotate())
    .pipe($.uglify())
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe($.useref.restore())
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

gulp.task('tag', function(){

});

gulp.task('push', function(){

});

gulp.task('build', ['clean'], function() {
  gulp.start(['prepare', 'images', 'templates']);
});

// build, bump, tag, push
gulp.task('bower', function(){
  gulp.start(['push']);
});

gulp.task('watch', function() {
  gulp.start(['browserSync', 'styles', 'config']);
  gulp.watch([srcPaths.scss, srcPaths.theme], ['styles']);
  gulp.watch(srcPaths.scripts, ['scripts', browserSync.reload]);
  gulp.watch(srcPaths.slides, ['templates', browserSync.reload]);
  gulp.watch('bower.json', ['wiredep', browserSync.reload]);
  gulp.watch('config.json', ['config', browserSync.reload]);
});
