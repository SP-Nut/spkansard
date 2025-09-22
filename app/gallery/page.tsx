"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { FaHome, FaChevronRight, FaEye, FaPhone, FaTimes, FaChevronLeft, FaChevronRight as FaChevronRightIcon } from "react-icons/fa";

type Category = "หน้าบ้าน" | "หลังบ้าน" | "ข้างบ้าน" | "โรงจอดรถ";

type GalleryItem = {
  id: string;
  image: string;
  alt?: string;
  category: Category;
  w?: number;
  h?: number;
};

const galleryData: GalleryItem[] = [
  { id: "img-1", image: "/herosection/01.jpg", alt: "กันสาดหน้าบ้าน", category: "หน้าบ้าน", w: 1080, h: 1350 },
  { id: "img-2", image: "/herosection/02.jpg", alt: "กันสาดหลังบ้าน", category: "หลังบ้าน", w: 1080, h: 1350 },
  { id: "img-3", image: "/herosection/03.jpg", alt: "กันสาดข้างบ้าน", category: "ข้างบ้าน", w: 1080, h: 1350 },
  { id: "img-4", image: "/herosection/04.jpg", alt: "กันสาดโรงจอดรถ", category: "โรงจอดรถ", w: 1080, h: 1350 },
  { id: "img-5", image: "/herosection/05.jpg", alt: "กันสาดหน้าบ้าน", category: "หน้าบ้าน", w: 1080, h: 1350 },
  { id: "img-6", image: "/herosection/02.jpg", alt: "กันสาดหลังบ้าน", category: "หลังบ้าน", w: 1080, h: 1350 },
  { id: "img-7", image: "/herosection/03.jpg", alt: "กันสาดข้างบ้าน", category: "ข้างบ้าน", w: 1080, h: 1350 },
  { id: "img-8", image: "/herosection/01.jpg", alt: "กันสาดโรงจอดรถ", category: "โรงจอดรถ", w: 1080, h: 1350 },
  // เพิ่มรูปเพิ่มเติม
  { id: "img-9", image: "/herosection/04.jpg", alt: "กันสาดหลังบ้าน", category: "หลังบ้าน", w: 1080, h: 1350 },
  { id: "img-10", image: "/herosection/05.jpg", alt: "กันสาดข้างบ้าน", category: "ข้างบ้าน", w: 1080, h: 1350 },
  { id: "img-11", image: "/herosection/02.jpg", alt: "กันสาดโรงจอดรถ", category: "โรงจอดรถ", w: 1080, h: 1350 },
  { id: "img-12", image: "/herosection/03.jpg", alt: "กันสาดหน้าบ้าน", category: "หน้าบ้าน", w: 1080, h: 1350 },
  { id: "img-13", image: "/herosection/01.jpg", alt: "กันสาดหลังบ้าน", category: "หลังบ้าน", w: 1080, h: 1350 },
  { id: "img-14", image: "/herosection/04.jpg", alt: "กันสาดข้างบ้าน", category: "ข้างบ้าน", w: 1080, h: 1350 },
  { id: "img-15", image: "/herosection/05.jpg", alt: "กันสาดโรงจอดรถ", category: "โรงจอดรถ", w: 1080, h: 1350 },
  { id: "img-16", image: "/herosection/03.jpg", alt: "กันสาดหน้าบ้าน", category: "หน้าบ้าน", w: 1080, h: 1350 },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | "ทั้งหมด">("ทั้งหมด");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // โทนสีจากรูป (เข้ม/กลาง) - เหมือน Portfolio
  const BRAND_DARK = "#1E2E4F";
  const BRAND_MID = "#314874";
  
  const categories: (Category | "ทั้งหมด")[] = ["ทั้งหมด", "หน้าบ้าน", "หลังบ้าน", "ข้างบ้าน", "โรงจอดรถ"];
  
  const filteredData = selectedCategory === "ทั้งหมด" 
    ? galleryData 
    : galleryData.filter(item => item.category === selectedCategory);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredData.length);
  }, [filteredData.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredData.length) % filteredData.length);
  }, [filteredData.length]);

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
      <section className="relative bg-gradient-to-r from-[#1E2E4F] to-[#314874] text-white py-12 sm:py-16 lg:py-20">
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
              ดู<Link href="/portfolio" className="underline hover:text-white transition-colors mx-1">รายละเอียดงาน</Link>และ<Link href="/materials" className="underline hover:text-white transition-colors mx-1">วัสดุที่ใช้</Link>
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#gallery-grid"
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

      {/* Filter & Search Section - เหมือน Materials */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Tabs */}
          <div className="flex items-center justify-between py-2 gap-4">
            <div className="flex-1 overflow-x-auto scrollbar-hide">
              <div className="flex space-x-1 min-w-max">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                      selectedCategory === category
                        ? 'border-[#314874] text-[#314874] bg-[#eaf4ff]'
                        : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Info Row */}
          <div className="pb-3">
            <div className="text-xs text-gray-500">พบผลงาน {filteredData.length} รายการ</div>
          </div>
        </div>
      </section>

      <section id="gallery-grid" className="pt-0 pb-12 sm:pb-16 lg:pb-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-1 sm:px-2 lg:px-4">
          
          {/* Responsive grid: 1 column on mobile, 2 on tablet, 3 on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 sm:gap-2 lg:gap-3">
            {filteredData.map((item, index) => (
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
              href="/portfolio"
              className="group relative inline-flex items-center justify-center rounded-full px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300"
              style={{
                backgroundImage: `linear-gradient(90deg, ${BRAND_MID}, ${BRAND_DARK})`,
              }}
            >
              <span className="relative z-10 mr-2">ดูผลงานเพิ่มเติม</span>
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
                src={filteredData[currentImageIndex]?.image || ""}
                alt={filteredData[currentImageIndex]?.alt || "รูปผลงาน"}
                width={1080}
                height={1350}
                className="max-w-full max-h-[80vh] object-contain mx-auto"
                priority
              />
            </div>
            
            {/* Image info */}
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p className="text-white text-lg font-medium mb-2">
                {filteredData[currentImageIndex]?.alt || "ผลงานติดตั้งกันสาด"}
              </p>
              <p className="text-white/70 text-sm">
                {currentImageIndex + 1} / {filteredData.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
