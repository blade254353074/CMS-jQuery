'use strict'
// npm install gulp gulp-sass gulp-tmod gulp-minify-html gulp-minify-css gulp-autoprefixer gulp-jshint gulp-uglify gulp-imagemin imagemin-pngquant gulp-rename gulp-clean gulp-rev gulp-concat gulp-cache gulp-notify gulp-util gulp-plumber url gulp-browserify browser-sync proxy-middleware vueify yargs gulp-if node-sass postcss autoprefixer-core --save-dev
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    tmodjs = require('gulp-tmod'),
    minifyhtml = require('gulp-minify-html'),
    minifycss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    rev = require('gulp-rev'),
    concat = require('gulp-concat'),
    cache = require('gulp-cache'),
    notify = require('gulp-notify'),
    util = require('gulp-util'),
    plumber = require('gulp-plumber'),
    url = require('url'),
    browserify = require('gulp-browserify'),
    browsersync = require('browser-sync'),
    proxy = require('proxy-middleware'),
    vueify = require('vueify'),
    argv = require('yargs').argv,
    gulpif = require('gulp-if');
console.log(argv);
function errrHandler(e) {
    // 控制台发声,错误时beep一下
    util.beep();
    util.log(e);
}

var proxyOpts = url.parse('http://192.168.0.124');
proxyOpts.route = '/api';
var proxyOptsImg = url.parse('http://192.168.0.124/uploads');
proxyOptsImg.route = '/uploads';

var debug = true;//开发模式

var src = 'src/',
    dist = 'dist/', //服务根目录
    assets = dist + 'assets/'; //js, css, img资源输出目录
var config = {
    tpl: {
        src: src + 'tpl/**/*.html',
        base: src + 'tpl',
        output: src + 'js'
    },
    sass: {
        src: src + 'css/sass/**/*.scss',
        dest: src + 'css'
    },
    html: {
        src: src + 'html/**/*.html',
        dest: dist
    },
    css: {
        src: src + 'css/**/*.css',
        dest: assets + 'css'
    },
    js: {
        src: src + 'js/**/*.js',
        dest: assets + 'js'
    },
    imgs: {
        src: src + 'imgs/*',
        dest: assets + 'imgs'
    },
    fonts: {
        src: src + 'fonts/**/*',
        dest: assets + 'fonts'
    },
    favicon: {
        src: src + 'favicon/*.ico',
        dest: dist
    }
}
var adminSrc = 'src/admin/',
    adminAssets = dist + 'assets/admin/';
var admin = {
    tpl: {
        src: adminSrc + 'tpl/**/*.html',
        base: adminSrc + 'tpl',
        output: adminSrc + 'js'
    },
    sass: {
        src: adminSrc + 'css/sass/**/*.scss',
        dest: adminSrc + 'css'
    },
    css: {
        src: adminSrc + 'css/**/*.css',
        dest: adminAssets + 'css'
    },
    js: {
        indexjs: adminSrc + 'js/index.js',
        src: adminSrc + 'js/**/*.js',
        dest: adminAssets + 'js'
    },
    imgs: {
        src: adminSrc + 'imgs/*',
        dest: adminAssets + 'imgs'
    },
    fonts: {
        src: adminSrc + 'fonts/**/*',
        dest: adminAssets + 'fonts'
    }
}

