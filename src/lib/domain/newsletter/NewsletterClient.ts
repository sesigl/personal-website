export default interface NewsletterClient {
  deleteEmailFromNewsletter(email: string): Promise<void>;
  createContact(email: string): Promise<void>;
}
