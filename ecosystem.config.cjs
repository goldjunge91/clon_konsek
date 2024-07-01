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
      env: {
        NODE_ENV: "production",
        DATABASE_URL: process.env.DATABASE_URL,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
        ENCRYPTION_IV: process.env.ENCRYPTION_IV,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        DB_HOST: process.env.DB_HOST,
        DB_NAME: process.env.DB_NAME,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD
      }
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
