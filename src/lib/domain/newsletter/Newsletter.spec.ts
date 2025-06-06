import { expect, it, describe } from "vitest";
import Newsletter from "./Newsletter";

describe("Newsletter", () => {
  it("should create and validate placeholders", () => {
    const html = `
      <html>
        <h1>Hello {{name}}</h1>
        <p>Your link: {{link}}</p>
      </html>
    `;

    const recipients = [
      {
        email: "subscriber@gmail.com",
        placeholders: {
          name: "John",
          link: "https://example.com"
        }
      }
    ];

    const newsletter = new Newsletter("Test Subject", "preview text", html, recipients);
    expect(newsletter.getSubject()).toBe("Test Subject");
    expect(newsletter.getHtmlTemplate()).toContain("{{name}}");
    expect(newsletter.getRecipients()[0].templateData.link).toBe("https://example.com");
  });

  it("should fail if placeholders are missing", () => {
    const html = "<p>Hello {{name}}, click {{link}}</p>";
    const recipients = [
      {
        email: "test@example.com",
        placeholders: { name: "Bob" }
      }
    ];
    expect(() => new Newsletter("Failing Subject", "preview text", html, recipients))
      .toThrow('Missing placeholder "link" for recipient "test@example.com".');
  });

  it("should include preview text in email template", () => {
    const html = `
      <div>
        <h1>Hello {{name}}</h1>
      </div>
    `;

    const newsletter = new Newsletter(
      "Test Subject", 
      "This is preview text", 
      html,
      [{
        email: "test@example.com",
        placeholders: { name: "Test" }
      }]
    );

    const template = newsletter.getHtmlTemplate();
    expect(template).toContain("This is preview text");
    expect(template).toContain("display:none");
    expect(template.indexOf("This is preview text")).toBeLessThan(template.indexOf("Hello"));
  });

  it("should preserve original HTML content", () => {
    const html = `
      <div class="content">
        <h1>Content</h1>
      </div>
    `;

    const newsletter = new Newsletter(
      "Test Subject",
      "Preview",
      html,
      [{
        email: "test@example.com",
        placeholders: {}
      }]
    );

    const template = newsletter.getHtmlTemplate();
    expect(template).toContain(html.trim());
    expect(template).toContain("Preview");
  });

  it("should expose preview text through getter", () => {
    const newsletter = new Newsletter(
      "Subject",
      "Preview Text",
      "<body>content</body>",
      []
    );

    expect(newsletter.getPreviewText()).toBe("Preview Text");
  });

  it("should pad preview text to prevent content bleeding", () => {
    const html = `
      <html>
        <body>
          <h1>Main Content</h1>
        </body>
      </html>
    `;

    const newsletter = new Newsletter(
      "Test Subject",
      "Short preview",
      html,
      []
    );

    const template = newsletter.getHtmlTemplate();
    expect(template).toContain("Short preview");
    expect(template).toMatch(/Short preview[\u00A0]{100,}/); // Should contain padding spaces
    expect(template).toContain("\u200C"); // Should contain zero-width non-joiner
  });

  it('should properly isolate preview text from content', () => {
    const newsletter = new Newsletter(
      'Subject',
      'Preview Text',
      '<div>Some content that should not appear in preview</div>',
      []
    );

    const template = newsletter.getHtmlTemplate();
    
    // Check for presence of protection mechanisms
    expect(template).toContain('&zwnj;');
    expect(template).toContain('&#8203;');
    expect(template).toContain('<!---->');
    expect(template).toMatch(/Preview Text[\u00A0\u200C&]/); // Should be followed by padding
    expect(template).toContain('max-height:0');
    expect(template).toContain('overflow:hidden');
  });

  // Enhanced Newsletter with Campaign Tracking Tests
  describe("Campaign Tracking Enhancement", () => {
    it("should create newsletter campaign with title and tracking", () => {
      const newsletter = Newsletter.createCampaign(
        "weekly-update-2024-01",
        "Weekly Update",
        "Preview text",
        "<h1>Hello {{name}}</h1>",
        [{ email: "test@example.com", placeholders: { name: "John" } }]
      );

      expect(newsletter.getTitle()).toBe("weekly-update-2024-01");
      expect(newsletter.getSubject()).toBe("Weekly Update");
      expect(newsletter.getStatus()).toBe("pending");
      expect(newsletter.getTotalRecipients()).toBe(1);
      expect(newsletter.getProgressPercentage()).toBe(0);
    });

    it("should progress through campaign states via single update method", () => {
      const newsletter = Newsletter.createCampaign(
        "progress-test",
        "Progress Test",
        "Preview",
        "<p>Hello {{name}}</p>",
        [
          { email: "user1@example.com", placeholders: { name: "User1" } },
          { email: "user2@example.com", placeholders: { name: "User2" } },
          { email: "user3@example.com", placeholders: { name: "User3" } },
          { email: "user4@example.com", placeholders: { name: "User4" } }
        ]
      );

      expect(newsletter.getStatus()).toBe("pending");
      expect(newsletter.getProgressPercentage()).toBe(0);

      // Start campaign - should automatically transition to in_progress
      newsletter.processBatch([
        { email: "user1@example.com", success: true },
        { email: "user2@example.com", success: true }
      ]);

      expect(newsletter.getStatus()).toBe("in_progress");
      expect(newsletter.getProgressPercentage()).toBe(50); // 2 out of 4 successful
      expect(newsletter.getStartedAt()).toBeInstanceOf(Date);

      // Process remaining batch successfully - should complete
      newsletter.processBatch([
        { email: "user3@example.com", success: true },
        { email: "user4@example.com", success: true }
      ]);

      expect(newsletter.getStatus()).toBe("completed");
      expect(newsletter.getProgressPercentage()).toBe(100); // 4 out of 4 successful
      expect(newsletter.getCompletedAt()).toBeInstanceOf(Date);
    });

    it("should handle batch processing with failures and stop with failed status", () => {
      const newsletter = Newsletter.createCampaign(
        "failure-test",
        "Failure Test",
        "Preview",
        "<p>Content</p>",
        [
          { email: "user1@example.com", placeholders: {} },
          { email: "user2@example.com", placeholders: {} },
          { email: "user3@example.com", placeholders: {} }
        ]
      );

      // Process first batch with one failure
      newsletter.processBatch([
        { email: "user1@example.com", success: true },
        { email: "user2@example.com", success: false, error: "Invalid email" }
      ]);

      expect(newsletter.getStatus()).toBe("failed");
      expect(newsletter.getProgressPercentage()).toBe(33); // Only 1 out of 3 successful (rounded)
      
      const deliveries = newsletter.getEmailDeliveries();
      expect(deliveries.find(d => d.recipientEmail === "user1@example.com")?.status).toBe("sent");
      expect(deliveries.find(d => d.recipientEmail === "user2@example.com")?.status).toBe("failed");
      expect(deliveries.find(d => d.recipientEmail === "user2@example.com")?.errorMessage).toBe("Invalid email");
      expect(deliveries.find(d => d.recipientEmail === "user3@example.com")?.status).toBe("pending");
    });

    it("should allow continuation after failure - retry scenario", () => {
      const newsletter = Newsletter.createCampaign(
        "retry-test",
        "Retry Test",
        "Preview",
        "<p>Hello {{name}}</p>",
        [
          { email: "user1@example.com", placeholders: { name: "User1" } },
          { email: "user2@example.com", placeholders: { name: "User2" } },
          { email: "user3@example.com", placeholders: { name: "User3" } },
          { email: "user4@example.com", placeholders: { name: "User4" } }
        ]
      );

      // First attempt - process first batch with failure
      newsletter.processBatch([
        { email: "user1@example.com", success: true },
        { email: "user2@example.com", success: false, error: "Network timeout" }
      ]);

      expect(newsletter.getStatus()).toBe("failed");
      expect(newsletter.getProgressPercentage()).toBe(25); // 1 out of 4 successful

      // Continue/retry: get remaining pending deliveries
      const remainingBatch = newsletter.getNextBatch(10);
      expect(remainingBatch).toHaveLength(2); // user3 and user4 are still pending
      expect(remainingBatch.map(b => b.email)).toEqual(["user3@example.com", "user4@example.com"]);

      // Continue processing remaining emails
      newsletter.processBatch([
        { email: "user3@example.com", success: true },
        { email: "user4@example.com", success: true }
      ]);

      expect(newsletter.getStatus()).toBe("completed"); // Now completed since all pending succeeded
      expect(newsletter.getProgressPercentage()).toBe(75); // 3 out of 4 successful (user2 still failed)
      
      // Verify final state
      const finalDeliveries = newsletter.getEmailDeliveries();
      expect(finalDeliveries.find(d => d.recipientEmail === "user1@example.com")?.status).toBe("sent");
      expect(finalDeliveries.find(d => d.recipientEmail === "user2@example.com")?.status).toBe("failed");
      expect(finalDeliveries.find(d => d.recipientEmail === "user3@example.com")?.status).toBe("sent");
      expect(finalDeliveries.find(d => d.recipientEmail === "user4@example.com")?.status).toBe("sent");
    });

    it("should allow retry of failed emails specifically", () => {
      const newsletter = Newsletter.createCampaign(
        "retry-failed-test",
        "Retry Failed Test",
        "Preview",
        "<p>Content</p>",
        [
          { email: "user1@example.com", placeholders: {} },
          { email: "user2@example.com", placeholders: {} },
          { email: "user3@example.com", placeholders: {} }
        ]
      );

      // Initial attempt with failures
      newsletter.processBatch([
        { email: "user1@example.com", success: true },
        { email: "user2@example.com", success: false, error: "SMTP error" },
        { email: "user3@example.com", success: false, error: "Network timeout" }
      ]);

      expect(newsletter.getStatus()).toBe("failed");
      expect(newsletter.getProgressPercentage()).toBe(33); // 1 out of 3 successful (rounded)

      // Reset failed emails to pending for retry
      newsletter.resetFailedToPending();

      // Get batch should now include the previously failed emails
      const retryBatch = newsletter.getNextBatch(10);
      expect(retryBatch).toHaveLength(2);
      expect(retryBatch.map(b => b.email).sort()).toEqual(["user2@example.com", "user3@example.com"]);

      // Retry the failed emails - this time successfully
      newsletter.processBatch([
        { email: "user2@example.com", success: true },
        { email: "user3@example.com", success: true }
      ]);

      expect(newsletter.getStatus()).toBe("completed");
      expect(newsletter.getProgressPercentage()).toBe(100); // All 3 now successful
    });

    it("should get next batch for processing", () => {
      const newsletter = Newsletter.createCampaign(
        "batch-test",
        "Batch Test",
        "Preview",
        "<p>Hello {{name}}</p>",
        [
          { email: "user1@example.com", placeholders: { name: "User1" } },
          { email: "user2@example.com", placeholders: { name: "User2" } },
          { email: "user3@example.com", placeholders: { name: "User3" } }
        ]
      );

      // Get first batch of 2
      const firstBatch = newsletter.getNextBatch(2);
      expect(firstBatch).toHaveLength(2);
      expect(firstBatch[0].email).toBe("user1@example.com");
      expect(firstBatch[1].email).toBe("user2@example.com");

      // Process first batch successfully
      newsletter.processBatch([
        { email: "user1@example.com", success: true },
        { email: "user2@example.com", success: true }
      ]);

      // Get remaining batch
      const secondBatch = newsletter.getNextBatch(2);
      expect(secondBatch).toHaveLength(1);
      expect(secondBatch[0].email).toBe("user3@example.com");

      // Process final batch successfully
      newsletter.processBatch([
        { email: "user3@example.com", success: true }
      ]);

      expect(newsletter.getStatus()).toBe("completed");

      // No more batches
      const noBatch = newsletter.getNextBatch(2);
      expect(noBatch).toHaveLength(0);
    });

    it("should not allow creating campaign with empty title", () => {
      expect(() => {
        Newsletter.createCampaign(
          "",
          "Subject",
          "Preview",
          "<p>Content</p>",
          []
        );
      }).toThrow("Campaign title cannot be empty");
    });
  });
});