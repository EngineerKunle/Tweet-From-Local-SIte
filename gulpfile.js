'use strict';
var gulp = require('gulp'), 
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	connect = require('gulp-connect'),
	notify = require("gulp-notify"),
	copy = require('gulp-contrib-copy'),
	cssnano = require('gulp-cssnano'),
	nodemon = require('nodemon'),
	del = require('del');

// copy task
gulp.task('copy', function(){
	gulp.src('src/*.html')
	    .pipe(copy())
	    .pipe(notify({message: 'Copy task completed'}))
	    .pipe(gulp.dest('dest/'));
});

//sass task
gulp.task('sass', function(){
	return gulp.src('src/*.scss')
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(cssnano())
	.pipe(gulp.dest('dest/'))
	.pipe(notify({message: 'Sass task completed'}));
});

//Scripts
gulp.task('scripts', function(){
	return gulp.src('src/*.js')
	.pipe(notify({ message: 'Scripts task complete' }))
	.pipe(gulp.dest('dest/'))
	.pipe(uglify());
});

//liveserver load
gulp.task('connectDev', function(){
	connect.server({
    name: 'Dev App',
    root: 'dest/',
    port: 8000,
    livereload: true
  });

	notify({message: 'Server runnng... Port: ' + connect.port});
});

// Clean
gulp.task('clean', function() {
  return del(['dest/']);
});

// Default task
gulp.task('default', ['clean'], function() {
  gulp.start('sass', 'scripts', 'copy','watch', 'connectDev');
});

//gulp nodemon
gulp.task('nodemon', function(){
	nodemon({
    script: 'server.js'
  });
});

gulp.task('dev', function(){
	gulp.start('scripts', 'copy','nodemon');
});
//watch task
gulp.task('watch', function(){
	gulp.watch('src/*.scss', ['sass']);
	gulp.watch('src/*.js',  ['scripts']);
	gulp.watch('src/*.html', ['clean','scripts', 'sass', 'copy', 'connectDev']);
	console.log('Watch task running ...');
});