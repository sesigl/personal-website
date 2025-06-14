import { randomUUID } from "crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { assertNotNull } from "../../../../test/assert/anyAssertions";
import { setupTestDatabase } from "../../../../test/testDatabase";
import { usersTable } from "../../../../test/setup/testTables";
import type { Database } from "../index";
import PostgresUserRepository from "./PostgresUserRepository";

describe("PostgresUserRepository", () => {
  let userRepository: PostgresUserRepository;
  let db: Database;

  const { getDb } = setupTestDatabase(usersTable);

  beforeEach(() => {
    db = getDb();
    userRepository = new PostgresUserRepository(db, "test-secret");
  });

  it("generates different unsubscribe keys per user", async () => {
    const testEmail1 = `test-${randomUUID()}@example.com`;
    await db.insert(usersTable).values({
      email: testEmail1,
      creationDate: new Date().toISOString(),
    });

    const testEmail2 = `test-${randomUUID()}@example.com`;
    await db.insert(usersTable).values({
      email: testEmail2,
      creationDate: new Date().toISOString(),
    });

    const user1 = await userRepository.findByEmail(testEmail1);
    const user2 = await userRepository.findByEmail(testEmail2);

    assertNotNull(user1);
    expect(user1.email).toBe(testEmail1);
    expect(user1.unsubscribeKey).toBeDefined();
    expect(user1.unsubscribeKey).not.toBe(user2?.unsubscribeKey);
  });

  it("a user secret is always the same", async () => {
    const testEmail = `test-${randomUUID()}@example.com`;
    await db.insert(usersTable).values({
      email: testEmail,
      creationDate: new Date().toISOString(),
    });

    const user = await userRepository.findByEmail(testEmail);
    const user2 = await userRepository.findByEmail(testEmail);

    expect(user?.unsubscribeKey).toBe(user2?.unsubscribeKey);
  });

  it("returns null for non-existing user", async () => {
    const nonExistingEmail = "non-existing@example.com";
    const user = await userRepository.findByEmail(nonExistingEmail);
    expect(user).toBeNull();
  });
});
