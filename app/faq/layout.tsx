import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "คำถามที่พบบ่อย | SP Kansard - FAQ กันสาดและโรงจอดรถ",
  description: "คำถามและคำตอบที่พบบ่อยเกี่ยวกับกันสาด โรงจอดรถ งานฝ้า งานระแนง และงานเหล็ก จาก SP Kansard ผู้เชี่ยวชาญกว่า 38 ปี",
  keywords: 'คำถามกันสาด, FAQ กันสาด, ราคากันสาด, วิธีเลือกกันสาด, SP Kansard FAQ',
  openGraph: {
    title: "คำถามที่พบบ่อย | SP Kansard",
    description: "คำถามและคำตอบที่พบบ่อยเกี่ยวกับกันสาด โรงจอดรถ งานฝ้า งานระแนง และงานเหล็ก",
    url: 'https://spkansard.com/faq',
    siteName: 'SP Kansard',
    locale: 'th_TH',
    type: "website",
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'SP Kansard - คำถามที่พบบ่อย',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'คำถามที่พบบ่อย | SP Kansard',
    description: 'คำถามและคำตอบที่พบบ่อยเกี่ยวกับกันสาดและโรงจอดรถ',
    images: ['/images/logo.png'],
  },
  alternates: {
    canonical: 'https://spkansard.com/faq',
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}