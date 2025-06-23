import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ChatWrapper from "@/components/ChatWrapper";
import { I18nProvider } from "@/i18n/provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MatchedCover - Insurance Made Simple",
  description: "Compare and buy insurance policies from top providers with instant quotes and personalized recommendations. Get the best rates on home, auto, life, and business insurance.",
  keywords: "insurance, home insurance, auto insurance, life insurance, business insurance, quotes, compare rates",
  authors: [{ name: "MatchedCover Team" }],
  creator: "MatchedCover",
  publisher: "MatchedCover",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://matchedcover.com",
    title: "MatchedCover - Insurance Made Simple",
    description: "Compare and buy insurance policies from top providers with instant quotes and personalized recommendations.",
    siteName: "MatchedCover",
  },
  twitter: {
    card: "summary_large_image",
    title: "MatchedCover - Insurance Made Simple",
    description: "Compare and buy insurance policies from top providers with instant quotes and personalized recommendations.",
    creator: "@matchedcover",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased font-sans`}
      >
        <I18nProvider>
          {children}
          <ChatWrapper />
        </I18nProvider>
      </body>
    </html>
  );
}
