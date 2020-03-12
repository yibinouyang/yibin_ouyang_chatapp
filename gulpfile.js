var gulp = require('gulp');
var sass = require('gulp-sass');  // gulp plugin for compiling sass into css
var image = require('gulp-image');  // gulp plugin for reducing image size for web

// use gulp-sass to compile sass into css
function taskSass() {
    console.log('gulp task : sass');
    // sass/*.scss => public/css/*.css
    return gulp.src(__dirname + '/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(__dirname + '/public/css'));
}

// use gulp-image to reduce image size for web
function taskImage() {
    console.log('gulp task : image-opt');
    // assets/images/*.* => public/img/*.*
    return gulp.src(__dirname + '/assets/images/*.*')
        .pipe(image())
        .pipe(gulp.dest(__dirname + '/public/img'));
}

// parallel execution of two above tasks
gulp.task('default', gulp.parallel(taskSass, taskImage));
