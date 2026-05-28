"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

const slides = [
  {
    desktop: "/herosection/กันสาดหรู โมเดิร์น.webp",
    mobile: "/heroMobile/kansard-mobile-slide-1.webp",
    alt: "บ้านพร้อมกันสาดและโรงจอดรถสไตล์โมเดิร์นจาก SP Kansard",
  },
  {
    desktop: "/herosection/กันสาดเรียบๆ ทันสมัย.webp",
    mobile: "/heroMobile/kansard-mobile-slide-2.webp",
    alt: "กันสาดดีไซน์เรียบหรูสำหรับบ้านสมัยใหม่",
  },
  {
    desktop: "/herosection/กันสาด บ้านสไตล์โมเดิร์น.webp",
    mobile: "/heroMobile/kansard-mobile-slide-3.webp",
    alt: "งานติดตั้งกันสาดบ้านสไตล์โมเดิร์น",
  },
];

const stats = [
  { value: "38+", label: "ปีประสบการณ์" },
  { value: "50,000+", label: "ครัวเรือนที่ไว้วางใจ" },
  { value: "10 ปี", label: "รับประกันสูงสุด" },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentSlide((slide) => (slide + 1) % slides.length);
    }, 6500);

    return () => window.clearInterval(interval);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[88svh] w-full overflow-hidden bg-[#0d1b31] text-white"
      aria-label="SP Kansard กันสาดและโรงจอดรถ"
    >
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.desktop}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={currentSlide !== index}
          >
            <Image
              src={slide.desktop}
              alt={`${slide.alt} - เดสก์ท็อป`}
              fill
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              sizes="100vw"
              className="hidden object-cover object-center md:block"
            />
            <Image
              src={slide.mobile}
              alt={`${slide.alt} - มือถือ`}
              fill
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              sizes="100vw"
              className="block object-cover object-center md:hidden"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-[#071526]/35" />
        <div className="absolute inset-0 bg-linear-to-r from-[#071526]/80 via-[#071526]/42 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-linear-to-t from-[#071526]/75 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[88svh] max-w-[1760px] items-center px-5 pb-16 pt-28 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-medium tracking-[0.24em] text-white/72">
            SP KANSARD
          </p>

          <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-7xl">
            เอสพี กันสาด
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-white/82 sm:text-lg lg:text-xl">
            ออกแบบและติดตั้งกันสาด โรงจอดรถ และงานโครงสร้างครบวงจร
            ด้วยงานเรียบ หรู และแข็งแรงในมาตรฐานมืออาชีพ
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/gallery"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#1E2E4F] shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-blue-50 sm:text-base"
            >
              ดูผลงาน
            </a>
            <a
              href="https://cal-customer.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/55 px-7 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white hover:bg-white/10 sm:text-base"
            >
              ประเมินราคา
            </a>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-white/18 pt-6">
            {stats.map((item) => (
              <div key={item.label}>
                <div className="text-lg font-semibold text-white sm:text-2xl">{item.value}</div>
                <div className="mt-1 text-xs leading-5 text-white/62 sm:text-sm">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-5 z-20 flex items-center gap-3 sm:left-8 lg:left-10">
        {slides.map((slide, index) => (
          <button
            key={slide.desktop}
            type="button"
            onClick={() => goToSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentSlide === index ? "w-9 bg-white" : "w-5 bg-white/38 hover:bg-white/70"
            }`}
            aria-label={`ไปยังภาพที่ ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
