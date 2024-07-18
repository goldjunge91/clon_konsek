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
			watch: false,
			ignore_watch: ['node_modules', 'logs', 'temp', 'uploads'],
			watch_options: {
				followSymlinks: false,
				usePolling: true,
			},
			merge_logs: true,
			autorestart: true,
			env: {
				NODE_ENV: 'production',
				GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
				GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
				ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
				ENCRYPTION_IV: process.env.ENCRYPTION_IV,
				NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
				NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
				NEXTAUTH_URL: process.env.NEXTAUTH_URL,
				POSTGRES_DB: process.env.POSTGRES_DB,
				POSTGRES_HOST: process.env.POSTGRES_HOST,
				POSTGRES_USER: process.env.POSTGRES_USER,
				POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
				ENABLE_GOOGLE_AUTH: process.env.ENABLE_GOOGLE_AUTH,
				DATABASE_URL: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:5432/${process.env.DB_NAME}`,
			},
		},
	],
}; // This file is used to configure the pm2 process manager
