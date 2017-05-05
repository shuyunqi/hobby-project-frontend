var gulp=require('gulp');

var watch = require('gulp-watch');
var html2js = require('gulp-html2js');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');
var less = require('gulp-less');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var uglify  = require('gulp-uglify');
var cssBase64 = require('gulp-css-base64');

gulp.task('myweb',function(){
  runSequence('compile-index','compile-js','compile-html','compile-less','compile-images', 'compile-fonts' ,'compile-vendor' ,'browser-sync','watch-reload');
})

gulp.task('compile-index',function(){
  gulp.src('src/index.html')
    .pipe(gulp.dest('_build/'))
});

gulp.task('compile-html',function(){

  gulp.src('src/modules/**/*.html')
    .pipe(html2js('templates-modules.js',{
        adapter: 'angular',
        name: 'templates-modules',
        useStrict: true,
        base: 'src/modules/'
    }))
    .pipe(gulp.dest('_build/js/'))
  gulp.src('src/lib/**/*.html')
    .pipe(html2js('templates-lib.js',{
        adapter: 'angular',
        name: 'templates-lib',
        useStrict: true,
        base: 'src/lib/'
    }))
    .pipe(gulp.dest('_build/js/'))
});

gulp.task('compile-js',function(){

  gulp.src('src/modules/**/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('_build/js/'))
  gulp.src('src/lib/**/*.js')
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('_build/js/'))
});

gulp.task('compile-less',function(){
  gulp.src('src/less/**/*.less')
    .pipe(less())
    .pipe(concat('main.css'))
    .pipe(gulp.dest('_build/css/'))
});

gulp.task('compile-images',function(){
  gulp.src('src/assert/**/*')
    .pipe(gulp.dest('_build/images/'))
});

gulp.task('compile-fonts',function(){
  gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('_build/fonts/'))
});

gulp.task('compile-vendor',function(){
  gulp.src('src/vendor/**/*')
    .pipe(gulp.dest('_build/vendor/'))
});


gulp.task('watch-reload',function(){
  gulp.watch('src/index.html',['compile-index','bs-reload'])
  gulp.watch('src/lib/**/*.html',['compile-html','bs-reload'])
  gulp.watch('src/modules/**/*.html',['compile-html','bs-reload'])
  gulp.watch('src/modules/**/*.js',['compile-js','bs-reload'])
  gulp.watch('src/lib/**/*.js',['compile-js','bs-reload'])
  gulp.watch('src/less/**/*.less',['compile-less','bs-reload'])
  gulp.watch('src/vendor/**/*.js',['compile-vendor','bs-reload'])

})

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./_build"
        }
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});


var config = require('./config');

gulp.task('newWeb',function(){
  runSequence('combine-index','combine-js', 'combine-html',  'combine-img', 'combine-vendor', 'combine-css', 'combine-fonts','browser-sync', 'build_clean');
})

gulp.task('combine-html', function(){
  gulp.src([config.html.src1,config.html.src2])
    .pipe(concat('templates.concat.js'))
    .pipe(html2js('templates.js',{
        adapter: 'angular',
        name: 'templates',
        useStrict: true,
        base: config.html.src
    }))
    .pipe(gulp.dest(config.html.dest))
})

gulp.task('combine-js', function(){
  gulp.src(config.js.src)
    .pipe(html2js('app.js',{
        adapter: 'angular',
        name: 'app',
        useStrict: true,
        base: config.js.src
    }))
    .pipe(gulp.dest(config.js.dest))
})

gulp.task('combine-vendor',function(){
  gulp.src(config.vendor.src)
    .pipe(gulp.dest(config.vendor.dest))
})

gulp.task('combine-img',function(){
  gulp.src(config.image.src)
    .pipe(cssBase64())
    .pipe(gulp.dest(config.image.dest))
})

gulp.task('combine-index',function(){
  gulp.src(config.index.src)
    .pipe(gulp.dest(config.index.dest))
});

gulp.task('combine-css',function(){
  gulp.src(config.less.src)
    .pipe(less())
    .pipe(concat('main.css'))
    .pipe(gulp.dest(config.less.dest))
});

gulp.task('combine-fonts',function(){
  gulp.src(config.fonts.src)
    .pipe(gulp.dest(config.fonts.dest))
});

gulp.task('build_clean',function(){
  gulp.src(config.clean.src)
    .pipe(clean())
})