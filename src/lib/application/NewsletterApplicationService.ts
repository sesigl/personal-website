import PostgresNewsletterClient from "../infrastructure/newsletter/PostgresNewsletterClient";
import type NewsletterClient from "../domain/newsletter/NewsletterClient";
import Contact from "../domain/newsletter/Contact";
import Newsletter from "../domain/newsletter/Newsletter";
import type NewsletterSender from "../domain/newsletter/NewsletterSender";
import AwsSesNewsletterClient from "../infrastructure/newsletter/AwsSesNewsletterClient";

export default class NewsletterApplicationService {
  constructor(
    private readonly newsletterClient: NewsletterClient = new PostgresNewsletterClient(),
    private readonly newsletterSender: NewsletterSender = new AwsSesNewsletterClient({
      sourceEmail: "newsletter@sebastiansigl.com",
      maxBatchSize: 50
    })
  ) {}

  async addToNewsletter(email: string) {
    return await this.newsletterClient.createContact(email);
  }

  async removeFromNewsletter(unsubscribeKey: string) {
    await this.newsletterClient.deleteEmailFromNewsletter(unsubscribeKey);
  }

  async sendNewsletter(subject: string, previewHeadline: string, htmlTemplate: string, unsubscribeKeyPlaceholder: string, test: boolean) {
    let contacts = []

    if (test) {
      contacts = (await this.newsletterClient.findAllContacts()).filter((contact: Contact) => contact.email === "akrillo89@gmail.com")
    } else {
      contacts = await this.newsletterClient.findAllContacts() 
    }
    
    const recipients = contacts.map((contact: Contact) => ({
      email: contact.email,
      placeholders: {
        [unsubscribeKeyPlaceholder]: contact.unsubscribeKey
      }
    }));

    console.log("Sending newsletter to", recipients.length, "recipients");

    const newsletter = new Newsletter(subject, previewHeadline, htmlTemplate, recipients);
    await this.newsletterSender.sendEmails(newsletter);
  }
}
