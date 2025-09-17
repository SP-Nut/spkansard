// components/PortfolioSection.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

export default function PortfolioSection() {
  // โทนสีจากรูป (เข้ม/กลาง)
  const BRAND_DARK = "#1E2E4F";
  const BRAND_MID = "#31487A";

  const portfolioItems = [
    {
      id: "alnex-aluminum",
      title: "กันสาดอลูมิเนียม ALNEX",
      subtitle: "บ้านเดี่ยวสไตล์ ALNEX",
      description: "กันสาดอลูมิเนียมทันสมัย ดีไซน์สวยงาม ทนทานต่อสภาพอากาศ",
      category: "อลูมิเนียม",
      tags: ["ทันสมัย", "ทนทาน"],
      image: "/herosection/01.jpg",
    },
    {
      id: "alnex-glass",
      title: "กันสาดกระจกโค้ง ALNEX",
      subtitle: "กันสาดกระจก ALNEX",
      description: "กระจกโค้งโปร่งแสง ดีไซน์ทันสมัย เข้ากับสถาปัตยกรรม",
      category: "กระจกใส",
      tags: ["โปร่งแสง", "สวยงาม"],
      image: "/herosection/02.jpg",
    },
    {
      id: "modern-garage",
      title: "โรงจอดรถสไตล์โมเดิร์น",
      subtitle: "โรงจอดรถโมเดิร์น",
      description: "โครงสร้างเหล็กแข็งแรง ดีไซน์ทันสมัย เข้ากับบ้านสมัยใหม่",
      category: "โรงจอดรถ",
      tags: ["แข็งแรง", "ทันสมัย"],
      image: "/herosection/03.jpg",
    },
    {
      id: "low-rise",
      title: "โครงการ Low Rise",
      subtitle: "โครงการ Low Rise",
      description: "กันสาดสำหรับคอนโดมิเนียม ดีไซน์โมเดิร์น โครงการขนาดใหญ่",
      category: "คอนโด",
      tags: ["โครงการใหญ่", "คุณภาพสูง"],
      image: "/herosection/04.jpg",
    },
    {
      id: "large-garage",
      title: "โรงจอดรถ 4+ คัน",
      subtitle: "โรงจอดรถขนาดใหญ่",
      description: "โครงสร้างเหล็กแกล็วไวซ์ ขนาดใหญ่ รองรับรถได้หลายคัน",
      category: "ขนาดใหญ่",
      tags: ["ขนาดใหญ่", "ทนทาน"],
      image: "/herosection/05.jpg",
    },
    {
      id: "mixed-material",
      title: "กันสาดวัสดุผสม",
      subtitle: "ดีไซน์วัสดุผสม",
      description: "ผสมผสานวัสดุหลากหลาย สร้างสรรค์ดีไซน์ที่เป็นเอกลักษณ์",
      category: "พิเศษ",
      tags: ["สร้างสรรค์", "เอกลักษณ์"],
      image: "/herosection/01.jpg",
    },
    {
      id: "commercial-project",
      title: "โครงการพาณิชย์",
      subtitle: "อาคารพาณิชย์สมัยใหม่",
      description: "กันสาดสำหรับอาคารพาณิชย์ ดีไซน์ทันสมัย รองรับการใช้งานหนัก",
      category: "พาณิชย์",
      tags: ["ทนทาน", "สวยงาม"],
      image: "/herosection/02.jpg",
    },
    {
      id: "luxury-villa",
      title: "วิลล่าหรู",
      subtitle: "บ้านหรูสไตล์โมเดิร์น",
      description: "กันสาดพรีเมียม สำหรับบ้านหรู ดีไซน์เฉพาะตัว คุณภาพสูงสุด",
      category: "หรูหรา",
      tags: ["พรีเมียม", "เฉพาะตัว"],
      image: "/herosection/03.jpg",
    },
  ];

  // State สำหรับการเลื่อนทีละรูป
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = portfolioItems.length;
  const visibleItems = 4; // แสดง 4 รูปพร้อมกัน

  // ฟังก์ชันเลื่อนทีละรูปแบบลูป
  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  return (
    <section className="relative py-12">
      {/* BG จุดเล็ก ๆ โทนแบรนด์ (จางลงเพื่อสมดุล) */}
      <div className="pointer-events-none absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='${encodeURIComponent(
              BRAND_MID
            )}' fill-opacity='0.5'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3"
            style={{
              backgroundImage: `linear-gradient(90deg, ${BRAND_DARK}, ${BRAND_MID})`,
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            ผลงานของเรา
          </h2>
        </div>

        {/* Desktop: แสดง 4 รูปพร้อมปุ่มเลื่อน */}
        <div className="hidden lg:block relative">
          {/* ปุ่มเลื่อนซ้าย */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-white hover:scale-105 hover:shadow-xl"
            style={{ color: BRAND_MID }}
          >
            <svg className="w-6 h-6 transition-transform duration-200 ease-in-out" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* การ์ดรูป - แสดง 4 รูปจาก currentIndex */}
          <div className="grid grid-cols-4 gap-0.5">
            {Array.from({ length: visibleItems }).map((_, i) => {
              const itemIndex = (currentIndex + i) % totalItems;
              const item = portfolioItems[itemIndex];
              return (
                <Card
                  key={`${item.id}-${itemIndex}`}
                  item={item}
                  brandDark={BRAND_DARK}
                  brandMid={BRAND_MID}
                  priority={i < 2}
                />
              );
            })}
          </div>

          {/* ปุ่มเลื่อนขวา */}
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-white hover:scale-105 hover:shadow-xl"
            style={{ color: BRAND_MID }}
          >
            <svg className="w-6 h-6 transition-transform duration-200 ease-in-out" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* จุดบอกตำแหน่ง */}
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalItems }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ease-in-out hover:scale-125 ${
                  idx === currentIndex ? 'w-6' : 'w-2'
                }`}
                style={{
                  backgroundColor: idx === currentIndex ? BRAND_MID : '#d1d5db',
                }}
              />
            ))}
          </div>
        </div>

        {/* Mobile/Tablet: แสดง 1 รูปเต็มความกว้างของจอ */}
        <div className="lg:hidden">
          <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none]">
            <div className="flex snap-x snap-mandatory">
              {portfolioItems.map((item, i) => (
                <div key={item.id} className="flex-none w-full snap-center">
                  <Card
                    item={item}
                    brandDark={BRAND_DARK}
                    brandMid={BRAND_MID}
                    priority={i < 2}
                  />
                </div>
              ))}
            </div>
          </div>

          <p className="mt-2 text-center text-sm text-gray-500">
            ← เลื่อนเพื่อดูผลงานเพิ่มเติม →
          </p>
        </div>

        {/* View All */}
        <div className="text-center mt-10">
          <a
            href="/portfolio"
            className="group relative inline-flex items-center justify-center rounded-full px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300"
            style={{
              backgroundImage: `linear-gradient(90deg, ${BRAND_MID}, ${BRAND_DARK})`,
            }}
          >
            <span className="relative z-10 mr-2">ดูผลงานทั้งหมด</span>
            <svg
              className="relative z-10 h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
            </svg>
            <span
              className="absolute inset-0 rounded-full opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-25"
              style={{
                backgroundImage: `linear-gradient(90deg, ${BRAND_MID}, ${BRAND_DARK})`,
              }}
            />
          </a>

       
        </div>
      </div>
    </section>
  );
}

/** ---------- Sub Component: Card (ทำไว้ในไฟล์เดียว) ---------- */
function Card({
  item,
  brandDark,
  brandMid,
  priority = false,
}: {
  item: {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    category: string;
    tags: string[];
    image: string;
  };
  brandDark: string;
  brandMid: string;
  priority?: boolean;
}) {
  return (
    <div className="group relative">
      <div className="relative overflow-hidden bg-white transition-all duration-300 ease-in-out">
        {/* สัดส่วนภาพแนวตั้งสูงมาก เต็มพื้นที่ */}
        <div className="relative aspect-[2/3]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
            className="object-cover transition-all duration-300 ease-in-out"
            priority={priority}
          />
          {/* Overlay เบา ๆ */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(135deg, ${brandDark}15, transparent)`,
            }}
          />

          {/* หมวดหมู่ */}
          <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-1 text-xs font-medium backdrop-blur">
            <span style={{ color: brandMid }}>{item.category}</span>
          </div>
        </div>

        {/* ข้อความอยู่ใต้รูป */}
        <div className="p-4 bg-white">
          <h3 className="text-lg font-bold mb-2 line-clamp-2" style={{ color: brandDark }}>
            {item.title}
          </h3>
          <h4 className="text-sm font-medium mb-2 line-clamp-1" style={{ color: brandMid }}>
            {item.subtitle}
          </h4>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {item.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {item.tags.slice(0, 2).map((t, idx) => (
              <span
                key={idx}
                className="rounded-full px-3 py-1 text-xs text-white font-medium"
                style={{ backgroundColor: brandMid }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
