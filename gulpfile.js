'use strict';

var gulp = require('gulp'),
    plug = require('gulp-load-plugins')(),
    wiredep = require('wiredep').stream,
    html2js = require('gulp-ng-html2js'),
    ngConstant = require('gulp-ng-constant'),
    del = require('del'),
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
    .pipe(plug.bump({type:'minor'}))
    .pipe(gulp.dest('./'));
});

gulp.task('clean', function(cb) {
  del([buildFolder], cb);
});

gulp.task('config', function() {
  gulp.src('app/config.json')
    .pipe(ngConstant({'name': 'applauseConfig'}))
    .pipe(gulp.dest('app/scripts/services'));
});

gulp.task('styles', function() {
  return gulp.src(srcPaths.scss)
    .pipe(plug.sass())
    .pipe(plug.autoprefixer('last 2 version'))
    .pipe(gulp.dest('app/styles'));
});

gulp.task('scripts', function() {
  return gulp.src([srcPaths.scripts, 'gulpfile.js', '!app/scripts/templates/presentation.js', '!app/scripts/services/config.js'])
    .pipe(plug.jshint('.jshintrc'))
    .pipe(plug.jshint.reporter(require('jshint-stylish')));
});

gulp.task('images', function() {
  return gulp.src(srcPaths.images)
    .pipe(plug.cache(plug.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(destPaths.images));
});

gulp.task('templates', function() {
  return gulp.src(srcPaths.partials)
    .pipe(html2js({moduleName: 'applauseTemplates', prefix: 'views/'}))
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
  var jsFilter = plug.filter('**/*.js'),
      cssFilter = plug.filter('**/*.css');

  return gulp.src('app/*.html')
    .pipe(plug.useref.assets('app'))
    .pipe(jsFilter)
    .pipe(plug.ngAnnotate())
    .pipe(plug.uglify())
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe(plug.csso())
    .pipe(cssFilter.restore())
    .pipe(plug.useref.restore())
    .pipe(plug.useref())
    .pipe(gulp.dest(buildFolder));
});

gulp.task('connect', function() {
  var connect = require('connect');
  var app = connect()
    .use(require('connect-livereload')({ port: 35729 }))
    .use(connect.static('app'))
    .use(connect.directory('app'));

  require('http').createServer(app).listen(9000);
});

gulp.task('serve', ['connect', 'styles', 'templates', 'config'], function() {
  require('opn')('http://localhost:9000');
});

gulp.task('build', ['prepare', 'images', 'templates']);

gulp.task('default', ['clean'], function() {
  gulp.start('build');
});

gulp.task('watch', ['connect', 'serve'], function() {
  var server = plug.livereload();

  gulp.watch([
    srcPaths.html,
    srcPaths.css,
    srcPaths.scripts,
    srcPaths.images,
    srcPaths.partials,
    'app/scripts/config.json'
  ]).on('change', function (file) {
    server.changed(file.path);
  });

  gulp.watch(srcPaths.scss, ['styles']);
  gulp.watch(srcPaths.scripts, ['scripts']);
  gulp.watch(srcPaths.images, ['images']);
  gulp.watch(srcPaths.partials, ['templates']);
  gulp.watch('bower.json', ['wiredep']);
  gulp.watch('app/config.json', ['config']);
});
