// db-check.js
const dotenv = require('dotenv');
const { drizzle } = require('drizzle-orm/postgres-js');
const postgres = require('postgres');
const schema = require('./src/db/schema');

dotenv.config();

async function checkDatabase() {
  console.log('Überprüfe Datenbankverbindung...');

  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL ist nicht gesetzt');
    process.exit(1);
  }

  const client = postgres(process.env.DATABASE_URL);
  const db = drizzle(client, { schema });

  try {
    // Führe eine einfache Abfrage aus
    const result = await db.select().from(schema.migrations).execute();
    console.log('Datenbankverbindung erfolgreich');
    console.log('Inhalt der Migrations-Tabelle:', result);

    // Gib alle Umgebungsvariablen aus (Vorsicht mit sensiblen Daten)
    console.log('\nUmgebungsvariablen:');
    Object.keys(process.env).forEach(key => {
      if (!key.toLowerCase().includes('password') && !key.toLowerCase().includes('secret')) {
        console.log(`${key}: ${process.env[key]}`);
      }
    });

  } catch (error) {
    console.error('Datenbankverbindung fehlgeschlagen:', error);
  } finally {
    await client.end();
  }
}

checkDatabase();
