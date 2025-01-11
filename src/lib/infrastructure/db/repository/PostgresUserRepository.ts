import User from "@/lib/domain/user/User";
import UserRepository from "@/lib/domain/user/UserRepository";
import * as defaultDb from "@/lib/infrastructure/db";
import { usersTable } from "../schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { NeonHttpDatabase } from "drizzle-orm/neon-http";

export default class PostgresUserRepository implements UserRepository {
  constructor(
    private readonly db: NodePgDatabase | NeonHttpDatabase = defaultDb.getDb(),
    private readonly secretKey: string = process.env.USER_SECRET_KEY!!
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

    const userCreationDate = user[0].creationDate;

    const userSecret = this.createUserSecretFromDate(userCreationDate);

    console.log(
      `User read with email: ${email} and secret: ${userSecret} at timestamp: ${userCreationDate}`
    );

    return new User(email, userSecret);
  }

  async createUser(email: string): Promise<User> {
    const now = new Date().toISOString().split("T")[0];
    await this.db
      .insert(usersTable)
      .values({ email, creationDate: now })
      .execute();

    const userSecret = this.createUserSecretFromDate(now);

    console.log(
      `User created with email: ${email} and secret: ${userSecret} at timestamp: ${now}`
    );

    return new User(email, userSecret);
  }

  createUserSecretFromDate(userCreationDate: string) {
    return crypto
      .createHash("sha256")
      .update(userCreationDate + this.secretKey)
      .digest("hex");
  }
}
