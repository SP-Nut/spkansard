import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";

const prompt = Prompt({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  display: 'swap',
  variable: "--font-prompt",
});

export const metadata: Metadata = {
  title: "SPK Ansard - Fast & SEO Optimized",
  description: "เว็บไซต์ที่เน้นความเร็วและ SEO สำหรับธุรกิจของคุณ",
  keywords: "fast website, SEO, Thai business, ความเร็ว, เว็บไซต์",
  openGraph: {
    title: "SPK Ansard - Fast & SEO Optimized",
    description: "เว็บไซต์ที่เน้นความเร็วและ SEO สำหรับธุรกิจของคุณ",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body
        className={`${prompt.variable} font-sans antialiased flex flex-col min-h-screen`}
      >
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
