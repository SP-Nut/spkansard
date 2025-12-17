"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { FaHome, FaChevronRight, FaEye, FaPhone, FaTimes, FaChevronLeft, FaChevronRight as FaChevronRightIcon } from "react-icons/fa";

type GalleryItem = {
  id: string;
  image: string;
  alt?: string;
  w?: number;
  h?: number;
};

const galleryData: GalleryItem[] = [
  { id: "img-1", image: "/gallery/sp-kansard-กันสาดไวนิลหน้าบ้าน.webp", alt: "กันสาดไวนิลหน้าบ้าน", w: 1200, h: 900 },
  { id: "img-2", image: "/gallery/sp-kansard-กันสาดโปร่งแสงหน้าบ้าน.webp", alt: "กันสาดโปร่งแสงหน้าบ้าน", w: 1200, h: 900 },
  { id: "img-3", image: "/gallery/sp-kansard-กันสาดไวนิลบ้านสวย.webp", alt: "กันสาดไวนิลบ้านสวย", w: 1200, h: 900 },
  { id: "img-4", image: "/gallery/sp-kansard-กันสาดโปร่งแสงบ้านสวย.webp", alt: "กันสาดโปร่งแสงบ้านสวย", w: 1200, h: 900 },
  { id: "img-5", image: "/gallery/sp-kansard-กันสาดไวนิลโมเดิร์น.webp", alt: "กันสาดไวนิลโมเดิร์น", w: 1200, h: 900 },
  { id: "img-6", image: "/gallery/sp-kansard-กันสาดโปร่งแสงโมเดิร์น.webp", alt: "กันสาดโปร่งแสงโมเดิร์น", w: 1200, h: 900 },
  { id: "img-7", image: "/gallery/sp-kansard-กันสาดเมทัลชีท.webp", alt: "กันสาดเมทัลชีท", w: 1200, h: 900 },
  { id: "img-8", image: "/gallery/sp-kansard-กันสาดเมทัลชีทคุณภาพ.webp", alt: "กันสาดเมทัลชีทคุณภาพ", w: 1200, h: 900 },
  { id: "img-9", image: "/gallery/sp-kansard-กันสาดเมทัลชีทดีไซน์สวย.webp", alt: "กันสาดเมทัลชีทดีไซน์สวย", w: 1200, h: 900 },
  { id: "img-10", image: "/gallery/sp-kansard-กันสาดเมทัลชีททนแดดฝน.webp", alt: "กันสาดเมทัลชีททนแดดฝน", w: 1200, h: 900 },
  { id: "img-11", image: "/gallery/sp-kansard-กันสาดอลูมิเนียมดีไซน์สวย.webp", alt: "กันสาดอลูมิเนียมดีไซน์สวย", w: 1200, h: 900 },
  { id: "img-12", image: "/gallery/sp-kansard-กันสาดอลูมิเนียมติดตั้งเร็ว.webp", alt: "กันสาดอลูมิเนียมติดตั้งเร็ว", w: 1200, h: 900 },
  { id: "img-13", image: "/gallery/sp-kansard-กันสาดและระแนงไม้.webp", alt: "กันสาดและระแนงไม้", w: 1200, h: 900 },
  { id: "img-14", image: "/gallery/sp-kansard-กันสาดเมทัลชีทมาตรฐานมอกระแนงไม้.webp", alt: "กันสาดเมทัลชีทมาตรฐานมอกระแนงไม้", w: 1200, h: 900 },
  { id: "img-15", image: "/gallery/sp-kansard-กันสาดมาตรฐานมอกฝ้าระแนง.webp", alt: "กันสาดมาตรฐานมอกฝ้าระแนง", w: 1200, h: 900 },
  { id: "img-16", image: "/gallery/sp-kansard-กันสาดโครงสร้างแข็งแรง.webp", alt: "กันสาดโครงสร้างแข็งแรง", w: 1200, h: 900 },
  { id: "img-17", image: "/gallery/sp-kansard-กันสาดมาตรฐานมืออาชีพ.webp", alt: "กันสาดมาตรฐานมืออาชีพ", w: 1200, h: 900 },
  { id: "img-18", image: "/gallery/sp-kansard-กันสาดไวนิลโรงรถ.webp", alt: "กันสาดไวนิลโรงรถ", w: 1200, h: 900 },
  { id: "img-19", image: "/gallery/sp-kansard-กันสาดโปร่งแสง.webp", alt: "กันสาดโปร่งแสง", w: 1200, h: 900 },
  { id: "img-20", image: "/gallery/sp-kansard-กันสาดโปร่งแสงกันฝน.webp", alt: "กันสาดโปร่งแสงกันฝน", w: 1200, h: 900 },
  { id: "img-21", image: "/gallery/sp-kansard-กันสาดโปร่งแสงคุณภาพ.webp", alt: "กันสาดโปร่งแสงคุณภาพ", w: 1200, h: 900 },
  { id: "img-22", image: "/gallery/sp-kansard-กันสาดโปร่งแสงมาตรฐาน.webp", alt: "กันสาดโปร่งแสงมาตรฐาน", w: 1200, h: 900 },
  { id: "img-23", image: "/gallery/sp-kansard-กันสาดโปร่งแสงสวยงาม.webp", alt: "กันสาดโปร่งแสงสวยงาม", w: 1200, h: 900 },
  { id: "img-24", image: "/gallery/sp-kansard-กันสาดบ้านและออฟฟิศ.webp", alt: "กันสาดบ้านและออฟฟิศ", w: 1200, h: 900 },
  { id: "img-25", image: "/gallery/sp-kansard-กันสาดราคาดีคุ้มค่า.webp", alt: "กันสาดราคาดีคุ้มค่า", w: 1200, h: 900 },
  { id: "img-26", image: "/gallery/sp-kansard-กันสาดไวนิล.webp", alt: "กันสาดไวนิล", w: 1200, h: 900 },
  { id: "img-27", image: "/gallery/sp-kansard-กันสาดไวนิลคุณภาพสูง.webp", alt: "กันสาดไวนิลคุณภาพสูง", w: 1200, h: 900 },
  { id: "img-28", image: "/gallery/sp-kansard-กันสาดไวนิลดีไซน์สวย.webp", alt: "กันสาดไวนิลดีไซน์สวย", w: 1200, h: 900 },
  { id: "img-29", image: "/gallery/sp-kansard-กันสาดไวนิลติดตั้งเร็ว.webp", alt: "กันสาดไวนิลติดตั้งเร็ว", w: 1200, h: 900 },
  { id: "img-30", image: "/gallery/sp-kansard-กันสาดไวนิลรีวิวผลงาน.webp", alt: "กันสาดไวนิลรีวิวผลงาน", w: 1200, h: 900 },
];

