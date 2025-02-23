import PostgresNewsletterClient from "../infrastructure/newsletter/PostgresNewsletterClient";
import type NewsletterClient from "../domain/newsletter/NewsletterClient";

export default class NewsletterApplicationService {
  constructor(
    private readonly newsletterClient: NewsletterClient = new PostgresNewsletterClient()
  ) {}

  async addToNewsletter(email: string) {
    return await this.newsletterClient.createContact(email);
  }

  async removeFromNewsletter(unsubscribeKey: string) {
    await this.newsletterClient.deleteEmailFromNewsletter(unsubscribeKey);
  }

  async sendNewsletter(html: string, unsubscribeKeyPlaceholder: string) {
    throw new Error("Method not implemented.");
  }
}
