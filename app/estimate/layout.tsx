import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ประเมินราคากันสาดออนไลน์ | คำนวณราคากันสาดเบื้องต้น | SP Kansard",
  description:
    "คำนวณราคากันสาดเบื้องต้น เลือกวัสดุ กรอกขนาดพื้นที่ ดูราคาประเมิน และขอใบเสนอราคาจากทีมงาน SP Kansard ได้ทันที",
  keywords:
    "ประเมินราคากันสาด, คำนวณราคากันสาด, ราคาติดตั้งกันสาด, กันสาดเมทัลชีท, กันสาดไวนิล, กันสาดโปร่งแสง, ขอใบเสนอราคากันสาด, SP Kansard",
  alternates: {
    canonical: "https://spkansard.com/estimate",
  },
  openGraph: {
    title: "ประเมินราคากันสาดออนไลน์ | SP Kansard",
    description:
      "คำนวณราคากันสาดเบื้องต้น เลือกวัสดุ กรอกขนาดพื้นที่ ดูราคาประเมิน และขอใบเสนอราคาจากทีมงาน SP Kansard ได้ทันที",
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
