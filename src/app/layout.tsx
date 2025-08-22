import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '../sentry.client';
import PlausibleAnalytics from '../components/PlausibleAnalytics';
import LegalFooter from '../components/LegalFooter';
import CookieNotice from '../components/CookieNotice';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KaderUpdate – Fußball Kader, Vereine & Statistiken",
  description: "KaderUpdate liefert dir aktuelle Kader, Vereine und Statistiken der Bundesliga und internationalen Ligen.",
  openGraph: {
    title: "KaderUpdate – Fußball Kader, Vereine & Statistiken",
    description: "KaderUpdate liefert dir aktuelle Kader, Vereine und Statistiken der Bundesliga und internationalen Ligen.",
    url: "https://kaderupdate.de",
    siteName: "KaderUpdate",
    images: [
      {
        url: "/kaderupdate-og.png",
        width: 1200,
        height: 630,
        alt: "KaderUpdate – Fußball Kader, Vereine & Statistiken"
      }
    ],
    locale: "de_DE",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "KaderUpdate – Fußball Kader, Vereine & Statistiken",
    description: "KaderUpdate liefert dir aktuelle Kader, Vereine und Statistiken der Bundesliga und internationalen Ligen.",
    images: ["/kaderupdate-og.png"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 min-h-screen text-white flex flex-col`}
      >
        <PlausibleAnalytics />
        <main className="flex-1 w-full max-w-7xl mx-auto px-2 sm:px-6 py-4">
          {children}
        </main>
        <LegalFooter />
        <CookieNotice />
      </body>
    </html>
  );
}
