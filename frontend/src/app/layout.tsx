import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakarta.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-text-primary font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
