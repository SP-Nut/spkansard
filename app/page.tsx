"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { reviews } from "./data/reviewsData";

// Critical icons only - loaded immediately
import { FaUsers, FaShieldAlt, FaHeart } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa6";

// Non-critical icons - lazy loaded
const FaChevronLeft = dynamic(() => import("react-icons/fa").then(mod => ({ default: mod.FaChevronLeft })));
const FaChevronRight = dynamic(() => import("react-icons/fa").then(mod => ({ default: mod.FaChevronRight })));
const FaPhoneAlt = dynamic(() => import("react-icons/fa").then(mod => ({ default: mod.FaPhoneAlt })));
const FaFileAlt = dynamic(() => import("react-icons/fa").then(mod => ({ default: mod.FaFileAlt })));
const FaTools = dynamic(() => import("react-icons/fa").then(mod => ({ default: mod.FaTools })));
const FaHome = dynamic(() => import("react-icons/fa").then(mod => ({ default: mod.FaHome })));
const FaClock = dynamic(() => import("react-icons/fa").then(mod => ({ default: mod.FaClock })));
const FaCheckCircle = dynamic(() => import("react-icons/fa").then(mod => ({ default: mod.FaCheckCircle })));

// Dynamic imports for better code splitting
const HeroSection = dynamic(() => import("./components/HeroSection"), {
  ssr: true,
  loading: () => <div className="h-screen bg-gradient-to-r from-[#1E2E4F] to-[#314874]" />
});



