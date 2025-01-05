import { afterEach, beforeEach, describe, expect, it, vitest } from "vitest";
import handler from "./unsubscribe";
import NewsletterApplicationService from "@/lib/application/NewsletterApplicationService";
import UserApplicationService from "@/lib/application/UserApplicationService";
import RequestResponseFakeFactory from "@/test/fake/requestResponse/factory/RequestResponseFakeFactory";
import { NextApiResponse } from "next";
import NewsletterFakeClient from "@/test/fake/newsletterClient/NewsletterFakeClient";

const EMAIL = "test@email.com";
const TOKEN = "valid-token";

describe("unsubscribe", () => {
  const requestResponseFakeFactory = new RequestResponseFakeFactory();
  let newsletterApplicationService: NewsletterApplicationService;
  let userApplicationService: UserApplicationService;
  let newsletterFakeClient: NewsletterFakeClient;

  beforeEach(() => {
    newsletterFakeClient = new NewsletterFakeClient();
    newsletterApplicationService = new NewsletterApplicationService(
      newsletterFakeClient
    );
    userApplicationService = new UserApplicationService();
  });

  describe("invalid request parameters", () => {
    it("returns 400 when email is missing", async () => {
      const { request, response } = requestResponseFakeFactory.getWithQuery({
        token: TOKEN,
      });
      await handler(request, response);
      expect(response.status).toHaveBeenCalledWith(400);
      expect(response.json).toHaveBeenCalledWith({
        error: "Missing or invalid email or token",
      });
    });

    it("returns 400 when token is missing", async () => {
      const { request, response } = requestResponseFakeFactory.getWithQuery({
        email: EMAIL,
      });
      await handler(request, response);
      expect(response.status).toHaveBeenCalledWith(400);
      expect(response.json).toHaveBeenCalledWith({
        error: "Missing or invalid email or token",
      });
    });
  });

  describe("authentication failures", () => {
    it("returns 404 when user not found", async () => {
      vitest.spyOn(userApplicationService, "getUser").mockResolvedValue(null);
      const { request, response } = requestResponseFakeFactory.getWithQuery({
        email: EMAIL,
        token: TOKEN,
      });

      await handler(request, response);

      expect(response.status).toHaveBeenCalledWith(404);
      expect(response.json).toHaveBeenCalledWith({ error: "User not found" });
    });

    it("returns 403 when token is invalid", async () => {
      vitest.spyOn(userApplicationService, "getUser").mockResolvedValue({
        email: EMAIL,
        secretToken: "different-token",
      });

      const { request, response } = requestResponseFakeFactory.getWithQuery({
        email: EMAIL,
        token: TOKEN,
      });

      await handler(request, response);

      expect(response.status).toHaveBeenCalledWith(403);
      expect(response.json).toHaveBeenCalledWith({ error: "Invalid token" });
    });
  });

  describe("unsubscribe operation", () => {
    it("returns 500 when newsletter unsubscribe fails", async () => {
      vitest.spyOn(userApplicationService, "getUser").mockResolvedValue({
        email: EMAIL,
        secretToken: TOKEN,
      });

      const newsletterError = new Error("Newsletter service error");
      const failingNewsletterClient = new NewsletterFakeClient(
        true,
        newsletterError
      );
      const failingNewsletterService = new NewsletterApplicationService(
        failingNewsletterClient
      );

      const { request, response } = requestResponseFakeFactory.getWithQuery({
        email: EMAIL,
        token: TOKEN,
      });

      await handler(
        request,
        response,
        failingNewsletterService,
        userApplicationService
      );

      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.json).toHaveBeenCalledWith({
        error: "Something went wrong",
      });
    });

    it("returns 200 on successful unsubscribe", async () => {
      vitest.spyOn(userApplicationService, "getUser").mockResolvedValue({
        email: EMAIL,
        secretToken: TOKEN,
      });

      const { request, response } = requestResponseFakeFactory.getWithQuery({
        email: EMAIL,
        token: TOKEN,
      });

      await handler(
        request,
        response,
        newsletterApplicationService,
        userApplicationService
      );

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.write).toHaveBeenCalledWith(
        "I am sorry to see you go! You have been successfully unsubscribed from our mailing list. You're welcome to subscribe again anytime if you change your mind."
      );
    });
  });
});
