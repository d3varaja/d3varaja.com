import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientEffects from "@/components/ClientEffects";
import BackButton from "@/components/BackButton";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Tharun Devaraja — Product Designer",
    template: "%s — Tharun Devaraja",
  },
  description:
    "Product Designer based in Sri Lanka with 2+ years designing thoughtful, scalable products that solve real user problems.",
  openGraph: {
    type: "website",
    url: "https://d3varaja.com",
    siteName: "Tharun Devaraja",
    title: "Tharun Devaraja — Product Designer",
    description:
      "Product Designer based in Sri Lanka with 2+ years designing thoughtful, scalable products that solve real user problems.",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    site: "@d3varaja",
    creator: "@d3varaja",
    title: "Tharun Devaraja — Product Designer",
    description:
      "Product Designer based in Sri Lanka with 2+ years designing thoughtful, scalable products.",
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
      </body>
    </html>
  );
}
