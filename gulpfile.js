const gulp = require("gulp");
const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");

const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnext = require('postcss-cssnext');
const cssmin = require('gulp-cssmin');
const glob = require('gulp-sass-glob');
const mmq = require('gulp-merge-media-queries');
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const imageminJpg = require('imagemin-jpeg-recompress');
const imageminPng = require('imagemin-pngquant');
const imageminGif = require('imagemin-gifsicle');

const sourcemaps = require('gulp-sourcemaps');
const versions = ["last 2 versions", "ie >= 11", "Android >= 5", "ios_saf >= 10"];
const convertEncoding = require('gulp-convert-encoding');
const replace = require('gulp-replace');

const browserSync = require('browser-sync');

const paths = {
    srcDir: 'src',
    dbgDir: 'debug',
    dstDir: 'dist'
};

gulp.task("sass", function () {
    let processors = [
        cssnext({browsers: versions})
    ];
    return gulp.src([paths.srcDir + '/**/*.scss'])
        .pipe(glob())
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.dbgDir));
});

gulp.task("js", function () {
    return webpackStream(webpackConfig, webpack)
        .pipe(gulp.dest(paths.dbgDir));
});

gulp.task("image", function () {
    let srcGlob = paths.srcDir + '/**/*.+(jpg|jpeg|png|gif)';
    let dstGlob = paths.dbgDir;
    gulp.src(['src/**/*.+(jpg|jpeg|png|gif)'])
        //.pipe(changed(dstGlob))
        .pipe(gulp.dest(dstGlob));
});

gulp.task('html', function () {
    return gulp.src(['src/**/*.html'])
        .pipe(plumber())
        .pipe(gulp.dest(paths.dbgDir));
});

gulp.task('watch', function () {
    gulp.watch(paths.srcDir + '/**/*.scss', gulp.parallel('sass'));
    gulp.watch(paths.srcDir + '/**/*.js', gulp.parallel('js'));
    gulp.watch(paths.srcDir + '/**/*.+(jpg|jpeg|png|gif)', gulp.parallel('image'));
    gulp.watch(paths.srcDir + '/**/*.html', gulp.parallel('html'));
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: './debug',
        },
        startPath: './pj/special/smartbra/index.html',
        files: [
            paths.dbgDir + "/**/*.css",
            paths.dbgDir + "/**/*.js",
            paths.dbgDir + "/**/*.html"
        ]
    });
});

gulp.task('dist', function () {
    //js
    webpackConfig.mode = 'production';
    webpackConfig.devtool = '';
    webpackStream(webpackConfig, webpack)
        .pipe(convertEncoding({to: 'Shift_JIS'}))
        .pipe(gulp.dest(paths.dstDir));

    //img
    gulp.src([paths.srcDir + '/**/*.+(jpg|jpeg|png|gif)'])
        .pipe(changed(paths.dstDir))
        .pipe(gulp.dest(paths.dstDir));
    //css
    let processors = [
        cssnext({browsers: versions})
    ];
    gulp.src([paths.srcDir + '/**/*.scss'])
        .pipe(glob())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(mmq({log: true}))
        .pipe(cssmin())
        .pipe(replace('UTF-8', 'shift_jis'))
        .pipe(convertEncoding({to: 'Shift_JIS'}))
        .pipe(gulp.dest(paths.dstDir));

    //html
    let ejs_src = [paths.srcDir + '/**/**/*.ejs', "!" + paths.srcDir + "/**/_*.ejs"];
    gulp.src(['src/**/*.html'])
        .pipe(plumber())
        .pipe(replace('UTF-8', 'shift_jis'))
        .pipe(convertEncoding({to: 'Shift_JIS'}))
        .pipe(gulp.dest(paths.dstDir));
});

