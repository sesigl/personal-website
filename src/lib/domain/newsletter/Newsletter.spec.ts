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

    const newsletter = new Newsletter("Test Subject", html, recipients);
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
    expect(() => new Newsletter("Failing Subject", html, recipients))
      .toThrow('Missing placeholder "link" for recipient "test@example.com".');
  });
});