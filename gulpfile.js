import gulp from 'gulp'
import gulpPug from 'gulp-pug'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'
import { create as bsCreate } from 'browser-sync'

const sass = gulpSass(dartSass)
const browserSync = bsCreate()

// ─── Paths ───────────────────────────────────────────────────────────────────
const paths = {
  pug:  { src: 'src/pug/*.pug',         dest: 'dist/' },
  scss: { src: 'src/scss/main.scss',    dest: 'dist/assets/css/' },
  js:   { src: 'src/js/**/*.js',        dest: 'dist/assets/js/' },
  watch: {
    pug:  'src/pug/**/*.pug',
    scss: 'src/scss/**/*.scss',
    js:   'src/js/**/*.js',
  },
}

// ─── Tasks ───────────────────────────────────────────────────────────────────
function compilePug() {
  return gulp
    .src(paths.pug.src)
    .pipe(gulpPug({ pretty: true }))
    .pipe(gulp.dest(paths.pug.dest))
    .pipe(browserSync.stream())
}

function compileSass() {
  return gulp
    .src(paths.scss.src)
    .pipe(sass({ style: 'expanded', silenceDeprecations: ['legacy-js-api'] }).on('error', sass.logError))
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(browserSync.stream())
}

function copyJS() {
  return gulp
    .src(paths.js.src)
    .pipe(gulp.dest(paths.js.dest))
    .pipe(browserSync.stream())
}

function serve(done) {
  browserSync.init({ server: 'dist', port: 3000, open: true })
  done()
}

function watchFiles() {
  gulp.watch(paths.watch.pug,  compilePug)
  gulp.watch(paths.watch.scss, compileSass)
  gulp.watch(paths.watch.js,   copyJS)
}

// ─── Exported Tasks ──────────────────────────────────────────────────────────
export const build = gulp.parallel(compilePug, compileSass, copyJS)
export const dev   = gulp.series(build, serve, watchFiles)
export default dev
