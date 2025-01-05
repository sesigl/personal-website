import PostgresNewsletterClient from "@/lib/infrastructure/newsletter/PostgresNewsletterClient";
import NewsletterClient from "@/lib/domain/newsletter/NewsletterClient";

export default class NewsletterApplicationService {
  constructor(
    private readonly newsletterClient: NewsletterClient = new PostgresNewsletterClient()
  ) {}

  async addToNewsletter(email: string) {
    await this.newsletterClient.createContact(email);
  }

  async removeFromNewsletter(email: string) {
    await this.newsletterClient.deleteEmailFromNewsletter(email);
  }
}
