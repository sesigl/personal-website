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
  isTest: boolean;
}

export default class NewsletterApplicationService {
  constructor(
    private readonly newsletterClient: NewsletterClient = new PostgresContactsRepository(),
    private readonly newsletterSender: NewsletterSender = new AwsSesNewsletterClient({
      sourceEmail: "Sebastian Sigl <newsletter@sebastiansigl.com>",
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
      return this.createEmptyCampaignResult(isNewCampaign, campaignTitle, test);
    }

    await this.executeCampaign(newsletter, campaignTitle);

    return this.createCampaignResult(newsletter, isNewCampaign, campaignTitle, test);
  }

  async getNewsletterProgress(campaignTitle: string): Promise<NewsletterSendResult | null> {
    const newsletter = await this.newsletterRepository.findByTitle(campaignTitle);
    
    if (!newsletter) {
      return null;
    }

    // Determine if this is a test campaign by checking if it only has 1 recipient with test email
    const deliveries = newsletter.getEmailDeliveries();
    const isTest = deliveries.length === 1;

    return this.createCampaignResult(newsletter, false, campaignTitle, isTest);
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
      "akrillo89@gmail.com"
    );

    await this.newsletterRepository.save(newsletter);
    return newsletter;
  }


  private createEmptyCampaignResult(isNewCampaign: boolean, campaignTitle: string, isTest: boolean): NewsletterSendResult {
    console.log(`Campaign ${campaignTitle} has no recipients - marking as completed`);
    
    return {
      isNewCampaign,
      status: 'completed',
      totalRecipients: 0,
      processedCount: 0,
      progressPercentage: 100,
      hasFailures: false,
      campaignTitle,
      isTest
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
        
        // Log individual email failures
        const failedEmails = batchResults.filter(r => !r.success);
        if (failedEmails.length > 0) {
          console.warn(`Campaign ${campaignTitle} - ${failedEmails.length} emails failed in batch:`);
          failedEmails.forEach(failed => {
            console.warn(`  ❌ ${failed.email}: ${failed.error}`);
          });
        }
        
        const successfulEmails = batchResults.filter(r => r.success);
        if (successfulEmails.length > 0) {
          console.log(`Campaign ${campaignTitle} - ${successfulEmails.length} emails sent successfully in batch`);
        }
        
        newsletter.processBatch(batchResults);
      } catch (error) {
        const failedResults = nextBatch.map(recipient => ({
          email: recipient.email,
          success: false,
          error: (error as Error).message
        }));
        newsletter.processBatch(failedResults);
        console.error(`Campaign ${campaignTitle} - entire batch failed:`, error);
        console.warn(`Campaign ${campaignTitle} - ${nextBatch.length} emails marked as failed due to batch error`);
      }
      
      await this.newsletterRepository.update(newsletter);
      console.log(`Batch completed. Progress: ${newsletter.getProgressPercentage()}%`);
      
      // Rate limiting: ensure we don't exceed 14 emails per second
      // With batch size of 10, wait at least 714ms between batches (10/14 ≈ 0.714 seconds)
      if (newsletter.hasPendingDeliveries()) {
        await new Promise(resolve => setTimeout(resolve, 750));
      }
    }
  }

  private createCampaignResult(newsletter: Newsletter, isNewCampaign: boolean, campaignTitle: string, isTest: boolean): NewsletterSendResult {
    const deliveries = newsletter.getEmailDeliveries();
    const hasFailures = deliveries.some(d => d.status === 'failed');
    const successCount = newsletter.getSuccessfulDeliveryCount();
    const failureCount = deliveries.filter(d => d.status === 'failed').length;
    const totalRecipients = newsletter.getTotalRecipients();
    
    console.log(`Campaign ${campaignTitle} finished with status: ${newsletter.getStatus()}`);
    console.log(`Campaign ${campaignTitle} summary: ${successCount}/${totalRecipients} emails sent successfully`);
    
    if (hasFailures) {
      console.warn(`Campaign ${campaignTitle} - ${failureCount} emails failed:`);
      deliveries
        .filter(d => d.status === 'failed')
        .forEach(failed => {
          console.warn(`  ❌ ${failed.recipientEmail}: ${failed.errorMessage || 'Unknown error'}`);
        });
      console.log(`Campaign ${campaignTitle} - You can retry the campaign to resend failed emails`);
    }

    return {
      isNewCampaign,
      status: newsletter.getStatus(),
      totalRecipients,
      processedCount: successCount,
      progressPercentage: newsletter.getProgressPercentage(),
      hasFailures,
      campaignTitle,
      isTest
    };
  }
}
