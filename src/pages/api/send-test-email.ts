import { NextApiRequest, NextApiResponse } from "next";
import AwsNewsletterClient from "@/lib/infrastructure/newsletter/AwsSesNewsletterClient";
import UserApplicationService from "@/lib/application/UserApplicationService";

/**
 * 1. Initialize our AWS SES Client
 *    Make sure the sender "newsletter@sebastiansigl.com" is verified in SES.
 *    Also set AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
 *    in your .env.local or environment config.
 */
const awsNewsletterClient = new AwsNewsletterClient({
  region: process.env.AWS_REGION ?? "us-east-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
  sourceEmail: "newsletter@sebastiansigl.com", // Must be verified in AWS SES
});

/**
 * 2. Generate our HTML newsletter string.
 *    We merge the previously decoded HTML (with all styling) and your
 *    dynamic article fields. This ensures it looks great in most email clients.
 */
const generateNewsletterContent = (
  previewText: string,
  articleLink: string,
  articleHeadline: string,
  articleSummary: string,
  articleImage: string,
  userEmail: string,
  secretToken: string
) => `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="format-detection" content="telephone=no" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${articleHeadline}</title>

  <!-- Basic email resets and inline styles -->
  <style type="text/css" emogrify="no">
    #outlook a { padding:0; }
    .MailClientOverride { width:100%; }
    .MailClientOverride,
    .MailClientOverride p,
    .MailClientOverride span,
    .MailClientOverride font,
    .MailClientOverride td,
    .MailClientOverride div {
      line-height: 100%;
    }
    table td {
      border-collapse: collapse;
      mso-line-height-rule: exactly;
    }
    body {
      width: 100% !important;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      margin: 0;
      padding: 0;
    }
    img {
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }
    a img { border: none; }
    table {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    th { font-weight: normal; text-align: left; }
    .preheader-block {
      display: none !important;
      visibility: hidden !important;
      line-height: 0 !important;
      font-size: 0 !important;
    }
    /* Responsive override at 600px */
    @media (max-width: 600px) {
      .responsive-block {
        width: 100% !important;
        margin: 0 auto !important;
      }
    }
  </style>

  <!--[if !mso]><!-->
  <!-- Import Google Fonts -->
  <style type="text/css" emogrify="no">
    @import url("https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;700&display=swap&family=Roboto");
  </style>
  <!--<![endif]-->

  <style type="text/css">
    p, h1, h2, h3, h4, ol, ul, li { margin: 0; }
    a, a:link { color: #b91c1c; text-decoration: none; }
    .body-textstyle {
      color: #000000;
      font-family: Roboto, Arial, sans-serif;
      font-size: 20px;
      line-height: 1.2;
      word-break: break-word;
    }
    .default-button {
      color: #ffffff;
      font-family: Roboto, Arial, sans-serif;
      font-size: 18px;
      line-height: 1.15;
      text-decoration: none;
    }
  </style>
</head>

<body bgcolor="#ffffff" text="#000000" style="background-color: #ffffff;">
  <!-- Preheader / preview text -->
  <div
    style="
      display: none;
      font-size: 0;
      line-height: 0;
      color: transparent;
      max-height: 0;
      max-width: 0;
      overflow: hidden;
    "
  >
    ${previewText}
  </div>
  <!-- MAIN BODY START -->
  <table
    cellpadding="0"
    border="0"
    cellspacing="0"
    class="layout-wrapper-table"
    width="100%"
    style="background-color: #ffffff; width: 100%;"
  >
    <tr><td>
      <!-- Hidden "View in browser" line -->
      <div style="display: none; font-size: 0; color: #ccc;">
        If you cannot see this email properly, please click “View in browser.”
      </div>

      <!-- HEADLINE -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="padding: 22px; text-align: center;">
            <h1
              style="
                margin: 0;
                font-family: Inconsolata, Arial, sans-serif;
                font-size: 30px;
              "
            >
              The News
            </h1>
            <hr
              style="
                margin-top: 12px;
                border: none;
                border-top: 1px solid #000;
              "
            />
          </td>
        </tr>
      </table>

      <!-- SUBHEAD -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="padding: 22px; text-align: center;">
            <h2
              style="
                margin: 0;
                font-family: Inconsolata, Arial, sans-serif;
                font-size: 24px;
              "
            >
              Top article of the week
            </h2>
          </td>
        </tr>
      </table>

      <!-- FEATURED ARTICLE -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr><td style="padding: 22px; text-align: center;">
          <img
            src="${articleImage}"
            alt="Featured article image"
            style="
              max-width: 600px;
              width: 100%;
              height: auto;
              display: block;
              margin: 0 auto;
            "
          />
          <h1
            style="
              margin: 20px 0 0;
              font-family: Inconsolata, Arial, sans-serif;
              font-size: 23px;
            "
          >
            <strong>${articleHeadline}</strong>
          </h1>
          <div style="margin-top: 20px;">
            <a
              href="${articleLink}"
              style="
                background-color: #b91c1c;
                color: #fff;
                text-decoration: none;
                padding: 11px 20px;
                border: 2px solid #000;
                font-family: Roboto, Arial, sans-serif;
                font-size: 18px;
              "
            >
              READ ARTICLE
            </a>
          </div>
        </td></tr>
      </table>

      <!-- CONTENT BLOCK -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td
            style="
              padding: 22px;
              font-family: Roboto, Arial, sans-serif;
              font-size: 17px;
              line-height: 1.5;
            "
          >
            <h2
              style="
                font-family: Inconsolata, Arial, sans-serif;
                font-size: 20px;
                margin-bottom: 10px;
              "
            >
              ${articleSummary}
            </h2>
            <p>
              It’s been a while since you’ve heard from me, but I’m still here—alive and kicking, better than ever!
              Life has been full of exciting changes and challenges, both personally and professionally,
              and I thought it was time to share a bit about what’s been going on.
            </p>

            <h3
              style="
                margin-top: 28px;
                margin-bottom: 5px;
                font-family: Inconsolata, Arial, sans-serif;
                font-size: 18px;
              "
            >
              Rediscovering the World Through New Eyes 👀
            </h3>
            <p>
              These days, a lot of my free time is spent with my 2-year-old son.
              Exploring the world through his eyes has been an incredible experience—
              there’s so much to learn from a child's curiosity and sense of wonder.
              It’s been grounding and inspiring in ways I didn’t expect!
            </p>

            <h3
              style="
                margin-top: 28px;
                margin-bottom: 5px;
                font-family: Inconsolata, Arial, sans-serif;
                font-size: 18px;
              "
            >
              Deep Dives at Work: Big Data, Machine Learning, and LLMs 🧠
            </h3>
            <p>
              On the work front, I’ve been diving into large-scale search, big data processing, and machine learning,
              integrating it all with LLMs to push the boundaries of what we can do.
              Tackling the complexity of this space has been both challenging and exciting.
              I’m also exploring asynchronous work strategies to boost my efficiency and support
              my team’s flexibility—especially for remote work.
            </p>

            <h3
              style="
                margin-top: 28px;
                margin-bottom: 5px;
                font-family: Inconsolata, Arial, sans-serif;
                font-size: 18px;
              "
            >
              Running and Nutrition: The Marathon Journey 🏃‍♂️🍲
            </h3>
            <p>
              Outside of work, I’ve set myself a new physical challenge! After completing a half marathon this year,
              I’m now training for a full marathon next April. My journey hit a speed bump with a COVID infection,
              but I’ve used it as an opportunity to switch to a ketosis-based diet to improve my energy levels.
              It’s all about optimizing parameters to achieve peak performance—not so different
              from software engineering, really!
            </p>

            <h3
              style="
                margin-top: 28px;
                margin-bottom: 5px;
                font-family: Inconsolata, Arial, sans-serif;
                font-size: 18px;
              "
            >
              Latest Blog Post: Rethinking Consensus and Agility in Tech Decisions 💡
            </h3>
            <p>
              This brings me to my latest exploration—how the quest for consensus in decision-making
              can sometimes stifle innovation. In my newest blog post, I discuss ways to
              separate decision gathering from decision making to drive agility and keep teams moving forward.
            </p>
            <p style="margin-top: 10px;">
              <a href="${articleLink}" style="color: #b91c1c; text-decoration: none;">
                Check out the full article here.
              </a>
            </p>
            <p style="margin-top: 10px;">Best regards,<br/>Sebastian</p>
          </td>
        </tr>
      </table>

      <!-- FOOTER -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="padding: 22px; text-align: center;">
            <a
              href="https://www.sebastiansigl.com/imprint"
              style="color: #b91c1c;"
            >
              Imprint
            </a>
            &nbsp;|&nbsp;
            <a
              href="https://www.sebastiansigl.com/unsubscribe?email=${userEmail}&token=${secretToken}"
              style="color: #b91c1c;"
            >
              Unsubscribe
            </a>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

const userApplicationService = new UserApplicationService();

/**
 * 3. Next.js API route to handle POST requests and send the newsletter.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // For demonstration, we hardcode the recipient and subject.
    // In your real application, pull data from req.body or your database.
    const recipientEmail = "akrillo89@gmail.com";
    const subject = "TEST - New Insights on Boosting Innovation in Tech Teams";

    const user = await userApplicationService.getUser(recipientEmail);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Fill in your dynamic fields for the snippet
    const newsletterHtml = generateNewsletterContent(
      "This is some preview text", // previewText
      "https://www.sebastiansigl.com", // articleLink
      "New Insights on Boosting Innovation in Tech Teams", // articleHeadline
      "The best ways to drive innovation in your tech team", // articleSummary
      "https://www.sebastiansigl.com/images/posts/empowered-execution-in-large-organizations/empowered-execution-in-large-organizations.webp", // articleImage
      user.email,
      user.secretToken
    );

    const messageId = await awsNewsletterClient.sendEmail(
      user.email,
      "Sebastian Sigl",
      subject,
      newsletterHtml
    );

    return res.status(200).json({
      message: "Newsletter email sent successfully!",
      messageId,
    });
  } catch (error: any) {
    console.error("Error sending newsletter email:", error.message);
    return res.status(500).json({
      message: "Failed to send newsletter email.",
      error: error.message,
    });
  }
}
