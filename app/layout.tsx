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
  title: "SP Kansard - ผู้เชี่ยวชาญกันสาดและโรงจอดรถ อันดับ 1 ในไทย",
  description: "SP Kansard ผู้นำด้านกันสาดและโรงจอดรถมากกว่า 35 ปี ให้บริการครบวงจร ออกแบบติดตั้งกันสาดคุณภาพ รับประกัน 5 ปี ทีมงานมืออาชีพ",
  keywords: "กันสาด, โรงจอดรถ, SP Kansard, กันสาดบ้าน, โรงจอดรถสำเร็จรูป, กันแดด, กันฝน, ติดตั้งกันสาด",
  openGraph: {
    title: "SP Kansard - ผู้เชี่ยวชาญกันสาดและโรงจอดรถ อันดับ 1 ในไทย",
    description: "ผู้นำด้านกันสาดและโรงจอดรถมากกว่า 35 ปี บริการครบวงจร คุณภาพมาตรฐาน รับประกัน 5 ปี",
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
        <main className="flex-1 pt-16 sm:pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
