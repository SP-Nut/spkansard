import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ติดต่อเรา | SP Kansard - โทร 02-936-8841',
  description: 'ติดต่อ SP Kansard บริษัทผู้เชี่ยวชาญด้านงานกันสาด โรงจอดรถ งานฝ้า งานระแนง และงานเหล็กครบวงจร โทร 02-936-8841',
  keywords: 'ติดต่อ SP Kansard, โทรกันสาด, สอบถามราคากันสาด, ที่อยู่ SP Kansard',
  openGraph: {
    title: 'ติดต่อเรา | SP Kansard',
    description: 'ติดต่อ SP Kansard บริษัทผู้เชี่ยวชาญด้านงานกันสาด โรงจอดรถ งานฝ้า งานระแนง และงานเหล็กครบวงจร',
    url: 'https://spkansard.com/contact',
    siteName: 'SP Kansard',
    locale: 'th_TH',
    type: 'website',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'SP Kansard - ติดต่อเรา',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ติดต่อเรา | SP Kansard',
    description: 'ติดต่อ SP Kansard โทร 02-936-8841 ผู้เชี่ยวชาญด้านกันสาดและโรงจอดรถ',
    images: ['/images/logo.png'],
  },
  alternates: {
    canonical: 'https://spkansard.com/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}