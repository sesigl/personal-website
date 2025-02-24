import { afterAll, beforeAll } from "vitest";
import TestDatabase from "../database/TestDatabase";

export function setupTestDatabase() {
  const testDatabase = TestDatabase.getInstance();

  beforeAll(async () => {
    await testDatabase.getDatabase();
  });

  afterAll(async () => {
    await testDatabase.teardown();
  });
}
