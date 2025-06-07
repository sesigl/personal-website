import PostgresNewsletterClient from "../infrastructure/newsletter/PostgresNewsletterClient";
import type NewsletterClient from "../domain/newsletter/NewsletterClient";
import Contact from "../domain/newsletter/Contact";
import Newsletter from "../domain/newsletter/Newsletter";
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
    private readonly newsletterClient: NewsletterClient = new PostgresNewsletterClient(),
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
    unsubscribeKeyPlaceholder: string,
    test: boolean
  ): Promise<NewsletterSendResult> {
    console.log(`Starting newsletter campaign: ${campaignTitle}`);

    // Check if campaign already exists (resume logic)
    let newsletter = await this.newsletterRepository.findByTitle(campaignTitle);
    let isNewCampaign = false;

    if (newsletter) {
      console.log(`Resuming existing campaign: ${campaignTitle} (Status: ${newsletter.getStatus()})`);
      
      // If resuming a failed campaign, reset failed emails to pending for retry
      if (newsletter.getStatus() === 'failed') {
        console.log(`Resetting failed emails to pending for retry`);
        newsletter.resetFailedToPending();
        await this.newsletterRepository.update(newsletter);
      }
    } else {
      // Create new campaign
      console.log(`Creating new campaign: ${campaignTitle}`);
      isNewCampaign = true;

      // Get contacts based on test mode
      let contacts: Contact[] = [];
      if (test) {
        contacts = (await this.newsletterClient.findAllContacts()).filter(
          (contact: Contact) => contact.email === "akrillo89@gmail.com"
        );
        console.log(`Test mode: sending to ${contacts.length} test recipients`);
      } else {
        contacts = await this.newsletterClient.findAllContacts();
        console.log(`Production mode: sending to ${contacts.length} recipients`);
      }

      const recipients = contacts.map((contact: Contact) => ({
        email: contact.email,
        placeholders: {
          [unsubscribeKeyPlaceholder]: contact.unsubscribeKey
        }
      }));

      // Create and save new newsletter campaign
      newsletter = Newsletter.createCampaign(
        campaignTitle,
        subject,
        previewText,
        htmlTemplate,
        recipients
      );

      await this.newsletterRepository.save(newsletter);
    }

    // Handle empty campaigns immediately
    if (newsletter.getTotalRecipients() === 0) {
      console.log(`Campaign ${campaignTitle} has no recipients - marking as completed`);
      // No recipients, campaign is complete by definition
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

    // Process batches until completion
    const batchSize = 10; // Conservative batch size for reliability

    while (true) {
      const nextBatch = newsletter.getNextBatch(batchSize);
      
      if (nextBatch.length === 0) {
        console.log(`Campaign ${campaignTitle} - no more pending emails to process`);
        break;
      }

      console.log(`Processing batch of ${nextBatch.length} emails for campaign ${campaignTitle}`);

      try {
        // Send batch using the new batch method
        const batchResults = await this.newsletterSender.sendBatch(
          nextBatch,
          {
            subject: newsletter.getSubject(),
            htmlContent: newsletter.getHtmlTemplate()
          }
        );

        // Update newsletter with batch results
        newsletter.processBatch(batchResults);

        // Persist progress
        await this.newsletterRepository.update(newsletter);

        console.log(`Batch completed. Progress: ${newsletter.getProgressPercentage()}%`);
      } catch (error) {
        console.error(`Batch failed for campaign ${campaignTitle}:`, error);
        // Mark all emails in batch as failed
        const failedResults = nextBatch.map(recipient => ({
          email: recipient.email,
          success: false,
          error: (error as Error).message
        }));
        
        newsletter.processBatch(failedResults);
        await this.newsletterRepository.update(newsletter);
        break;
      }

      // Stop if campaign failed or completed
      if (newsletter.getStatus() === 'failed' || newsletter.getStatus() === 'completed') {
        break;
      }
    }

    // Return detailed result
    const deliveries = newsletter.getEmailDeliveries();
    const hasFailures = deliveries.some(d => d.status === 'failed');
    
    console.log(`Campaign ${campaignTitle} finished with status: ${newsletter.getStatus()}`);

    return {
      isNewCampaign,
      status: newsletter.getStatus(),
      totalRecipients: newsletter.getTotalRecipients(),
      processedCount: deliveries.filter(d => d.status === 'sent').length,
      progressPercentage: newsletter.getProgressPercentage(),
      hasFailures,
      campaignTitle
    };
  }

  async getNewsletterProgress(campaignTitle: string): Promise<NewsletterSendResult | null> {
    const newsletter = await this.newsletterRepository.findByTitle(campaignTitle);
    
    if (!newsletter) {
      return null;
    }

    const deliveries = newsletter.getEmailDeliveries();
    const hasFailures = deliveries.some(d => d.status === 'failed');

    return {
      isNewCampaign: false,
      status: newsletter.getStatus(),
      totalRecipients: newsletter.getTotalRecipients(),
      processedCount: deliveries.filter(d => d.status === 'sent').length,
      progressPercentage: newsletter.getProgressPercentage(),
      hasFailures,
      campaignTitle
    };
  }
}
