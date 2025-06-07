import type NewsletterRepository from "../../domain/newsletter/NewsletterRepository";
import Newsletter from "../../domain/newsletter/Newsletter";
import { type Database, getDb } from "../db";
import { newsletterCampaignsTable, emailDeliveriesTable } from "../db/schema";
import { eq } from "drizzle-orm";

export default class PostgresNewsletterRepository implements NewsletterRepository {
  constructor(private readonly db: Database = getDb()) {}

  async findByTitle(title: string): Promise<Newsletter | null> {
    const campaigns = await this.db.select()
      .from(newsletterCampaignsTable)
      .where(eq(newsletterCampaignsTable.title, title));

    if (campaigns.length === 0) {
      return null;
    }

    const campaign = campaigns[0];

    // Get email deliveries for this campaign
    const deliveries = await this.db.select()
      .from(emailDeliveriesTable)
      .where(eq(emailDeliveriesTable.campaignId, campaign.id));

    // Reconstruct recipients data from deliveries
    // Since we don't store placeholder data, we need to extract placeholders from the template
    const recipients = deliveries.map(delivery => ({
      email: delivery.recipientEmail,
      placeholders: this.extractPlaceholdersForEmail(campaign.htmlContent, delivery.recipientEmail)
    }));

    // Create newsletter instance using static constructor (validates title internally)
    const newsletter = Newsletter.createCampaign(
      campaign.title,
      campaign.subject,
      campaign.previewText || "",
      campaign.htmlContent,
      recipients
    );

    // Restore the newsletter state by processing completed deliveries
    const completedResults = deliveries
      .filter(d => d.status !== 'pending')
      .map(delivery => ({
        email: delivery.recipientEmail,
        success: delivery.status === 'sent',
        error: delivery.errorMessage || undefined
      }));

    if (completedResults.length > 0) {
      newsletter.processBatch(completedResults);
    }

    return newsletter;
  }

  async save(newsletter: Newsletter): Promise<void> {
    // Newsletter aggregate validates its own state - no need to check title here
    // If newsletter exists, it's already validated by the domain

    // Insert campaign
    const [campaign] = await this.db.insert(newsletterCampaignsTable)
      .values({
        title: newsletter.getTitle()!, // Safe because Newsletter.createCampaign validates this
        subject: newsletter.getSubject(),
        htmlContent: newsletter.getHtmlTemplate(),
        previewText: newsletter.getPreviewText(),
        status: newsletter.getStatus(),
        totalRecipients: newsletter.getTotalRecipients(),
        processedCount: this.getSuccessfulDeliveryCount(newsletter),
        createdAt: newsletter.getCreatedAt(),
        startedAt: newsletter.getStartedAt(),
        completedAt: newsletter.getCompletedAt()
      })
      .returning();

    // Insert email deliveries
    const deliveries = newsletter.getEmailDeliveries();
    if (deliveries.length > 0) {
      await this.db.insert(emailDeliveriesTable)
        .values(deliveries.map(delivery => ({
          campaignId: campaign.id,
          recipientEmail: delivery.recipientEmail,
          status: delivery.status,
          sentAt: delivery.sentAt,
          errorMessage: delivery.errorMessage
        })));
    }
  }

  async update(newsletter: Newsletter): Promise<void> {
    // Newsletter aggregate validates its own state - trust the domain model
    
    // Update campaign
    await this.db.update(newsletterCampaignsTable)
      .set({
        status: newsletter.getStatus(),
        processedCount: this.getSuccessfulDeliveryCount(newsletter),
        startedAt: newsletter.getStartedAt(),
        completedAt: newsletter.getCompletedAt()
      })
      .where(eq(newsletterCampaignsTable.title, newsletter.getTitle()!));

    // Update email deliveries
    const deliveries = newsletter.getEmailDeliveries();
    for (const delivery of deliveries) {
      await this.db.update(emailDeliveriesTable)
        .set({
          status: delivery.status,
          sentAt: delivery.sentAt,
          errorMessage: delivery.errorMessage
        })
        .where(eq(emailDeliveriesTable.recipientEmail, delivery.recipientEmail));
    }
  }

  private getSuccessfulDeliveryCount(newsletter: Newsletter): number {
    return newsletter.getEmailDeliveries().filter(d => d.status === 'sent').length;
  }

  private extractPlaceholdersForEmail(htmlTemplate: string, email: string): Record<string, string> {
    // Extract all placeholders from the template
    const pattern = /{{\s*([\w-]+)\s*}}/g;
    const placeholders: Record<string, string> = {};
    let match;
    
    while ((match = pattern.exec(htmlTemplate)) !== null) {
      const placeholderName = match[1];
      // For reconstruction, we provide default values based on email or generic defaults
      if (placeholderName === 'name') {
        placeholders[placeholderName] = email.split('@')[0]; // Use email prefix as name
      } else {
        placeholders[placeholderName] = `default-${placeholderName}`; // Generic default
      }
    }
    
    return placeholders;
  }
}