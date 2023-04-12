import { NextApiRequest, NextApiResponse } from "next/types";
import NewsletterApplicationService from "@/lib/application/NewsletterApplicationService";

export const EMAIL_REQUIRED_CLIENT_ERROR_MESSAGE = "email required";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
  newsletterApplicationService = new NewsletterApplicationService()
) {
  if (!request.body.email) {
    response.status(400).send(EMAIL_REQUIRED_CLIENT_ERROR_MESSAGE);
    return;
  }

  try {
    await newsletterApplicationService.addToNewsletter(request.body.email);
    response.status(201).send("");
  } catch (e) {
    response.status(500).send("");
    console.error(e);
  }
}
