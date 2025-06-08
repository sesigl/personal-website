import NewsletterApplicationService from "../../lib/application/NewsletterApplicationService";

const newsletterApplicationService = new NewsletterApplicationService();

export async function sendNewsletter(campaignTitle: string, subject: string, previewHeadline: string, html: string, test: boolean) {
    return await newsletterApplicationService.sendNewsletter(campaignTitle, subject, previewHeadline, html, test);
}