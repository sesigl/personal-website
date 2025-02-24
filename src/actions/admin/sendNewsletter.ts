import NewsletterApplicationService from "../../lib/application/NewsletterApplicationService";

const newsletterApplicationService = new NewsletterApplicationService();

export async function sendNewsletter(subject: string, previewHeadline: string, html: string, unsubscribeKeyPlaceholder: string, test: boolean) {
    newsletterApplicationService.sendNewsletter(subject, previewHeadline, html, unsubscribeKeyPlaceholder, test);
}