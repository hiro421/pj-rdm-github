const gulp = require("gulp");
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnext = require('postcss-cssnext');
const sassGlob = require("gulp-sass-glob");
const mmq = require('gulp-merge-media-queries');

gulp.task("sass", function () {
    var processors = [
        cssnext({browsers: ["last 2 versions", "ie >= 11", "Android >= 4", "ios_saf >= 10"]})
    ];
    return gulp.src(['./sass/**/*.scss'])
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(mmq({log: true}))
        .pipe(gulp.dest('../css/'))
});

gulp.task('default', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});