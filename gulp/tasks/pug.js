const plumber = require('gulp-plumber'),
pug = require('gulp-pug'),
replace = require('gulp-replace'),
rename = require('gulp-rename'),
cached = require('gulp-cached');

module.exports = function () {
    $.gulp.task('pug', () => {
        return $.gulp.src('./dev/pug/*.pug')
        .pipe(plumber())
        .pipe(pug({
            pretty: true
        }))
        .pipe(plumber.stop())
        .pipe(cached('pug'))
        .pipe($.gulp.dest('./build/'))
        .on('end', $.browserSync.reload);
    });
    $.gulp.task('pug-php', function () {
        return $.gulp.src('./dev/pug/*.pug')
        .pipe(plumber())
        .pipe(pug({
            pretty: true
        }))
        .pipe(rename(function (path) {
            path.extname = ".php"
        }))
        .pipe(replace('.html', '.php'))
        .pipe($.gulp.dest('./build/'))
    });
};
