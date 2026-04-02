import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientEffects from "@/components/ClientEffects";
import BackButton from "@/components/BackButton";
import AiCompanion from "@/components/AiCompanion";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Tharun Devaraja — Design Engineer",
    template: "%s — Tharun Devaraja",
  },
  description:
    "Design Engineer based in Sri Lanka with 3+ years designing thoughtful, scalable products that solve real user problems.",
  openGraph: {
    type: "website",
    url: "https://d3varaja.com",
    siteName: "Tharun Devaraja",
    title: "Tharun Devaraja — Design Engineer",
    description:
      "Design Engineer based in Sri Lanka with 3+ years designing thoughtful, scalable products that solve real user problems.",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    site: "@d3varaja",
    creator: "@d3varaja",
    title: "Tharun Devaraja — Design Engineer",
    description:
      "Design Engineer based in Sri Lanka with 3+ years designing thoughtful, scalable products.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {/* Cursor + ClickSpark deferred — loaded after paint, no SSR output */}
        <ClientEffects />
        <BackButton />
        {children}
        <AiCompanion />
      </body>
    </html>
  );
}
