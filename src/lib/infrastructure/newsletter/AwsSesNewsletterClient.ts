import {
  CreateTemplateCommand,
  DeleteTemplateCommand,
  SESClient,
  SendBulkTemplatedEmailCommand
} from "@aws-sdk/client-ses";
import type NewsletterSender from "../../domain/newsletter/NewsletterSender";
import Newsletter from "../../domain/newsletter/Newsletter";
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
      } catch (error) {
          throw new Error(`Failed to create email template: ${(error as Error).message}`);
      }
  }

  private async deleteTemplate(templateName: string): Promise<void> {
      try {
          await this.sesClient.send(new DeleteTemplateCommand({
              TemplateName: templateName
          }));
      } catch (error) {
          console.warn(`Failed to delete template ${templateName}:`, error);
      }
  }

  private async sendBulkEmails(templateName: string, recipients: NewsletterRecipient[]): Promise<void> {
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
          } catch (error) {
            console.error('Failed to send email batch:', error);
              throw new Error(`Failed to send email batch (${i / this.config.maxBatchSize + 1}): ${(error as Error).message}`);
          }
      }
  }
}