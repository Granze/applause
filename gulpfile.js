'use strict';

var gulp = require('gulp'),
    plug = require('gulp-load-plugins')(),
    wiredep = require('wiredep').stream,
    html2js = require('gulp-ng-html2js'),
    buildFolder = 'dist',
    srcPaths = {
      scss: ['app/styles/main.scss'],
      css: ['app/styles/main.css'],
      scripts: ['app/scripts/{,*/}*.js'],
      images: 'app/images/*.*',
      html: ['app/index.html','app/views/presentation.html'],
      partials: 'app/views/*.html',
      templates: 'app/templates/*.js',
      bower: 'app/bower_components'
    },
    destPaths = {
      styles: [buildFolder + '/styles/'],
      scripts: [buildFolder + '/scripts/'],
      images: buildFolder + '/images/'
    };

gulp.task('clean', function() {
  return gulp.src(buildFolder, {read: false})
    .pipe(plug.clean());
});

gulp.task('styles', function() {
  return gulp.src(srcPaths.scss)
    .pipe(plug.sass())
    .pipe(plug.autoprefixer('last 1 version'))
    .pipe(gulp.dest('app/styles'));
});

gulp.task('scripts', function() {
  return gulp.src(srcPaths.scripts, 'gulpfile.js')
    .pipe(plug.jshint('.jshintrc'))
    .pipe(plug.jshint.reporter(require('jshint-stylish')));
});

gulp.task('images', function() {
  return gulp.src(srcPaths.images)
    .pipe(plug.cache(plug.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(destPaths.images));
});

gulp.task('wiredep', function () {
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

gulp.task('prepare', ['styles', 'scripts'], function() {
  var jsFilter = plug.filter('**/*.js'),
      cssFilter = plug.filter('**/*.css'),
      partialFilter = plug.filter(srcPaths.partials);

  return gulp.src('app/*.html')
    .pipe(plug.useref.assets('app'))
    .pipe(jsFilter)
    .pipe(plug.ngmin())
    .pipe(plug.uglify())
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe(plug.csso())
    .pipe(cssFilter.restore())
    .pipe(partialFilter)
    .pipe(html2js({moduleName: 'appTemplates', prefix: '/templates'}))
    .pipe(partialFilter.restore())
    .pipe(plug.useref.restore())
    .pipe(plug.useref())
    .pipe(gulp.dest(buildFolder));
});

gulp.task('connect', function() {
  var connect = require('connect');
  var app = connect()
    .use(require('connect-livereload')({ port: 35729 }))
    .use(connect.static('app'))
    .use(connect.static('.tmp'))
    .use(connect.directory('app'));

  require('http').createServer(app)
    .listen(9000)
    .on('listening', function () {
      console.log('Started connect web server on http://localhost:9000');
    });
});

gulp.task('serve', ['connect', 'styles'], function () {
  require('opn')('http://localhost:9000');
});

gulp.task('build', ['prepare', 'images']);

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});

gulp.task('watch', ['connect', 'serve'], function () {
  var server = require('connect-livereload')();

  gulp.watch([
    srcPaths.html,
    srcPaths.css,
    srcPaths.scripts,
    srcPaths.images
  ]).on('change', function (file) {
    server.changed(file.path);
  });

  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/scripts/**/*.js', ['scripts']);
  gulp.watch('app/images/**/*', ['images']);
  gulp.watch('bower.json', ['wiredep']);
});