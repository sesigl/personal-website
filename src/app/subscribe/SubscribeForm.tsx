"use client";
import React from "react";
import { useNewsletter } from "@/partials/hooks/useNewsletter";

function SubscribeForm() {
  const {
    errorMessage,
    okMessage,
    email,
    setEmail,
    success,
    error,
    handleNewsletterSignUp,
  } = useNewsletter();

  return (
    <form onSubmit={handleNewsletterSignUp}>
      <div className="flex flex-col md:flex-row justify-center max-w-xs mx-auto md:max-w-md md:mx-0">
        <input
          type="email"
          className="form-input w-full mb-2 md:mb-0 md:mr-2"
          placeholder="Your email"
          aria-label="Your email\u2026"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          data-testid="subscribe-form-input"
        />
        <button
          className="btn text-white bg-sky-500 hover:bg-sky-600"
          data-testid="subscribe-form-button"
        >
          Subscribe
        </button>
      </div>

      {success && (
        <p className="text-xs text-sky-500 mt-3 italic">{okMessage}</p>
      )}

      {error && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 italic">
          {errorMessage}
        </p>
      )}
    </form>
  );
}

export default SubscribeForm;
