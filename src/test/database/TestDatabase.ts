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
  private setupPromise: Promise<void> | undefined;

  private constructor() {}

  static getInstance(): TestDatabase {
    if (!TestDatabase.instance) {
      TestDatabase.instance = new TestDatabase();
    }
    return TestDatabase.instance;
  }

  async getDatabase(): Promise<NodePgDatabase> {
    if (!this.db) {
      if (!this.setupPromise) {
        this.setupPromise = this.setup();
      }
      await this.setupPromise;
    }
    return this.db!;
  }

  private async setup(): Promise<void> {
    try {
      console.log('🐳 Starting PostgreSQL test container...');
      
      this.container = await new PostgreSqlContainer("postgres:15.13-bullseye")
        .withDatabase("testdb")
        .withUsername("testuser") 
        .withPassword("testpass")
        .withStartupTimeout(30000)
        .withWaitStrategy(
          Wait.forAll([
            Wait.forListeningPorts(),
            Wait.forLogMessage(/database system is ready to accept connections/, 2)
          ])
        )
        .start();

      console.log(`✅ Container started on port ${this.container.getMappedPort(5432)}`);

      // Create connection pool with standard settings
      this.pgPool = new pg.Pool({
        connectionString: this.container.getConnectionUri(),
        max: 5,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 3000,
      });

      this.db = drizzle(this.pgPool);

      console.log('🔄 Running database migrations...');
      await migrate(this.db, {
        migrationsFolder: "./migrations",
        migrationsTable: "migrations",
        migrationsSchema: "public",
      });
      console.log('✅ Database ready');
      
    } catch (error) {
      console.error('❌ Database setup failed:', error);
      await this.teardown();
      throw error;
    }
  }

  async teardown(): Promise<void> {
    console.log('🧹 Cleaning up test database...');
    
    if (this.pgPool) {
      try {
        await this.pgPool.end();
      } catch (error) {
        console.warn('Warning closing pool:', error);
      }
      this.pgPool = undefined;
    }

    if (this.container) {
      try {
        await this.container.stop();
      } catch (error) {
        console.warn('Warning stopping container:', error);
      }
      this.container = undefined;
    }

    this.db = undefined;
    this.setupPromise = undefined;
    
    console.log('✅ Cleanup complete');
  }
}