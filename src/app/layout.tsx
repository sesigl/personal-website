import React from "react";

import { Metadata } from "next/types";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { AnalyticsWrapper } from "@/partials/Analytics";
import "@/css/style.css";
import Script from "next/script";
import Theme from "@/app/theme-provider";
import SideNavigation from "@/partials/SideNavigation";
import Header from "@/partials/Header";

// @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=PT+Mono&display=fallback');
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
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
  display: "swap",
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
    <html lang="en" suppressHydrationWarning>
      {/* suppressHydrationWarning: https://github.com/vercel/next.js/issues/44343 */}
      <Script id="dark-mode" strategy="afterInteractive">{`
      if (localStorage.getItem('dark-mode') === 'false' || !('dark-mode' in localStorage)) {
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
      }
      `}</Script>
      <body
        className={`${inter.variable} ${aspekta.variable} font-inter antialiased bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-200 tracking-tight`}
      >
        <Theme>
          <div className="max-w-7xl mx-auto">
            <div className="min-h-screen flex">
              <SideNavigation />

              {/* Main content */}
              <main className="grow overflow-hidden px-6">
                <div className="w-full h-full max-w-[1072px] mx-auto flex flex-col">
                  <Header />

                  {children}
                </div>
              </main>
            </div>
          </div>
        </Theme>
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
