/* eslint-disable */
/* eslint eqeqeq: "off", 0: "error" */
/* eslint disable*/
/* eslint-disable no-undef */
module.exports = {
	apps: [
		{
			name: 'pdf_konsek',
			script: 'npm run start',
			instances: 1,
			error_file: '/home/runneruser/logfiles/error.log',
			out_file: '/home/runneruser/logfiles/out.log',
			log_date_format: 'YYYY-MM-DD HH:mm.SSS',
			autorestart: true,
			watch: false,
			ignore_watch: ['node_modules', 'logs', 'temp', 'uploads'],
			merge_logs: true,
			watch_options: {
				followSymlinks: false,
				usePolling: true,
			},

		},
	],
};
