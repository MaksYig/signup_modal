let projectFolder = "dist";
let workFolder = "src";


let path = {
  build: {
    html: projectFolder + "/",
    css: projectFolder + "/css/",
    js: projectFolder + "/js/",
    img: projectFolder + "/images/",
    fonts: projectFolder + "/fonts/",
  },
  src: {
    html: [workFolder + "/*.html", "!" + workFolder + "/_*.html"],
    css: workFolder + "/scss/style.scss",
    js: workFolder + "/scripts/main.js",
    img: workFolder + "/images/**/*.{jpg,png,svg,ico,webp}",
    fonts: workFolder + "/fonts/*.*",
  },
  watch: {
    html: workFolder + "/**/*.html",
    css: workFolder + "/scss/**/*.scss",
    js: workFolder + "/scripts/**/*.js",
    img: workFolder + "/images/**/*.{jpg,png,svg,ico,webp}",
  },
  clean: "./" + projectFolder + "/",
};

let { src, dest } = require("gulp"),
  gulp = require("gulp"),
  browsersync = require("browser-sync").create(),
  del = require("del"),
  fileinclude = require("gulp-file-include"),
  rename = require("gulp-rename"),
  sourcemaps = require("gulp-sourcemaps"),
  postcss = require("gulp-postcss"),
  gulpwebpack = require("gulp-webpack"),
  webpack = require("webpack"),
  webpackConfig = require("./webpack.config"),
  imagemin = require("gulp-imagemin");

function clean(params) {
  return del(path.clean);
}

function browserSync(params) {
  browsersync.init({
    server: {
      baseDir: "./" + projectFolder + "/",
    },
    port: 3000,
  });
}

function html() {
  return src(path.src.html)
    .pipe(fileinclude(["@@"]))
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream());
}

function css() {
  return (
    src(path.src.css)
      .pipe(sourcemaps.init())
      // .pipe( postcss([ require('postcss-nested')]))
      .pipe(postcss(require("./postcss.config")))
      .pipe(sourcemaps.write())
      .pipe(
        rename({
          extname: ".min.css",
        })
      )
      .pipe(dest(path.build.css))
      .pipe(browsersync.stream())
  );
}

function scripts(params) {
  return src(path.src.js)
    .pipe(gulpwebpack(webpackConfig, webpack))
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream());
}
function images() {
  return src(path.src.img)
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [
          {
            removeViewBox: false,
          },
        ],
        interlaced: true,
        optimizationLevel: 3, // from 0 to 7
      })
    )
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream());
}

function fonts(params) {
  return src(path.src.fonts)
    .pipe(dest(path.build.fonts))
    .pipe(browsersync.stream());
}

function watchFiles(params) {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], scripts);
  gulp.watch([path.watch.img], images);
}

let build = gulp.series(
  clean,
  gulp.parallel(scripts, html, css, images, fonts)
);
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.build = build;
exports.scripts = scripts;
exports.css = css;
exports.html = html;
exports.images = images;
exports.fonts = fonts;
exports.watch = watch;
exports.default = watch;
