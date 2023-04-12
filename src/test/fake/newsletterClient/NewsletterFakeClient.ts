import NewsletterClient from "@/lib/domain/newsletter/NewsletterClient";

export default class NewsletterFakeClient implements NewsletterClient {
  public contacts: string[] = [];
  private readonly alwaysErrors: boolean;

  constructor(alwaysErrors = false) {
    this.alwaysErrors = alwaysErrors;
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
      throw Error("internal error");
    }
  }
}
