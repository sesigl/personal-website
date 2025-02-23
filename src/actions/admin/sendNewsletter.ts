import NewsletterApplicationService from "../../lib/application/NewsletterApplicationService";

const newsletterApplicationService = new NewsletterApplicationService();

export async function sendNewsletter(subject: string, html: string, unsubscribeKeyPlaceholder: string) {
    newsletterApplicationService.sendNewsletter(subject, html, unsubscribeKeyPlaceholder);
}