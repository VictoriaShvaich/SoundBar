const gulp = require('gulp');


// const sass = require('gulp-dart-sass');
const dartSass = require('sass');
const gulpSass = require('gulp-sass')(dartSass);



async function compileSass() {
    const autoprefixer = (await import('gulp-autoprefixer')).default;

    return gulp.src('./scss/*.scss')
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./css'));
}

function watch() {
    gulp.watch('./scss/**/*.scss', compileSass);
}

exports.compileSass = compileSass;
exports.watch = watch;