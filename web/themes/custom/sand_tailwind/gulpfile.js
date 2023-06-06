/**
 * Compile .scss source to .css
 */
"use strict";

const config = {
  srcFiles: [
    './scss/**/*.scss'
  ],
  filesToWatch: [
    './scss/**/*.scss',
    './templates/**/*.html.twig'
  ],
  options: {
    includePaths: [
      './scss'
    ],
    outputStyle: 'expanded'
  },
  destDir: './dist/css/'
};

const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const sassGlob = require('gulp-sass-glob');
const postcss = require('gulp-postcss', 'tailwindcss');
// const tailwindcss = require('tailwindcss');

/**
 * Sets up watchers.
 */
function watchFiles() {
  gulp.watch(config.filesToWatch, compileSass);
}

const watch = gulp.series(compileSass, watchFiles);

/**
 * Compiles global Sass files.
 */
function compileSass() {

  return gulp.src(config.srcFiles)
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
    .pipe(
      sass({ outputStyle: 'expanded' })
        .on('error', sass.logError)
    )
    .pipe(postcss([require('tailwindcss'), require('autoprefixer')]))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.destDir))
}

exports.watch = watch;
exports.default = watch;
