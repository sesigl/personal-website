import React from "react";

import { Metadata } from "next/types";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { AnalyticsWrapper } from "@/partials/Analytics";
import "@/css/style.css";
import Script from "next/script";

// @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=PT+Mono&display=fallback');
const inter = Inter({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "fallback",
});

const aspekta = localFont({
  src: [
    {
      path: "../fonts/Aspekta-500.woff2",
      weight: "500",
    },
    {
      path: "../fonts/Aspekta-650.woff2",
      weight: "650",
    },
  ],
  variable: "--font-aspekta",
});

export const metadata: Metadata = {
  title:
    "Sebastian Sigl | Software Engineer who loves frontend, backend, architecture, data and machine-learning.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script id="dark-mode" strategy="afterInteractive">{`
      if (localStorage.getItem('dark-mode') === 'false' || !('dark-mode' in localStorage)) {
        document.querySelector('body').classList.remove('dark');
      } else {
        document.querySelector('body').classList.add('dark');
      }
      `}</Script>
      <body
        className={`${inter.variable} ${aspekta.variable} antialiased bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-200 tracking-tight font-inter`}
      >
        {children}

        <AnalyticsWrapper />
      </body>
    </html>
  );
}
