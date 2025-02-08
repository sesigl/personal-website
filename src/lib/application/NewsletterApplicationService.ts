import PostgresNewsletterClient from "../infrastructure/newsletter/PostgresNewsletterClient";
import type NewsletterClient from "../domain/newsletter/NewsletterClient";

export default class NewsletterApplicationService {
  constructor(
    private readonly newsletterClient: NewsletterClient = new PostgresNewsletterClient()
  ) {}

  async addToNewsletter(email: string) {
    return await this.newsletterClient.createContact(email);
  }

  async removeFromNewsletter(email: string) {
    await this.newsletterClient.deleteEmailFromNewsletter(email);
  }
}
