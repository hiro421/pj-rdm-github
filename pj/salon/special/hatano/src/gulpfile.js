const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const csslint = require('gulp-csslint');
const autoPrefixer = require('gulp-autoprefixer');
//if node version is lower than v.0.1.2
require('es6-promise').polyfill();
const cssComb = require('gulp-csscomb');
const cmq = require('gulp-merge-media-queries');
const postcss = require('gulp-postcss');
const cssnext = require('postcss-cssnext');
const sassGlob = require("gulp-sass-glob");
//const frontnote = require('gulp-frontnote');
//const ejs = require('gulp-ejs');
const rename = require("gulp-rename");
gulp.task('sass',function(){
    var processors = [
        cssnext({browsers: ["last 2 versions", "ie >= 11", "Android >= 4", "ios_saf >= 10"]})
    ];
    return gulp.src(['./sass/**/*.scss'])
        .pipe(sassGlob())
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sass())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(autoPrefixer())
        .pipe(cssComb())
        .pipe(cmq({log:true}))
        //.pipe(csslint())
        //.pipe(csslint.formatter())
        .pipe(gulp.dest('../css'))
});
gulp.task('default',function(){
    gulp.watch('sass/**/*.scss',['sass']);
});
