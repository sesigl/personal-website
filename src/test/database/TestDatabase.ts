import { PostgreSqlContainer, StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Wait } from "testcontainers";
import pg from 'pg';

export default class TestDatabase {
  private static instance: TestDatabase;
  private container: StartedPostgreSqlContainer | undefined;
  private db: NodePgDatabase | undefined;
  private pgPool: pg.Pool | undefined;

  private constructor() {}

  static getInstance(): TestDatabase {
    if (!TestDatabase.instance) {
      TestDatabase.instance = new TestDatabase();
    }
    return TestDatabase.instance;
  }

  async getDatabase(): Promise<NodePgDatabase> {
    if (!this.db) {
      await this.setup();
    }
    return this.db!;
  }

  private async setup(): Promise<void> {
    this.container = await new PostgreSqlContainer("postgres:alpine")
      .withWaitStrategy(Wait.forListeningPorts())
      .start();

    // Create a connection pool
    this.pgPool = new pg.Pool({
      connectionString: this.container.getConnectionUri()
    });

    this.db = drizzle(this.pgPool);

    await migrate(this.db, {
      migrationsFolder: "./migrations",
      migrationsTable: "migrations",
      migrationsSchema: "public",
    });
  }

  async teardown(): Promise<void> {
    try {
      if (this.pgPool) {
        await this.pgPool.end();
        this.pgPool = undefined;
      }
      
      if (this.container) {
        await this.container.stop({
          timeout: 5000 // 5 seconds timeout for graceful shutdown
        });
        this.container = undefined;
      }
      
      this.db = undefined;
    } catch (error) {
      console.error('Error during database teardown:', error);
      throw error;
    }
  }
}
