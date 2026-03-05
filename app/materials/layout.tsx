import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'วัสดุกันสาด | SP Kansard - เมทัลชีท ไวนิล อลูมิเนียม โพลีคาร์บอเนต',
  description: 'เลือกวัสดุกันสาดที่เหมาะกับบ้านของคุณ เมทัลชีท ไวนิลดรีมรูฟ อลูมิเนียม โพลีคาร์บอเนต ชินโคไลท์ คุณภาพสูง ราคาเป็นกันเอง จาก SP Kansard',
  keywords: 'วัสดุกันสาด, เมทัลชีท, ไวนิล, อลูมิเนียม, โพลีคาร์บอเนต, ชินโคไลท์, ราคากันสาด, SP Kansard materials',
  openGraph: {
    title: 'วัสดุกันสาด | SP Kansard',
    description: 'เลือกวัสดุกันสาดที่เหมาะกับบ้านของคุณ เมทัลชีท ไวนิล อลูมิเนียม โพลีคาร์บอเนต ชินโคไลท์',
    url: 'https://spkansard.com/materials',
    siteName: 'SP Kansard',
    locale: 'th_TH',
    type: 'website',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'SP Kansard วัสดุกันสาดคุณภาพ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'วัสดุกันสาด | SP Kansard',
    description: 'เลือกวัสดุกันสาดที่เหมาะกับบ้านของคุณ จาก SP Kansard',
    images: ['/images/logo.png'],
  },
  alternates: {
    canonical: 'https://spkansard.com/materials',
  },
};

export default function MaterialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
