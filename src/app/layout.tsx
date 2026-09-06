import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import TranslationProvider from "@/context/TranslationProvider";
import { withBasePath } from "@/lib/basePath";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0f172a",
};

export const metadata: Metadata = {
  title: "CES Ltd — Customized Energy Solutions",
  description:
    "Energy intelligence platform for market operators, retailers, and innovators — AI, IoT, and hosted software since 1998.",
  icons: {
    icon: withBasePath('/images/tab-logo.png'),
    apple: withBasePath('/images/tab-logo.png'),
    shortcut: withBasePath('/images/tab-logo.png'),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50`}>
        <TranslationProvider>{children}</TranslationProvider>
        {process.env.GITHUB_PAGES === 'true' ? null : <Analytics />}
      </body>
    </html>
  );
}
