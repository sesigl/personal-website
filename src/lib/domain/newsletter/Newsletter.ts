interface RecipientData {
  email: string;
  placeholders: Record<string, string>;
}

export default class Newsletter {
  private readonly subject: string;
  private readonly previewText: string;
  private readonly htmlTemplate: string;
  private readonly recipients: RecipientData[];

  constructor(subject: string, previewText: string, htmlTemplate: string, recipients: RecipientData[]) {
    this.subject = subject;
    this.previewText = previewText;
    this.htmlTemplate = this.injectPreviewText(htmlTemplate);
    this.recipients = recipients;
    this.validate();
  }

  private validate() {
    const pattern = /{{\s*([\w-]+)\s*}}/g;
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

  private injectPreviewText(html: string): string {
    // Add lots of padding with different characters to prevent content bleeding
    const padding = [
      '\u00A0'.repeat(100), // Non-breaking spaces
      '&#8203;'.repeat(50),  // Zero-width space HTML entity
      '\u200C'.repeat(50),   // Zero-width non-joiner
      '&zwnj;'.repeat(50),   // Zero-width non-joiner HTML entity
      '<!---->'.repeat(10)   // Empty HTML comments
    ].join('');

    const previewTextDiv = `
      <!--[if !mso]><!-->
      <div style="display:none;width:0;height:0;max-height:0;max-width:0;overflow:hidden;font-size:1px;line-height:1px;color:#fff;opacity:0;">
        ${this.previewText}${padding}
      </div>
      <!-- <![endif]-->
      <!-- Preheader spacing -->
      <div style="display: none; max-height: 0px; overflow: hidden;">
        &nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌
      </div>`;
    
    return `${previewTextDiv}${html}`;
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

  getPreviewText(): string {
    return this.previewText;
  }
}