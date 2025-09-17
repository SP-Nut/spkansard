"use client";
import HeroSection from "./components/HeroSection";
import PortfolioSection from "./components/PortfolioSection";
import { useEffect, useRef } from "react";
import { FaUsers, FaShieldAlt, FaHeart, FaPhone, FaCalculator } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa6";
import { SiLine } from "react-icons/si";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

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
  return (
    <div className="font-prompt">
      <HeroSection />

      {/* Intro Section: กันสาด */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8" style={{color:'var(--brand-900)'}}>เอสพี กันสาด</h2>
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          SP Kansard ผู้นำด้านกันสาดอันดับ 1 ในกรุงเทพฯและปริมณฑล ด้วยประสบการณ์กว่า 35 ปี และความไว้วางใจจากลูกค้ากว่า 50,000 ครัวเรือนทั่วประเทศ เราสร้างสรรค์กันสาดที่สวยงาม แข็งแรง และใช้งานได้จริง ครบด้วยวัสดุกันสาดมากที่สุดในไทย ทั้ง เมทัลชีท, ไวนิลดรีมรูฟ, อลูมิเนียมรูฟ, โพลีคาร์บอเนต, ชินโคไลท์ และ ระแนง–ฝ้าทุกประเภท ติดตั้งด้วยมาตรฐานสูงสุด พร้อม รับประกันงานสูงสุด 5 ปี เพื่อความมั่นใจในคุณภาพและบริการที่คุณวางใจได้
        </p>

        {/* Feature Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-12">
          {/* 50,000+ Customers */}
          <div className="flex flex-col items-center text-gray-700">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full ring-1 ring-[var(--brand-100)] bg-white flex items-center justify-center">
              <FaUsers className="text-[20px] sm:text-[24px]" style={{color:'var(--brand-700)'}} />
            </div>
            <div className="mt-2 text-center">
              <div className="text-lg sm:text-xl font-bold" style={{color:'var(--brand-900)'}}>50,000+</div>
              <div className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">ครัวเรือน</div>
            </div>
          </div>

          {/* 35+ Years Experience */}
          <div className="flex flex-col items-center text-gray-700">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full ring-1 ring-[var(--brand-100)] bg-white flex items-center justify-center">
              <FaCalendarCheck className="text-[20px] sm:text-[24px]" style={{color:'var(--brand-700)'}} />
            </div>
            <div className="mt-2 text-center">
              <div className="text-lg sm:text-xl font-bold" style={{color:'var(--brand-900)'}}>35+</div>
              <div className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">ปี ประสบการณ์</div>
            </div>
          </div>

          {/* Customer Satisfaction 100% */}
          <div className="flex flex-col items-center text-gray-700">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full ring-1 ring-[var(--brand-100)] bg-white flex items-center justify-center">
              <FaHeart className="text-[20px] sm:text-[24px]" style={{color:'var(--brand-700)'}} />
            </div>
            <div className="mt-2 text-center">
              <div className="text-lg sm:text-xl font-bold" style={{color:'var(--brand-900)'}}>100%</div>
              <div className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">ความพึงพอใจ</div>
            </div>
          </div>

          {/* 5 Years Warranty */}
          <div className="flex flex-col items-center text-gray-700">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full ring-1 ring-[var(--brand-100)] bg-white flex items-center justify-center">
              <FaShieldAlt className="text-[20px] sm:text-[24px]" style={{color:'var(--brand-700)'}} />
            </div>
            <div className="mt-2 text-center">
              <div className="text-lg sm:text-xl font-bold" style={{color:'var(--brand-900)'}}>5</div>
              <div className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">ปี รับประกัน</div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section (full-bleed) */}
      <section className="relative">
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
              preload="metadata"
              ref={videoRef}
            />
          </div>
        </div>
      </section>

      {/* ROOVTECT SOLUTION Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 text-white" style={{backgroundColor: '#314874'}}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold italic mb-6 sm:mb-8">
            SP KANSARD ปฏิวัติการต่อเติม<br />
            หลังคาจอดรถให้มีดีไซน์
          </h2>
          
          <p className="text-lg sm:text-xl mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed opacity-90">
            ความก้าวหน้าของนวัตกรรมกันสาดและโรงจอดรถ ที่จะเปลี่ยนมุมมองการตกแต่งบ้านของคุณ เปลี่ยนบ้านธรรมดาให้กลายเป็นบ้านที่มีสไตล์ 
            ตอบโจทย์ผู้เชี่ยวชาญ ออกแบบจากสถาปนิกผู้เชี่ยวชาญเรื่องความงามและการใช้งาน
          </p>

          <div className="text-left max-w-3xl mx-auto mb-12 space-y-4">
            <div className="flex items-start">
              <span className="text-white mr-3 mt-1">•</span>
              <span className="text-base sm:text-lg">รับติดตั้งหลังคาโรงจอดรถทุกรูปแบบ ป้องกันแสงแดด ป้องกันความร้อนได้อย่างมีประสิทธิภาพ</span>
            </div>
            <div className="flex items-start">
              <span className="text-white mr-3 mt-1">•</span>
              <span className="text-base sm:text-lg">ต่อเติมกันสาดหน้าบ้านและข้างบ้าน ด้วยดีไซน์ที่สวยงาม ลงตัวกับสถาปัตยกรรมของบ้านคุณ</span>
            </div>
            <div className="flex items-start">
              <span className="text-white mr-3 mt-1">•</span>
              <span className="text-base sm:text-lg">ใช้วัสดุคุณภาพสูงที่ทนทาน ออกแบบได้ตามความต้องการเฉพาะบุคคล</span>
            </div>
            <div className="flex items-start">
              <span className="text-white mr-3 mt-1">•</span>
              <span className="text-base sm:text-lg">มีทีมงานมืออาชีพตลอด 35 ปี พร้อมให้คำปรึกษาและบริการที่ดีที่สุดเพื่อคุณ</span>
            </div>
          </div>

          {/* Decorative Element */}
          <div className="mb-8">
            <div className="w-16 h-1 bg-white mx-auto"></div>
          </div>

          {/* Service Categories */}
          <div className="mb-12">
            <p className="text-lg font-medium mb-6">
              <span className="mx-4">Prefab Steel Garage & Canopy</span>
              <span className="text-gray-300">|</span>
              <span className="mx-4">Aluminum Garage & Canopy</span>
              <span className="text-gray-300">|</span>
              <span className="mx-4">Facade</span>
            </p>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <a
              href="https://line.me/R/ti/p/@spkansard"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-200 hover:bg-white text-gray-800 font-semibold py-3 px-8 rounded-full transition-all duration-300 text-base"
            >
              LINE ›
            </a>
            <a
              href="tel:021368899"
              className="bg-gray-200 hover:bg-white text-gray-800 font-semibold py-3 px-8 rounded-full transition-all duration-300 text-base"
            >
              CALL ›
            </a>
            <a
              href="/free-service"
              className="bg-gray-200 hover:bg-white text-gray-800 font-semibold py-3 px-8 rounded-full transition-all duration-300 text-base"
            >
              บริการฟรี ›
            </a>
          </div>
        </div>
      </section>

      {/* Our Work Portfolio Section - Full Width */}
      <PortfolioSection />

      {/* Price Calculator Section - Full Width Sharp Edges */}
      <section
        className="text-center p-8 sm:p-12 lg:p-16 text-white"
        style={{
          background: "linear-gradient(to right, #1E2E4F, #31487A)",
        }}
      >
        {/* Main Price Calculator Focus */}
        <div className="mb-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
            ประเมินราคากันสาด
          </h2>
          <div className="w-16 h-0.5 bg-white mx-auto mb-4"></div>
          <p className="text-lg sm:text-xl mb-6 max-w-3xl mx-auto">
            คำนวณราคาทันที ด้วยเครื่องมือออนไลน์ที่แม่นยำ
          </p>

          {/* Main Calculator CTA */}
          <a
            href="/calculator"
            className="inline-flex items-center justify-center bg-white hover:bg-gray-100 font-bold py-4 px-8 rounded-full transition-all duration-300 text-lg shadow-lg transform hover:-translate-y-1 mb-8"
            style={{ color: "#1E2E4F" }}
          >
            <FaCalculator className="w-5 h-5 mr-3" />
            คำนวณราคาทันที
          </a>
        </div>

        {/* Compact Consultation Section */}
        <div className="border-t border-white/20 pt-6">
          <h3 className="text-xl font-semibold mb-3">ต้องการคำปรึกษา?</h3>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:02-136-8899"
              className="inline-flex items-center justify-center bg-white/20 hover:bg-white/30 border border-white text-white font-medium py-2.5 px-6 rounded-full transition-all duration-300 backdrop-blur-sm"
            >
              <FaPhone className="w-4 h-4 mr-2" />
              โทร 02-136-8899
            </a>
            <a
              href="https://line.me/R/ti/p/@spkansard"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white/20 hover:bg-white/30 border border-white text-white font-medium py-2.5 px-6 rounded-full transition-all duration-300 backdrop-blur-sm"
            >
              <SiLine className="w-4 h-4 mr-2" />
              LINE @spkansard
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}