import type Contact from "./Contact";

export default interface NewsletterClient {
  findAllContacts(): Promise<Contact[]>;
  deleteEmailFromNewsletter(unsubscribeKey: string): Promise<void>;
  createContact(email: string): Promise<Contact>;
}
