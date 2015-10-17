var gulp = require("gulp");
var uglify = require("gulp-uglify");
var minifycss = require("gulp-minify-css");
var rename = require("gulp-rename");
var autoprefixer = require("gulp-autoprefixer");
var livereload = require("gulp-livereload");
var base64 = require("gulp-base64");
var compass = require('gulp-compass');
var gconcat = require('gulp-concat');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var gutil = require('gulp-util');

// gulp.task("css",function(){
// 	return gulp
// 		.src("public/css/*.css")
// 		.pipe(autoprefixer('last 2 version'))
// 		.pipe(minifycss())
// 		.pipe(rename({suffix: '.min'} ))
// 		.pipe(gulp.dest("public/build/css"));
// })

gulp.task('browserify', function() {
  return browserify('app/app.js')
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.min.js'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('browserify-watch', function() {
  var bundler = watchify(browserify('app/app.js', watchify.args));
  bundler.transform(babelify);
  bundler.on('update', rebundle);
  return rebundle();

  function rebundle() {
    var start = Date.now();
    return bundler.bundle()
      .on('error', function(err) {
        gutil.log(gutil.colors.red(err.toString()));
      })
      .on('end', function() {
        gutil.log(gutil.colors.green('Finished rebundling in', (Date.now() - start) + 'ms.'));
      })
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('public/js/'))
      .pipe(livereload());
  }
});

//合并压缩js
gulp.task('uglify', function() {
	return gulp
	  	.src('public/js/**/*.js')
	  	.pipe(gconcat("app.min.js"))
	  	.pipe(uglify()) 	
	  	.pipe(gulp.dest('public/build/js'));
});

//编译scss文件
gulp.task('compass', function() {
	return gulp
	  	.src('public/sass/*.scss')
	  	.pipe(compass({
	    	config_file: 'public/config.rb',
	    	css: 'public/stylesheets',
	    	sass: 'public/sass'
	  	}))
	  	.pipe(gulp.dest('public/stylesheets'));
});

//图片sprite任务
gulp.task('sprite', function () {
  var spriteData = gulp.src('public/img/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css',
    algorithm:'',
    cssTemplate:'public/build/css/sp.css'
  }));
  spriteData.img.pipe(gulp.dest('public/build/img/'));
  spriteData.css.pipe(gulp.dest('public/build/css/'));
});

//gulp监听任务，任何js或css改变时执行
gulp.task("watch",function(){	
	livereload.listen();
})

gulp.task('default',["browserify-watch","watch"]);