import { drizzle, NeonHttpDatabase } from "drizzle-orm/neon-http";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DATABASE_URL } from "astro:env/server"

export type Database = NodePgDatabase | NeonHttpDatabase;

let db: Database = drizzle(DATABASE_URL);

export function setDb(newDb: Database) {
  db = newDb;
}

export function getDb() {
  return db;
}