gulp.task('a-tmodjs', function() {
    return gulp.src(admin.tpl.src)
        .pipe(plumber({
            errorHandler: errrHandler
        }))
        .pipe(tmodjs({
            base: admin.tpl.base,
            combo: true,
            minify: false,
            output: admin.tpl.output
        }))
        .pipe(notify({
            message: 'tmodjs 编译成功!'
        }));
});
gulp.task('a-sass', function() {
    return gulp.src(admin.sass.src)
        .pipe(plumber({
            errorHandler: errrHandler
        }))
        .pipe(sass.sync())
        .pipe(gulp.dest(admin.sass.dest));
});
gulp.task('a-css', function() {
    return gulp.src(admin.css.src)
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'ios 6', 'android 2.3.4'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest(admin.css.dest))
        // .pipe(rev())
        // .pipe(gulp.dest(admin.css.dest))
        .pipe(notify({
            message: 'css 压缩成功!'
        }));
});
gulp.task('a-csswithsass', ['sass'], function() {
    return gulp.src(admin.css.src)
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'ios 6', 'android 2.3.4'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest(admin.css.dest));
});
gulp.task('a-js', function() {
    return gulp.src(admin.js.indexjs)
        .pipe(plumber({
            errorHandler: errrHandler
        }))
        .pipe(browserify({
            insertGlobals: true,
            debug: debug
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulpif(debug === false, uglify()))
        .pipe(gulp.dest(admin.js.dest))
        .pipe(notify({
            message: 'js 压缩成功!'
        }));
});
gulp.task('a-vjs', function() {
    return gulp.src('src/admin/js/app.js')
        .pipe(plumber({
            errorHandler: errrHandler
        }))
        .pipe(browserify({
            transform: ['vueify'],
            insertGlobals : true,
            debug : debug
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulpif(debug === false, uglify()))
        .pipe(gulp.dest(admin.js.dest))
        .pipe(notify({
            message: 'js 压缩成功!'
        }));
});

gulp.task('a-imgs', function() {
    return gulp.src(admin.imgs.src)
        .pipe(cache(imagemin({
            svgoPlugins: [{
                removeViewBox: false
            }],
            optimizationLevel: 3,
            progressive: true,
            interlaced: true,
            use: [pngquant()]
        })))
        .pipe(gulp.dest(admin.imgs.dest));
});

gulp.task('a-fonts', function() {
    return gulp.src(admin.fonts.src)
        .pipe(gulp.dest(admin.fonts.dest));
});

gulp.task('tmodjs', function() {
    return gulp.src(config.tpl.src)
        .pipe(plumber({
            errorHandler: errrHandler
        }))
        .pipe(tmodjs({
            base: config.tpl.base,
            combo: true,
            minify: false,
            output: config.tpl.output
        }))
        .pipe(notify({
            message: 'tmodjs 编译成功!'
        }));
});
gulp.task('sass', function() {
    return gulp.src(config.sass.src)
        .pipe(plumber({
            errorHandler: errrHandler
        }))
        .pipe(sass.sync())
        .pipe(gulp.dest(config.sass.dest));
});

gulp.task('html', function() {
    return gulp.src(config.html.src)
        .pipe(minifyhtml())
        .pipe(gulp.dest(config.html.dest))
        .pipe(notify({
            message: 'html 压缩成功!'
        }));
});

gulp.task('css', function() {
    return gulp.src(config.css.src)
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'ios 6', 'android 2.3.4'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest(config.css.dest))
        // .pipe(rev())
        // .pipe(gulp.dest('dist/assets/css'))
        .pipe(notify({
            message: 'css 压缩成功!'
        }));
});

gulp.task('csswithsass', ['sass'], function() {
    return gulp.src(config.css.src)
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'ios 6', 'android 2.3.4'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest(config.css.dest));
    // .pipe(rev())
    // .pipe(gulp.dest('dist/assets/css'));
});
gulp.task('js', function() {
    return gulp.src('src/js/index.js')
        .pipe(plumber({
            errorHandler: errrHandler
        }))
        .pipe(browserify({
            insertGlobals: true,
            debug: debug
        }))
        // .pipe(jshint('.jshintrc'))
        // .pipe(jshint.reporter('default'))
        // .pipe(concat('core.js'))
        // .pipe(gulp.dest('dist/assets/js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulpif(debug === false, uglify()))
        .pipe(gulp.dest(config.js.dest))
        // .pipe(rev())
        // .pipe(gulp.dest('dist/assets/js'))
        .pipe(notify({
            message: 'js 压缩成功!'
        }));
});

gulp.task('imgs', function() {
    return gulp.src(config.imgs.src)
        .pipe(cache(imagemin({
            svgoPlugins: [{
                removeViewBox: false
            }],
            optimizationLevel: 3,
            progressive: true,
            interlaced: true,
            use: [pngquant()]
        })))
        .pipe(gulp.dest(config.imgs.dest));
});

gulp.task('fonts', function() {
    return gulp.src(config.fonts.src)
        .pipe(gulp.dest(config.fonts.dest));
});

gulp.task('favicon', function() {
    return gulp.src(config.favicon.src)
        .pipe(cache(imagemin({
            svgoPlugins: [{
                removeViewBox: false
            }],
            optimizationLevel: 3,
            progressive: true,
            interlaced: true,
            use: [pngquant()]
        })))
        .pipe(gulp.dest(config.favicon.dest));
});

gulp.task('bs', function() {
    browsersync({
        files: dist,
        open: true,
        server: {
            baseDir: dist,
            middleware: [proxy(proxyOpts), proxy(proxyOptsImg)]
        }
    });
});

gulp.task('browser-sync', ['js'], function() {
    gulp.start('bs');
});

gulp.task('clean', function() {
    cache.clearAll();
    return gulp.src(dist, {
            read: false
        })
        .pipe(clean())
        .pipe(notify({
            message: 'clean 执行完毕!'
        }));
});

gulp.task('watch', function() {
    gulp.watch(config.tpl.src, ['tmodjs']);
    gulp.watch(config.html.src, ['html']);
    gulp.watch(config.sass.src, ['sass']);
    gulp.watch(config.css.src, ['css']);
    gulp.watch(config.js.src, ['js']);
    gulp.watch(config.imgs.src, ['imgs']);

    gulp.watch(admin.tpl.src, ['a-tmodjs']);
    gulp.watch(admin.sass.src, ['a-sass']);
    gulp.watch(admin.css.src, ['a-css']);
    // gulp.watch(admin.js.src, ['a-js']);
    gulp.watch(['src/admin/js/**/*.vue', admin.js.src], ['a-js']);
    gulp.watch(admin.imgs.src, ['a-imgs']);
    gulp.start('bs');
});

gulp.task('default', ['clean'], function() {
    gulp.start('tmodjs', 'a-tmodjs');
    gulp.start('browser-sync', 'html', 'csswithsass', 'js', 'imgs', 'favicon', 'fonts', 'a-csswithsass', 'a-js', 'a-imgs', 'a-fonts');
});
