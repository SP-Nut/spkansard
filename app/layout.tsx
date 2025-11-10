import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import FloatingContactButton from "./components/FloatingContactButton";
import StructuredData from "./components/StructuredData";
import WebsiteSchema from "./components/WebsiteSchema";
import ConditionalPreload from "./components/ConditionalPreload";
import { headers } from 'next/headers';
import { Analytics } from "@vercel/analytics/next";

const prompt = Prompt({
  subsets: ["latin", "thai"],
  weight: ["400", "500", "700"],
  display: 'swap',
  variable: "--font-prompt",
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.spkansard.co'),
  title: "SP Kansard | กันสาดและโรงจอดรถ กรุงเทพ",
  description: "SP Kansard ให้บริการออกแบบและติดตั้งกันสาดและโรงจอดรถ ครอบคลุมวัสดุหลัก เมทัลชีท ไวนิล อลูมิเนียม โพลีคาร์บอเนต พร้อมทีมช่างติดตั้งและรับประกันงานตามเงื่อนไข",
  keywords: [
    // Primary Keywords - High Volume
    "กันสาด",
    "โรงจอดรถ", 
    "กันสาดบ้าน",
    "โรงจอดรถสำเร็จรูป",
    
    // Long-tail Keywords - High Intent
    "ติดตั้งกันสาด กรุงเทพ",
    "โรงจอดรถราคาถูก",
    "กันสาดเมทัลชีท",
    "กันสาดไวนิล",
    "กันสาดอลูมิเนียม",
    "กันสาดโพลีคาร์บอเนต",
    "กันสาดหน้าบ้าน",
    "กันสาดข้างบ้าน",
    "กันสาดหลังบ้าน",
    
    // Local SEO Keywords
    "กันสาด กรุงเทพ",
    "กันสาด รามอินทรา",
    "กันสาด ลาดพร้าว", 
    "โรงจอดรถ กรุงเทพ",
    "โรงจอดรถ นนทบุรี",
    "โรงจอดรถ ปทุมธานี",
    
    // Brand & Company
    "SP Kansard",
    "เอสพี กันสาด",
    "บริษัท เอสพี กันสาด",
    
    // Service-specific
    "ออกแบบกันสาด",
    "ประเมินราคากันสาด",
    "ซ่อมกันสาด",
    "งานเหล็ก",
    "งานฝ้า",
    "งานระแนง",
    "ประตูรั้ว",
    
    // Material-specific
    "ชินโคไลท์",
    "เมทัลชีท",
    "ไวนิลดรีมรูฟ",
    "สแตนเลส",
    "เหล็กกล่อง"
  ].join(", "),
  authors: [{ name: "SP Kansard Expert Team" }],
  creator: "SP Kansard Co., Ltd.",
  publisher: "SP Kansard Co., Ltd.",
  applicationName: "SP Kansard - ผู้เชี่ยวชาญกันสาดและโรงจอดรถ",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'SP-Kansard-Google-Verification', // ต้องใส่ verification code จริง
  },
  icons: {
    icon: [
      { url: '/images/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/logo.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/images/logo.png',
    shortcut: '/images/logo.png',
  },
  openGraph: {
    title: "SP Kansard | บริการกันสาดและโรงจอดรถ",
  description: "บริการออกแบบและติดตั้งกันสาด โรงจอดรถ และงานโครงสร้างที่เกี่ยวข้อง ดูหน้างานและประเมินตามจริง พร้อมทีมติดตั้ง",
    url: "https://www.spkansard.co",
    siteName: "SP Kansard",
    locale: "th_TH",
    type: "website",
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'SP Kansard - ผู้เชี่ยวชาญด้านกันสาดและโรงจอดรถ',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "SP Kansard | กันสาดและโรงจอดรถ",
  description: "ออกแบบและติดตั้งกันสาดและโรงจอดรถ วัสดุหลายประเภท พร้อมให้คำปรึกษา",
    images: ['/images/logo.png'],
    creator: "@spkansard",
    site: "@spkansard",
  },
  alternates: {
    canonical: 'https://www.spkansard.co',
    languages: {
      'th-TH': 'https://www.spkansard.co',
    },
  },
  category: 'Local Business - Construction & Home Improvement',
  classification: 'กันสาด โรงจอดรถ งานเหล็ก งานก่อสร้าง',
  other: {
    'geo.region': 'TH-10',
    'geo.placename': 'Bangkok, Thailand',
    'geo.position': '13.7563;100.5018',
    'ICBM': '13.7563, 100.5018',
    'business:contact_data:locality': 'Bangkok',
    'business:contact_data:region': 'Bangkok',
    'business:contact_data:country_name': 'Thailand',
    'business:contact_data:phone_number': '+66-2-936-8841',
    'business:hours': 'Mo-Fr 08:00-17:00, Sa 08:00-16:00',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ตรวจสอบว่าอยู่ในหน้า admin หรือไม่
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  const isAdminPage = pathname.startsWith('/admin');

  return (
    <html lang="th">
      <head>
        <link rel="icon" href="/images/logo.png" type="image/png" />
        <link rel="shortcut icon" href="/images/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SP Kansard" />
        
        {/* Preconnect to required origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Performance hints */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      </head>
      <body
        className={`${prompt.variable} font-sans antialiased flex flex-col min-h-screen`}
      >
        {!isAdminPage && (
          <>
            <StructuredData type="organization" />
            <WebsiteSchema />
          </>
        )}
        {!isAdminPage && <Header />}
        <main className={isAdminPage ? "flex-1" : "flex-1 pt-16 sm:pt-20"}>
          {children}
        </main>
        {!isAdminPage && <Footer />}
        {!isAdminPage && <FloatingContactButton />}
        <ConditionalPreload />
        <Analytics />
      </body>
    </html>
  );
}
