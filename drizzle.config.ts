import * as postgres from 'postgres';
import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';
// import { drizzle } from 'drizzle-orm/postgres-js';
// import { migrate } from 'drizzle-orm/postgres-js/migrator';
// export default defineConfig({
//   schema: "./src/db/schema.ts",
//   out: "/.drizzle/migrations",
//   driver: "pg",
//   dbCredentials: {
//     connectionString: process.env.DATABASE_URL!,
//   },
//   verbose: true,
//   strict: true,
// });
// const sql = postgres('...', { max: 1 });
// const db = drizzle(sql);
// await migrate(db, { migrationsFolder: 'drizzle' });
// await sql.end();

config();

export default defineConfig({
	dialect: 'postgresql',
	schema: './src/db/schema.ts',
	out: './.drizzle/migrations',
	dbCredentials: {
		url: process.env.DATABASE_URL!,
	},
	verbose: true,
	strict: true,
	migrations: {
		table: 'migrations',
		schema: 'public', // Nur für PostgreSQL erforderlich
	},
});
