import NewsletterClient from "@/lib/domain/newsletter/NewsletterClient";
import * as defaultDb from "@/lib/infrastructure/db";
import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { NeonHttpDatabase } from "drizzle-orm/neon-http";

export default class PostgresNewsletterClient implements NewsletterClient {
  constructor(
    private readonly db: NodePgDatabase | NeonHttpDatabase = defaultDb.default
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
