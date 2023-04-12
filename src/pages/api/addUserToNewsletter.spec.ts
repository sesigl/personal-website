import { afterEach, beforeEach, describe, expect, it, vitest } from "vitest";
import handler, {
  EMAIL_REQUIRED_CLIENT_ERROR_MESSAGE,
} from "@/pages/api/addUserToNewsletter";
import NewsletterApplicationService from "@/lib/application/NewsletterApplicationService";
import NewsletterFakeClient from "@/test/fake/newsletterClient/NewsletterFakeClient";
import RequestResponseFakeFactory from "@/test/fake/requestResponse/factory/RequestResponseFakeFactory";
import { NextApiResponse } from "next";

const EMAIL = "test@email.com";

describe("addUserToNewsletter", () => {
  const requestResponseFakeFactory = new RequestResponseFakeFactory();
  let newsletterApplicationService: NewsletterApplicationService;
  let newsletterFakeClient: NewsletterFakeClient;

  beforeEach(() => {
    newsletterFakeClient = new NewsletterFakeClient();
    newsletterApplicationService = new NewsletterApplicationService(
      newsletterFakeClient
    );
  });

  describe("no valid email provided", () => {
    let response: NextApiResponse;

    beforeEach(async () => {
      response = await sendRequestWithBody({});
    });

    it("throws 400 when no email is given", async () => {
      expect(response.status).toHaveBeenCalledWith(400);
      expect(response.send).toHaveBeenCalledWith(
        EMAIL_REQUIRED_CLIENT_ERROR_MESSAGE
      );
    });

    it("does send the email to the client", async () => {
      expect(newsletterFakeClient.contacts).not.contains(EMAIL);
    });
  });

  describe("newsletter client errors", () => {
    let originalConsoleError: (...data: any[]) => void;
    let response: NextApiResponse;

    beforeEach(async () => {
      originalConsoleError = console.error;
      console.error = vitest.fn(() => {});

      response = await callHandlerWithInternalError(
        requestResponseFakeFactory,
        response
      );
    });
    afterEach(() => {
      console.error = originalConsoleError;
    });

    it("throws 500 for internal errors", async () => {
      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.send).toHaveBeenCalledWith("");
    });

    it("log an error for internal errors", async () => {
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe("success", () => {
    let response: NextApiResponse;

    beforeEach(async () => {
      response = await sendRequestWithBody({ email: EMAIL });
    });

    it("returns success when no error", async () => {
      expect(response.status).toHaveBeenCalledWith(201);
    });

    it("sends the email the newsletter provider", async () => {
      expect(newsletterFakeClient.contacts).contains(EMAIL);
    });
  });

  async function sendRequestWithBody(body: {}) {
    const { request, response } = requestResponseFakeFactory.getWithBody(body);
    await handler(request, response, newsletterApplicationService);
    return response;
  }

  async function callHandlerWithInternalError(
    requestResponseFakeFactory: RequestResponseFakeFactory,
    response: NextApiResponse
  ) {
    const newsletterApplicationService = new NewsletterApplicationService(
      new NewsletterFakeClient(true)
    );
    const result = requestResponseFakeFactory.getWithBody({
      email: "valid@email.com",
    });
    response = result.response;
    await handler(result.request, response, newsletterApplicationService);
    return response;
  }
});
