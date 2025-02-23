import type Contact from "./Contact";

export default interface NewsletterClient {
  deleteEmailFromNewsletter(unsubscribeKey: string): Promise<void>;
  createContact(email: string): Promise<Contact>;
}
