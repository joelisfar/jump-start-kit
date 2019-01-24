const gulp = require('gulp');
browserSync = require('browser-sync');
sass = require('gulp-sass');
prefix = require('gulp-autoprefixer');
sourcemaps = require('gulp-sourcemaps');
plumber = require('gulp-plumber');
notify = require('gulp-notify');
babel = require('gulp-babel');
messages = {
    compileScss: '<span style="color: grey">Compiling:</span> Sass'
};
mainScss = '_sass/main.scss';
cssDestination = 'css/';

/**
 * Do page reload
 */
gulp.task('reload', (done) => {
    browserSync.reload();
    done();
});

/**
 * Wait for the scss to compile, then launch the Server
 */
gulp.task('browser-sync', function() {
    return browserSync.init({
        server: {
            baseDir: './'
        }
    });
});

/**
 * Compile scss files
 */
gulp.task('sass', function () {
    browserSync.notify(messages.compileScss);
    return gulp.src(mainScss)
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['sass']
        }))
        .pipe(prefix(['last 5 versions', '> 1%'], { cascade: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(cssDestination))
        .pipe(browserSync.stream({match: '**/*.css'}));
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', (done) => {
    gulp.watch('_sass/**/*.scss', gulp.series('sass'));
    gulp.watch(['*/**/*.html'], gulp.series('reload'));
    done();
});

/**
 * Build Task
 */
gulp.task('build', gulp.series('sass'));

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', gulp.series('build', 'watch', 'browser-sync'));
