import { beforeAll, afterAll, describe, it, expect } from "vitest";
import TestDatabase from "@/test/database/TestDatabase";
import { randomUUID } from "crypto";
import PostgresUserRepository from "./PostgresUserRepository";
import { usersTable } from "../schema";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

describe("PostgresUserRepository", () => {
  let userRepository: PostgresUserRepository;
  let db: NodePgDatabase;

  beforeAll(async () => {
    db = await TestDatabase.setup();
    userRepository = new PostgresUserRepository(db, "test-secret");
  });

  it("finds user by email", async () => {
    const testEmail = `test-${randomUUID()}@example.com`;
    await db.insert(usersTable).values({
      email: testEmail,
      creationDate: new Date().toISOString(),
    });

    const user = await userRepository.findByEmail(testEmail);

    expect(user).not.toBeNull();
    expect(user!!.email).toBe(testEmail);
    expect(user!!.secretToken).toBeDefined();
  });

  it("a user secret is always the same", async () => {
    const testEmail = `test-${randomUUID()}@example.com`;
    await db.insert(usersTable).values({
      email: testEmail,
      creationDate: new Date().toISOString(),
    });

    const user = await userRepository.findByEmail(testEmail);
    const user2 = await userRepository.findByEmail(testEmail);

    expect(user!!.secretToken).toBe(user2!!.secretToken);
  });

  it("returns null for non-existing user", async () => {
    const nonExistingEmail = "non-existing@example.com";
    const user = await userRepository.findByEmail(nonExistingEmail);
    expect(user).toBeNull();
  });
});
