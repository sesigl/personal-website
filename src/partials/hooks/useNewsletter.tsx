import { FormEvent, useState } from "react";
import NextJsApiClient from "@/partials/clients/NextJsApiClient";

export const defaultErrorMessage =
  "Something went wrong. Check your mail address or try again later.";
export const defaultOkMessage = "Thanks for subscribing!";

const nextJsApiClient = new NextJsApiClient();

export function useNewsletter() {
  const [email, setEmail] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  async function handleNewsletterSignUp(e: FormEvent) {
    e.preventDefault();

    try {
      const result = await nextJsApiClient.subscribeToNewsletter(email);

      if (!result.ok) {
        setError(true);
        setSuccess(false);
        console.error(result.statusText);
      } else {
        setEmail("");
        setError(false);
        setSuccess(true);
      }
    } catch (e) {
      setError(true);
      setSuccess(false);
      console.error(e);
    }

    return false;
  }

  return {
    email,
    setEmail,
    success,
    error,
    handleNewsletterSignUp,
    errorMessage: defaultErrorMessage,
    okMessage: defaultOkMessage,
  };
}
