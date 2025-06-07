import { beforeEach, describe, expect, it } from "vitest";
import { setupTestDatabase } from "../../../test/testDatabase";
import { usersTable } from "../../../test/setup/testTables";
import type { Database } from "../db";
import PostgresContactsRepository from "./PostgresContactsRepository";

describe("PostgresContactsRepository", () => {
    let postgresContactsRepository: PostgresContactsRepository;
    let db: Database;

    const { getDb } = setupTestDatabase(usersTable);

    beforeEach(() => {
      db = getDb();
      postgresContactsRepository = new PostgresContactsRepository(db);
    });

    it("creates and deletes an email", async () => {
      const contact = await postgresContactsRepository.createContact("test@email.de");
      await postgresContactsRepository.deleteEmailFromNewsletter(contact.unsubscribeKey);
    });

    it("creates and returns all contacts", async () => {
      await postgresContactsRepository.createContact("test1@email.de");
      await postgresContactsRepository.createContact("test2@email.de");
      const allContacts = await postgresContactsRepository.findAllContacts();

      expect(allContacts.length).toBeGreaterThanOrEqual(2);
    });
});