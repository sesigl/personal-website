import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";
import type NewsletterClient from "../../domain/newsletter/NewsletterClient";
import { Database, getDb } from "../db";

export default class PostgresNewsletterClient implements NewsletterClient {
  constructor(
    private readonly db: Database = getDb()
  ) {}

  async deleteEmailFromNewsletter(email: string): Promise<void> {
    const result = await this.db
      .delete(usersTable)
      .where(eq(usersTable.email, email))
      .execute();

    if (result.rowCount === 0) {
      throw new Error(`No user found with email ${email}`);
    }
  }

  async createContact(email: string): Promise<void> {
    await this.db.insert(usersTable).values([{ email }]).execute();
  }
}
