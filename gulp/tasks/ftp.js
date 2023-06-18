import { configFTP } from '../config/ftp.js';
import vinylFtp from 'vinyl-ftp';
import util from 'gulp-util';
import { appendFile } from 'fs';

export const ftp = () => {
	configFTP.log = utol.log;
	const ftpConnect = vinylFtp.create(configFTP);
	return app.gulp.src(`${app.pathbuildFolder}/**/*.*`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "FTP",
				message: "Error: <%= error.message %>"
			})
		))
		.pipe(ftpConnect.dest(`/${app.path.ftp}/${app.path.rootFolder}`));
}
