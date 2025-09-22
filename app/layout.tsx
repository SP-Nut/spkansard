import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import FloatingContactButton from "./components/FloatingContactButton";
import StructuredData from "./components/StructuredData";

const prompt = Prompt({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  display: 'swap',
  variable: "--font-prompt",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.spkansard.co'),
  title: "กันสาด โรงจอดรถ SP Kansard | ผู้เชี่ยวชาญด้านกันสาดอันดับ 1 กรุงเทพ",
  description: "🏆 SP Kansard ผู้นำกันสาด โรงจอดรถ 35+ ปี | ✅ ติดตั้งกันสาดเมทัลชีท ไวนิล อลูมิเนียม | ✅ โรงจอดรถสำเร็จรูป | ✅ รับประกัน 5 ปี | ✅ ราคาโรงงาน | ☎️ 02-936-8841",
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
    title: "กันสาด โรงจอดรถ SP Kansard | ผู้เชี่ยวชาญอันดับ 1 กรุงเทพ 35+ ปี",
    description: "🏆 ผู้นำกันสาด โรงจอดรถ 50,000+ ครัวเรือนไว้วางใจ | ✅ ติดตั้งครบวงจร ✅ รับประกัน 5 ปี ✅ ราคาโรงงาน ✅ ทีมมืออาชีพ | สาขา กทม. นนทบุรี ปทุมธานี ภูเก็ต",
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
    title: "กันสาด โรงจอดรถ SP Kansard | ผู้เชี่ยวชาญอันดับ 1 กรุงเทพ",
    description: "🏆 ผู้นำกันสาด โรงจอดรถ 35+ ปี | 50,000+ ครัวเรือนไว้วางใจ | รับประกัน 5 ปี | ☎️ 02-936-8841",
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
        <StructuredData type="organization" />
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
