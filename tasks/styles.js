// ==== STYLES ==== //

var gulp          = require('gulp')
  , gutil         = require('gulp-util')
  , plugins       = require('gulp-load-plugins')({ camelize: true })
  , browsersync = require('browser-sync')
  , config        = require('../gulpconfig').styles
  , autoprefixer  = require('autoprefixer')
;

gulp.task('styles:sass', function(){
    return gulp.src(config.src + 'sass/**/*.scss')
        .pipe(plugins.sass())
        .on('error', gutil.log)
        .pipe(plugins.concat('styles-'+config.compiler+'.css'))
        .pipe(plugins.postcss([
            autoprefixer(config.autoprefixer)
          ]))
        .pipe(gulp.dest(config.tmp + 'css'))
        .pipe(browsersync.stream());
});

gulp.task('styles:less', function(){
    return gulp.src(config.src + 'less/**/*.less')
        .pipe(plugins.less())
        .on('error', gutil.log)
        .pipe(plugins.concat('styles-'+config.compiler+'.css'))
        .pipe(plugins.postcss([
            autoprefixer(config.autoprefixer)
        ]))
        .pipe(gulp.dest(config.tmp + 'css'))
        .pipe(browsersync.stream());
});

gulp.task('styles:stylus', function(){
    return gulp.src(config.src + 'stylus/**/*.styl')
        .pipe(plugins.stylus())
        .on('error', gutil.log)
        .pipe(plugins.concat('styles-'+config.compiler+'.css'))
        .pipe(plugins.postcss([
            autoprefixer(config.autoprefixer)
        ]))
        .pipe(gulp.dest(config.tmp + 'css'))
        .pipe(browsersync.stream());
});

gulp.task('styles:css', function(){
    return gulp.src(config.src + 'css/**/*.css')
        .pipe(plugins.concat('styles.css'))
        .pipe(gulp.dest(config.tmp + 'css'))
        .pipe(browsersync.stream());
});

gulp.task('styles:build', ['styles:'+config.compiler], function(){
    return gulp.src(config.tmp + 'css/**/*.css')
        //.pipe(plugins.minify(config.minify))        
        //.pipe(plugins.csscomb())
        .pipe(plugins.concat('styles.css'))
        .pipe(plugins.csslint())
        .pipe(plugins.shorthand())
        .pipe(plugins.csso())
        //.pipe(plugins.uncss({
        //    html: ['html/**/*.html']
        //})),
        
        .pipe(gulp.dest(config.build + 'css'))
        .pipe(browsersync.stream());
});

gulp.task('styles', ['styles:'+config.compiler, 'styles:build']);
gulp.task('styles:dev', ['styles:'+config.compiler]);
