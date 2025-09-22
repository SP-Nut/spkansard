import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "คำถามที่พบบ่อย - SP Kansard",
  description: "คำถามและคำตอบที่พบบ่อยเกี่ยวกับกันสาด โรงจอดรถ งานฝ้า งานระแนง และงานเหล็ก",
  openGraph: {
    title: "คำถามที่พบบ่อย - SP Kansard",
    description: "คำถามและคำตอบที่พบบ่อยเกี่ยวกับกันสาด โรงจอดรถ งานฝ้า งานระแนง และงานเหล็ก",
    type: "website",
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}