// ==== SCRIPTS ==== //

var gulp        = require('gulp')
    , gutil         = require('gulp-util')
    , browsersync = require('browser-sync')
    , plugins     = require('gulp-load-plugins')({ camelize: true })
    , config      = require('../gulpconfig').scripts
;

// ==== TO DO ==== //
gulp.task('scripts:coffee', function(){
    console.log(config.src);
});
// ==== TO DO ==== //

gulp.task('scripts:js', function(){
    return gulp.src(config.src+'**/*.js')
        .pipe(plugins.order(config.tmpOrder))
        .pipe(plugins.concat('scripts.js'))
        .pipe(gulp.dest(config.tmp+'js'))
        .pipe(browsersync.stream());
});
gulp.task('scripts:polyfill', function(){
    return gulp.src(config.src+'**/*.js')
        .pipe(plugins.concat('scripts.js'))
        .pipe(plugins.autopolyfiller('polyfill.js'))
        .pipe(gulp.dest(config.tmp+'js'));
});
gulp.task('scripts:modern', function(){
    return gulp.src(config.src+'**/*.js')
        .pipe(plugins.modernizr({
            "options" : [
                "html5printshiv",
            ]
        }))
        .pipe(gulp.dest(config.tmp+'js'));
});
gulp.task('scripts:build', ['scripts:js'], function(){
    return gulp.src(config.tmp + 'js/**/*.js')
        .pipe(plugins.order(config.buildOrder))
        .pipe(plugins.concat('scripts.js'))
        .pipe(plugins.jshint())
        .pipe(plugins.fixmyjs())
        .pipe(plugins.rename(config.minify.rename))
        .pipe(plugins.uglify(config.minify.uglify))
        .pipe(gulp.dest(config.build + 'js'))
        .pipe(browsersync.stream());
});

gulp.task('scripts', ['scripts:js', 'scripts:polyfill', 'scripts:modern', 'scripts:build']);
gulp.task('scripts:dev', ['scripts:js']);