export default function GalleryPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // โทนสีจากรูป (เข้ม/กลาง) - เหมือน Portfolio
  const BRAND_DARK = "#1E2E4F";
  const BRAND_MID = "#314874";

  // Smooth scroll function
  const scrollToGallery = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const gallerySection = document.getElementById('gallery-grid');
    if (gallerySection) {
      gallerySection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryData.length);
  }, []);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryData.length) % galleryData.length);
  }, []);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [lightboxOpen, nextImage, prevImage, closeLightbox]);

  return (
    <div className="min-h-screen font-prompt bg-gray-50 overflow-x-hidden">
      {/* ลบ background pattern ออก */}
      {/* Hero Section - เหมือน Materials */}
      <section className="relative bg-gradient-to-r from-[#1E2E4F] to-[#314874] text-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm mb-6 sm:mb-8">
            <Link href="/" className="hover:text-white/80 transition-colors">
              <FaHome className="w-4 h-4" />
            </Link>
            <FaChevronRight className="w-3 h-3 text-white/70" />
            <span className="text-white/80">แกลเลอรี</span>
          </nav>

          {/* Title + Subtitle + CTAs */}
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">แกลเลอรีผลงาน</h1>
            <p className="text-lg sm:text-xl text-[#eaf4ff] max-w-3xl mx-auto">
              รวมภาพผลงานติดตั้งจริงจากทีมงานของเรา ทั้งกันสาดหน้าบ้าน หลังบ้าน ข้างบ้าน และโรงจอดรถ 
              <br className="hidden sm:block" />
              ดู<Link href="/materials" className="underline hover:text-white transition-colors mx-1">วัสดุที่ใช้งาน</Link>และ<Link href="/contact" className="underline hover:text-white transition-colors mx-1">ติดต่อสอบถาม</Link>
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#gallery-grid"
                onClick={scrollToGallery}
                className="bg-white text-[#1E2E4F] hover:bg-gray-100 px-6 py-3 rounded-lg text-sm sm:text-base font-semibold transition-colors inline-flex items-center justify-center gap-2"
              >
                <FaEye className="h-4 w-4" />
                ดูผลงาน
              </a>
              <a
                href="/contact"
                className="border border-white text-white hover:bg-white hover:text-[#1E2E4F] px-6 py-3 rounded-lg text-sm sm:text-base font-semibold transition-colors inline-flex items-center justify-center gap-2"
              >
                <FaPhone className="h-4 w-4" />
                ติดต่อเรา
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery-grid" className="pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 lg:pb-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-1 sm:px-2 lg:px-4">
          
          {/* Responsive grid: 1 column on mobile, 2 on tablet, 3 on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 sm:gap-2 lg:gap-3">
            {galleryData.map((item, index) => (
              <div key={item.id} className="group w-full cursor-pointer" onClick={() => openLightbox(index)}>
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <Image
                    src={item.image}
                    alt={item.alt || "รูปผลงาน"}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={false}
                  />
                  {/* Hover darken layer */}
                  <div className="absolute inset-0 bg-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:bg-black/40 pointer-events-none" />
                  {/* Centered caption on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="text-white text-xs sm:text-sm lg:text-base font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] text-center px-2 sm:px-3">
                      {item.alt || "ผลงานติดตั้งกันสาด"}
                    </span>
                  </div>
                  
                  {/* Category badge - ลบออกจากมือถือตามที่ขอ */}
                  {/* <div className="absolute top-2 left-2 sm:hidden">
                    <span 
                      className="text-white text-xs px-3 py-1 rounded-full font-medium"
                      style={{ backgroundColor: BRAND_MID }}
                    >
                      {item.category}
                    </span>
                  </div> */}
                </div>
              </div>
            ))}
          </div>
          
          {/* View All Button */}
          <div className="mt-10 text-center">
            <a
              href="/contact"
              className="group relative inline-flex items-center justify-center rounded-full px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300"
              style={{
                backgroundImage: `linear-gradient(90deg, ${BRAND_MID}, ${BRAND_DARK})`,
              }}
            >
              <span className="relative z-10 mr-2">ปรึกษางานฟรี</span>
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

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50" onClick={closeLightbox}>
          <div className="relative max-w-4xl max-h-full p-4" onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white p-2 rounded-full transition-all duration-200"
            >
              <FaTimes className="w-5 h-5" />
            </button>
            
            {/* Previous button */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white p-3 rounded-full transition-all duration-200"
            >
              <FaChevronLeft className="w-6 h-6" />
            </button>
            
            {/* Next button */}
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white p-3 rounded-full transition-all duration-200"
            >
              <FaChevronRightIcon className="w-6 h-6" />
            </button>
            
            {/* Main image */}
            <div className="relative w-full h-full">
              <Image
                src={galleryData[currentImageIndex]?.image || ""}
                alt={galleryData[currentImageIndex]?.alt || "รูปผลงาน"}
                width={1200}
                height={900}
                className="max-w-full max-h-[80vh] object-contain mx-auto"
                priority
              />
            </div>
            
            {/* Image info */}
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p className="text-white text-lg font-medium mb-2">
                {galleryData[currentImageIndex]?.alt || "ผลงานติดตั้งกันสาด"}
              </p>
              <p className="text-white/70 text-sm">
                {currentImageIndex + 1} / {galleryData.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
