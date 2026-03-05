import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'บทความ | SP Kansard - ความรู้เรื่องกันสาดและโรงจอดรถ',
  description: 'อ่านบทความและเคล็ดลับเกี่ยวกับกันสาด โรงจอดรถ วัสดุก่อสร้าง การดูแลรักษา และเทรนด์การออกแบบบ้าน จาก SP Kansard',
  keywords: 'บทความกันสาด, ความรู้โรงจอดรถ, เคล็ดลับดูแลกันสาด, SP Kansard blog',
  openGraph: {
    title: 'บทความ | SP Kansard',
    description: 'อ่านบทความและเคล็ดลับเกี่ยวกับกันสาด โรงจอดรถ วัสดุก่อสร้าง การดูแลรักษา จาก SP Kansard',
    url: 'https://spkansard.com/blog',
    siteName: 'SP Kansard',
    locale: 'th_TH',
    type: 'website',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'SP Kansard บทความเรื่องกันสาดและโรงจอดรถ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'บทความ | SP Kansard',
    description: 'อ่านบทความและเคล็ดลับเกี่ยวกับกันสาดและโรงจอดรถ จาก SP Kansard',
    images: ['/images/logo.png'],
  },
  alternates: {
    canonical: 'https://spkansard.com/blog',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
