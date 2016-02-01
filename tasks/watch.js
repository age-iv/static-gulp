// ==== WATCH ==== //

var gulp        = require('gulp')
  , plugins     = require('gulp-load-plugins')({ camelize: true })
  , browsersync = require('browser-sync')
  , config      = require('../gulpconfig').watch
;

// Watch (BrowserSync version): build stuff when source files are modified, let BrowserSync figure out when to reload
// Task chain: build -> browsersync -> watch
gulp.task('watch-browsersync', ['browsersync'], function() {
  gulp.watch(config.src.styles, ['styles'])
    .on('change', browsersync.reload);
  gulp.watch(config.src.scripts, ['scripts'])
    .on('change', browsersync.reload);
  gulp.watch(config.src.images, ['images'])
    .on('change', browsersync.reload);
  gulp.watch(config.src.html, ['html'])
      .on('change', browsersync.reload);
  gulp.watch(config.src.fonts, ['fonts'])
    .on('change', browsersync.reload);
});

// Watch (Livereload version): build stuff when source files are modified, inform livereload when anything in the `build` or `dist` folders change
// Task chain: build -> livereload -> watch
gulp.task('watch-livereload', ['livereload'], function() {
  gulp.watch(config.src.styles, ['styles']);
  gulp.watch(config.src.scripts, ['scripts']);
  gulp.watch(config.src.images, ['images']);
  gulp.watch(config.src.html, ['html']);
  gulp.watch(config.src.fonts, ['fonts']);
  gulp.watch(config.src.livereload).on('change', function(file) {
    plugins.livereload.changed(file.path);
  });
});

// Master control switch for the watch task
gulp.task('watch', ['watch-'+config.watcher]);
