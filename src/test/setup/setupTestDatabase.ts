import { afterAll, beforeAll } from "vitest";
import TestDatabase from "../database/TestDatabase";

export function setupTestDatabase() {
  const testDatabase = TestDatabase.getInstance();

  beforeAll(async () => {
    console.log('📦 Initializing shared test database...');
    await testDatabase.getDatabase();
    console.log('✅ Shared test database ready');
  }, 120000); // 120 second timeout for container startup

  afterAll(async () => {
    console.log('🧹 Cleaning up shared test database...');
    await testDatabase.teardown();
    console.log('✅ Shared test database cleanup complete');
  }, 30000); // 30 second timeout for cleanup
}
