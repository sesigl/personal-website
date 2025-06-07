interface RecipientData {
  email: string;
  placeholders: Record<string, string>;
}

export type NewsletterStatus = 'pending' | 'in_progress' | 'completed' | 'failed';

export interface EmailDeliveryStatus {
  recipientEmail: string;
  status: 'pending' | 'sent' | 'failed';
  sentAt?: Date;
  errorMessage?: string;
}

export interface BatchResult {
  email: string;
  success: boolean;
  error?: string;
}

export default class Newsletter {
  private readonly subject: string;
  private readonly previewText: string;
  private readonly htmlTemplate: string;
  private readonly recipients: RecipientData[];
  
  // Campaign tracking properties
  private readonly title?: string;
  private status: NewsletterStatus = 'pending';
  private readonly createdAt: Date;
  private startedAt?: Date;
  private completedAt?: Date;
  private emailDeliveries: EmailDeliveryStatus[] = [];

  constructor(subject: string, previewText: string, htmlTemplate: string, recipients: RecipientData[], title?: string) {
    this.subject = subject;
    this.previewText = previewText;
    this.htmlTemplate = this.injectPreviewText(htmlTemplate);
    this.recipients = recipients;
    this.title = title;
    this.createdAt = new Date();
    this.validate();
    this.initializeEmailDeliveries();
  }

  static createCampaign(title: string, subject: string, previewText: string, htmlTemplate: string, recipients: RecipientData[]): Newsletter {
    // Domain validation - Newsletter aggregate enforces its own business rules
    if (!title || title.trim() === '') {
      throw new Error('Campaign title cannot be empty');
    }
    if (!subject || subject.trim() === '') {
      throw new Error('Campaign subject cannot be empty');
    }
    if (!htmlTemplate || htmlTemplate.trim() === '') {
      throw new Error('Campaign HTML template cannot be empty');
    }
    return new Newsletter(subject, previewText, htmlTemplate, recipients, title);
  }

  private initializeEmailDeliveries() {
    if (this.title) {
      this.emailDeliveries = this.recipients.map(recipient => ({
        recipientEmail: recipient.email,
        status: 'pending' as const
      }));
    }
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

  // Campaign tracking methods
  getTitle(): string | undefined {
    return this.title;
  }

  getStatus(): NewsletterStatus {
    return this.status;
  }

  getTotalRecipients(): number {
    return this.recipients.length;
  }

  getProgressPercentage(): number {
    if (this.recipients.length === 0) return 100;
    const successfulDeliveries = this.emailDeliveries.filter(d => d.status === 'sent').length;
    return Math.round((successfulDeliveries / this.recipients.length) * 100);
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getStartedAt(): Date | undefined {
    return this.startedAt;
  }

  getCompletedAt(): Date | undefined {
    return this.completedAt;
  }

  getEmailDeliveries(): EmailDeliveryStatus[] {
    return [...this.emailDeliveries];
  }

  getNextBatch(batchSize: number): { email: string; templateData: Record<string, string> }[] {
    const pendingDeliveries = this.emailDeliveries.filter(d => d.status === 'pending');
    return pendingDeliveries
      .slice(0, batchSize)
      .map(delivery => {
        const recipient = this.recipients.find(r => r.email === delivery.recipientEmail);
        return {
          email: delivery.recipientEmail,
          templateData: recipient?.placeholders || {}
        };
      });
  }

  processBatch(results: BatchResult[]): void {
    // Set startedAt on first batch processing
    if (!this.startedAt) {
      this.startedAt = new Date();
      this.status = 'in_progress';
    }

    // Update delivery statuses
    for (const result of results) {
      const delivery = this.emailDeliveries.find(d => d.recipientEmail === result.email);
      if (delivery) {
        if (result.success) {
          delivery.status = 'sent';
          delivery.sentAt = new Date();
          delivery.errorMessage = undefined;
        } else {
          delivery.status = 'failed';
          delivery.errorMessage = result.error;
          delivery.sentAt = undefined;
        }
      }
    }

    // Update campaign status
    const hasFailures = results.some(r => !r.success);
    const hasPendingDeliveries = this.emailDeliveries.some(d => d.status === 'pending');

    if (hasFailures) {
      this.status = 'failed';
    } else if (!hasPendingDeliveries) {
      this.status = 'completed';
      this.completedAt = new Date();
    }
  }

  resetFailedToPending(): void {
    this.emailDeliveries.forEach(delivery => {
      if (delivery.status === 'failed') {
        delivery.status = 'pending';
        delivery.errorMessage = undefined;
        delivery.sentAt = undefined;
      }
    });
  }
}