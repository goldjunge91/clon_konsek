module.exports = {
	apps: [
		{
			name: 'pdf_konsek',
			script: 'bash',
      		args: '-c "npm run build && npm run start"',
			instances: 1,
			error_file: './logs/error.log',
			out_file: './logs/out.log',
			log_date_format: 'YYYY-MM-DD HH:mm.SSS',
			autorestart: true,
			watch: false,
			ignore_watch: ['node_modules', 'logs', 'temp', 'uploads'],
			      merge_logs: true,
      		wait_ready: true,
      		listen_timeout: 10000,
      		max_memory_restart: '1G',
			merge_logs: true,
			watch_options: {
				followSymlinks: false,
				usePolling: true,
			},

		},
	],
};
