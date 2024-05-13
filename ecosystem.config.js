
module.exports = {
  apps: [
      {
          script: 'npx next start',
          instances: 1,
          name: 'website',
          error_file: '/home/marco/git/logs/error.log',
          out_file: '/home/marco/git/logs/out.log',
          log_date_format: 'YYYY-MM-DD HH:mm:ss.SSS',
          // combine_logs: true,
          // merge_logs: true,
      },
  ],
}