import NewsletterApplicationService from "../../lib/application/NewsletterApplicationService";

const newsletterApplicationService = new NewsletterApplicationService();

export async function sendNewsletter(html: string, unsubscribeKeyPlaceholder: string) {
    newsletterApplicationService.sendNewsletter(html, unsubscribeKeyPlaceholder);
}