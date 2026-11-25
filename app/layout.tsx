import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Tools Hub | Discover the Best AI Tools",
  description: "Discover useful AI tools for research, productivity, writing, and creativity. Search and explore the best AI tools in one place.",
  applicationName: "AI Tools Hub",
  keywords: [
    "AI tools", "artificial intelligence", "AI directory", "free AI tools",
    "أدوات الذكاء الاصطناعي", "دليل أدوات الذكاء الاصطناعي"
  ],
  openGraph: {
    title: "AI Tools Hub | Discover the Best AI Tools",
    description: "Explore useful AI tools for work, learning, and creativity.",
    siteName: "AI Tools Hub",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr">
      <body>{children}</body>
    </html>
  );
}
