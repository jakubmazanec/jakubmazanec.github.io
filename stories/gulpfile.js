var gulp = require('gulp');
var util = require('gulp-util');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');
var server = require('tiny-lr')();
var browserify = require('browserify');
var source = require('vinyl-source-stream');


// build javascript
/*gulp.task('scripts', function ()
{
	return browserify('./app/index.js')
		.bundle()
		.pipe(source('app.js'))
		.pipe(gulp.dest('./public/js'))
		.pipe(livereload(server));
});*/

// build styles
gulp.task('styles', function ()
{
	return gulp.src('./sass/stories.scss')
		.pipe(sass(
		{
			sourcemap: false,
			//style: 'compressed',
			style: 'nested',
			r: 'compass/import-once/activate'
		}))
		.on('error', util.log)
		.pipe(autoprefixer({
			browsers: ['last 2 version', '> 1%'],
			cascade: true
		}))
		.pipe(gulp.dest('./css'))
		.pipe(livereload(server));
});

// builds fonts
// gulp.task('fonts', function (cb)
// {
// 	return gulp.src(['./assets/fonts/**/*'])
// 		.pipe(gulp.dest('./public/fonts'));
// });

// watch
gulp.task('default', [/*'scripts', */'styles'/*, 'fonts'*/], function ()
{
	// listen on port 35729
	server.listen(35729, function (error)
	{
		if (error)
		{
			return console.log(error);
		}

		// Watch .scss files
		gulp.watch('./sass/**/*.scss', ['styles']);

		// Watch .js files
		//gulp.watch('./app/**/*.js', ['scripts']);		
	});
});