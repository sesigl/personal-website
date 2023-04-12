import SendInBlueNewsletterClient from "@/lib/infrastructure/newsletter/SendInBlueNewsletterClient";
import NewsletterClient from "@/lib/domain/newsletter/NewsletterClient";

export default class NewsletterApplicationService {
  constructor(
    private readonly newsletterClient: NewsletterClient = new SendInBlueNewsletterClient()
  ) {}

  async addToNewsletter(email: string) {
    await this.newsletterClient.createContact(email);
  }
}
