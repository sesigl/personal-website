import NewsletterApplicationService from "../lib/application/NewsletterApplicationService";

const newsletterApplicationService = new NewsletterApplicationService();

export async function subscribeToNewsletter(email: string) {
    return await newsletterApplicationService.addToNewsletter(email);
}