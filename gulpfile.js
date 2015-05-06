// dependencies
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint');

var scss_path = 'public/assets/scss/**/*.scss',
    css_path = 'public/assets/css/',
    js_path = 'public/assets/js/',
    angular_files_path = [
        'public/app/**/*.js',
        'public/common/**/*.js'
    ],
    bower_path = [
        'bower_components/angular/angular.js', 
        'bower_components/jquery/dist/jquery.js',
        'bower_components/angular-ui-router/release/angular-ui-router.js'
    ],
    final_path = [
        'public/assets/js/dependencies.min.js', 
        'public/assets/js/my.min.js'
    ];

// Minify
gulp.task('my_minify', function(){
    return gulp.src(angular_files_path)
                .pipe(concat('my.min.js'))
                .pipe(uglify({mangle: false}))
                .pipe(gulp.dest(js_path));
});
gulp.task('bower_minify', function() {
    return gulp.src(bower_path)
                .pipe(concat('dependencies.min.js'))
                .pipe(uglify({mangle: false}))
                .pipe(gulp.dest(js_path));
});
gulp.task('minify', ['my_minify']);
// miniyfing bower components only once
gulp.task('minify_start', ['bower_minify', 'minify']);

// Styles
gulp.task('sass_compile', function(){
    return gulp.src(scss_path)
        .pipe(sass({
            style: 'compressed'
        }))
        .on('error', console.error.bind(console))
        .pipe(gulp.dest(css_path));
});

// Copy bootstrap
gulp.task('copy', function() {
    gulp.src('bower_components/bootstrap/dist/css/bootstrap.min.css')
        .pipe(gulp.dest(css_path));
});

// JSLint
gulp.task('jslint', function() {
  return gulp.src(angular_files_path)
    .pipe(jshint({"bitwise":true,"camelcase":true,"curly":true,"eqeqeq":true,"es3":false,"forin":true,"freeze":true,"immed":true,"indent":4,"latedef":"nofunc","newcap":true,"noarg":true,"noempty":true,"nonbsp":true,"nonew":true,"plusplus":false,"quotmark":"single","undef":true,"unused":false,"strict":false,"maxparams":10,"maxdepth":5,"maxstatements":40,"maxcomplexity":8,"maxlen":120,"asi":false,"boss":false,"debug":false,"eqnull":true,"esnext":false,"evil":false,"expr":false,"funcscope":false,"globalstrict":false,"iterator":false,"lastsemic":false,"laxbreak":false,"laxcomma":false,"loopfunc":true,"maxerr":false,"moz":false,"multistr":false,"notypeof":false,"proto":false,"scripturl":false,"shadow":false,"sub":true,"supernew":false,"validthis":false,"noyield":false,"browser":true,"node":true,"globals":{"angular":false,"$":false}}))
    .on('error', console.error.bind(console))
    .pipe(jshint.reporter('default'));
});

// Watch
gulp.task('watch', function(){
    gulp.watch(scss_path, ['sass_compile']);
    gulp.watch(angular_files_path, ['jslint', 'minify']);
});

gulp.task('default', ['sass_compile', 'jslint', 'minify_start', 'copy', 'watch']);
