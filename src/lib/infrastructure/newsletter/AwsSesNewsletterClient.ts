import {
  CreateTemplateCommand,
  DeleteTemplateCommand,
  SESClient,
  SendBulkTemplatedEmailCommand
} from "@aws-sdk/client-ses";
import type NewsletterSender from "../../domain/newsletter/NewsletterSender";
import Newsletter from "../../domain/newsletter/Newsletter";
import type { BatchResult } from "../../domain/newsletter/Newsletter";
import { AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY } from "astro:env/server";

interface SesConfig {
  sourceEmail: string;
  maxBatchSize: number;
}

interface NewsletterTemplate {
  name: string;
  subject: string;
  htmlContent: string;
  textContent?: string;
}

interface NewsletterRecipient {
  email: string;
  templateData: Record<string, string>;
}

export default class AwsSesNewsletterClient implements NewsletterSender {
  private readonly sesClient: SESClient;
  private readonly config: SesConfig;
  
  constructor(config: SesConfig) {
      this.config = {
          ...config
      };
      this.sesClient = new SESClient({ 
        region: AWS_REGION, 
        credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
      } });
  }

  async sendEmails(newsletter: Newsletter): Promise<void> {
    const templateName = this.generateTemplateName('newsletter');
    let templateCreated = false;
    
    try {
      await this.createNewsletterTemplate(templateName, newsletter);
      templateCreated = true;

      const recipients = newsletter.getRecipients();
      await this.sendBulkEmails(templateName, recipients);
    } finally {
      if (templateCreated) {
        await this.deleteTemplate(templateName);
      }
    }
  }

  async sendBatch(recipients: { email: string; templateData: Record<string, string> }[], template: { subject: string; htmlContent: string }): Promise<BatchResult[]> {
    if (this.isEmptyRecipientList(recipients)) {
      return [];
    }

    // Detect test mode: if all recipients have the same email, add delay for progress visualization
    const isTestMode = recipients.length > 1 && recipients.every(r => r.email === recipients[0].email);
    if (isTestMode) {
      // Use shorter delay during automated tests, longer delay for manual browser testing
      const isRunningTests = process.env.NODE_ENV === 'test' || process.env.VITEST === 'true';
      const delay = isRunningTests ? 100 : 2000; // 100ms for tests, 2s for browser
      
      console.log(`Test mode detected: Adding delay (${delay}ms) for progress visualization...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }

    const templateName = this.generateTemplateName('newsletter-batch');
    let templateCreated = false;
    
    try {
      await this.createBatchTemplate(templateName, template);
      templateCreated = true;
      return await this.processRecipientsInChunks(templateName, recipients);
    } finally {
      if (templateCreated) {
        await this.deleteTemplate(templateName);
      }
    }
  }

  private async createTemplate(template: NewsletterTemplate): Promise<void> {
      const command = new CreateTemplateCommand({
          Template: {
              TemplateName: template.name,
              SubjectPart: template.subject,
              HtmlPart: template.htmlContent,
              TextPart: template.textContent
          }
      });

      try {
          await this.sesClient.send(command);
          console.log(`Created email template: ${template.name}`);
      } catch (error) {
          throw new Error(`Failed to create email template: ${(error as Error).message}`);
      }
  }

  private async deleteTemplate(templateName: string): Promise<void> {
      try {
          await this.sesClient.send(new DeleteTemplateCommand({
              TemplateName: templateName
          }));
          console.log(`Deleted template ${templateName}`);
      } catch (error) {
          console.warn(`Failed to delete template ${templateName}:`, error);
      }
  }

  private async sendBulkEmails(templateName: string, recipients: NewsletterRecipient[]): Promise<void> {
      console.log(`Sending email to ${recipients.length} recipients...`);
      for (let i = 0; i < recipients.length; i += this.config.maxBatchSize) {
          const chunk = recipients.slice(i, i + this.config.maxBatchSize);
          const command = new SendBulkTemplatedEmailCommand({
              Source: this.config.sourceEmail,
              Template: templateName,
              DefaultTemplateData: JSON.stringify({}),
              Destinations: chunk.map(recipient => ({
                  Destination: { ToAddresses: [recipient.email] },
                  ReplacementTemplateData: JSON.stringify(recipient.templateData)
              }))
          });

          try {
              await this.sesClient.send(command);
              console.log(`Sent email batch (${i / this.config.maxBatchSize + 1})`);
          } catch (error) {
            console.error('Failed to send email batch:', error);
              throw new Error(`Failed to send email batch (${i / this.config.maxBatchSize + 1}): ${(error as Error).message}`);
          }
      }
  }

  private async sendBatchChunk(templateName: string, recipients: { email: string; templateData: Record<string, string> }[]): Promise<BatchResult[]> {
    const command = this.createBulkEmailCommand(templateName, recipients);

    try {
      const response = await this.sesClient.send(command);
      console.log(`Sent batch of ${recipients.length} emails`);
      return this.processEmailResponse(response, recipients);
    } catch (error) {
      console.error('Failed to send email batch:', error);
      return this.createFailedResults(recipients, (error as Error).message);
    }
  }

  private generateTemplateName(prefix: string): string {
    return `${prefix}-${Date.now()}`;
  }

  private async createNewsletterTemplate(templateName: string, newsletter: Newsletter): Promise<void> {
    await this.createTemplate({
      name: templateName,
      subject: newsletter.getSubject(),
      htmlContent: newsletter.getHtmlTemplate(),
      textContent: this.stripHtmlTags(newsletter.getHtmlTemplate())
    });
  }

  private async createBatchTemplate(templateName: string, template: { subject: string; htmlContent: string }): Promise<void> {
    await this.createTemplate({
      name: templateName,
      subject: template.subject,
      htmlContent: template.htmlContent,
      textContent: this.stripHtmlTags(template.htmlContent)
    });
  }

  private stripHtmlTags(html: string): string {
    return html.replace(/<[^>]*>/g, "");
  }

  private isEmptyRecipientList(recipients: { email: string; templateData: Record<string, string> }[]): boolean {
    return recipients.length === 0;
  }

  private async processRecipientsInChunks(templateName: string, recipients: { email: string; templateData: Record<string, string> }[]): Promise<BatchResult[]> {
    const results: BatchResult[] = [];
    
    for (let i = 0; i < recipients.length; i += this.config.maxBatchSize) {
      const chunk = recipients.slice(i, i + this.config.maxBatchSize);
      const batchResults = await this.sendBatchChunk(templateName, chunk);
      results.push(...batchResults);
    }

    return results;
  }

  private createBulkEmailCommand(templateName: string, recipients: { email: string; templateData: Record<string, string> }[]) {
    return new SendBulkTemplatedEmailCommand({
      Source: this.config.sourceEmail,
      Template: templateName,
      DefaultTemplateData: JSON.stringify({}),
      Destinations: recipients.map(recipient => ({
        Destination: { ToAddresses: [recipient.email] },
        ReplacementTemplateData: JSON.stringify(recipient.templateData)
      }))
    });
  }

  private processEmailResponse(response: any, recipients: { email: string; templateData: Record<string, string> }[]): BatchResult[] {
    if (response.Status) {
      return recipients.map((recipient, index) => {
        const status = response.Status![index];
        return {
          email: recipient.email,
          success: status.Status === 'Success',
          error: status.Status !== 'Success' ? (status.Error || 'Unknown error') : undefined
        };
      });
    }
    
    return this.createSuccessfulResults(recipients);
  }

  private createSuccessfulResults(recipients: { email: string; templateData: Record<string, string> }[]): BatchResult[] {
    return recipients.map(recipient => ({
      email: recipient.email,
      success: true
    }));
  }

  private createFailedResults(recipients: { email: string; templateData: Record<string, string> }[], errorMessage: string): BatchResult[] {
    return recipients.map(recipient => ({
      email: recipient.email,
      success: false,
      error: errorMessage
    }));
  }
}