import { PostgreSqlContainer } from "@testcontainers/postgresql";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Wait } from "testcontainers";

export default class TestDatabase {
  static async setup(): Promise<NodePgDatabase> {
    if (process.env.CI) {
      console.log("Setting up test database");
      const container = await new PostgreSqlContainer("postgres:alpine")
        .withWaitStrategy(Wait.forListeningPorts())
        .start();

      const db: NodePgDatabase = drizzle(container.getConnectionUri());

      await migrate(db, {
        migrationsFolder: "./migrations",
        migrationsTable: "migrations",
        migrationsSchema: "public",
      });

      return db;
    } else {
      console.log("Skipping database setup");
      return {} as any;
    }
  }
}
