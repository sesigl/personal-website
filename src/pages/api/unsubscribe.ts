import NewsletterApplicationService from "@/lib/application/NewsletterApplicationService";
import UserApplicationService from "@/lib/application/UserApplicationService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handleUnsubscribe(
  req: NextApiRequest,
  res: NextApiResponse,
  newsletterApplicationService: NewsletterApplicationService = new NewsletterApplicationService(),
  userApplicationService: UserApplicationService = new UserApplicationService()
) {
  const credentials = parseUnsubscribeCredentials(req);
  if (!credentials.data) {
    return res.status(400).json({ error: credentials.error });
  }

  const { email, token } = credentials.data;
  const authResult = await authenticateUnsubscribeRequest(email, token);
  if (!authResult.success) {
    return res.status(authResult.status!!).json({ error: authResult.error });
  }

  const unsubscribeResult = await performUnsubscribe(email);
  if (!unsubscribeResult.success) {
    return res.status(500).json({ error: unsubscribeResult.error });
  }

  return res
    .status(200)
    .write(
      "I am sorry to see you go! You have been successfully unsubscribed from our mailing list. You're welcome to subscribe again anytime if you change your mind."
    );

  function parseUnsubscribeCredentials(req: NextApiRequest) {
    const { email, token } = req.query;

    if (
      !email ||
      !token ||
      typeof email !== "string" ||
      typeof token !== "string"
    ) {
      return {
        error: "Missing or invalid email or token",
      };
    }

    return {
      data: { email, token },
    };
  }

  async function authenticateUnsubscribeRequest(email: string, token: string) {
    const user = await userApplicationService.getUser(email);

    if (!user) {
      return {
        success: false,
        status: 404,
        error: "User not found",
      };
    }

    if (user.secretToken !== token) {
      return {
        success: false,
        status: 403,
        error: "Invalid token",
      };
    }

    return { success: true };
  }

  async function performUnsubscribe(email: string) {
    try {
      await newsletterApplicationService.removeFromNewsletter(email);
      return { success: true };
    } catch (error) {
      console.error("Error removing user from newsletter:", error);
      return {
        success: false,
        error: "Something went wrong",
      };
    }
  }
}
