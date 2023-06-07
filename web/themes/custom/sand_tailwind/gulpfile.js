"use strict";

const config = {
  srcFiles: [
    './components/**/*.scss'
  ],
  filesToWatch: [
    './components/**/*.scss',
    './components/**/*.twig',
    './templates/**/*.html.twig',
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
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const sassGlob = require('gulp-sass-glob');
const postcss = require('gulp-postcss', 'tailwindcss');

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
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.destDir))
}

/**
 * Sets up watchers.
 */
function watchFiles() {
  gulp.watch(config.filesToWatch, compileSass);
}

const watch = gulp.series(compileSass, watchFiles);

exports.watch = watch;
exports.buildSass = gulp.series(compileSass);
exports.default = watch;
