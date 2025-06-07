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
    const templateName = `newsletter-${Date.now()}`;
    let templateCreated = false;
    try {
      await this.createTemplate({
        name: templateName,
        subject: newsletter.getSubject(),
        htmlContent: newsletter.getHtmlTemplate(),
        textContent: newsletter.getHtmlTemplate().replace(/<[^>]*>/g, "")
      });
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
    if (recipients.length === 0) {
      return [];
    }

    const templateName = `newsletter-batch-${Date.now()}`;
    let templateCreated = false;
    
    try {
      // Create template
      await this.createTemplate({
        name: templateName,
        subject: template.subject,
        htmlContent: template.htmlContent,
        textContent: template.htmlContent.replace(/<[^>]*>/g, "")
      });
      templateCreated = true;

      // Process recipients in batches and collect results
      const results: BatchResult[] = [];
      
      for (let i = 0; i < recipients.length; i += this.config.maxBatchSize) {
        const chunk = recipients.slice(i, i + this.config.maxBatchSize);
        const batchResults = await this.sendBatchChunk(templateName, chunk);
        results.push(...batchResults);
      }

      return results;
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
    const command = new SendBulkTemplatedEmailCommand({
      Source: this.config.sourceEmail,
      Template: templateName,
      DefaultTemplateData: JSON.stringify({}),
      Destinations: recipients.map(recipient => ({
        Destination: { ToAddresses: [recipient.email] },
        ReplacementTemplateData: JSON.stringify(recipient.templateData)
      }))
    });

    try {
      const response = await this.sesClient.send(command);
      console.log(`Sent batch of ${recipients.length} emails`);
      
      // Process individual send results
      if (response.Status) {
        return recipients.map((recipient, index) => {
          const status = response.Status![index];
          return {
            email: recipient.email,
            success: status.Status === 'Success',
            error: status.Status !== 'Success' ? (status.Error || 'Unknown error') : undefined
          };
        });
      } else {
        // Fallback if no detailed status - assume all succeeded
        return recipients.map(recipient => ({
          email: recipient.email,
          success: true
        }));
      }
    } catch (error) {
      console.error('Failed to send email batch:', error);
      const errorMessage = (error as Error).message;
      
      // Return all recipients as failed
      return recipients.map(recipient => ({
        email: recipient.email,
        success: false,
        error: errorMessage
      }));
    }
  }
}