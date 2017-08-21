var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var babel = require('gulp-babel');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
// Minifica o CSS
var cssmin = require('gulp-cssmin');

// Agrupa todos arquivos em UM
var concat = require('gulp-concat');
// Remove comentários CSS
var stripCssComments = require('gulp-strip-css-comments');
var imagemin = require('gulp-imagemin');
var changed  = require('gulp-changed'); 
var browserSync = require('browser-sync').create();



//minificação javascript 
gulp.task('scripts', function() {
    // corpo da tarefa 
    return gulp
            .src(['src/js/**/*.js'])
            .pipe(uglify())
            .pipe(gulp.dest('build/js'));      
});

var css = [
 './src/css/*.css',
 './src/style.css'
];

// Processo que agrupará todos os arquivos CSS, removerá comentários CSS e minificará.
gulp.task('minify-css', function(){
    gulp.src(css)
    .pipe(concat('style.min.css'))
    .pipe(stripCssComments({all: true}))
    .pipe(cssmin())
    .pipe(gulp.dest('./build/'));
});
gulp.task('images', function(tmp) {
    gulp.src(['src/images/*.jpg', 'src/images/*.png'])
        .pipe(changed('build/images/'))
        .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
        .pipe(gulp.dest('build/images'));
});

//task para o sass
gulp.task('sass', function () {
    return gulp.src('sass/*.sass')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('css'));
});

//es6
gulp.task("babel", function () {
return gulp.src("babel/*.js")
.pipe(sourcemaps.init())
.pipe(babel())
.pipe(concat("babel.js"))
.pipe(sourcemaps.write("."))
.pipe(gulp.dest("js"));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "yourlocal.dev"
    });
});

//task para o watch
gulp.task('watch', function () {
    gulp.watch('sass/*.sass', ['sass']);
    gulp.watch('src/js/**/*.js', ['scripts']);
});

//task default gulp
gulp.task('default', ['sass', 'watch','babel','minify-css']);