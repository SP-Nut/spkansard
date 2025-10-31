"use client";

import { useState } from "react";
import Image from "next/image";

export default function HeroSection() {
  const totalSlides = 5;
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);

  // ข้อความสำหรับแต่ละสไลด์
  const slideContent = [
    {
      title: "เอสพี กันสาด",
      subtitle: "ประสบการณ์กว่า 35 ปี\nลูกค้าไว้วางใจกว่า 50,000 ครัวเรือน",
      buttons: [
        { text: "ดูแกลเลอรี่", href: "/gallery", primary: true, external: false }
      ]
    },
    {
      title: "ผู้นำกันสาดกรุงเทพฯ",
      subtitle: "ผู้ให้บริการงานกันสาดอันดับ 1\nครอบคลุมกรุงเทพฯ และปริมณฑล",
      buttons: [
        { text: "ดูแกลเลอรี", href: "/gallery", primary: true, external: false }
      ]
    },
    {
      title: "โครงสร้างโรงจอดรถ",
      subtitle: "โครงสร้างเหล็กมาตรฐาน\nผลิต–ติดตั้งโดยทีมงานเฉพาะทาง",
      buttons: [
        { text: "ประเมินราคา", href: "https://cal-customer.vercel.app/", primary: true, external: true }
      ]
    },
    {
      title: "วัสดุกันสาดหลากที่สุด*",
      subtitle: "เมทัลชีท ไวนิล อลูมิเนียม โพลี ชินโคไลท์\nระแนง–ฝ้าหลายประเภท ให้เลือกครบ",
      buttons: [
        { text: "ดูวัสดุ", href: "/materials", primary: true, external: false }
      ]
    },
    {
      title: "ติดตั้งเร็ว รับประกัน 5 ปี",
      subtitle: "ติดตั้งงานมาตรฐาน ภายใน 1 วัน**\nรับประกันโครงสร้างสูงสุด 5 ปี",
      buttons: [
        { text: "นัดหมาย", href: "https://cal-customer.vercel.app/", primary: true, external: true }
      ]
    }
  ];

  // รูปภาพสำหรับแต่ละสไลด์ (ใช้ชื่อไฟล์ที่มีจริงในโฟลเดอร์)
  const slideImages = [
    {
      desktop: "/herosection/กันสาดหรู โมเดิร์น.webp",
      mobile: "/heroMobile/kansard-mobile-slide-1.webp",
      alt: "SP Kansard กันสาดโรงจอดรถหรู"
    },
    {
      desktop: "/herosection/กันสาดเรียบๆ ทันสมัย.webp",
      mobile: "/heroMobile/kansard-mobile-slide-2.webp",
      alt: "SP Kansard กันสาดบ้านสไตล์โมเดิร์น"
    },
    {
      desktop: "/herosection/กันสาด บ้านสไตล์โมเดิร์น.webp",
      mobile: "/heroMobile/kansard-mobile-slide-3.webp",
      alt: "SP Kansard กันสาดเรียบทันสมัย"
    },
    {
      desktop: "/herosection/กันสาด มินิมอล.webp",
      mobile: "/heroMobile/kansard-mobile-slide-6.webp",
      alt: "SP Kansard กันสาดมินิมอล"
    },
    {
      desktop: "/herosection/กันสาด มูจิ.webp",
      mobile: "/heroMobile/kansard-mobile-slide-7.webp",
      alt: "SP Kansard กันสาดสไตล์มูจิ"
    }
  ];

  // Handle touch/mouse drag events
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setCurrentX(clientX);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    setCurrentX(clientX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const deltaX = currentX - startX;
    const threshold = 50;
    
    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        setCurrentSlide((s) => (s <= 1 ? totalSlides : s - 1));
      } else {
        setCurrentSlide((s) => (s >= totalSlides ? 1 : s + 1));
      }
    }
  };

  const translatePercentage = -((currentSlide - 1) * 20);

  return (
    <section id="hero" className="relative min-h-[100dvh] sm:min-h-[100dvh] mt-[-4rem] sm:mt-[-5rem] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="carousel-container relative w-full h-full">
          <input type="radio" name="carousel" id="carousel1" className="hidden" checked={currentSlide === 1} onChange={() => setCurrentSlide(1)} />
          <input type="radio" name="carousel" id="carousel2" className="hidden" checked={currentSlide === 2} onChange={() => setCurrentSlide(2)} />
          <input type="radio" name="carousel" id="carousel3" className="hidden" checked={currentSlide === 3} onChange={() => setCurrentSlide(3)} />
          <input type="radio" name="carousel" id="carousel4" className="hidden" checked={currentSlide === 4} onChange={() => setCurrentSlide(4)} />
          <input type="radio" name="carousel" id="carousel5" className="hidden" checked={currentSlide === 5} onChange={() => setCurrentSlide(5)} />

          <div
            className="carousel-slides flex w-[500%] h-full transition-transform duration-500 ease-in-out select-none"
            style={{ transform: `translateX(${translatePercentage}%)` }}
            onMouseDown={(e) => handleDragStart(e.clientX)}
            onMouseMove={(e) => handleDragMove(e.clientX)}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
            onTouchEnd={handleDragEnd}
          >
            {slideImages.map((slide, index) => (
              <div key={index} className="slide w-1/5 h-full relative flex-shrink-0">
                {/* Desktop Image */}
                <Image
                  src={slide.desktop}
                  alt={`${slide.alt} - เดสก์ท็อป`}
                  fill
                  className="hidden md:block object-cover object-center"
                  priority={currentSlide === index + 1 || index === 0}
                  sizes="(min-width: 768px) 100vw, 0vw"
                />
                {/* Mobile Image */}
                <Image
                  src={slide.mobile}
                  alt={`${slide.alt} - มือถือ`}
                  fill
                  className="block md:hidden object-cover object-center"
                  priority={currentSlide === index + 1 || index === 0}
                  sizes="(max-width: 767px) 100vw, 0vw"
                />
                {/* Content overlay - ใช้สไตล์เดียวกันทั้งหมด */}
                <div className="absolute z-30 bottom-0 left-0 right-0 text-center px-4 sm:px-6">
                  {/* Gradient overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none"></div>
                  <div className="relative z-10 max-w-4xl mx-auto pb-16 sm:pb-20 lg:pb-24">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 sm:mb-3 md:mb-4 leading-tight" 
                        style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
                      {slideContent[index]?.title}
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/90 font-normal mb-4 sm:mb-6 md:mb-8 leading-relaxed max-w-2xl mx-auto" 
                       style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>
                      {slideContent[index]?.subtitle?.split('\n').map((line, lineIndex) => (
                        <span key={lineIndex}>
                          {line}
                          {lineIndex < slideContent[index]?.subtitle?.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                    <div className="flex justify-center">
                      <a
                        href={slideContent[index]?.buttons[0]?.href}
                        target={slideContent[index]?.buttons[0]?.external ? "_blank" : undefined}
                        rel={slideContent[index]?.buttons[0]?.external ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center text-white font-medium py-2.5 px-5 sm:py-3 sm:px-6 rounded-md transition-all duration-300 text-sm sm:text-base transform hover:scale-105 bg-brand hover:bg-brand-dark"
                      >
                        {slideContent[index]?.buttons[0]?.text}
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Centered side arrows for navigation - Hidden on mobile */}
      <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 hidden md:block">
        <button
          aria-label="Previous slide"
          onClick={() => setCurrentSlide((s) => (s <= 1 ? totalSlides : s - 1))}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-transparent hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-200 border border-white/30 hover:border-white/60"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 hidden md:block">
        <button
          aria-label="Next slide"
          onClick={() => setCurrentSlide((s) => (s >= totalSlides ? 1 : s + 1))}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-transparent hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-200 border border-white/30 hover:border-white/60"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots navigation - Visible on all devices */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="flex space-x-2">
          {Array.from({ length: totalSlides }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentSlide(i + 1)}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                currentSlide === i + 1
                  ? 'bg-white scale-110'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
