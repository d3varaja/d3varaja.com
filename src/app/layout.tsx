import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Coming Soon | d3varaja",
  description: "Something extraordinary is in the works. Stay tuned for an amazing experience.",
  keywords: ["coming soon", "launch", "new website"],
  openGraph: {
    title: "Coming Soon | d3varaja",
    description: "Something extraordinary is in the works. Stay tuned for an amazing experience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
