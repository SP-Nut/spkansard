"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

const slides = [
  {
    desktop: "/herosection/กันสาดหรู โมเดิร์น.webp",
    mobile: "/heroMobile/kansard-mobile-slide-1.webp",
    alt: "บ้านพร้อมกันสาดและโรงจอดรถสไตล์โมเดิร์นจาก SP Kansard",
    eyebrow: "SP KANSARD",
    title: "เอสพี กันสาด",
    subtitle: "ออกแบบและติดตั้งกันสาด โรงจอดรถ และงานโครงสร้างครบวงจร ด้วยงานเรียบ หรู และแข็งแรงในมาตรฐานมืออาชีพ",
    primary: { text: "ดูผลงาน", href: "/gallery", external: false },
    secondary: { text: "ประเมินราคา", href: "/estimate", external: false },
  },
  {
    desktop: "/herosection/กันสาดเรียบๆ ทันสมัย.webp",
    mobile: "/heroMobile/kansard-mobile-slide-2.webp",
    alt: "กันสาดดีไซน์เรียบหรูสำหรับบ้านสมัยใหม่",
    eyebrow: "MODERN CANOPY",
    title: "กันสาดเรียบหรู เข้ากับบ้าน",
    subtitle: "ดีไซน์สะอาดตา เลือกวัสดุให้เหมาะกับแสง ฝน และสไตล์ของบ้าน พร้อมทีมติดตั้งมืออาชีพ",
    primary: { text: "ดูวัสดุ", href: "/materials", external: false },
    secondary: { text: "ติดต่อเรา", href: "/contact", external: false },
  },
  {
    desktop: "/herosection/กันสาด บ้านสไตล์โมเดิร์น.webp",
    mobile: "/heroMobile/kansard-mobile-slide-3.webp",
    alt: "งานติดตั้งกันสาดบ้านสไตล์โมเดิร์น",
    eyebrow: "CRAFTED TO FIT",
    title: "งานติดตั้งที่พอดีกับพื้นที่",
    subtitle: "สำรวจหน้างาน วางโครงสร้าง และเก็บรายละเอียดให้ลงตัว เพื่อให้กันสาดใช้งานจริงได้ยาวนาน",
    primary: { text: "นัดประเมิน", href: "/estimate", external: false },
    secondary: { text: "ดูขั้นตอน", href: "#service-process", external: false },
  },
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
      className="relative min-h-[88svh] w-full overflow-hidden bg-[#eaf4ff] text-white"
      aria-label="SP Kansard กันสาดและโรงจอดรถ"
    >
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.desktop}
            className={`absolute inset-0 transition-opacity duration-[1600ms] ease-in-out ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={currentSlide !== index}
          >
            <div className="hero-drift absolute inset-0">
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
          </div>
        ))}

        <div className="absolute inset-0 bg-white/12" />
        <div className="absolute inset-0 bg-linear-to-b from-[#071526]/34 via-[#071526]/18 to-[#071526]/46" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-linear-to-t from-[#071526]/42 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[88svh] max-w-[1760px] items-end justify-center px-5 pb-10 pt-28 text-center sm:px-8 md:pb-6 lg:px-10">
        <div className="relative w-full max-w-4xl">
          <div key={currentSlide} className="animate-[fadeIn_900ms_ease-out]">
            <p className="mb-3 text-3xl font-bold italic uppercase leading-tight text-white drop-shadow-[0_3px_18px_rgba(0,0,0,0.34)] sm:text-5xl lg:text-6xl">
              {slides[currentSlide].eyebrow}
            </p>

            <h1 className="mx-auto max-w-3xl text-lg font-semibold leading-8 text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)] sm:text-2xl lg:text-3xl">
              {slides[currentSlide].title}
            </h1>

            <p className="mx-auto mt-2 max-w-2xl text-base font-medium leading-8 text-white/92 drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)] sm:text-lg lg:text-xl">
              {slides[currentSlide].subtitle}
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={slides[currentSlide].primary.href}
                target={slides[currentSlide].primary.external ? "_blank" : undefined}
                rel={slides[currentSlide].primary.external ? "noopener noreferrer" : undefined}
                className="inline-flex items-center justify-center rounded-full bg-[#1E3B5A] px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#294f75] sm:text-base"
              >
                {slides[currentSlide].primary.text}
                <span className="ml-2 text-lg leading-none" aria-hidden="true">&rsaquo;</span>
              </a>
              <a
                href={slides[currentSlide].secondary.href}
                target={slides[currentSlide].secondary.external ? "_blank" : undefined}
                rel={slides[currentSlide].secondary.external ? "noopener noreferrer" : undefined}
                className="inline-flex items-center justify-center rounded-full border border-white/55 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-white hover:bg-white/18 sm:text-base"
              >
                {slides[currentSlide].secondary.text}
                <span className="ml-2 text-lg leading-none" aria-hidden="true">&rsaquo;</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
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
