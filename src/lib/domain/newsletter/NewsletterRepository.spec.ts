import { expect, it, describe, beforeEach } from "vitest";
import Newsletter from "./Newsletter";
import PostgresNewsletterRepository from "../../infrastructure/newsletter/PostgresNewsletterRepository";
import { setupTestDatabase } from "../../../test/testDatabase";
import { emailDeliveriesTable, newsletterCampaignsTable } from "../../../test/setup/testTables";
import type { Database } from "../../infrastructure/db";
import { testContacts, createTestContacts } from "../../../test/fixtures/contactFixtures";

describe("NewsletterRepository", () => {
  let repository: PostgresNewsletterRepository;
  let db: Database;

  const { getDb } = setupTestDatabase(emailDeliveriesTable, newsletterCampaignsTable);

  beforeEach(() => {
    db = getDb();
    repository = new PostgresNewsletterRepository(db);
  });

  describe("repository functionality", () => {
    it("should return null for non-existent campaign", async () => {
      const result = await repository.findByTitle("non-existent");
      expect(result).toBeNull();
    });

    it("should save and retrieve newsletter campaign by title", async () => {
      const contacts = [testContacts.user1, testContacts.user2];
      const newsletter = Newsletter.create(
        "test-campaign-2024",
        "Test Subject",
        "Preview text",
        "<h1>Hello {{unsubscribeKey}}</h1>",
        contacts,
        "unsubscribeKey"
      );

      await repository.save(newsletter);

      const retrieved = await repository.findByTitle("test-campaign-2024");
      expect(retrieved).not.toBeNull();
      expect(retrieved!.getTitle()).toBe("test-campaign-2024");
      expect(retrieved!.getSubject()).toBe("Test Subject");
      expect(retrieved!.getStatus()).toBe("pending");
      expect(retrieved!.getTotalRecipients()).toBe(2);
      expect(retrieved!.getProgressPercentage()).toBe(0);
    });

    it("should update campaign status and progress", async () => {
      const contacts = [testContacts.user1];
      const newsletter = Newsletter.create(
        "update-test",
        "Update Test",
        "Preview",
        "<p>Content</p>",
        contacts,
        "unsubscribeKey"
      );

      await repository.save(newsletter);

      newsletter.processBatch([
        { email: testContacts.user1.email, success: true }
      ]);

      await repository.update(newsletter);

      const retrieved = await repository.findByTitle("update-test");
      expect(retrieved!.getStatus()).toBe("completed");
      expect(retrieved!.getProgressPercentage()).toBe(100);
    });

    it("should support resume workflow", async () => {
      const contacts = [testContacts.user1, testContacts.user2];
      const newsletter = Newsletter.create(
        "resume-test",
        "Resume Test",
        "Preview",
        "<p>Content</p>",
        contacts,
        "unsubscribeKey"
      );

      await repository.save(newsletter);

      newsletter.processBatch([
        { email: testContacts.user1.email, success: false, error: "Network error" }
      ]);

      await repository.update(newsletter);

      const retrieved = await repository.findByTitle("resume-test");
      expect(retrieved!.getStatus()).toBe("in_progress");
      
      const nextBatch = retrieved!.getNextBatch(10);
      expect(nextBatch).toHaveLength(1);
      expect(nextBatch[0].email).toBe(testContacts.user2.email);
    });

    it("should handle duplicate campaign titles", async () => {
      const contacts1 = [testContacts.user1];
      const newsletter1 = Newsletter.create(
        "duplicate-test",
        "First Campaign",
        "Preview",
        "<p>Content 1</p>",
        contacts1,
        "unsubscribeKey"
      );

      await repository.save(newsletter1);

      const contacts2 = [testContacts.user2];
      const newsletter2 = Newsletter.create(
        "duplicate-test",
        "Second Campaign",
        "Preview",
        "<p>Content 2</p>",
        contacts2,
        "unsubscribeKey"
      );

      // Should throw error due to unique constraint
      await expect(repository.save(newsletter2)).rejects.toThrow();
    });

    it("should preserve email delivery states when retrieving", async () => {
      const contacts = createTestContacts(3);
      const newsletter = Newsletter.create(
        "delivery-state-test",
        "Delivery State Test",
        "Preview",
        "<p>Hello {{unsubscribeKey}}</p>",
        contacts,
        "unsubscribeKey"
      );

      await repository.save(newsletter);

      // Process partial batch
      newsletter.processBatch([
        { email: contacts[0].email, success: true },
        { email: contacts[1].email, success: false, error: "SMTP error" }
      ]);

      await repository.update(newsletter);

      // Retrieve and verify state preservation
      const retrieved = await repository.findByTitle("delivery-state-test");
      expect(retrieved!.getStatus()).toBe("in_progress");
      expect(retrieved!.getProgressPercentage()).toBe(33); // 1 out of 3 successful

      const deliveries = retrieved!.getEmailDeliveries();
      expect(deliveries.find(d => d.recipientEmail === contacts[0].email)?.status).toBe("sent");
      expect(deliveries.find(d => d.recipientEmail === contacts[1].email)?.status).toBe("failed");
      expect(deliveries.find(d => d.recipientEmail === contacts[1].email)?.errorMessage).toBe("SMTP error");
      expect(deliveries.find(d => d.recipientEmail === contacts[2].email)?.status).toBe("pending");
    });
  });
});