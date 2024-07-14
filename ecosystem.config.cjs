module.exports = {
  apps: [
    {
      script: "npm run pod",
      instances: 1,
      name: "pdf_konsek",
      error_file: "/home/runneruser/logfiles/error.log",
      out_file: "/home/runneruser/logfiles/out.log",
      log_date_format: "YYYY-MM-DD HH:mm.SSS",
      watch: true, // Watch-Modus aktivieren
      // env_file: ".env.production" 
    }
  ]
};

// module.exports = {
//   apps: [
//     {
//       script: "npm run pod",
//       // script: "npx next start",
//       instances: 1,
//       name: "MyWebsite",
//       error_file: "./error.log",
//       out_file: "./out.log",
//       log_date_format: "YYYY-MM-DD HH:mm.SSS",
//     },
//   ],
// };
