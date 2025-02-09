import AWS from "aws-sdk";

interface AwsNewsletterClientConfig {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  sourceEmail: string;
}

class AwsNewsletterClient {
  private readonly ses: AWS.SES;
  private readonly sourceEmail: string;

  constructor({
    region,
    accessKeyId,
    secretAccessKey,
    sourceEmail,
  }: AwsNewsletterClientConfig) {
    if (!region || !accessKeyId || !secretAccessKey || !sourceEmail) {
      throw new Error(
        "Missing required parameters: region, accessKeyId, secretAccessKey, or sourceEmail."
      );
    }

    AWS.config.update({
      region,
      accessKeyId,
      secretAccessKey,
    });

    this.ses = new AWS.SES();
    this.sourceEmail = sourceEmail;
  }

  /**
   * Sends an HTML email using AWS SES.
   * @param recipientEmail - The recipient's email address.
   * @param subject - The subject of the email.
   * @param htmlContent - The complete HTML as a string (with inlined CSS, etc.).
   * @returns The SES Message ID on success.
   */
  async sendEmail(
    recipientEmail: string,
    senderName: string,
    subject: string,
    htmlContent: string
  ): Promise<string> {
    if (!recipientEmail || !subject || !htmlContent) {
      throw new Error(
        "Missing required parameters: recipientEmail, subject, or htmlContent."
      );
    }

    const fullFromAddress = `${senderName} <${this.sourceEmail}>`;

    const params = {
      Source: fullFromAddress,
      Destination: {
        ToAddresses: [recipientEmail],
      },
      Message: {
        Subject: {
          Data: subject,
        },
        Body: {
          Html: {
            Data: htmlContent,
          },
          // Optional: Provide a simple text fallback
          Text: {
            Data:
              "Hello! Your email client does not support HTML. " +
              "Please view this email in a modern email client to see the full content.",
          },
        },
      },
    };

    try {
      const result = await this.ses.sendEmail(params).promise();
      return result.MessageId;
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send email.");
    }
  }
}

export default AwsNewsletterClient;
