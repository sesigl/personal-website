import { beforeAll, afterAll, afterEach } from 'vitest';
import TestDatabase from './database/TestDatabase';
import type { Database } from '../lib/infrastructure/db';

let sharedDb: Database | null = null;

/**
 * Simple database setup for tests
 */
export function setupTestDatabase(...tablesToClean: any[]) {
  beforeAll(async () => {
    if (!sharedDb) {
      sharedDb = await TestDatabase.getInstance().getDatabase();
    }
  }, 120000);

  afterEach(async () => {
    if (sharedDb && tablesToClean.length > 0) {
      try {
        for (const table of tablesToClean) {
          await sharedDb.delete(table);
        }
      } catch (error) {
        console.warn('Cleanup warning:', error);
      }
    }
  });

  afterAll(async () => {
    if (sharedDb) {
      await TestDatabase.getInstance().teardown();
      sharedDb = null;
    }
  }, 30000);

  return {
    getDb: () => {
      if (!sharedDb) throw new Error('Database not ready');
      return sharedDb;
    }
  };
}