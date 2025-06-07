import type Newsletter from "./Newsletter";
import type { BatchResult } from "./Newsletter";

export default interface NewsletterSender {
    sendEmails(newsletter: Newsletter): Promise<void>;
    sendBatch(recipients: { email: string; templateData: Record<string, string> }[], template: { subject: string; htmlContent: string }): Promise<BatchResult[]>;
}