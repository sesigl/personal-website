import { expect, it, describe, beforeEach } from "vitest";
import Newsletter from "./Newsletter";
import PostgresNewsletterRepository from "../../infrastructure/newsletter/PostgresNewsletterRepository";
import { setupTestDatabase } from "../../../test/testDatabase";
import { emailDeliveriesTable, newsletterCampaignsTable } from "../../../test/setup/testTables";
import type { Database } from "../../infrastructure/db";

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
      const newsletter = Newsletter.createCampaign(
        "test-campaign-2024",
        "Test Subject",
        "Preview text",
        "<h1>Hello {{name}}</h1>",
        [
          { email: "user1@example.com", placeholders: { name: "User1" } },
          { email: "user2@example.com", placeholders: { name: "User2" } }
        ]
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
      const newsletter = Newsletter.createCampaign(
        "update-test",
        "Update Test",
        "Preview",
        "<p>Content</p>",
        [{ email: "user@example.com", placeholders: {} }]
      );

      await repository.save(newsletter);

      newsletter.processBatch([
        { email: "user@example.com", success: true }
      ]);

      await repository.update(newsletter);

      const retrieved = await repository.findByTitle("update-test");
      expect(retrieved!.getStatus()).toBe("completed");
      expect(retrieved!.getProgressPercentage()).toBe(100);
    });

    it("should support resume workflow", async () => {
      const newsletter = Newsletter.createCampaign(
        "resume-test",
        "Resume Test",
        "Preview",
        "<p>Content</p>",
        [
          { email: "user1@example.com", placeholders: {} },
          { email: "user2@example.com", placeholders: {} }
        ]
      );

      await repository.save(newsletter);

      newsletter.processBatch([
        { email: "user1@example.com", success: false, error: "Network error" }
      ]);

      await repository.update(newsletter);

      const retrieved = await repository.findByTitle("resume-test");
      expect(retrieved!.getStatus()).toBe("failed");
      
      const nextBatch = retrieved!.getNextBatch(10);
      expect(nextBatch).toHaveLength(1);
      expect(nextBatch[0].email).toBe("user2@example.com");
    });

    it("should handle duplicate campaign titles", async () => {
      const newsletter1 = Newsletter.createCampaign(
        "duplicate-test",
        "First Campaign",
        "Preview",
        "<p>Content 1</p>",
        [{ email: "user1@example.com", placeholders: {} }]
      );

      await repository.save(newsletter1);

      const newsletter2 = Newsletter.createCampaign(
        "duplicate-test",
        "Second Campaign",
        "Preview",
        "<p>Content 2</p>",
        [{ email: "user2@example.com", placeholders: {} }]
      );

      // Should throw error due to unique constraint
      await expect(repository.save(newsletter2)).rejects.toThrow();
    });

    it("should preserve email delivery states when retrieving", async () => {
      const newsletter = Newsletter.createCampaign(
        "delivery-state-test",
        "Delivery State Test",
        "Preview",
        "<p>Hello {{name}}</p>",
        [
          { email: "user1@example.com", placeholders: { name: "User1" } },
          { email: "user2@example.com", placeholders: { name: "User2" } },
          { email: "user3@example.com", placeholders: { name: "User3" } }
        ]
      );

      await repository.save(newsletter);

      // Process partial batch
      newsletter.processBatch([
        { email: "user1@example.com", success: true },
        { email: "user2@example.com", success: false, error: "SMTP error" }
      ]);

      await repository.update(newsletter);

      // Retrieve and verify state preservation
      const retrieved = await repository.findByTitle("delivery-state-test");
      expect(retrieved!.getStatus()).toBe("failed");
      expect(retrieved!.getProgressPercentage()).toBe(33); // 1 out of 3 successful

      const deliveries = retrieved!.getEmailDeliveries();
      expect(deliveries.find(d => d.recipientEmail === "user1@example.com")?.status).toBe("sent");
      expect(deliveries.find(d => d.recipientEmail === "user2@example.com")?.status).toBe("failed");
      expect(deliveries.find(d => d.recipientEmail === "user2@example.com")?.errorMessage).toBe("SMTP error");
      expect(deliveries.find(d => d.recipientEmail === "user3@example.com")?.status).toBe("pending");
    });
  });
});