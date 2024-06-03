/* eslint-disable */
import { defineConfig } from "drizzle-kit";


export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "/.drizzle/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
// interface DbCredentials {
//     accountId: string;
//     databaseId: string;
//     token: string;
//     connectionString: string; // Add connectionString property
//   }

// type DriverType = "pg" | "d1-http"; // Define the allowed driver types
// export default defineConfig({
//   dialect: "postgresql",
//   schema: "/src/db/schema.ts",
//   out: "/.drizzle/migrations",
//   // @ts-ignore
//   driver: "pg",
//   dbCredentials: {
//     connectionString: process.env.DATABASE_URL!,
//   },
//   verbose: true,
//   strict: true,
// });
