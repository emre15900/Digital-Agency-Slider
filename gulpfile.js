"use strict";

var gulp = require("gulp");
var rename = require("gulp-rename");
var babel = require("gulp-babel");
var sourcemaps = require("gulp-sourcemaps");
var javascriptObfuscator = require("gulp-javascript-obfuscator");
var sass = require("gulp-sass");
var autoprefixer = require("autoprefixer");
var postcss = require("gulp-postcss");

gulp.task("js", function () {
  return gulp
    .src("web/assets/js/main.dev.js")
    .pipe(babel())
    .pipe(javascriptObfuscator())
    .pipe(rename("main.min.js"))
    .pipe(gulp.dest("web/assets/js"));
});

gulp.task("scss", function () {
  return gulp
    .src("web/assets/resource/sass/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(rename("main.min.css"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("web/assets/css"));
});

gulp.task("default", function () {
  gulp.watch("web/assets/js/main.dev.js", gulp.series("js")),
    gulp.watch("web/assets/resource/sass/**/*.scss", gulp.series("scss"));
  return;
});