export default function Home() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const reviewsScrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Simplified light mode enforcement
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.style.colorScheme = 'light';
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Scroll functions for reviews
  const scrollReviews = (direction: 'left' | 'right') => {
    const container = reviewsScrollRef.current;
    if (!container) return;
    
    // Calculate for 4 cards: (card width 320px + gap 24px) * 4 = 1376px
    const scrollAmount = 1376;
    const newScrollLeft = direction === 'left' 
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount;
    
    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  const updateScrollButtons = () => {
    const container = reviewsScrollRef.current;
    if (!container) return;
    
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  useEffect(() => {
    const container = reviewsScrollRef.current;
    if (!container) return;
    
    const handleScroll = () => updateScrollButtons();
    container.addEventListener('scroll', handleScroll);
    
    // Initial check
    updateScrollButtons();
    
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className="font-prompt bg-blue-50 light-mode-only" style={{ colorScheme: 'light' }}>
      <style jsx global>{`
        * {
          color-scheme: light !important;
        }
        html {
          color-scheme: light !important;
        }
        html.dark,
        html[data-theme="dark"],
        .dark {
          color-scheme: light !important;
          background: white !important;
          color: black !important;
        }
        @media (prefers-color-scheme: dark) {
          * {
            color-scheme: light !important;
          }
        }
      `}</style>
      <HeroSection />

      {/* Intro Section: กันสาด */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 lg:mb-8" style={{color:'var(--brand-900)'}}>เอสพี กันสาด</h2>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
          SP Kansard ผู้นำด้านกันสาดอันดับ 1 ในกรุงเทพฯและปริมณฑล ด้วยประสบการณ์กว่า 35 ปี และความไว้วางใจจากลูกค้ากว่า 50,000 ครัวเรือนทั่วประเทศ เราสร้างสรรค์กันสาดที่สวยงาม แข็งแรง และใช้งานได้จริง ครบด้วยวัสดุกันสาดมากที่สุดในไทย ทั้ง เมทัลชีท, ไวนิลดรีมรูฟ, อลูมิเนียมรูฟ, โพลีคาร์บอเนต, ชินโคไลท์ และ ระแนง–ฝ้าทุกประเภท ติดตั้งด้วยมาตรฐานสูงสุด พร้อม รับประกันงานสูงสุด 5 ปี เพื่อความมั่นใจในคุณภาพและบริการที่คุณวางใจได้
        </p>

        {/* Feature Badges */}
        <div className="mt-6 sm:mt-8 grid grid-cols-2 lg:flex lg:flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8 xl:gap-12">
          {/* 50,000+ Customers */}
          <div className="flex flex-col items-center text-gray-700">
            <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full ring-1 ring-[var(--brand-100)] bg-white flex items-center justify-center">
              <FaUsers className="text-[16px] sm:text-[20px] lg:text-[24px]" style={{color:'var(--brand-700)'}} />
            </div>
            <div className="mt-2 text-center">
              <div className="text-base sm:text-lg lg:text-xl font-bold" style={{color:'var(--brand-900)'}}>50,000+</div>
              <div className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">ครัวเรือน</div>
            </div>
          </div>

          {/* 35+ Years Experience */}
          <div className="flex flex-col items-center text-gray-700">
            <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full ring-1 ring-[var(--brand-100)] bg-white flex items-center justify-center">
              <FaCalendarCheck className="text-[16px] sm:text-[20px] lg:text-[24px]" style={{color:'var(--brand-700)'}} />
            </div>
            <div className="mt-2 text-center">
              <div className="text-base sm:text-lg lg:text-xl font-bold" style={{color:'var(--brand-900)'}}>35+</div>
              <div className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">ปี ประสบการณ์</div>
            </div>
          </div>

          {/* Customer Satisfaction 100% */}
          <div className="flex flex-col items-center text-gray-700">
            <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full ring-1 ring-[var(--brand-100)] bg-white flex items-center justify-center">
              <FaHeart className="text-[16px] sm:text-[20px] lg:text-[24px]" style={{color:'var(--brand-700)'}} />
            </div>
            <div className="mt-2 text-center">
              <div className="text-base sm:text-lg lg:text-xl font-bold" style={{color:'var(--brand-900)'}}>100%</div>
              <div className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">ความพึงพอใจ</div>
            </div>
          </div>

          {/* 5 Years Warranty */}
          <div className="flex flex-col items-center text-gray-700">
            <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full ring-1 ring-[var(--brand-100)] bg-white flex items-center justify-center">
              <FaShieldAlt className="text-[16px] sm:text-[20px] lg:text-[24px]" style={{color:'var(--brand-700)'}} />
            </div>
            <div className="mt-2 text-center">
              <div className="text-base sm:text-lg lg:text-xl font-bold" style={{color:'var(--brand-900)'}}>5</div>
              <div className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">ปี รับประกัน</div>
            </div>
          </div>
        </div>
      </section>

  {/* Video Section (full-bleed) */}
  <section className="relative" style={{ contentVisibility: 'auto', containIntrinsicSize: '56.25vw' }}>
        {/* Full-bleed wrapper */}
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
          {/* 16:9 Aspect Ratio Box */}
          <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src="/video.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              poster="/herosection/กันสาดหรู โมเดิร์น.webp"
              ref={videoRef}
            />
          </div>
        </div>
      </section>

      {/* ROOVTECT SOLUTION Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 xl:py-24 text-white" style={{backgroundColor: '#314874'}}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold italic mb-4 sm:mb-6 lg:mb-8 leading-tight">
           SP KANSARD : ปฏิวัติการต่อเติม<br className="hidden sm:block" />
            <span className="sm:hidden"> </span>หลังคากันสาด
          </h2>
          
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl mb-6 sm:mb-8 lg:mb-12 max-w-4xl mx-auto leading-relaxed opacity-90 px-2">
            เติมเต็มความสมบูรณ์แบบให้บ้านของคุณด้วยนวัตกรรมกันสาดและโรงจอดรถดีไซน์ทันสมัยจาก เอสพี กันสาด ผู้นำด้านการต่อเติมบ้านที่มีประสบการณ์ยาวนานกว่า 35 ปี 
            เรานำเสนอการออกแบบที่ผสมผสานระหว่างความงามและฟังก์ชันการใช้งานอย่างลงตัว เพื่อเปลี่ยนบ้านธรรมดาให้กลายเป็นบ้านที่มีสไตล์ สะท้อนรสนิยมเจ้าของบ้านได้อย่างชัดเจน
          </p>

          <div className="text-left max-w-3xl mx-auto mb-8 sm:mb-12 space-y-3 sm:space-y-4 px-2">
            <div className="flex items-start">
              <span className="text-white mr-4 mt-1 flex-shrink-0 text-xl sm:text-2xl font-bold">●</span>
              <span className="text-sm sm:text-base lg:text-lg">บริการครบวงจร ตั้งแต่การติดตั้งหลังคาโรงจอดรถทุกรูปแบบ ที่ช่วยป้องกันแสงแดดและลดความร้อนอย่างมีประสิทธิภาพ</span>
            </div>
            <div className="flex items-start">
              <span className="text-white mr-4 mt-1 flex-shrink-0 text-xl sm:text-2xl font-bold">●</span>
              <span className="text-sm sm:text-base lg:text-lg">การต่อเติมกันสาดหน้าบ้าน ข้างบ้าน และหลังบ้าน ที่ออกแบบให้กลมกลืนกับสถาปัตยกรรมเดิมของบ้าน</span>
            </div>
            <div className="flex items-start">
              <span className="text-white mr-4 mt-1 flex-shrink-0 text-xl sm:text-2xl font-bold">●</span>
              <span className="text-sm sm:text-base lg:text-lg">คัดสรรวัสดุคุณภาพสูงเกรดพรีเมียม ทั้งเมทัลชีท ไวนิล อลูมิเนียม และโพลีคาร์บอเนต ตอบโจทย์ทุกความต้องการ</span>
            </div>
            <div className="flex items-start">
              <span className="text-white mr-4 mt-1 flex-shrink-0 text-xl sm:text-2xl font-bold">●</span>
              <span className="text-sm sm:text-base lg:text-lg">ทีมสถาปนิกและทีมงานติดตั้งมืออาชีพ ยึดมาตรฐานสากลในทุกขั้นตอน พร้อมให้คำปรึกษาอย่างใกล้ชิด</span>
            </div>
          </div>

          {/* Decorative Element */}
          <div className="mb-6 sm:mb-8">
            <div className="w-12 sm:w-16 h-1 bg-white mx-auto"></div>
          </div>

            {/* Service Categories */}
            <div className="mb-8 sm:mb-12 px-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center text-sm sm:text-base lg:text-lg font-medium space-y-2 sm:space-y-0">
              <span className="text-center">SP KANSARD CO., LTD. | บริษัท เอสพี กันสาด จำกัด</span>
              </div>
            </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:gap-4 lg:gap-6 justify-center px-4">
            <a
              href="https://line.me/R/ti/p/@spkansard"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-200 hover:bg-white text-gray-800 font-semibold py-3 px-6 sm:px-8 rounded-full transition-all duration-300 text-sm sm:text-base"
            >
              LINE ›
            </a>
            <a
              href="tel:02-936-8841"
              className="bg-gray-200 hover:bg-white text-gray-800 font-semibold py-3 px-6 sm:px-8 rounded-full transition-all duration-300 text-sm sm:text-base"
            >
              CALL ›
            </a>
            <a
              href="https://cal-customer.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-200 hover:bg-white text-gray-800 font-semibold py-3 px-6 sm:px-8 rounded-full transition-all duration-300 text-sm sm:text-base"
            >
              ประเมินราคา ›
            </a>
          </div>
        </div>
      </section>

      {/* Price Calculator Section - Full Width Sharp Edges */}
      <section
        className="relative text-center py-16 sm:py-20 lg:py-28 xl:py-36 px-4 sm:px-6 lg:px-8 text-white"
        style={{
          backgroundImage: "url('/bg-contact.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          contentVisibility: 'auto',
          containIntrinsicSize: '700px',
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Content with relative positioning */}
        <div className="relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 leading-tight">
              คิดถึงกันสาด <br />
              คิดถึง SP KANSARD
            </h2>
            
            <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-light opacity-90">
              ผู้เชี่ยวชาญด้านกันสาด มากกว่า 35 ปี
            </p>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section - Compact & Scrollable */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header - Compact */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-4" style={{color:'var(--brand-900)'}}>
              ลูกค้าพูดถึงเรา
            </h2>
            <p className="text-base text-gray-500 max-w-lg mx-auto font-light">
              ประสบการณ์จริงจากลูกค้าที่ไว้วางใจ
            </p>
          </div>

          {/* Reviews - Single Row Horizontal Scroll for All Devices */}
          <div className="relative">
            {/* Navigation Buttons - Desktop Only */}
            <div className="hidden lg:flex">
              <button
                onClick={() => scrollReviews('left')}
                disabled={!canScrollLeft}
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
                  canScrollLeft 
                    ? 'bg-white hover:bg-gray-50 text-gray-700 hover:shadow-xl' 
                    : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                }`}
                style={{ transform: 'translateY(-50%) translateX(-50%)' }}
              >
                <FaChevronLeft className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => scrollReviews('right')}
                disabled={!canScrollRight}
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
                  canScrollRight 
                    ? 'bg-white hover:bg-gray-50 text-gray-700 hover:shadow-xl' 
                    : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                }`}
                style={{ transform: 'translateY(-50%) translateX(50%)' }}
              >
                <FaChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div 
              className="overflow-x-auto scrollbar-hide pb-4 touch-pan-x" 
              ref={reviewsScrollRef}
              style={{
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                scrollSnapType: 'x proximity',
                scrollBehavior: 'smooth'
              }}
            >
              <div className="flex space-x-4 sm:space-x-6 px-4 sm:px-0" style={{ width: 'max-content' }}>
              {reviews.map((review) => (
                <div key={review.id} className="w-72 sm:w-80 flex-shrink-0" style={{ scrollSnapAlign: 'start' }}>
                  <div className="bg-gray-50 rounded-xl p-5 sm:p-6 border border-gray-100 hover:bg-white hover:shadow-md transition-all duration-300">
                    <div className="flex items-center mb-3 sm:mb-4">
                      <div className="flex space-x-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <div key={i} className="w-3 h-3 rounded-full" style={{backgroundColor:'var(--brand-400)'}}></div>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4 sm:mb-5 font-light">
                      &ldquo;{review.comment}&rdquo;
                    </p>
                    <div className="flex items-center">
                      <div 
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-medium text-xs sm:text-sm"
                        style={{backgroundColor: review.colorClass}}
                      >
                        {review.initial}
                      </div>
                      <div className="ml-3">
                        <div className="font-medium text-gray-900 text-sm sm:text-base">{review.customerName}</div>
                        <div className="text-xs sm:text-sm text-gray-500">{review.location}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>

          {/* Summary Stats - Compact */}
          <div className="mt-8 sm:mt-12 text-center">
            <div className="inline-flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-light mb-1" style={{color:'var(--brand-900)'}}>4.9</div>
                <div className="flex justify-center mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className="w-3 h-3 rounded-full mx-0.5" style={{backgroundColor:'var(--brand-400)'}}></div>
                  ))}
                </div>
                <div className="text-xs sm:text-sm text-gray-500">จาก 2,847 รีวิว</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Process Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-4" style={{color:'var(--brand-900)'}}>
              ขั้นตอนการใช้บริการ
            </h2>
            <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto font-light">
              กระบวนการทำงานที่เป็นระบบ เพื่อความมั่นใจในคุณภาพ
            </p>
          </div>

          {/* Process Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Step 1: ติดต่อเรา */}
            <div className="text-center group">
              <div className="relative mb-4 sm:mb-5">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center group-hover:shadow-lg transition-all duration-300">
                  <FaPhoneAlt className="w-6 h-6 sm:w-8 sm:h-8" style={{color:'var(--brand-600)'}} />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3" style={{color:'var(--brand-900)'}}>
                ติดต่อเรา
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base px-2">
                ติดต่อเราผ่านหลายช่องทาง เพื่อขอคำปรึกษา หรือดูตัวอย่างผลงาน
              </p>
            </div>

            {/* Step 2: ประเมินหน้างาน */}
            <div className="text-center group">
              <div className="relative mb-4 sm:mb-5">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center group-hover:shadow-lg transition-all duration-300">
                  <FaFileAlt className="w-6 h-6 sm:w-8 sm:h-8" style={{color:'var(--brand-600)'}} />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3" style={{color:'var(--brand-900)'}}>
                ประเมินหน้างาน
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base px-2">
                ทีมงานจะออกสำรวจพื้นที่ และประเมินความเหมาะสม เพื่อวางแผนการทำงาน
              </p>
            </div>

            {/* Step 3: เสนอราคา */}
            <div className="text-center group">
              <div className="relative mb-4 sm:mb-5">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center group-hover:shadow-lg transition-all duration-300">
                  <FaCheckCircle className="w-6 h-6 sm:w-8 sm:h-8" style={{color:'var(--brand-600)'}} />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3" style={{color:'var(--brand-900)'}}>
                เสนอราคา
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base px-2">
                คำนวณราคาอย่างแม่นยำ พร้อมรายละเอียดวัสดุ และระยะเวลาดำเนินงาน
              </p>
            </div>

            {/* Step 4: ออกแบบ */}
            <div className="text-center group">
              <div className="relative mb-4 sm:mb-5">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center group-hover:shadow-lg transition-all duration-300">
                  <FaTools className="w-6 h-6 sm:w-8 sm:h-8" style={{color:'var(--brand-600)'}} />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3" style={{color:'var(--brand-900)'}}>
                ออกแบบ
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base px-2">
                ออกแบบให้เห็นภาพ 3D ก่อนลงมือทำจริง เพื่อให้ตรงกับความต้องการ
              </p>
            </div>

            {/* Step 5: ติดตั้ง */}
            <div className="text-center group">
              <div className="relative mb-4 sm:mb-5">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center group-hover:shadow-lg transition-all duration-300">
                  <FaClock className="w-6 h-6 sm:w-8 sm:h-8" style={{color:'var(--brand-600)'}} />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3" style={{color:'var(--brand-900)'}}>
                ติดตั้ง
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base px-2">
                ทีมช่างมืออาชีพติดตั้งตรงเวลา ด้วยมาตรฐานความปลอดภัยสูงสุด
              </p>
            </div>

            {/* Step 6: ส่งมอบงาน */}
            <div className="text-center group">
              <div className="relative mb-4 sm:mb-5">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center group-hover:shadow-lg transition-all duration-300">
                  <FaHome className="w-6 h-6 sm:w-8 sm:h-8" style={{color:'var(--brand-600)'}} />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3" style={{color:'var(--brand-900)'}}>
                ส่งมอบงาน
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base px-2">
                ตรวจสอบความเรียบร้อย พร้อมใบรับประกันงาน และบริการหลังการขาย
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Sale Gallery Section */}
      <section className="relative min-h-[500px] sm:h-[500px] lg:h-[600px] overflow-hidden" style={{ contentVisibility: 'auto', containIntrinsicSize: '600px' }}>
        {/* Background Image: use lazy-loaded img to avoid CSS eager fetch */}
        <div className="absolute inset-0">
          <Image
            src="/herosection/กันสาดหรู โมเดิร์น.webp"
            alt="SP Kansard showroom background"
            fill
            sizes="100vw"
            quality={80}
            className="object-cover object-center"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex items-center py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                Visit SP Kansard
              </h2>
              
              <div className="space-y-1.5 sm:space-y-2 mb-6 sm:mb-8 text-white">
                <p className="text-sm sm:text-lg font-medium">
                  บริษัท เอสพี กันสาด จำกัด
                </p>
                <p className="text-sm sm:text-lg leading-relaxed">
                  28/101 ถ.รัชดา-รามอินทรา แขวงคลองกุ่ม<br />
                  เขตบึงกุ่ม กรุงเทพมหานคร 10230
                </p>
                <p className="text-xs sm:text-base text-white/90 pt-2">
                  *ผู้เชี่ยวชาญด้านกันสาด โรงจอดรถ งานฝ้า งานระแนง และงานเหล็กครบวงจร
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href="https://maps.google.com/?q=28/101+ถ.รัชดา-รามอินทรา+แขวงคลองกุ่ม+เขตบึงกุ่ม+กรุงเทพมหานคร+10230"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300 text-sm sm:text-base"
                >
                  Get Direction →
                </a>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="tel:02-936-8841"
                    className="inline-flex items-center justify-center flex-1 px-4 py-3 bg-white/20 hover:bg-white/30 border border-white/40 text-white font-medium rounded-lg backdrop-blur-sm transition-all duration-300 text-sm sm:text-base"
                  >
                    โทร. 02-936-8841
                  </a>
                  <a
                    href="https://line.me/R/ti/p/@spkansard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-300 text-sm sm:text-base"
                  >
                    LINE @spkansard
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}