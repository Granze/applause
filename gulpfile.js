'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    wiredep = require('wiredep').stream,
    del = require('del'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    buildFolder = 'presentation',
    srcPaths = {
      scss: 'app/styles/*.scss',
      css: 'app/styles/main.css',
      scripts: 'app/scripts/{,*/}*.js',
      images: 'app/images/*.*',
      html: 'app/index.html',
      partials: 'app/views/*.html',
      bower: 'app/bower_components'
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
  gulp.src('app/config.json')
    .pipe($.ngConstant({'name': 'applauseConfig'}))
    .pipe(gulp.dest('app/scripts/services'));
});

gulp.task('styles', function() {
  return gulp.src(srcPaths.scss)
    .pipe($.sass())
    .pipe($.autoprefixer('last 2 version'))
    .pipe(gulp.dest('app/styles'))
    .pipe(reload({stream:true}));
});

gulp.task('scripts', function() {
  return gulp.src([srcPaths.scripts, 'gulpfile.js', '!app/scripts/templates/*.js', '!app/scripts/services/config.js'])
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
    .pipe(gulp.dest('app/scripts/templates'));
});

gulp.task('wiredep', function() {
  gulp.src(srcPaths.scss)
    .pipe(wiredep({
      directory: srcPaths.bower
    }))
    .pipe(gulp.dest('app/styles'));

  gulp.src('app/*.html')
    .pipe(wiredep({
      directory: srcPaths.bower
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('prepare', ['styles', 'scripts', 'config'], function() {
  var jsFilter = $.filter('**/*.js'),
      cssFilter = $.filter('**/*.css');

  return gulp.src('app/*.html')
    .pipe($.useref.assets('app'))
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
      baseDir: './app'
    }
  });
});

gulp.task('main', ['browserSync', 'styles', 'templates', 'config']);

gulp.task('build', ['prepare', 'images', 'templates']);

gulp.task('default', ['clean'], function() {
  gulp.start('build');
});

gulp.task('watch', ['main'], function() {
  gulp.watch(srcPaths.scss, ['styles']);
  gulp.watch(srcPaths.scripts, ['scripts', browserSync.reload]);
  gulp.watch(srcPaths.images, ['images', browserSync.reload]);
  gulp.watch(srcPaths.partials, ['templates', browserSync.reload]);
  gulp.watch('bower.json', ['wiredep', browserSync.reload]);
  gulp.watch('app/config.json', ['config', browserSync.reload]);
});
