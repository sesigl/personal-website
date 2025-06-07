import PostgresContactsRepository from "../infrastructure/newsletter/PostgresContactsRepository";
import type NewsletterClient from "../domain/newsletter/NewsletterClient";
import Newsletter, { UNSUBSCRIBE_KEY_PLACEHOLDER } from "../domain/newsletter/Newsletter";
import type NewsletterSender from "../domain/newsletter/NewsletterSender";
import AwsSesNewsletterClient from "../infrastructure/newsletter/AwsSesNewsletterClient";
import type NewsletterRepository from "../domain/newsletter/NewsletterRepository";
import PostgresNewsletterRepository from "../infrastructure/newsletter/PostgresNewsletterRepository";

export interface NewsletterSendResult {
  isNewCampaign: boolean;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  totalRecipients: number;
  processedCount: number;
  progressPercentage: number;
  hasFailures: boolean;
  campaignTitle: string;
}

export default class NewsletterApplicationService {
  constructor(
    private readonly newsletterClient: NewsletterClient = new PostgresContactsRepository(),
    private readonly newsletterSender: NewsletterSender = new AwsSesNewsletterClient({
      sourceEmail: "newsletter@sebastiansigl.com",
      maxBatchSize: 50
    }),
    private readonly newsletterRepository: NewsletterRepository = new PostgresNewsletterRepository()
  ) {}

  async addToNewsletter(email: string) {
    return await this.newsletterClient.createContact(email);
  }

  async removeFromNewsletter(unsubscribeKey: string) {
    await this.newsletterClient.deleteEmailFromNewsletter(unsubscribeKey);
  }

  async sendNewsletter(
    campaignTitle: string,
    subject: string,
    previewText: string,
    htmlTemplate: string,
    test: boolean
  ): Promise<NewsletterSendResult> {
    console.log(`Starting newsletter campaign: ${campaignTitle}`);

    const { newsletter, isNewCampaign } = await this.getOrCreateCampaign(
      campaignTitle,
      subject,
      previewText,
      htmlTemplate,
      test
    );

    if (newsletter.isEmpty()) {
      return this.createEmptyCampaignResult(isNewCampaign, campaignTitle);
    }

    await this.executeCampaign(newsletter, campaignTitle);

    return this.createCampaignResult(newsletter, isNewCampaign, campaignTitle);
  }

  async getNewsletterProgress(campaignTitle: string): Promise<NewsletterSendResult | null> {
    const newsletter = await this.newsletterRepository.findByTitle(campaignTitle);
    
    if (!newsletter) {
      return null;
    }

    return this.createCampaignResult(newsletter, false, campaignTitle);
  }

  private async getOrCreateCampaign(
    campaignTitle: string,
    subject: string,
    previewText: string,
    htmlTemplate: string,
    test: boolean
  ): Promise<{ newsletter: Newsletter; isNewCampaign: boolean }> {
    const existingNewsletter = await this.newsletterRepository.findByTitle(campaignTitle);
    
    if (existingNewsletter) {
      await this.resumeExistingCampaign(existingNewsletter, campaignTitle);
      return { newsletter: existingNewsletter, isNewCampaign: false };
    }

    const newNewsletter = await this.createNewCampaign(
      campaignTitle,
      subject,
      previewText,
      htmlTemplate,
      test
    );
    
    return { newsletter: newNewsletter, isNewCampaign: true };
  }

  private async resumeExistingCampaign(newsletter: Newsletter, campaignTitle: string): Promise<void> {
    console.log(`Resuming existing campaign: ${campaignTitle} (Status: ${newsletter.getStatus()})`);
    
    const originalStatus = newsletter.getStatus();
    newsletter.prepareForResume();
    
    // Update newsletter if status changed during resume preparation
    if (newsletter.getStatus() !== originalStatus) {
      await this.newsletterRepository.update(newsletter);
    }
  }

  private async createNewCampaign(
    campaignTitle: string,
    subject: string,
    previewText: string,
    htmlTemplate: string,
    test: boolean
  ): Promise<Newsletter> {
    console.log(`Creating new campaign: ${campaignTitle}`);

    const contacts = await this.newsletterClient.findAllContacts();
    const newsletter = Newsletter.create(
      campaignTitle,
      subject,
      previewText,
      htmlTemplate,
      contacts,
      UNSUBSCRIBE_KEY_PLACEHOLDER,
      test,
      "test@example.com"
    );

    await this.newsletterRepository.save(newsletter);
    return newsletter;
  }


  private createEmptyCampaignResult(isNewCampaign: boolean, campaignTitle: string): NewsletterSendResult {
    console.log(`Campaign ${campaignTitle} has no recipients - marking as completed`);
    
    return {
      isNewCampaign,
      status: 'completed',
      totalRecipients: 0,
      processedCount: 0,
      progressPercentage: 100,
      hasFailures: false,
      campaignTitle
    };
  }

  private async executeCampaign(newsletter: Newsletter, campaignTitle: string): Promise<void> {
    console.log(`Executing campaign: ${campaignTitle}`);
    const batchSize = 10;

    while (newsletter.hasPendingDeliveries() && !newsletter.shouldStopProcessing()) {
      const nextBatch = newsletter.getNextBatch(batchSize);
      
      if (nextBatch.length === 0) {
        console.log(`Campaign ${campaignTitle} - no more pending emails to process`);
        break;
      }

      console.log(`Processing batch of ${nextBatch.length} emails for campaign ${campaignTitle}`);
      
      try {
        const batchResults = await this.newsletterSender.sendBatch(nextBatch, {
          subject: newsletter.getSubject(),
          htmlContent: newsletter.getHtmlTemplate()
        });
        newsletter.processBatch(batchResults);
      } catch (error) {
        const failedResults = nextBatch.map(recipient => ({
          email: recipient.email,
          success: false,
          error: (error as Error).message
        }));
        newsletter.processBatch(failedResults);
        console.error(`Batch failed for campaign ${campaignTitle}:`, error);
      }
      
      await this.newsletterRepository.update(newsletter);
      console.log(`Batch completed. Progress: ${newsletter.getProgressPercentage()}%`);
    }
  }

  private createCampaignResult(newsletter: Newsletter, isNewCampaign: boolean, campaignTitle: string): NewsletterSendResult {
    const deliveries = newsletter.getEmailDeliveries();
    const hasFailures = deliveries.some(d => d.status === 'failed');
    
    console.log(`Campaign ${campaignTitle} finished with status: ${newsletter.getStatus()}`);

    return {
      isNewCampaign,
      status: newsletter.getStatus(),
      totalRecipients: newsletter.getTotalRecipients(),
      processedCount: newsletter.getSuccessfulDeliveryCount(),
      progressPercentage: newsletter.getProgressPercentage(),
      hasFailures,
      campaignTitle
    };
  }
}
