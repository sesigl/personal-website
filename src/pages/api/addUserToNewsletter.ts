import { NextApiRequest, NextApiResponse } from "next/types";
import NewsletterApplicationService from "@/lib/application/NewsletterApplicationService";

export const EMAIL_REQUIRED_CLIENT_ERROR_MESSAGE = "email required";

export const API_ERROR_MESSAGE_CONTACT_EXISTS = "Contact already exist";
export const ERROR_NEWSLETTER_ALREADY_EXISTS = "You are already subscribed.";

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
  } catch (e: any) {
    if (isApiContactAlreadySubscribedError(e)) {
      sendErrorResponse(response, ERROR_NEWSLETTER_ALREADY_EXISTS);
    } else {
      sendErrorResponse(response, "");
      console.error(e);
    }
  }
}

function isApiContactAlreadySubscribedError(e: any) {
  return e?.response?.body?.message === API_ERROR_MESSAGE_CONTACT_EXISTS;
}

function sendErrorResponse(response: NextApiResponse, body: string) {
  response.status(500).send(body);
}
