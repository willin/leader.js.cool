var browserSync = require('browser-sync');
var gulp = require('gulp')
var run = require('gulp-run')

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./_book"
        }
    });
});

gulp.task('build-doc', function () {
    run('npm run build').exec('', function() {
        run('echo build DONE!').exec().pipe(browserSync.reload({stream:true}));
    });

})

gulp.task('watch', function () {
    gulp.watch(['./**/*.md', './node_modules/gitbook-plugin-theme-material/*'], ['build-doc']);
})

gulp.task('default', ['build-doc', 'browser-sync', 'watch']);
