interface RecipientData {
  email: string;
  placeholders: Record<string, string>;
}

export default class Newsletter {
  private readonly subject: string;
  private readonly htmlTemplate: string;
  private readonly recipients: RecipientData[];

  constructor(subject: string, htmlTemplate: string, recipients: RecipientData[]) {
    this.subject = subject;
    this.htmlTemplate = htmlTemplate;
    this.recipients = recipients;
    this.validate();
  }

  private validate() {
    const pattern = /{{\s*([\w\d-]+)\s*}}/g;
    const requiredPlaceholders = new Set<string>();
    let match;
    while ((match = pattern.exec(this.htmlTemplate)) !== null) {
      requiredPlaceholders.add(match[1]);
    }

    for (const r of this.recipients) {
      for (const placeholder of requiredPlaceholders) {
        if (!r.placeholders[placeholder]) {
          throw new Error(`Missing placeholder "${placeholder}" for recipient "${r.email}".`);
        }
      }
    }
  }

  getSubject(): string {
    return this.subject;
  }

  getHtmlTemplate(): string {
    return this.htmlTemplate;
  }

  getRecipients(): { email: string; templateData: Record<string, string> }[] {
    return this.recipients.map(r => ({
      email: r.email,
      templateData: r.placeholders
    }));
  }
}