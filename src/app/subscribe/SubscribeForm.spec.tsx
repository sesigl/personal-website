import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  vitest,
} from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";
import SubscribeForm from "@/app/subscribe/SubscribeForm";
import {
  defaultErrorMessage,
  defaultOkMessage,
} from "@/partials/hooks/useNewsletter";

vi.mock("@/partials/clients/NextJsApiClient", () => {
  const NextJsApiClient = vi.fn();
  NextJsApiClient.prototype.subscribeToNewsletter = vi.fn((email: string) => {
    if (email === "valid@gmail.com") {
      return Promise.resolve({ ok: true });
    } else if (email === "invalid@gmail.com") {
      return Promise.resolve({ ok: false });
    } else {
      return Promise.reject("error");
    }
  });

  return { default: NextJsApiClient };
});

describe("SubscribeForm", () => {
  afterEach(cleanup);

  describe("valid", () => {
    it("does show success on submit", async () => {
      const { queryByText, findByText } = await subscribeWithEmail(
        "valid@gmail.com"
      );

      expect(await findByText(defaultOkMessage)).not.toBeNull();
      expect(queryByText(defaultErrorMessage)).toBeNull();
    });
  });

  describe("invalid", () => {
    let originalConsoleError: (...data: any[]) => void;

    beforeEach(async () => {
      originalConsoleError = console.error;
      console.error = vitest.fn(() => {});
    });
    afterEach(() => {
      console.error = originalConsoleError;
    });

    it("does show error on submit", async () => {
      const { queryByText, findByText } = await subscribeWithEmail(
        "invalid@gmail.com"
      );

      expect(await findByText(defaultErrorMessage)).not.toBeNull();
      expect(queryByText(defaultOkMessage)).toBeNull();
    });

    it("does show error on submit", async () => {
      const { queryByText, findByText } = await subscribeWithEmail(
        "error@gmail.com"
      );

      expect(await findByText(defaultErrorMessage)).not.toBeNull();
      expect(queryByText(defaultOkMessage)).toBeNull();
      expect(console.error).toHaveBeenCalled();
    });
  });

  async function subscribeWithEmail(email: string) {
    const { queryByText, findByTestId, findByText } = render(<SubscribeForm />);

    expect(queryByText(defaultErrorMessage)).toBeNull();

    const subscribeFormInput = await findByTestId("subscribe-form-input");
    fireEvent.change(subscribeFormInput, {
      target: { value: email },
    });
    const subscribeFormButton = await findByTestId("subscribe-form-button");

    fireEvent.click(subscribeFormButton);
    return { queryByText, findByText };
  }
});
