
// import webpack from "webpack-stream";

// export const js = () => {
// 	return app.gulp.src(app.path.src.js, {sourcemap: app.isDev})
// 		.pipe(app.plugins.plumber(
// 			app.plugins.notify.onError({
// 				title: "JS",
// 				message: "Error: <%= error.message %>"
// 			})
// 		))
// 		.pipe(webpack({
// 			mode: app.isDev ? 'production' : 'development',
// 			output: {
// 				filename: 'main.min.js',
// 			}
// 		}))
// 		.pipe(app.gulp.dest(app.path.build.js))
// 		.pipe(app.plugins.browsersync.stream());
// }

import uglify from "gulp-uglify";
import rename from "gulp-rename";

export const js = () => {
	return app.gulp
		.src(app.path.src.js, { sourcemap: app.isDev })
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: "JS",
					message: "Error: <%= error.message %>",
				}),
			),
		)
		.pipe(uglify())
		.pipe(
			rename({
				extname: ".min.js",
			}),
		)
		.pipe(app.gulp.dest(app.path.build.js))
		.pipe(app.plugins.browsersync.stream());
}