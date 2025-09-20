import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import FloatingContactButton from "./components/FloatingContactButton";

const prompt = Prompt({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  display: 'swap',
  variable: "--font-prompt",
});

export const metadata: Metadata = {
  title: "เอสพี กันสาด - รับออกแบบ ผลิต กันสาด และโรงจอดรถ อันดับ 1 ในไทย",
  description: "SP Kansard ผู้นำด้านกันสาดและโรงจอดรถมากกว่า 35 ปี ให้บริการครบวงจร ออกแบบติดตั้งกันสาดคุณภาพ รับประกัน 5 ปี ทีมงานมืออาชีพ",
  keywords: "กันสาด, โรงจอดรถ, SP Kansard, กันสาดบ้าน, โรงจอดรถสำเร็จรูป, กันแดด, กันฝน, ติดตั้งกันสาด",
  icons: {
    icon: [
      { url: '/images/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/logo.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/images/logo.png',
    shortcut: '/images/logo.png',
  },
  openGraph: {
  title: "เอสพี กันสาด - รับออกแบบ ผลิต กันสาด และโรงจอดรถ อันดับ 1 ในไทย",
    description: "ผู้นำด้านกันสาดและโรงจอดรถมากกว่า 35 ปี บริการครบวงจร คุณภาพมาตรฐาน รับประกัน 5 ปี",
    type: "website",
    images: ['/images/logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <head>
        <link rel="icon" href="/images/logo.png" type="image/png" />
        <link rel="shortcut icon" href="/images/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
        {/* Preload critical resources */}
        <link rel="preload" href="/herosection/01.jpg" as="image" />
        <link rel="preload" href="/images/logo.png" as="image" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body
        className={`${prompt.variable} font-sans antialiased flex flex-col min-h-screen`}
      >
        <Header />
        <main className="flex-1 pt-16 sm:pt-20">
          {children}
        </main>
        <Footer />
        <FloatingContactButton />
      </body>
    </html>
  );
}
