let gulp = require("gulp");
let browserify = require("browserify");
let source = require('vinyl-source-stream');
let tsify = require("tsify");
let watchify = require("watchify");
let gutil = require("gulp-util");
let paths = {
    staticContent: ['./src/**/*.html', './src/**/*.css']
};

let watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: ['src/Engine.ts'],
    cache: {},
    packageCache: {}
}).plugin(tsify));

function copyStaticContent () {
    return gulp.src(paths.staticContent)
        .pipe(gulp.dest("./dist"));
}

function bundle() {
    return watchedBrowserify
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest("./dist"));
}

function runAll() {
    copyStaticContent();
    bundle();
}

gulp.task("copy-static-content", [], copyStaticContent);
gulp.task("default", ["copy-static-content"], bundle);

watchedBrowserify.on("update", runAll);
watchedBrowserify.on("log", gutil.log);