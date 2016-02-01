// ==== MAIN ==== //

var gulp = require('gulp');

gulp.task('default', ['watch']);

gulp.task('build', ['images', 'scripts', 'styles', 'html', 'fonts']);

//gulp.task('dist', ['images-dist', 'styles-dist']);