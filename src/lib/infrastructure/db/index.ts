import { drizzle, NeonHttpDatabase } from "drizzle-orm/neon-http";
import { DATABASE_URL } from "astro:env/server"
import { NodePgDatabase } from "drizzle-orm/node-postgres";

export type Database = NodePgDatabase | NeonHttpDatabase;

let db: Database | null

export function setDb(newDb: Database) {
  db = newDb;
}

export function getDb() {
  if (!db) {
    db = drizzle(DATABASE_URL);
  }
  
  return db;
}
