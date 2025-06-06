import { expect, it, describe, beforeEach, vi } from "vitest";
import Newsletter from "./Newsletter";
import PostgresNewsletterRepository from "../../infrastructure/newsletter/PostgresNewsletterRepository";

// Mock the database dependency
const mockDb = {
  select: vi.fn(),
  insert: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
  $client: { end: vi.fn() }
} as any;

describe("NewsletterRepository", () => {
  let repository: PostgresNewsletterRepository;

  beforeEach(() => {
    repository = new PostgresNewsletterRepository(mockDb);
  });

  describe("repository interface", () => {
    it("should implement repository interface correctly", () => {
      expect(repository.findByTitle).toBeDefined();
      expect(repository.save).toBeDefined();
      expect(repository.update).toBeDefined();
    });

    it("should return null for non-existent campaign", async () => {
      const result = await repository.findByTitle("non-existent");
      expect(result).toBeNull();
    });

    it("should throw error for save until migration is complete", async () => {
      const newsletter = Newsletter.createCampaign(
        "test-campaign",
        "Test Subject",
        "Preview",
        "<p>Content</p>",
        [{ email: "test@example.com", placeholders: {} }]
      );

      await expect(repository.save(newsletter)).rejects.toThrow("Database tables not yet created");
    });

    it("should throw error for update until migration is complete", async () => {
      const newsletter = Newsletter.createCampaign(
        "test-campaign",
        "Test Subject", 
        "Preview",
        "<p>Content</p>",
        [{ email: "test@example.com", placeholders: {} }]
      );

      await expect(repository.update(newsletter)).rejects.toThrow("Database tables not yet created");
    });
  });

  // These tests will be enabled after Phase 1.3 (Database Migration)
  describe.skip("full repository functionality (after migration)", () => {
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
  });
});