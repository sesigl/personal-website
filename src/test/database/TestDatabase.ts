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
      await this.createContainerAndConnection();
      await this.verifyDatabaseConnection();
      await this.runMigrations();
      console.log('✅ Database ready');
    } catch (error) {
      console.error('❌ Database setup failed:', error);
      await this.teardown();
      throw error;
    }
  }

  private async createContainerAndConnection(): Promise<void> {
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
    this.createConnectionPool();
  }

  private createConnectionPool(): void {
    this.pgPool = new pg.Pool({
      connectionString: this.container!.getConnectionUri(),
      max: 5,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 1000,
    });
    this.db = drizzle(this.pgPool);
  }

  private async cleanupResources(): Promise<void> {
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
        console.log('🛑 Stopping container...');
        await this.container.stop();
      } catch (error) {
        console.warn('Warning stopping container:', error);
      }
      this.container = undefined;
    }
    this.db = undefined;
  }

  private async runMigrations(): Promise<void> {
    console.log('🔄 Running database migrations...');
    await migrate(this.db!, {
      migrationsFolder: "./migrations",
      migrationsTable: "migrations",
      migrationsSchema: "public",
    });
  }

  private async verifyDatabaseConnection(): Promise<void> {
    const maxRetries = 5;
    const retryDelay = 1000;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`🔍 Verifying database connection (attempt ${attempt}/${maxRetries})...`);
        
        const result = await this.db!.execute('SELECT 1 as test');
        
        if (result && result.rowCount && result.rowCount > 0) {
          console.log('✅ Database connection verified');
          return;
        } else {
          throw new Error('SELECT 1 returned no results');
        }
        
      } catch (error) {
        console.warn(`⚠️ Database connection attempt ${attempt} failed:`, error);
        
        if (attempt === maxRetries) {
          throw new Error(`Database connection failed after ${maxRetries} attempts: ${error}`);
        }
        
        console.log('🔄 Recreating container and connection pool...');
        await this.cleanupResources();
        await this.createContainerAndConnection();
        
        console.log(`⏳ Waiting ${retryDelay}ms before retry...`);
        await sleep(retryDelay);
      }
    }
  }

  async teardown(): Promise<void> {
    console.log('🧹 Cleaning up test database...');
    await this.cleanupResources();
    this.setupPromise = undefined;
    TestDatabase.instance = undefined as any;
    console.log('✅ Cleanup complete');
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}