const gulp = require('gulp');
const sass = require('gulp-sass');
const watch = require('gulp-watch');

gulp.task('watch', function() {
    watch('scss/*.scss', function() {
        gulp.src('scss/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('css'));
    });
});
