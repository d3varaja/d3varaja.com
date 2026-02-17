import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClickSpark from "@/components/ClickSpark";
import Cursor from "@/components/Cursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tharun Devaraja — Product Designer",
  description: "Product Designer based in Sri Lanka.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Cursor />
        <ClickSpark />
        {children}
      </body>
    </html>
  );
}
