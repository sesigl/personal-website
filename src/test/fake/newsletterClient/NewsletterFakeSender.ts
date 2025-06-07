import type NewsletterSender from "../../../lib/domain/newsletter/NewsletterSender";
import Newsletter from "../../../lib/domain/newsletter/Newsletter";
import type { BatchResult } from "../../../lib/domain/newsletter/Newsletter";

export default class NewsletterFakeSender implements NewsletterSender {
  private readonly logs: string[] = [];
  private readonly batchResults: Map<string, BatchResult[]> = new Map();
  private shouldFailEmails: string[] = [];

  async sendEmails(newsletter: Newsletter): Promise<void> {
    const recipients = newsletter.getRecipients();
    this.logs.push(`FAKE: Sending newsletter "${newsletter.getSubject()}" to ${recipients.length} recipients`);
    
    for (const recipient of recipients) {
      this.logs.push(`FAKE: Would send email to ${recipient.email}`);
    }
  }

  async sendBatch(recipients: { email: string; templateData: Record<string, string> }[], template: { subject: string; htmlContent: string }): Promise<BatchResult[]> {
    this.logs.push(`FAKE: Sending batch "${template.subject}" to ${recipients.length} recipients`);
    
    const results: BatchResult[] = recipients.map(recipient => {
      const shouldFail = this.shouldFailEmails.includes(recipient.email);
      this.logs.push(`FAKE: Would send email to ${recipient.email} - ${shouldFail ? 'FAILED' : 'SUCCESS'}`);
      
      return {
        email: recipient.email,
        success: !shouldFail,
        error: shouldFail ? 'Fake email sending failure' : undefined
      };
    });

    // Store results for verification
    const batchKey = `${template.subject}-${Date.now()}`;
    this.batchResults.set(batchKey, results);
    
    return results;
  }

  // Test utilities
  setShouldFailEmails(emails: string[]): void {
    this.shouldFailEmails = emails;
  }

  getLogs(): string[] {
    return [...this.logs];
  }

  clearLogs(): void {
    this.logs.length = 0;
  }

  getBatchResults(): BatchResult[][] {
    return Array.from(this.batchResults.values());
  }

  getLastBatchResults(): BatchResult[] | undefined {
    const results = Array.from(this.batchResults.values());
    return results[results.length - 1];
  }
}