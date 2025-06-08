import NewsletterApplicationService from "../../lib/application/NewsletterApplicationService";

const newsletterApplicationService = new NewsletterApplicationService();

export async function getNewsletterProgress(campaignTitle: string) {
    return await newsletterApplicationService.getNewsletterProgress(campaignTitle);
}