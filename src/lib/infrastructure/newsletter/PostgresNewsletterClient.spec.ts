import { beforeEach, describe, expect, it } from "vitest";
import { setupTestDatabase } from "../../../test/testDatabase";
import { usersTable } from "../../../test/setup/testTables";
import type { Database } from "../db";
import PostgresNewsletterClient from "./PostgresNewsletterClient";

describe("PostgresNewsletterClient", () => {
    let postgresNewsletterClient: PostgresNewsletterClient;
    let db: Database;

    const { getDb } = setupTestDatabase(usersTable);

    beforeEach(() => {
      db = getDb();
      postgresNewsletterClient = new PostgresNewsletterClient(db);
    });

    it("creates and deletes an email", async () => {
      const contact = await postgresNewsletterClient.createContact("test@email.de");
      await postgresNewsletterClient.deleteEmailFromNewsletter(contact.unsubscribeKey);
    });

    it("creates and returns all contacts", async () => {
      await postgresNewsletterClient.createContact("test1@email.de");
      await postgresNewsletterClient.createContact("test2@email.de");
      const allContacts = await postgresNewsletterClient.findAllContacts();

      expect(allContacts.length).toBeGreaterThanOrEqual(2);
    });
});
