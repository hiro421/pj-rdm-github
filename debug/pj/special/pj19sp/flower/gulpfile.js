var gulp         = require('gulp');
var browser      = require('browser-sync');
var plumber      = require("gulp-plumber");
var watch        = require("gulp-watch");
var ejs          = require('gulp-ejs');
var rename       = require("gulp-rename");
var fs           = require('fs');
var path         = require('path');
var consolidate  = require('gulp-consolidate');

var sass         = require('gulp-sass');
var sassGlob     = require( 'gulp-sass-glob' );
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss    = require('gulp-minify-css');
var changed      = require('gulp-changed');

var gutil        = require('gulp-util');
var ftp          = require('gulp-ftp');
var sftp         = require('gulp-sftp');

var gifsicle     = require('imagemin-gifsicle');
var jpegtran     = require('imagemin-jpegtran');
var optipng      = require('imagemin-optipng');
var spritesmith  = require('gulp.spritesmith');

var uglify       = require('gulp-uglify');
var merge        = require('event-stream').merge;

var pug          = require('gulp-pug');
 



gulp.task('server', function() {
    browser({server: {
        baseDir: 'dest'
    }});
});


// gulp.task('pug', () => {
//   return gulp.src(['dev/pug/**/*.pug','dev/pug/includes/*.pug', '!dev/pug/**/_*.pug'])
//   .pipe(pug({
//     pretty: true
//   }))
//   .pipe(plumber())
//   .pipe( gulp.dest('dest') );
// });

// --------------------------
// CSS Sprite Create
var getFolders = function(dir_path) {
  return fs.readdirSync(dir_path).filter(function(file) {
    return fs.statSync(path.join(dir_path, file)).isDirectory();
  });
};

// gulp.task('sprite', function() {
//   var folders = getFolders('dev/img/sprite/');
//   folders.forEach(function(folder){
//     var spriteData = gulp.src('dev/img/sprite/' + folder + '/*.png')
//       .pipe(spritesmith({
//         imgName: folder + '.png',
//         imgPath: 'img/' + folder + '.png',
//         cssName: folder + '.css',
//         padding: 4,
//       }));
//     spriteData.img
//       .pipe(gulp.dest('dest/img'));
//     spriteData.css
//       .pipe(gulp.dest('dest/img/spritecss/'));
//   })
// });

gulp.task('css', function(){
    return gulp.src('dev/sass/*.scss')
            .pipe(plumber({
              errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }}))
            .pipe(changed('dest/css'))
            .pipe(sourcemaps.init())
            .pipe(sassGlob())
            .pipe(sass())
            .pipe(autoprefixer({
                browsers: ["last 2 versions", "ie >= 9", "Android >= 4","ios_saf >= 8"],
                cascade: false
            }))
            .pipe(minifyCss({advanced:false})) // minify
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('dest/css'));
});


gulp.task('js', function(){
    return gulp.src('dev/js/*.js')
               .pipe( gulp.dest('dest/js') )
               .pipe(uglify())
               .on('error', function(e){
                   console.log(e);
               })
               .pipe(rename({extname: '.min.js'}))
               .pipe( gulp.dest('dest/js') );
});



gulp.task('html', function(){
    var ejs_src = ['dev/*.ejs', 'dev/**/*.ejs', 'dev/**/**/*.ejs'];
    return gulp.src(ejs_src)
               .pipe(plumber())
               .pipe(ejs())
               .pipe( rename({
                  extname: '.html'
               }))
               .pipe( gulp.dest('dest') );
});


gulp.task('img', function() {
  var jpg = gulp.src(['dev/img/*.jpg'])
             .pipe(plumber())
             .pipe(changed('dest/img'))
             // .pipe(jpegtran()())
             .pipe(gulp.dest('dest/img'));
  var png = gulp.src(['dev/img/*.png'])
             .pipe(plumber())
             .pipe(changed('dest/img'))
             // .pipe(optipng()())
             .pipe(gulp.dest('dest/img'));
  var gif = gulp.src(['dev/img/*.gif'])
             .pipe(plumber())
             .pipe(changed('dest/img'))
             // .pipe(gifsicle()())
             .pipe(gulp.dest('dest/img'));
  var svg = gulp.src(['dev/img/*.svg'])
             .pipe(plumber())
             .pipe(changed('dest/img'))
             .pipe(gulp.dest('dest/img'));
  var fav = gulp.src(['dev/img/*.ico'])
             .pipe(plumber())
             .pipe(changed('dest/img'))
             .pipe(gulp.dest('dest/img'));
  return merge(jpg,png,gif,svg,fav);
});

gulp.task('watch', function() {
    watch(['dev/sass/**/*.scss','dev/img/**','dev/**/*.ejs','dev/**/*.js'], function(event){gulp.start("build");});
});

gulp.task('build', ['css','img','js','html'],function(){
    browser.reload();
});

gulp.task('default', ['build','watch','server']);
