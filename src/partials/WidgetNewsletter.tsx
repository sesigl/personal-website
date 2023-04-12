"use client";

import React, { FormEvent, useState } from "react";
import Image from "next/image";

function WidgetNewsletter() {
  const [email, setEmail] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  async function handleNewsletterSignUp(e: FormEvent) {
    e.preventDefault();

    try {
      const result = await fetch("/api/addUserToNewsletter", {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({
          email: email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

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

  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-800 dark:bg-gradient-to-t dark:from-slate-800 dark:to-slate-800/30 odd:rotate-1 even:-rotate-1 p-5">
      <div className="text-center mb-1">
        <div className="inline-flex -space-x-3 -ml-0.5">
          <Image
            className="rounded-full border-2 border-white dark:border-slate-800 box-content"
            src={"/images/avatar-01.jpg"}
            width="24"
            height="24"
            alt="Avatar 01"
          />
          <Image
            className="rounded-full border-2 border-white dark:border-slate-800 box-content"
            src={"/images/avatar-02.jpg"}
            width="24"
            height="24"
            alt="Avatar 02"
          />
          <Image
            className="rounded-full border-2 border-white dark:border-slate-800 box-content"
            src={"/images/avatar-03.jpg"}
            width="24"
            height="24"
            alt="Avatar 03"
          />
          <Image
            className="rounded-full border-2 border-white dark:border-slate-800 box-content"
            src={"/images/avatar-04.jpg"}
            width="24"
            height="24"
            alt="Avatar 04"
          />
          <Image
            className="rounded-full border-2 border-white dark:border-slate-800 box-content"
            src={"/images/avatar-05.jpg"}
            width="24"
            height="24"
            alt="Avatar 05"
          />
        </div>
      </div>
      <div className="text-center mb-8">
        <div className="font-aspekta font-[650] mb-1">
          Never miss an update!
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Subscribe and join 100K+ developers.
        </p>
      </div>
      <div>
        <form onSubmit={handleNewsletterSignUp} action={"#"}>
          <div className="mb-2">
            <label className="sr-only" htmlFor="newsletter">
              Your email…
            </label>
            <input
              id="newsletter"
              type="email"
              className="form-input py-1 w-full"
              placeholder="Your email…"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <button
            className="btn-sm w-full text-slate-100 bg-sky-500 hover:bg-sky-600"
            type="submit"
          >
            Subscribe
          </button>
        </form>
        {success && (
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 text-sky-600 text-center font-bold">
            Thanks for subscribing!
          </p>
        )}
        {error && (
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 text-red-400 text-center font-bold">
            Something went wrong. Check your mail address or try again later.
          </p>
        )}
      </div>
    </div>
  );
}

export default WidgetNewsletter;
