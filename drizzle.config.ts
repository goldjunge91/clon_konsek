
import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./src/db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
// const { config } = require('dotenv');
// const { defineConfig } = require('drizzle-kit');

// // Laden der Umgebungsvariablen aus der .env Datei
// config();

// if (process.env.DATABASE_URL) {
// 	console.log('DATABASE_URL:', process.env.DATABASE_URL);
// }

// module.exports = defineConfig({
// 	schema: './src/db/schema.ts',
// 	out: './.drizzle/migrations',
// 	dialect: 'postgresql',
// 	dbCredentials: {
// 		url: process.env.DATABASE_URL,
// 	},
// 	verbose: true,
// 	strict: true,
// 	migrations: {
// 		table: 'migrations',
// 		schema: 'public', // Nur für PostgreSQL erforderlich
// 	},
// });
