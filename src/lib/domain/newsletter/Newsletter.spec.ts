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
});