import { usersTable } from "../schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { NeonHttpDatabase } from "drizzle-orm/neon-http";
import { USER_SECRET_KEY } from "astro:env/server";
import type UserRepository from "../../../domain/user/UserRepository";
import { getDb } from "..";
import User from "../../../domain/user/User";


export default class PostgresUserRepository implements UserRepository {
  constructor(
    private readonly db: NodePgDatabase | NeonHttpDatabase = getDb(),
    private readonly secretKey: string = USER_SECRET_KEY
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .execute();

    if (user.length === 0) {
      return null;
    }

    return new User(email, user[0].unsubscribeKey);
  }

  async createUser(email: string): Promise<User> {
    const now = new Date().toISOString().split("T")[0];
    const createdUser = await this.db
      .insert(usersTable)
      .values({ email, creationDate: now })
      .returning();

    return new User(email, createdUser[0].unsubscribeKey);
  }
}
