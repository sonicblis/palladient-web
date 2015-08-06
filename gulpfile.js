(function(){
    'use strict';
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var shell = require('gulp-shell');
var watch = require('gulp-watch');
var browser = require('browser-sync');
var reload = browser.reload;

gulp.task('unify', function() {
    gulp.src('app/**/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('deploy', shell.task(
    ['firebase deploy','firebase open'],
    {cwd: process.cwd()}
));

gulp.task('update', function(){
    reload();
});

gulp.task('webServer', function() {
    browser({
        server:{
            baseDir: './'
        },
        files: ["index.html","app/**/*.html","dist/all.js","css/**/*.css"]
    });
});

gulp.task('publish', ['unify-prod', 'deploy']);

gulp.task('unify-prod', function() {
    gulp.src('app/**/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function(){
    gulp.watch('app/**/*.js', ['unify']);
});
}());