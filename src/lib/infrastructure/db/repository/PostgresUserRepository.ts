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
    private readonly db: NodePgDatabase | NeonHttpDatabase = defaultDb.default,
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

    return new User(email, userSecret);
  }

  createUserSecretFromDate(userCreationDate: string) {
    return crypto
      .createHash("sha256")
      .update(userCreationDate + this.secretKey)
      .digest("hex");
  }
}
