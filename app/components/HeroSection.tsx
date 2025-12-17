"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

export default function HeroSection() {
  const totalSlides = 5;
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const startXRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-slide every 2.5 seconds (pause when dragging)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        setCurrentSlide((s) => (s >= totalSlides ? 1 : s + 1));
      }
    }, 2500);
    
    return () => clearInterval(interval);
  }, [isDragging]);

  // ข้อความสำหรับแต่ละสไลด์
  const slideContent = [
    {
      title: "เอสพี กันสาด",
      subtitle: "ประสบการณ์กว่า 38 ปี\nลูกค้าไว้วางใจกว่า 50,000 ครัวเรือน",
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
      title: "วัสดุกันสาดหลากที่สุด",
      subtitle: "เมทัลชีท ไวนิล อลูมิเนียม โพลี ชินโคไลท์\nระแนง–ฝ้าหลายประเภท ให้เลือกครบ",
      buttons: [
        { text: "ดูวัสดุ", href: "/materials", primary: true, external: false }
      ]
    },
    {
      title: "ติดตั้งเร็ว รับประกัน 10 ปี",
      subtitle: "ติดตั้งงานมาตรฐาน ภายใน 1 วัน**\nรับประกันโครงสร้างสูงสุด 10 ปี",
      buttons: [
        { text: "นัดหมาย", href: "https://cal-customer.vercel.app/", primary: true, external: true }
      ]
    }
  ];

  // รูปภาพสำหรับแต่ละสไลด์
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
  const handleDragStart = useCallback((clientX: number) => {
    setIsDragging(true);
    startXRef.current = clientX;
    setDragOffset(0);
  }, []);

  const handleDragMove = useCallback((clientX: number) => {
    if (!isDragging) return;
    const containerWidth = containerRef.current?.offsetWidth || window.innerWidth;
    const deltaX = clientX - startXRef.current;
    // Convert to percentage of container width, limit to ±30%
    const offsetPercent = Math.max(-30, Math.min(30, (deltaX / containerWidth) * 100));
    setDragOffset(offsetPercent);
  }, [isDragging]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    
    const threshold = 8; // 8% threshold
    
    if (dragOffset > threshold) {
      // Swiped right - go to previous
      setCurrentSlide((s) => (s <= 1 ? totalSlides : s - 1));
    } else if (dragOffset < -threshold) {
      // Swiped left - go to next
      setCurrentSlide((s) => (s >= totalSlides ? 1 : s + 1));
    }
    
    setIsDragging(false);
    setDragOffset(0);
  }, [isDragging, dragOffset, totalSlides]);

  // Calculate translate percentage
  const baseTranslate = -((currentSlide - 1) * 20);
  const currentTranslate = baseTranslate + (dragOffset / 5); // Divide by 5 because each slide is 20%

  return (
    <section 
      id="hero" 
      className="relative w-full overflow-hidden"
      style={{ 
        height: '100dvh',
        minHeight: '100dvh'
      }}
    >
      {/* Fixed background container */}
      <div 
        ref={containerRef}
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ touchAction: 'pan-y pinch-zoom' }}
      >
        {/* Carousel slides wrapper */}
        <div
          className="flex h-full select-none"
          style={{ 
            width: '500%',
            transform: `translate3d(${currentTranslate}%, 0, 0)`,
            transition: isDragging ? 'none' : 'transform 500ms ease-out',
            willChange: 'transform',
            backfaceVisibility: 'hidden'
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            handleDragStart(e.clientX);
          }}
          onMouseMove={(e) => handleDragMove(e.clientX)}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
          onTouchEnd={handleDragEnd}
        >
          {slideImages.map((slide, index) => (
            <div 
              key={index} 
              className="relative flex-shrink-0"
              style={{ width: '20%', height: '100%' }}
            >
              {/* Desktop Image */}
              <Image
                src={slide.desktop}
                alt={`${slide.alt} - เดสก์ท็อป`}
                fill
                className="hidden md:block object-cover object-center"
                priority={index === 0}
                sizes="100vw"
                draggable={false}
              />
              {/* Mobile Image */}
              <Image
                src={slide.mobile}
                alt={`${slide.alt} - มือถือ`}
                fill
                className="block md:hidden object-cover object-center"
                priority={index === 0}
                sizes="100vw"
                draggable={false}
              />
              {/* Content overlay */}
              <div className="absolute z-30 bottom-0 left-0 right-0 text-center px-4 sm:px-6">
                {/* Gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none"></div>
                <div className="relative z-10 max-w-4xl mx-auto pb-20 sm:pb-24 lg:pb-28">
                  <h1 
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 sm:mb-3 md:mb-4 leading-tight" 
                    style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}
                  >
                    {slideContent[index]?.title}
                  </h1>
                  <p 
                    className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/90 font-normal mb-4 sm:mb-6 md:mb-8 leading-relaxed max-w-2xl mx-auto" 
                    style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}
                  >
                    {slideContent[index]?.subtitle?.split('\n').map((line, lineIndex) => (
                      <span key={lineIndex}>
                        {line}
                        {lineIndex < (slideContent[index]?.subtitle?.split('\n').length || 1) - 1 && <br />}
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
      <div className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 z-20">
        <div className="flex space-x-2.5">
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
