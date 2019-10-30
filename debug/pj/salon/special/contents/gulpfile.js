const gulp = require("gulp");

const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnext = require('postcss-cssnext');
const cssmin = require('gulp-cssmin');
const glob = require('gulp-sass-glob');

gulp.task("sass",function(){
    let processors = [
        cssnext({browsers: ["last 2 versions", "ie >= 10", "Android >= 4","ios_saf >= 8"]})
    ];
    return gulp.src(['./sass/*.scss'])
        .pipe(glob())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(cssmin())
        .pipe(gulp.dest('./css/'))
});

gulp.task('default', function(){
    gulp.watch('./sass/**/*.scss', gulp.parallel('sass'));
    //gulp.watch('./js/**/*.js', ['js']);
});