/*GULP VARIABLES*/
var gulp = require('gulp');

var exec = require('child_process').exec;

//plugins
var plumber = require('gulp-plumber');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var notify = require("gulp-notify");

//dependancies
var del = require('del');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var _ = require('lodash');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var BOWER_COMPONENTS = './bower_components';

var BOWER_CSS_DEPENDENCIES = [
	BOWER_COMPONENTS + '/bootstrap/dist/css/bootstrap.css'
]

var BOWER_JS_DEPENDENCIES = [
	BOWER_COMPONENTS + '/jquery/dist/jquery.js',
	BOWER_COMPONENTS + '/bootstrap/dist/js/bootstrap.js',
	BOWER_COMPONENTS + '/lodash/lodash.js',
	BOWER_COMPONENTS + '/backbone/backbone.js',
	BOWER_COMPONENTS + '/backbone.syphon/lib/backbone.syphon.js',
	BOWER_COMPONENTS + '/firebase/firebase.js',
	BOWER_COMPONENTS + '/backbonefire/dist/backbonefire.js',
	BOWER_COMPONENTS + '/moment/moment.js',
	BOWER_COMPONENTS + '/moment/locale/es.js'
]

/*GULP TASKS*/

//clean
gulp.task('clean', function(cb)
{
	del(['dist/*.*'], cb);
});



//html
gulp.task('html', function()
{
	return gulp.src('./src/index.html')
	.pipe(plumber())
	.pipe(gulp.dest('./dist'));
});

//fonts
gulp.task('fonts', function()
{
	return gulp.src(BOWER_COMPONENTS + '/bootstrap-material-design/dist/fonts/*')
	.pipe(plumber())
	.pipe(gulp.dest('./dist/fonts'));
});

//styles
gulp.task('vendorcss', function() {

	return gulp.src(BOWER_CSS_DEPENDENCIES)
	.pipe(concat('vendor.css'))
	.pipe(minify())
	.pipe(gulp.dest('./dist'));
});

gulp.task('styles', function() {

	return gulp.src('./src/app.styl')
	.pipe(stylus())
	.pipe(autoprefixer())
	.pipe(minify())
	.pipe(sourcemaps.init({ loadMaps: true }))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('./dist'))
	.pipe(reload({ stream: true }));
});

// scripts

gulp.task('vendorjs', function() {

	return gulp.src(BOWER_JS_DEPENDENCIES)
	.pipe(concat('vendor.js'))
	.pipe(uglify({ mangle : false }))
	.pipe(gulp.dest('./dist'))
	.pipe(reload({ stream: true }));
});


var handleErrors = function() {
  var args = Array.prototype.slice.call(arguments);

  notify.onError({
    title: "Compile Error",
    message: "<%= error.message %>"
  }).apply(this, args);

  this.emit('end');
};


gulp.task('scripts', function() {
	process.env.BROWSERIFYSWAP_ENV = 'dist';
	return bundle();
});

var bundler = _.memoize(function(){
	return watchify(browserify('./src/app.js', _.extend({ debug: true }, watchify.args)));
});

function bundle()
{
	return bundler().bundle()
	.on('error', handleErrors)
	.pipe(source('app.js'))
	.pipe(buffer())
	//.pipe(uglify({ mangle : false }))
	.pipe(sourcemaps.init({ loadMaps: true }))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('./dist'))
	.pipe(reload({ stream: true }));
}


// build
gulp.task('build', [
	'clean',
	'html',
	'fonts',
	'vendorcss',
	'styles',
	'vendorjs',
	'scripts'
]);

// watch
gulp.task('watch', ['build'], function(){

	browserSync({
		server: {
			baseDir: 'dist'
		}
	});

	//watcher for updates on scripts
	bundler().on('update', function(){
		gulp.start('scripts');
	});

	//watcher for updates on styles
	gulp.watch(['./src/app.styl', './src/**/*.styl'], ['styles']);

	//watcher for updates on html
	gulp.watch(['./src/*.html'], ['html']);
});

// default
gulp.task('default', ['watch']);
