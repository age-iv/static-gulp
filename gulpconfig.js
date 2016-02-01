// ==== CONFIGURATION ==== //

// Project paths
var project = 'test-project',
    src = './src/' + project + "/",
    tmp = './.tmp/',
    bower = './bower_components/'
    build = './build/' + project + "/";

// Project settings
module.exports = {

    bower: {
        src: bower
        , dest: src
        , compiler: {
            type: 'sass',
            ext: 'scss'
        }
    },
    browsersync: {
        server: {
          baseDir: build  
        },
        files: [build + '/**', '!'+build +'/**.map'] // Exclude map files
      , notify: false // In-line notifications (the blocks of text saying whether you are connected to the BrowserSync server or not)
      , open: false // Set to false if you don't like the browser window opening automatically
      , port: 3000 // Port number for the live version of the site; default: 3000
      //, proxy: 'localhost:8080' // We need to use a proxy instead of the built-in server because WordPress has to do some server-side rendering for the theme to work
      , watchOptions: {
          debounceDelay: 2000 // This introduces a small delay when watching for file change events to avoid triggering too many reloads
        }
    },
    images: {
        src: src+'images/',
        tmp: tmp,
        build: build,
        imagemin: {
            optimizationLevel: 7
          , progressive: true
          , interlaced: true
        }
    },
    fonts: {
        src: src+'fonts/',
        tmp: tmp,
        build: build,
    },
    html: {
        src: src+'html/',
        tmp: tmp,
        build: build,
        jade: {
        }
    },
    styles: {
        src: src+'styles/',
        tmp: tmp,
        build: build,
        compiler: 'sass',
        autoprefixer: { browsers: ['> 3%', 'last 2 versions', 'ie 8', 'ie 9', 'ios 4', 'android 2.3'] },
        minify: { keepSpecialComments: 1, roundingPrecision: 3 },
    },
    scripts: {
        src: src+'js/',
        tmp: tmp,
        build: build,
        polyfiller: ['last 2 version', 'ie 8', 'ie 9'],
        minify: {
            rename: { suffix: '.min' },
            uglify: {} // Default options
        },
        tmpOrder: [ 'jquery/dist/jquery.js', 'bootstrap-sass/assets/javascripts/bootstrap.js', 'script.js' ],
        buildOrder: [ 'polyfill.js', 'modernizr.js', 'scripts.js' ]
    },
    livereload: {
        port: 35729
    },
    watch: {
        src: {
            styles:     src+'styles/**/*.{scss,less,styl,css}',
            scripts:    src+'js/**/*.js', // You might also want to watch certain dependency trees but that's up to you
            images:     src+'images/**/*.{png,jpg,jpeg,gif,svg}',
            html:       src+'html/**/*.{html,jade}',
            livereload:   build+'**/*'
        }
        , watcher: 'browsersync' // Modify this value to easily switch between BrowserSync ('browsersync') and Livereload ('livereload')        
    }
}
