import NewsletterClient from "@/lib/domain/newsletter/NewsletterClient";

const SibApiV3Sdk = require("sib-api-v3-typescript");

const LIST_ID = 2;

export default class SendInBlueNewsletterClient implements NewsletterClient {
  async deleteEmailFromNewsletter(email: string): Promise<void> {
    let apiInstance = new SibApiV3Sdk.ContactsApi();

    apiInstance.authentications["apiKey"].apiKey = process.env
      .SIB_API_KEY as string;
    apiInstance.setDefaultAuthentication(apiInstance.authentications["apiKey"]);

    await apiInstance.deleteContact(email);
  }

  async createContact(email: string): Promise<void> {
    let apiInstance = new SibApiV3Sdk.ContactsApi();

    apiInstance.authentications["apiKey"].apiKey = process.env.SIB_API_KEY;
    apiInstance.setDefaultAuthentication(apiInstance.authentications["apiKey"]);

    let createContact = new SibApiV3Sdk.CreateContact();

    createContact.email = email;
    createContact.listIds = [LIST_ID];

    await apiInstance.createContact(createContact);
  }
}
