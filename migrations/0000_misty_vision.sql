CREATE TABLE "users" (
	"email" varchar PRIMARY KEY NOT NULL,
	"creationDate" date DEFAULT now()
);
