'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    wiredep = require('wiredep').stream,
    del = require('del'),
    config = require('./config.json').config,
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    buildFolder = 'presentation',
    srcPaths = {
      scss: 'styles/main.scss',
      theme: 'styles/' + config.theme + '*.scss',
      css: 'styles/main.css',
      scripts: 'scripts/{,*/}*.js',
      images: 'images/*.*',
      html: 'index.html',
      partials: 'views/*.html',
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
  return gulp.src([srcPaths.scripts, 'gulpfile.js', '!scripts/templates/*.js', '!scripts/services/config.js'])
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter(require('jshint-stylish')));
});

gulp.task('images', function() {
  return gulp.src(srcPaths.images)
    .pipe($.changed(destPaths.images))
    .pipe($.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest(destPaths.images));
});

gulp.task('templates', function() {
  return gulp.src(srcPaths.partials)
    .pipe($.ngHtml2js({moduleName: 'applauseTemplates', prefix: 'views/'}))
    .pipe(gulp.dest('scripts/templates'));
});

gulp.task('wiredep', function() {
  gulp.src(srcPaths.scss)
    .pipe(wiredep({
      directory: srcPaths.bower
    }))
    .pipe(gulp.dest('styles'));

  gulp.src('*.html')
    .pipe(wiredep({
      directory: srcPaths.bower
    }))
    .pipe(gulp.dest('/'));
});

gulp.task('prepare', ['styles', 'scripts', 'config'], function() {
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

gulp.task('main', ['browserSync', 'styles', 'templates', 'config']);

gulp.task('build', ['prepare', 'images', 'templates']);

gulp.task('default', ['clean'], function() {
  gulp.start('build');
});

gulp.task('watch', ['main'], function() {
  gulp.watch([srcPaths.scss, srcPaths.theme], ['styles']);
  gulp.watch(srcPaths.scripts, ['scripts', browserSync.reload]);
  gulp.watch(srcPaths.images, ['images', browserSync.reload]);
  gulp.watch(srcPaths.partials, ['templates', browserSync.reload]);
  gulp.watch('bower.json', ['wiredep', browserSync.reload]);
  gulp.watch('config.json', ['config', browserSync.reload]);
});
