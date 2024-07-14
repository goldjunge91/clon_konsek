/* eslint-disable no-undef */
module.exports = {
  apps: [
    {
      script: 'npm run pod',
      instances: 1,
      name: 'pdf_konsek',
      error_file: '/home/runneruser/logfiles/error.log',
      out_file: '/home/runneruser/logfiles/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm.SSS',
      watch: true,
      ignore_watch: ["node_modules", "logfiles"],
      merge_logs: true,
      autorestart: true,
    },
  ],
};
