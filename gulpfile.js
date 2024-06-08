// Get The gulp Module
const gulp = require('gulp');
// Read All File's in dir
const fs = require('fs')
function getFiles(dir, files = []) {
  const fileList = fs.readdirSync(dir)
  for (const file of fileList) {
    const name = `${dir}/${file}`
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files)
    } else {
      files.push(name)
    }
  }
  return files
}
// minify html
const htmlmin = require('gulp-htmlmin');
function MiniFunHTML() {
  return gulp.src(getFiles('src/html'))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build/html'));
};
// minify css
const cleanCSS = require('gulp-clean-css');
function MiniCSS(){
  return gulp.src(getFiles('src/css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('build/css'));
};
// minify js
const minify = require('gulp-minify');
function MinifyJs(){
  gulp.src(getFiles('src/js'))
    .pipe(minify())
    .pipe(gulp.dest('build/js'))
};
// Export GulpPakge's
let ThreeLang = []
let ConcatThreeLan = ThreeLang.concat(getFiles('src/html'),getFiles('src/css'),getFiles('src/js')) 
exports.default = function() {
    gulp.watch(ConcatThreeLan,gulp.parallel(MiniFunHTML,MiniCSS,MinifyJs))
}
// ______________________________________________
// a7la mesaa 3a doly gyo4yeeeeee <3
