import type { Metadata, Viewport } from "next";
// Self-hosted fonts (works offline / behind firewalls, no Google Fonts dependency)
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "DHANDHA — Kaam bhi. Khana bhi.",
  description:
    "India's Cooking Services Marketplace. Find trusted cooks, book professional chefs, discover homemade food and connect with cooking opportunities — all in one place.",
  keywords: [
    "cook hiring",
    "chef booking",
    "homemade food",
    "cooking jobs",
    "kitchen jobs",
    "tiffin service",
    "home cook",
    "private chef",
    "India",
    "marketplace",
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#161B33",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-text-primary font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
