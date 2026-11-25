import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Tools Hub | دليل أدوات الذكاء الاصطناعي",
  description: "اكتشف أفضل أدوات الذكاء الاصطناعي في مكان واحد. ابحث وتصفح الأدوات حسب الاستخدام.",
  applicationName: "AI Tools Hub",
  keywords: ["AI", "أدوات الذكاء الاصطناعي", "ذكاء اصطناعي", "AI tools"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
