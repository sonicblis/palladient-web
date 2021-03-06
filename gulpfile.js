(function(){
    'use strict';
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var shell = require('gulp-shell');
var watch = require('gulp-watch');
var less = require('gulp-less');
var browser = require('browser-sync');
var reload = browser.reload;

    gulp.task('unifyJs', function() {
        gulp.src('app/**/*.js')
            .pipe(concat('all.js'))
            .pipe(gulp.dest('dist/'));
    });

    gulp.task('JSLibraries', function(){
        gulp.src([
            "node_modules/jquery/dist/jquery.min.js",
            "node_modules/bootstrap/dist/js/bootstrap.min.js",
            "node_modules/angular/angular.min.js",
            "libraries/ng-resource.js",
            "node_modules/angular-animate/angular-animate.min.js",
            "node_modules/angular-ui-bootstrap/ui-bootstrap.min.js",
            "node_modules/angular-ui-bootstrap/ui-bootstrap-tpls.min.js",
            "node_modules/angular-ui-router/release/angular-ui-router.min.js",
            "node_modules/toastr/build/toastr.min.js"
        ])
            .pipe(concat('jsLibraries.js'))
            .pipe(gulp.dest('dist/'));
    });

    gulp.task('CssLibraries', function(){
        gulp.src([
            "node_modules/bootstrap/dist/css/bootstrap.min.css",
            "node_modules/angular-ui-bootstrap/ui-bootstrap-csp.css",
            "node_modules/toastr/build/toastr.min.css"
        ])
            .pipe(concat('cssLibraries.css'))
            .pipe(gulp.dest('dist/'));
    });

    gulp.task('unifyCss', function() {
        gulp.src(['css/**/*.css','css/**/*.less'])
            .pipe(less())
            .pipe(concat('all.css'))
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
        files: 'dist/*.*'
    });
    gulp.watch(['index.html', "app/**/*.html"]).on('change', browser.reload);
});

gulp.task('publish', ['unify-prod', 'deploy']);

gulp.task('unify-prod', function() {
    gulp.src('app/**/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function(){
    gulp.watch('app/**/*.js', ['unifyJs']);
    gulp.watch('css/**/*.css', ['unifyCss']);
});
}());