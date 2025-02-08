import NewsletterClient from "@/lib/domain/newsletter/NewsletterClient";

export default class NewsletterFakeClient implements NewsletterClient {
  public contacts: string[] = [];
  private readonly alwaysErrors: boolean;
  private readonly error: Error;

  constructor(
    alwaysErrors = false,
    error: Error = new Error("internal error")
  ) {
    this.alwaysErrors = alwaysErrors;
    this.error = error;
  }

  createContact(email: string): Promise<void> {
    this.beforeExecute();

    this.contacts.push(email);
    return Promise.resolve(undefined);
  }

  deleteEmailFromNewsletter(email: string): Promise<void> {
    this.beforeExecute();

    this.contacts = this.contacts.filter((contact) => contact !== email);
    return Promise.resolve(undefined);
  }

  private beforeExecute() {
    if (this.alwaysErrors) {
      throw this.error;
    }
  }
}
