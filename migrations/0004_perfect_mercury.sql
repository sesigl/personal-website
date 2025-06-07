CREATE TABLE "email_deliveries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"campaign_id" uuid NOT NULL,
	"recipient_email" varchar NOT NULL,
	"status" varchar DEFAULT 'pending' NOT NULL,
	"sent_at" timestamp,
	"error_message" text
);
--> statement-breakpoint
CREATE TABLE "newsletter_campaigns" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar NOT NULL,
	"subject" varchar NOT NULL,
	"html_content" text NOT NULL,
	"preview_text" varchar,
	"status" varchar DEFAULT 'pending' NOT NULL,
	"total_recipients" integer NOT NULL,
	"processed_count" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"started_at" timestamp,
	"completed_at" timestamp,
	CONSTRAINT "newsletter_campaigns_title_unique" UNIQUE("title")
);
--> statement-breakpoint
ALTER TABLE "email_deliveries" ADD CONSTRAINT "email_deliveries_campaign_id_newsletter_campaigns_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "public"."newsletter_campaigns"("id") ON DELETE no action ON UPDATE no action;