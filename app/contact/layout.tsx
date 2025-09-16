import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | SPK Ansard - ติดต่อเรา',
  description: 'ติดต่อ SPK Ansard บริษัทผู้เชี่ยวชาญด้านงานกันสาด โรงจอดรถ งานฝ้า งานระแนง และงานเหล็กครบวงจร โทร 02-136-8899',
  keywords: 'ติดต่อ SPK Ansard, contact, กันสาด, โรงจอดรถ, งานฝ้า, งานระแนง, งานเหล็ก, สอบถาม',
  openGraph: {
    title: 'Contact Us | SPK Ansard - ติดต่อเรา',
    description: 'ติดต่อ SPK Ansard บริษัทผู้เชี่ยวชาญด้านงานกันสาด โรงจอดรถ งานฝ้า งานระแนง และงานเหล็กครบวงจร',
    type: 'website',
    locale: 'th_TH',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}