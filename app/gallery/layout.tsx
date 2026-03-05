import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'แกลเลอรี่ผลงาน | SP Kansard - ตัวอย่างงานกันสาดและโรงจอดรถ',
  description: 'รวมผลงานติดตั้งกันสาดและโรงจอดรถ จาก SP Kansard ทั้งกันสาดไวนิล เมทัลชีท อลูมิเนียม โพลีคาร์บอเนต พร้อมภาพก่อน-หลัง',
  keywords: 'ผลงานกันสาด, แกลเลอรี่กันสาด, ตัวอย่างโรงจอดรถ, กันสาดไวนิล, กันสาดเมทัลชีท, SP Kansard gallery',
  openGraph: {
    title: 'แกลเลอรี่ผลงาน | SP Kansard',
    description: 'รวมผลงานติดตั้งกันสาดและโรงจอดรถ จาก SP Kansard ทั้งกันสาดไวนิล เมทัลชีท อลูมิเนียม โพลีคาร์บอเนต',
    url: 'https://spkansard.com/gallery',
    siteName: 'SP Kansard',
    locale: 'th_TH',
    type: 'website',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'SP Kansard แกลเลอรี่ผลงานกันสาดและโรงจอดรถ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'แกลเลอรี่ผลงาน | SP Kansard',
    description: 'รวมผลงานติดตั้งกันสาดและโรงจอดรถ จาก SP Kansard',
    images: ['/images/logo.png'],
  },
  alternates: {
    canonical: 'https://spkansard.com/gallery',
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
