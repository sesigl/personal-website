import { NextApiRequest, NextApiResponse } from "next";
import { vitest } from "vitest";

export default class RequestResponseFakeFactory {
  get(): { request: NextApiRequest; response: NextApiResponse } {
    const request = {
      query: {},
      body: {},
    } as NextApiRequest;

    const response = {
      status: vitest.fn().mockImplementation(() => response),
      json: vitest.fn().mockImplementation(() => response),
      send: vitest.fn().mockImplementation(() => response),
    } as unknown as NextApiResponse;

    return { request, response };
  }

  getWithBody(body: Record<string, any>): {
    request: NextApiRequest;
    response: NextApiResponse;
  } {
    const { request, response } = this.get();
    request.body = body;
    return { request, response };
  }

  getWithQuery(query: Record<string, any>): {
    request: NextApiRequest;
    response: NextApiResponse;
  } {
    const { request, response } = this.get();
    request.query = query;
    return { request, response };
  }
}
