module.exports = {
  apps: [
    {
      script: "npm run pod",
      // script: "npx next start",
      instances: 1,
      name: "MyWebsite",
      error_file: "./error.log",
      out_file: "./out.log",
      log_date_format: "YYYY-MM-DD HH:mm.SSS",
    },
  ],
};
