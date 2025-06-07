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

    const { newsletter, isNewCampaign } = await this.getOrCreateCampaign(
      campaignTitle,
      subject,
      previewText,
      htmlTemplate,
      unsubscribeKeyPlaceholder,
      test
    );

    if (this.isEmptyCampaign(newsletter)) {
      return this.createEmptyCampaignResult(isNewCampaign, campaignTitle);
    }

    await this.processCampaignBatches(newsletter, campaignTitle);

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
    unsubscribeKeyPlaceholder: string,
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
      unsubscribeKeyPlaceholder,
      test
    );
    
    return { newsletter: newNewsletter, isNewCampaign: true };
  }

  private async resumeExistingCampaign(newsletter: Newsletter, campaignTitle: string): Promise<void> {
    console.log(`Resuming existing campaign: ${campaignTitle} (Status: ${newsletter.getStatus()})`);
    
    if (newsletter.getStatus() === 'failed') {
      console.log(`Resetting failed emails to pending for retry`);
      newsletter.resetFailedToPending();
      await this.newsletterRepository.update(newsletter);
    }
  }

  private async createNewCampaign(
    campaignTitle: string,
    subject: string,
    previewText: string,
    htmlTemplate: string,
    unsubscribeKeyPlaceholder: string,
    test: boolean
  ): Promise<Newsletter> {
    console.log(`Creating new campaign: ${campaignTitle}`);

    const contacts = await this.getContacts(test);
    const recipients = this.buildRecipients(contacts, unsubscribeKeyPlaceholder);

    const newsletter = Newsletter.createCampaign(
      campaignTitle,
      subject,
      previewText,
      htmlTemplate,
      recipients
    );

    await this.newsletterRepository.save(newsletter);
    return newsletter;
  }

  private async getContacts(test: boolean): Promise<Contact[]> {
    const allContacts = await this.newsletterClient.findAllContacts();
    
    if (test) {
      const testContacts = allContacts.filter(contact => contact.email === "akrillo89@gmail.com");
      console.log(`Test mode: sending to ${testContacts.length} test recipients`);
      return testContacts;
    }
    
    console.log(`Production mode: sending to ${allContacts.length} recipients`);
    return allContacts;
  }

  private buildRecipients(contacts: Contact[], unsubscribeKeyPlaceholder: string) {
    return contacts.map((contact: Contact) => ({
      email: contact.email,
      placeholders: {
        [unsubscribeKeyPlaceholder]: contact.unsubscribeKey
      }
    }));
  }

  private isEmptyCampaign(newsletter: Newsletter): boolean {
    return newsletter.getTotalRecipients() === 0;
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

  private async processCampaignBatches(newsletter: Newsletter, campaignTitle: string): Promise<void> {
    const batchSize = 10;

    while (true) {
      const nextBatch = newsletter.getNextBatch(batchSize);
      
      if (nextBatch.length === 0) {
        console.log(`Campaign ${campaignTitle} - no more pending emails to process`);
        break;
      }

      await this.processSingleBatch(newsletter, nextBatch, campaignTitle);

      if (this.shouldStopProcessing(newsletter)) {
        break;
      }
    }
  }

  private async processSingleBatch(
    newsletter: Newsletter,
    batch: { email: string; templateData: Record<string, string> }[],
    campaignTitle: string
  ): Promise<void> {
    console.log(`Processing batch of ${batch.length} emails for campaign ${campaignTitle}`);

    try {
      const batchResults = await this.sendBatchEmails(newsletter, batch);
      await this.updateNewsletterProgress(newsletter, batchResults);
      console.log(`Batch completed. Progress: ${newsletter.getProgressPercentage()}%`);
    } catch (error) {
      await this.handleBatchFailure(newsletter, batch, error as Error, campaignTitle);
    }
  }

  private async sendBatchEmails(
    newsletter: Newsletter,
    batch: { email: string; templateData: Record<string, string> }[]
  ) {
    return await this.newsletterSender.sendBatch(batch, {
      subject: newsletter.getSubject(),
      htmlContent: newsletter.getHtmlTemplate()
    });
  }

  private async updateNewsletterProgress(newsletter: Newsletter, batchResults: any[]): Promise<void> {
    newsletter.processBatch(batchResults);
    await this.newsletterRepository.update(newsletter);
  }

  private async handleBatchFailure(
    newsletter: Newsletter,
    batch: { email: string; templateData: Record<string, string> }[],
    error: Error,
    campaignTitle: string
  ): Promise<void> {
    console.error(`Batch failed for campaign ${campaignTitle}:`, error);
    
    const failedResults = batch.map(recipient => ({
      email: recipient.email,
      success: false,
      error: error.message
    }));
    
    newsletter.processBatch(failedResults);
    await this.newsletterRepository.update(newsletter);
  }

  private shouldStopProcessing(newsletter: Newsletter): boolean {
    return newsletter.getStatus() === 'failed' || newsletter.getStatus() === 'completed';
  }

  private createCampaignResult(newsletter: Newsletter, isNewCampaign: boolean, campaignTitle: string): NewsletterSendResult {
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
}
