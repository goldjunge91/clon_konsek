/* eslint-disable */
/* eslint eqeqeq: "off", 0: "error" */
/* eslint disable*/
/* eslint-disable no-undef */
module.exports = {
	apps: [
		{
			name: 'pdf_konsek',
			script: 'npm run pod',
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
			env_production: {
				NODE_ENV: 'production',
				GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
				GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
				ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
				ENCRYPTION_IV: process.env.ENCRYPTION_IV,
				NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
				NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
				NEXTAUTH_URL: process.env.NEXTAUTH_URL,
				POSTGRES_USER: process.env.POSTGRES_USER,
				POSTGRES_DB: process.env.POSTGRES_DB,
				POSTGRES_PW: process.env.POSTGRES_PW,
				ENABLE_GOOGLE_AUTH: process.env.ENABLE_GOOGLE_AUTH,
				DATABASE_URL: `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PW}@localhost:5432/${process.env.POSTGRES_DB}`,
			},
		},
	],
};
