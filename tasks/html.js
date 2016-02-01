// ==== HTML ==== //

var gulp        = require('gulp')
    , plugins     = require('gulp-load-plugins')({ camelize: true })
    , browsersync = require('browser-sync')
    , config      = require('../gulpconfig').html
;
gulp.task('html:jade', function(){
    return gulp.src(config.src + '**/*.jade')
        .pipe(plugins.jade(config.jade))
        .pipe(gulp.dest(config.tmp));
});
gulp.task('html:html', function(){
    return gulp.src(config.src + '**/*.html')
        .pipe(gulp.dest(config.tmp));
});
gulp.task('html:build',['html:html', 'html:jade'], function(){
    return gulp.src(config.tmp+ '**/*.html')
        .pipe(gulp.dest(config.build))
        .pipe(browsersync.stream());
});
gulp.task('html',['html:html', 'html:jade', 'html:build']);

gulp.task('html:dev',['html:html', 'html:jade']);
