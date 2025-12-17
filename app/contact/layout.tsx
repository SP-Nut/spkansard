import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | SP Kansard - ติดต่อเรา',
  description: 'ติดต่อ SP Kansard บริษัทผู้เชี่ยวชาญด้านงานกันสาด โรงจอดรถ งานฝ้า งานระแนง และงานเหล็กครบวงจร โทร 02-936-8841',
  openGraph: {
    title: 'Contact Us | SP Kansard - ติดต่อเรา',
    description: 'ติดต่อ SP Kansard บริษัทผู้เชี่ยวชาญด้านงานกันสาด โรงจอดรถ งานฝ้า งานระแนง และงานเหล็กครบวงจร',
    type: 'website',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}