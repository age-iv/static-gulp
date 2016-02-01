// ==== IMAGES ==== //

var gulp        = require('gulp')
    , spritesmith = require('gulp.spritesmith')
    , plugins     = require('gulp-load-plugins')({ camelize: true })
    , browsersync = require('browser-sync')
    , config      = require('../gulpconfig').images
;

// Copy changed images from the source folder to `build` (fast)
gulp.task('images:illustration', function() {
  return gulp.src(config.src + '/**/*.{png,jpg,svg}')
    .pipe(plugins.imagemin(config.imagemin))
    .pipe(gulp.dest(config.tmp + 'images'))
    .pipe(browsersync.stream());
});

gulp.task('images:sprites-png', function() {
    var spriteData = gulp.src(config.src + 'sprites/*.png')
        .pipe(plugins.spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.css',
            imgPath: '../images/sprite.png'
        }));
    
    spriteData.img.pipe(gulp.dest(config.tmp + 'images'));
    spriteData.css.pipe(gulp.dest(config.tmp + 'css'));
});

gulp.task('images:sprites-svg', function() {
    var spriteData = gulp.src(config.src + 'sprites/*.svg')
        .pipe(plugins.svgSprites({
            cssFile: config.tmp + 'css/sprite.css',
            preview: false,
            layout: 'diagonal',
            padding: 5,
            svg: {
                sprite: config.tmp + 'images/sprite.svg'
            },
        }))
        .pipe(plugins.svg2png())
        .pipe(gulp.dest(config.tmp + 'images'));
        
});

gulp.task('images:build', ['images:illustration'], function(){
    return gulp.src(config.tmp + 'images/**/*.{png,jpg,svg}')
    .pipe(gulp.dest(config.build + 'images'))
    .pipe(browsersync.stream());
});

gulp.task('images',['images:build', 'images:illustration']);
gulp.task('images:dev',['images:illustration']);
