import Link from "next/link";
import React from "react";

export default function BackButton() {
  return (
    <div className="mb-3">
      <Link
        className="inline-flex text-sky-500 rounded-full border border-slate-200 dark:border-slate-800 dark:bg-gradient-to-t dark:from-slate-800 dark:to-slate-800/30"
        href="/"
      >
        <span className="sr-only">Back</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34">
          <path
            className="fill-current"
            d="m16.414 17 3.293 3.293-1.414 1.414L13.586 17l4.707-4.707 1.414 1.414z"
          />
        </svg>
      </Link>
    </div>
  );
}
