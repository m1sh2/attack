const gulp       = require('gulp');
const shell      = require('gulp-shell');
const notifier   = require('node-notifier');
const ts         = require('gulp-typescript');
const concat     = require('gulp-concat');
const rename     = require('gulp-rename');
const uglify     = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const del        = require('del');
const flatten    = require('gulp-flatten');
const inject     = require('gulp-inject');
const bump       = require('gulp-bump');
const replace    = require('gulp-replace');

const dist       = './app';
const views      = './app/views';
const app        = './app/main.js';

const package = require('./package.json');
var version = package.version;

const jsLibs     = [

];

const angularLibsSrc = [
	'node_modules/es6-shim/es6-shim.min.js',
	'node_modules/zone.js/dist/zone.js',
	'node_modules/reflect-metadata/Reflect.js',
	'node_modules/systemjs/dist/system.src.js',
	'node_modules/angular2/bundles/angular2.js'
];

const angularLibs = [
	'app/libs/es6-shim.min.js',
	'app/libs/zone.js',
	'app/libs/Reflect.js',
	'app/libs/system.src.js',
	'app/libs/angular2.js'
];

const appLibs = [
	'src/app/**/*.js',
	'src/app/**/*.map'
];

const cssLibs = [
	'assets/styles/reset.css',
	'assets/styles/style.css'
];

const cssLibsSrc = [
	'src/css/reset.css',
	'src/css/style.css'
];

gulp.task('clear', function(){
	del(['app/libs/*.*', './index.html', 'app/libs.*']);
});

gulp.task('ng', function(){
	return gulp.src(angularLibsSrc)
		.pipe(flatten())
		// .pipe(sourcemaps.init())
		// .pipe(concat('ng.js'))
		// .pipe(gulp.dest(dist))
		// .pipe(rename('ng.min.js'))
		// .pipe(uglify())
		// .pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(dist + '/libs'));
});

gulp.task('js', ['ng'], function(){
	return gulp.src(jsLibs)
		.pipe(sourcemaps.init())
		.pipe(concat('libs.js'))
		.pipe(gulp.dest(dist))
		.pipe(rename('libs.min.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(dist));
});

gulp.task('ts', ['ng'], function(){
	return gulp.src(['./app/main.ts'], {read: false})
		.pipe(shell(['ntsc -p ./app'], {
			ignoreErrors: true
		}));
});

gulp.task('ts:watch', function(){
	return gulp.src(['./app/main.ts'], {read: false})
		.pipe(shell(['ntsc -p ./app'], {
			ignoreErrors: true
		}));
});

gulp.task('index:dev', ['ts'], function () {
	const sources = gulp.src(angularLibs.concat(cssLibs), {read: false});
	const package = require('./package.json');
	return gulp.src('./src/index.html')
		.pipe(inject(sources))
		.pipe(replace('{{version}}', package.version))
		.pipe(replace('{{name}}', package.name))
		.pipe(gulp.dest('./'));
});

gulp.task('version', function() {
	const package = require('./package.json');
	return gulp.src('./index.html')
		.pipe(replace('{{version}}', package.version))
		.pipe(replace('{{name}}', package.name))
		.pipe(gulp.dest('./'));
});

gulp.task('index:release', ['index:dev'], function () {
	
});

gulp.task('bump:commit', function(){
	gulp.src('./package.json')
		.pipe(bump())
		.pipe(gulp.dest('./'));
});

gulp.task('bump:release', function(){
	gulp.src('./package.json')
		.pipe(bump({type:'minor'}))
		.pipe(gulp.dest('./'));
});

gulp.task('bump:prod', function(){
	gulp.src('./package.json')
		.pipe(bump({type:'major'}))
		.pipe(gulp.dest('./'));
});

gulp.task('dev', ['clear', 'index:dev'], function() {

});

gulp.task('commit', ['clear', 'bump:commit', 'index:dev'], function() {

});

gulp.task('release', ['clear', 'bump:release', 'index:release'], function() {

});

gulp.task('prod', ['clear', 'bump:prod', 'index:release'], function() {

});

gulp.task('default', ['dev'], function(){
	
});

gulp.task('dev:w', ['ts:watch'], function() {
	gulp.watch(['./app/**/*.ts'], ['ts:watch']);
});


 

 
