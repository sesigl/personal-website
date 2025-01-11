import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import handler from "./unsubscribe";
import NewsletterApplicationService from "@/lib/application/NewsletterApplicationService";
import UserApplicationService from "@/lib/application/UserApplicationService";
import RequestResponseFakeFactory from "@/test/fake/requestResponse/factory/RequestResponseFakeFactory";
import NewsletterFakeClient from "@/test/fake/newsletterClient/NewsletterFakeClient";
import { setDb } from "@/lib/infrastructure/db";
import TestDatabase from "@/test/database/TestDatabase";

describe("unsubscribe", () => {
  if (process.env.CI) {
    const requestResponseFakeFactory = new RequestResponseFakeFactory();
    let newsletterApplicationService: NewsletterApplicationService;
    let userApplicationService: UserApplicationService;
    let newsletterFakeClient: NewsletterFakeClient;

    beforeAll(async () => {
      const db = await TestDatabase.setup();
      setDb(db);
    });

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
          token: "some-token",
        });
        await handler(request, response);
        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({
          error: "Missing or invalid email or token",
        });
      });

      it("returns 400 when token is missing", async () => {
        const { request, response } = requestResponseFakeFactory.getWithQuery({
          email: generateRandomEmail(),
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
        const { request, response } = requestResponseFakeFactory.getWithQuery({
          email: generateRandomEmail(),
          token: "invalid-token",
        });

        await handler(request, response);

        expect(response.status).toHaveBeenCalledWith(404);
        expect(response.json).toHaveBeenCalledWith({ error: "User not found" });
      });

      it("returns 403 when token is invalid", async () => {
        const email = generateRandomEmail();
        await userApplicationService.createUser(email);

        const { request, response } = requestResponseFakeFactory.getWithQuery({
          email,
          token: "invalid-token",
        });

        await handler(request, response);

        expect(response.status).toHaveBeenCalledWith(403);
        expect(response.json).toHaveBeenCalledWith({ error: "Invalid token" });
      });
    });

    describe("unsubscribe operation", () => {
      it("returns 500 when newsletter unsubscribe fails", async () => {
        const email = generateRandomEmail();
        const user = await userApplicationService.createUser(email);
        const failingNewsletterClient = new NewsletterFakeClient(
          true,
          new Error("Newsletter service error")
        );
        const failingNewsletterService = new NewsletterApplicationService(
          failingNewsletterClient
        );

        const { request, response } = requestResponseFakeFactory.getWithQuery({
          email,
          token: user.secretToken,
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
        const email = generateRandomEmail();
        const user = await userApplicationService.createUser(email);

        const { request, response } = requestResponseFakeFactory.getWithQuery({
          email,
          token: user.secretToken,
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
  } else {
    it("skipped because not in CI", () => {});
  }
});

const generateRandomEmail = () =>
  `test-${Math.random().toString(36).substring(7)}@example.com`;
