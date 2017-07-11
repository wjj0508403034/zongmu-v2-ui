var gulp = require('gulp');
var showFile = require('gulp-show-me-file');
var minifyHtml = require('gulp-minify-html');
var angularTemplatecache = require('gulp-angular-templatecache');
var del = require('del');
var concat = require('gulp-concat');
var es = require('event-stream');
var inject = require('gulp-inject');
var bom = require('gulp-bom');

const DestFolder = "dist";
const SourceFolder = "src";
const DeployDestFolder = "./../zongmu_v2/gts/src/main/resources/templates/";
const DeployResourcesFolder = "./../zongmu_v2/gts/src/main/resources/static/";
const Timestamp = Date.now();

gulp.task('clean', function() {
  return del([DestFolder], {
    force: true
  });
});


gulp.task('deploy', ['clean-deploy', 'copy-resource-to-deploy']);

gulp.task('clean-deploy', function() {
  return del([DeployDestFolder, DeployResourcesFolder], {
    force: true
  });
});

gulp.task('copy-font', ["clean"], function() {
  return gulp.src(['fonts/**'])
    .pipe(showFile())
    .pipe(gulp.dest(`${DestFolder}/fonts`));
});

gulp.task('copy-resource', ["clean"], function() {
  return gulp.src(['res/**'])
    .pipe(showFile())
    .pipe(gulp.dest(`${DestFolder}/res`));
});

gulp.task('copy-thirdparty', ["clean"], function() {
  return gulp.src('libs/**')
    .pipe(showFile())
    .pipe(gulp.dest(`${DestFolder}/libs`));
});

gulp.task('copy-resource-to-deploy', ['clean-deploy', 'build'], function() {
  return gulp.src(`${DestFolder}/**/*`)
    .pipe(showFile())
    .pipe(gulp.dest(DeployResourcesFolder));
});

gulp.task('concat-widget-css', ["clean"], function() {
  return gulp.src('src/common/**/*.css')
    .pipe(showFile())
    .pipe(concat("huoyun.widget.css"))
    .pipe(gulp.dest(`${DestFolder}/libs`));
});

gulp.task('concat-widget-view-template', ["clean"], function() {
  var templateStream = gulp.src('src/common/**/*.html')
    .pipe(showFile())
    .pipe(minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(angularTemplatecache('view.template.tpl.js', {
      module: 'huoyun.widget'
    }));

  var es = require('event-stream');
  return es.merge([
      gulp.src(['src/common/**/*.js']),
      templateStream
    ])
    .pipe(showFile())
    .pipe(concat('huoyun.widget.js'))
    .pipe(gulp.dest(`${DestFolder}/libs`));
});

gulp.task('concat-app-css', ["clean"], function() {
  return gulp.src('src/view/**/*.css')
    .pipe(showFile())
    .pipe(concat("app.css"))
    .pipe(gulp.dest(`${DestFolder}/libs`));
});

gulp.task('concat-app-view-template', ["clean"], function() {
  var templateStream = gulp.src('src/view/**/*.html')
    .pipe(showFile())
    .pipe(minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(angularTemplatecache('view.template.tpl.js', {
      module: 'huoyun'
    }));

  var es = require('event-stream');
  return es.merge([
      gulp.src(['src/*.js', 'src/view/**/*.js']),
      templateStream
    ])
    .pipe(showFile())
    .pipe(concat('app.js'))
    .pipe(gulp.dest(`${DestFolder}`));
});

gulp.task('build', ['clean', 'copy-thirdparty', 'copy-resource', 'copy-font', 'concat-widget-css', 'concat-widget-view-template', 'concat-app-css', 'concat-app-view-template'], function() {
  var injectCss = gulp.src([
    `${DestFolder}/libs/**/*.css`,
    `${DestFolder}/libs/huoyun.widget.css`,
    `${DestFolder}/app.css`
  ], {
    read: false
  });

  var injectJs = gulp.src([
    `${DestFolder}/libs/jquery.min.js`, // 必须把jquery放在第一个文件，后面很多模块依赖jquery
    `${DestFolder}/libs/jquery-ui.min.js`,
    `${DestFolder}/libs/jquery.slim.min.js`,
    `${DestFolder}/libs/angular.js`,
    `${DestFolder}/libs/svg/svg.min.js`,
    `${DestFolder}/libs/**/*.js`,
    `${DestFolder}/app.js`,
  ], {
    read: false
  });

  return gulp.src('src/*.html')
    .pipe(showFile())
    .pipe(inject(injectCss, {
      transform: function(filepath) {
        filepath = filepath.replace("/dist", "");
        filepath = `${filepath}?v=${Timestamp}`;
        return `<link rel="stylesheet" href="..${filepath}"></link>`;
      }
    }))
    .pipe(inject(injectJs, {
      transform: function(filepath) {
        filepath = filepath.replace("/dist", "");
        filepath = `${filepath}?v=${Timestamp}`;
        return `<script src="..${filepath}"></script>`;
      }
    }))
    .pipe(gulp.dest(`${DestFolder}`))
    .pipe(gulp.dest(`${DeployDestFolder}`));
});