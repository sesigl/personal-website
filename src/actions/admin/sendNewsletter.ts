import NewsletterApplicationService from "../../lib/application/NewsletterApplicationService";
import UserApplicationService from "../../lib/application/UserApplicationService";

const newsletterApplicationService = new NewsletterApplicationService();

export async function sendNewsletter(subject: string, html: string, unsubscribeKeyPlaceholder: string) {
    newsletterApplicationService.sendNewsletter(subject, html, unsubscribeKeyPlaceholder);
}