import NewsletterApplicationService from "../../lib/application/NewsletterApplicationService";

const newsletterApplicationService = new NewsletterApplicationService();

export async function sendNewsletter(subject: string, previewHeadline: string, html: string, unsubscribeKeyPlaceholder: string, test: boolean): Promise<void> {
    return await newsletterApplicationService.sendNewsletter(subject, previewHeadline, html, unsubscribeKeyPlaceholder, test);
}