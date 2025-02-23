import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { beforeEach, describe, expect, it } from "vitest";
import TestDatabase from "../../../test/database/TestDatabase";
import { setupTestDatabase } from "../../../test/setup/setupTestDatabase";
import PostgresNewsletterClient from "./PostgresNewsletterClient";

describe("PostgresNewsletterClient", () => {
    let postgresNewsletterClient: PostgresNewsletterClient;
    let db: NodePgDatabase;

    setupTestDatabase();

    beforeEach(async () => {
      db = await TestDatabase.getInstance().getDatabase();
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
