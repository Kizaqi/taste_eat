const { src, dest, series, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const csso = require("gulp-csso");
const include = require("gulp-file-include");
const htmlmin = require("gulp-htmlmin");
const del = require("del");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const sync = require("browser-sync").create();

function html() {
  return src("src/**.html")
    .pipe(
      include({
        prefix: "@@",
      })
    )
    .pipe(dest("dist"));
}

function scss() {
  return (
    src("src/scss/**.scss")
      .pipe(sass())
      /*.pipe(csso())*/
      .pipe(concat("style.css"))
      .pipe(dest("dist/css"))
  );
}
function fonts() {
  return src("src/fonts/**/*").pipe(dest("dist/fonts"));
}
function img() {
  return src("src/img/**/*").pipe(dest("dist/img"));
}
function js() {
  return src("src/js/*.js").pipe(dest("dist/js"));
}
function watcher() {
  watch("src/scss/**.scss", series("scss"));
  watch("src/img/**/*", series("img"));
  watch("src/fonts/**/*", series("fonts"));
  watch("src/js/*.js", series("js"));
  watch("src/**.html", series("html"));
}
exports.js = js;
exports.watcher = watcher;
exports.html = html;
exports.scss = scss;
exports.fonts = fonts;
exports.img = img;
exports.default = series(html, scss, fonts, img, js);
