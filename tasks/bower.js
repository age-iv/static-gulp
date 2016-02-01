// ==== BOWER ==== //

var gulp        = require('gulp')
  , plugins     = require('gulp-load-plugins')({ camelize: true })
  , config      = require('../gulpconfig').bower
;

gulp.task('bower:css', function(){
    return gulp.src(config.src + '**/*.' + config.compiler.ext)
        .pipe(gulp.dest(config.dest + 'styles/' + config.compiler.type + "/"))
    ;    
});
gulp.task('bower:img', function(){
    return gulp.src(config.src + '**/*.{png,jpg,gif}')
        .pipe(gulp.dest(config.dest + 'images/'));
})
gulp.task('bower:js', function(){
    return gulp.src(config.src + '**/*.js')
        .pipe(gulp.dest(config.dest + 'js/'));
})
gulp.task('bower:fonts', function(){
    return gulp.src(config.src + '**/*.{ttf,eot,svg,woff,woff2}')
        .pipe(gulp.dest(config.dest + 'fonts/'));
})
gulp.task('bower', ['bower:css', 'bower:img', 'bower:js', 'bower:fonts']);
