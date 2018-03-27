var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

var messages = {
    compileScss: '<span style="color: grey">Compiling:</span> Sass'
};


/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('reload', function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'reload'], function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
    browserSync.notify(messages.compileScss);
    return gulp.src('_sass/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['sass']
        }))
        .on('error', function(err) {
            console.error(err.message);
            browserSync.notify(err.message, 3000); // Display error in the browser
            this.emit('end'); // Prevent gulp from catching the error and exiting the watch process
        })
        .pipe(prefix(['last 5 versions', '> 1%'], { cascade: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream({match: '**/*.css'}));
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('_sass/**/*.scss', ['sass']);
    gulp.watch(['*/**/*.html', 'js/*.js', 'index.html'], ['reload']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);