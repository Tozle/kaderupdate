import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '../sentry.client';
import PlausibleAnalytics from '../components/PlausibleAnalytics';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KaderUpdate – Fußball News, Gerüchte & Updates | .com & .de",
  description: "KaderUpdate liefert dir aktuelle Fußball-News, Gerüchte, Transfers und Aufstellungen. Schnell, modern, sportlich – für alle Fans der Bundesliga und internationalen Ligen.",
  openGraph: {
    title: "KaderUpdate – Fußball News, Gerüchte & Updates | .com & .de",
    description: "KaderUpdate liefert dir aktuelle Fußball-News, Gerüchte, Transfers und Aufstellungen. Schnell, modern, sportlich – für alle Fans der Bundesliga und internationalen Ligen.",
    url: "https://kaderupdate.com",
    siteName: "KaderUpdate",
    images: [
      {
        url: "/kaderupdate-og.png",
        width: 1200,
        height: 630,
        alt: "KaderUpdate – Fußball News, Gerüchte & Updates"
      }
    ],
    locale: "de_DE",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "KaderUpdate – Fußball News, Gerüchte & Updates | .com & .de",
    description: "KaderUpdate liefert dir aktuelle Fußball-News, Gerüchte, Transfers und Aufstellungen. Schnell, modern, sportlich – für alle Fans der Bundesliga und internationalen Ligen.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PlausibleAnalytics />
        {children}
      </body>
    </html>
  );
}
