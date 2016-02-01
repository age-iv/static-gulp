// ==== FONTS ==== //

var gulp        = require('gulp')
  , plugins     = require('gulp-load-plugins')({ camelize: true })
  , config      = require('../gulpconfig').fonts
;

gulp.task('fonts', function() {
  return gulp.src(config.src + '/**/*.{eot,svg,ttf,woff,woff2}')
  .pipe(plugins.flatten())
  .pipe(gulp.dest(config.build + '/fonts/'));
});

gulp.task('fonts:dev', function() {
  return gulp.src(config.src)
  .pipe(gulp.dest(config.tmp));
});
