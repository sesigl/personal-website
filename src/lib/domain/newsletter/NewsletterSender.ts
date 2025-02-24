import type Newsletter from "./Newsletter";

export default interface NewsletterSender {
    sendEmails(newsletter: Newsletter): Promise<void>;
}