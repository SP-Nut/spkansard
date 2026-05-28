import { Metadata } from "next";

export const metadata: Metadata = {
  title: "คำนวณราคากันสาดเบื้องต้น | SP Kansard",
  description:
    "คำนวณราคากันสาดและโรงจอดรถเบื้องต้น เลือกประเภทงาน วัสดุ ขนาดพื้นที่ และส่งข้อมูลให้ทีม SP Kansard ติดต่อกลับ",
  keywords:
    "คำนวณราคากันสาด, ประเมินราคากันสาด, ราคากันสาด, ราคาโรงจอดรถ, SP Kansard",
  alternates: {
    canonical: "https://spkansard.com/estimate",
  },
  openGraph: {
    title: "คำนวณราคากันสาดเบื้องต้น | SP Kansard",
    description:
      "ประเมินงบประมาณเบื้องต้นสำหรับกันสาด โรงจอดรถ และงานโครงสร้าง พร้อมส่งข้อมูลให้ทีมงานติดต่อกลับ",
    url: "https://spkansard.com/estimate",
    siteName: "SP Kansard",
    locale: "th_TH",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "SP Kansard คำนวณราคากันสาดเบื้องต้น",
      },
    ],
  },
};

export default function EstimateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
