import { afterEach, beforeEach, describe, expect, it, vitest } from "vitest";
import handler, {
  API_ERROR_MESSAGE_CONTACT_EXISTS,
  EMAIL_REQUIRED_CLIENT_ERROR_MESSAGE,
  ERROR_NEWSLETTER_ALREADY_EXISTS,
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

  describe("newsletter client already subscribed", () => {
    let originalConsoleError: (...data: any[]) => void;
    let response: NextApiResponse;

    beforeEach(async () => {
      originalConsoleError = console.error;
      console.error = vitest.fn(() => {});

      const error = {
        response: {
          body: {
            message: API_ERROR_MESSAGE_CONTACT_EXISTS,
          },
        },
      } as any as Error;

      response = await callHandlerWithInternalError(
        requestResponseFakeFactory,
        response,
        error
      );
    });
    afterEach(() => {
      console.error = originalConsoleError;
    });

    it("throws 500 with message if already subscribed", async () => {
      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.send).toHaveBeenCalledWith(
        ERROR_NEWSLETTER_ALREADY_EXISTS
      );
    });

    it("logs no errors", async () => {
      expect(console.error).not.toHaveBeenCalled();
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
    response: NextApiResponse,
    error = new Error("internal error")
  ) {
    const newsletterApplicationService = new NewsletterApplicationService(
      new NewsletterFakeClient(true, error)
    );
    const result = requestResponseFakeFactory.getWithBody({
      email: "valid@email.com",
    });
    response = result.response;
    await handler(result.request, response, newsletterApplicationService);
    return response;
  }
});
