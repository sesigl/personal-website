import { date, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export var usersTable = pgTable("users", {
  email: varchar().primaryKey(),
  creationDate: date().defaultNow().notNull(),
  unsubscribeKey: uuid().defaultRandom().unique().notNull(),
});
