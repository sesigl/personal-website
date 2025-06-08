import { date, pgTable, uuid, varchar, timestamp, integer, text } from "drizzle-orm/pg-core";

export var usersTable = pgTable("users", {
  email: varchar().primaryKey(),
  creationDate: date().defaultNow().notNull(),
  unsubscribeKey: uuid().defaultRandom().unique().notNull(),
});

export var newsletterCampaignsTable = pgTable("newsletter_campaigns", {
  id: uuid().primaryKey().defaultRandom(),
  title: varchar().unique().notNull(),
  subject: varchar().notNull(),
  htmlContent: text("html_content").notNull(),
  previewText: varchar("preview_text"),
  status: varchar().notNull().default("pending"),
  totalRecipients: integer("total_recipients").notNull(),
  processedCount: integer("processed_count").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at")
});

export var emailDeliveriesTable = pgTable("email_deliveries", {
  id: uuid().primaryKey().defaultRandom(),
  campaignId: uuid("campaign_id").references(() => newsletterCampaignsTable.id).notNull(),
  recipientEmail: varchar("recipient_email").notNull(),
  status: varchar().notNull().default("pending"),
  sentAt: timestamp("sent_at"),
  errorMessage: text("error_message")
});
