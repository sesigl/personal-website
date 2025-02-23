import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";
import type NewsletterClient from "../../domain/newsletter/NewsletterClient";
import { type Database, getDb } from "../db";
import Contact from "../../domain/newsletter/Contact";

export default class PostgresNewsletterClient implements NewsletterClient {
  constructor(
    private readonly db: Database = getDb()
  ) {}

  async deleteEmailFromNewsletter(unsubscribeKey: string): Promise<void> {
    const result = await this.db
      .delete(usersTable)
      .where(eq(usersTable.unsubscribeKey, unsubscribeKey))
      .execute();

    if (result.rowCount === 0) {
      throw new Error(`No user found with unsubscribeKey ${unsubscribeKey}`);
    }
  }

  async createContact(email: string): Promise<Contact> {
    const createdContacts = await this.db.insert(usersTable).values([{ email }]).returning();
    return new Contact(createdContacts[0].email, createdContacts[0].unsubscribeKey);
  }
}
