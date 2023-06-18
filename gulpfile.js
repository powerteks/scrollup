
import gulp from "gulp";
import { path } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugins.js";

// passing values ​​to global variable
global.app = {
	isBuild: process.argv.includes('--build'),
	isDev: !process.argv.includes('--build'),
	path: path,
	gulp: gulp,
	plugins: plugins
}

import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { server } from "./gulp/tasks/server.js";
import { otfToTtf, ttfToWoff, woff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgSprites } from "./gulp/tasks/svgSprite.js";
import { zip } from "./gulp/tasks/zip.js";

const watcher = () => {
	// gulp.watch(path.watch.files, copy)copy, 
	gulp.watch(path.watch.html, html)
	gulp.watch(path.watch.scss, scss)
	gulp.watch(path.watch.js, js)
	// gulp.watch(path.watch.images, images), images
}

// export { svgSprites }, svgSprites 

// const fonts = gulp.series(otfToTtf, ttfToWoff, woff, fontsStyle);
const mainTasks = gulp.series(gulp.parallel(html, scss, js));//fonts, 

// task scripts
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server))
const bid = gulp.series(reset, mainTasks);
const deployZip = gulp.series(reset, mainTasks, zip);
const deployFtp = gulp.series(reset, mainTasks);

export { dev }
export { bid }
export { deployZip }
export { deployFtp }


gulp.task('default', dev);