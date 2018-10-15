var gulp   = require('gulp');
var clean = require('gulp-clean');
var htmlmin = require('gulp-htmlmin');
var minify = require('gulp-minify');


gulp.task('copy-css', function () {
    gulp.src('css/**/*')
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('copy-data', function () {
    gulp.src('data/**/*')
        .pipe(gulp.dest('dist/data/'));
});


gulp.task('copy-img', function () {
    gulp.src('img/**/*')
        .pipe(gulp.dest('dist/img/'));
});

gulp.task('deploy', function () {
    gulp.src('./**/*')
        .pipe(gulp.dest('./build/'));
});

gulp.task('compress', function() {
    gulp.src(['js/index.js', 'js/realworld.388.js'])
        .pipe(minify({
            ext:{
                src:'-debug.js',
                min:'.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js']
        }))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('watch', function () {
	console.log("Watch here!");
	//gulp.watch('src/*.coffee', ['scripts']);
});

gulp.task('minify', function() {
    return gulp.src(['index.html'])
        .pipe(htmlmin({collapseWhitespace: true,removeComments: true,}))
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
    return gulp.src(['dist/*.*','dist/js/*.*'], {read: false})
        .pipe(clean());
});

gulp.task('default', ['compress', 'minify', 'copy-css', 'copy-data', 'copy-img']);

