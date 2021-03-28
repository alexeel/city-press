const svgPath = {
        "input": "./dev/static/img/svg/*.svg",
        "output": "./build/static/img/svg/"
    };

module.exports = function () {
    $.gulp.task('svg', () => {
        return $.gulp.src(svgPath.input)
            .pipe($.gulp.dest(svgPath.output));
    });
};
