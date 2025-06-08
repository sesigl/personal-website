import type NewsletterRepository from "../../domain/newsletter/NewsletterRepository";
import Newsletter, { UNSUBSCRIBE_KEY_PLACEHOLDER } from "../../domain/newsletter/Newsletter";
import Contact from "../../domain/newsletter/Contact";
import { type Database, getDb } from "../db";
import { newsletterCampaignsTable, emailDeliveriesTable, usersTable } from "../db/schema";
import { eq, inArray, and } from "drizzle-orm";

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

    // Get email deliveries for this campaign and join with users to get unsubscribe keys
    const deliveries = await this.db.select({
      recipientEmail: emailDeliveriesTable.recipientEmail,
      status: emailDeliveriesTable.status,
      sentAt: emailDeliveriesTable.sentAt,
      errorMessage: emailDeliveriesTable.errorMessage,
      unsubscribeKey: usersTable.unsubscribeKey
    })
      .from(emailDeliveriesTable)
      .leftJoin(usersTable, eq(emailDeliveriesTable.recipientEmail, usersTable.email))
      .where(eq(emailDeliveriesTable.campaignId, campaign.id));

    // Reconstruct Contact objects from deliveries
    const contacts = deliveries.map(delivery => 
      new Contact(delivery.recipientEmail, delivery.unsubscribeKey || 'missing-key')
    );

    // Create newsletter instance using the Contact-based factory
    const newsletter = Newsletter.create(
      campaign.title,
      campaign.subject,
      campaign.previewText || "",
      campaign.htmlContent,
      contacts,
      UNSUBSCRIBE_KEY_PLACEHOLDER
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

    // Update email deliveries in optimized batches
    const deliveries = newsletter.getEmailDeliveries();
    if (deliveries.length > 0) {
      // Get campaign ID for the WHERE clause
      const campaigns = await this.db.select({ id: newsletterCampaignsTable.id })
        .from(newsletterCampaignsTable)
        .where(eq(newsletterCampaignsTable.title, newsletter.getTitle()!));
      
      if (campaigns.length > 0) {
        const campaignId = campaigns[0].id;
        
        // Group deliveries by status to minimize updates
        const deliveriesByStatus = new Map<string, typeof deliveries>();
        for (const delivery of deliveries) {
          const key = `${delivery.status}-${delivery.sentAt?.toISOString() || 'null'}-${delivery.errorMessage || 'null'}`;
          if (!deliveriesByStatus.has(key)) {
            deliveriesByStatus.set(key, []);
          }
          deliveriesByStatus.get(key)!.push(delivery);
        }
        
        // Update each group in a single query
        for (const [, groupDeliveries] of deliveriesByStatus) {
          const emails = groupDeliveries.map(d => d.recipientEmail);
          const firstDelivery = groupDeliveries[0];
          
          await this.db.update(emailDeliveriesTable)
            .set({
              status: firstDelivery.status,
              sentAt: firstDelivery.sentAt,
              errorMessage: firstDelivery.errorMessage
            })
            .where(
              and(
                eq(emailDeliveriesTable.campaignId, campaignId),
                inArray(emailDeliveriesTable.recipientEmail, emails)
              )
            );
        }
      }
    }
  }

  private getSuccessfulDeliveryCount(newsletter: Newsletter): number {
    return newsletter.getEmailDeliveries().filter(d => d.status === 'sent').length;
  }

}