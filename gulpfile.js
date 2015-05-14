// dependencies
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var cache = require('gulp-cached');
var react = require('gulp-react');
var browserify = require('gulp-browserify');
var del = require('del');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var plumber = require('gulp-plumber');

var paths = {
    scss: 'public/assets/scss/**/*.scss',
    css: 'public/assets/css/',
    js: 'public/assets/js/',
    img: 'public/assets/img/',
    fonts: 'public/assets/fonts/',
    app_js: 'public/app/app.js',
    watch_js: 'public/app/**/*.js',
    bower: [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/leaflet/dist/leaflet.js'
    ],
    bower_copy_css: [
        'bower_components/bootstrap/dist/css/bootstrap.min.css',
        'bower_components/material-design-iconic-font/css/material-design-iconic-font.min.css',
        'bower_components/leaflet/dist/leaflet.css'
    ],
    bower_copy_fonts: [
        'bower_components/material-design-iconic-font/fonts/*'
    ]
};

// Copy CSS file
gulp.task('copy_css', function() {
    return gulp.src(paths.bower_copy_css)
        .pipe(plumber())
        .pipe(gulp.dest(paths.css));
});

// Copy fonts file
gulp.task('copy_fonts', function() {
    return gulp.src(paths.bower_copy_fonts)
        .pipe(plumber())
        .pipe(gulp.dest(paths.fonts));
});

// Copy directories
gulp.task('copy_directories', function() {
    gulp.src('bower_components/leaflet/dist/images/*.png')
        .pipe(plumber())
        .pipe(gulp.dest(paths.img));
});

gulp.task('copy', ['copy_css', 'copy_fonts', 'copy_directories']);

// Concat and uglify bower dependencies
gulp.task('bower', function() {
    return gulp.src(paths.bower)
        .pipe(plumber())
        .pipe(concat('dependencies.min.js'))
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest(paths.js));
});

// JSLint for JSX
gulp.task('jshint', function() {
    var stream = gulp.src(paths.watch_js)
        .pipe(cache('jshint'))
        .pipe(react())
        .on('error', function(err) {
            console.error('JSX ERROR in ' + err.fileName);
            console.error(err.message);
            this.end();
        })
        .pipe(jshint({esnext: true}))
        .pipe(jshint.reporter('jshint-stylish'));
    
    if (process.env.CI) {
        stream = stream.pipe(jshint.reporter('fail'));
    }
    
    return stream;
});

// SCSS files compilation
gulp.task('scss', function(){
    return gulp.src(paths.scss)
        .pipe(plumber())
        .pipe(sass({style: 'compressed'}))
        .pipe(gulp.dest(paths.css));
});

// Browserify and compile JSX files
gulp.task('js', function() {
    return gulp.src(paths.app_js)
        .pipe(plumber())
        .pipe(browserify({transform:'reactify'}))
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('public/'));
});

// Watch
gulp.task('watch', function(){
    gulp.watch(paths.scss, ['scss']);
    gulp.watch(paths.watch_js, ['jshint', 'js']);
});

gulp.task('default', ['copy', 'bower', 'jshint', 'scss', 'js', 'watch']);