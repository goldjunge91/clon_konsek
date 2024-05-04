
module.exports = {
  apps: [
      {
          script: 'npm run start -d',
          instances: 1,
          name: 'website',
          log_date_format: 'YYYY-MM-DD HH:mm:ss.SSS',
          error_file: '/home/marco/git/logs/error.log',
          out_file: '/home/marco/git/logs/out.log',
          combine_logs: true,
          merge_logs: true,
      },
  ],
}

// module.exports = {
//   apps : [{
//     script: 'index.js',
//     watch: '.'
//   }, {
//     script: './service-worker/',
//     watch: ['./service-worker']
//   }],

//   deploy : {
//     production : {
//       user : 'SSH_USERNAME',
//       host : 'SSH_HOSTMACHINE',
//       ref  : 'origin/master',
//       repo : 'GIT_REPOSITORY',
//       path : 'DESTINATION_PATH',
//       'pre-deploy-local': '',
//       'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
//       'pre-setup': ''
//     }
//   }
// };
