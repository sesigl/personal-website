import TestDatabase from "@/test/database/TestDatabase";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import PostgresNewsletterClient from "./PostgresNewsletterClient";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

describe("PostgresNewsletterClient", () => {
  let postgresNewsletterClient: PostgresNewsletterClient;
  let db: NodePgDatabase;

  beforeAll(async () => {
    db = await TestDatabase.setup();
    postgresNewsletterClient = new PostgresNewsletterClient(db);
  });

  it("creates and deletes an email", async () => {
    await postgresNewsletterClient.createContact("test@email.de");
    await postgresNewsletterClient.deleteEmailFromNewsletter("test@email.de");
  });

  it("throws an error when deleting a non-existing email", async () => {
    await expect(
      postgresNewsletterClient.deleteEmailFromNewsletter("non-existing")
    ).rejects.toBeDefined();
  });
});
