"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { FaHome, FaChevronRight, FaEye, FaPhone, FaTimes, FaChevronLeft, FaChevronRight as FaChevronRightIcon } from "react-icons/fa";
import { supabase } from "@/lib/supabase";

type GalleryItem = {
  id: string;
  image_url: string;
  title?: string | null;
  alt?: string | null;
  display_order?: number | null;
  created_at?: string;
};

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // โทนสีจากรูป (เข้ม/กลาง) - เหมือน Portfolio
  const BRAND_DARK = "#1E2E4F";
  const BRAND_MID = "#314874";

  useEffect(() => {
    let isMounted = true;
    const emptyStateTimeout = window.setTimeout(() => {
      if (!isMounted) return;
      setLoading(false);
      setLoadError(null);
    }, 1500);

    const fetchGalleryItems = async () => {
      try {
        setLoading(true);
        setLoadError(null);

        const { data, error } = await supabase
          .from("gallery_items")
          .select("id,title,alt,image_url,display_order,created_at")
          .eq("is_active", true)
          .order("display_order", { ascending: true })
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (!isMounted) return;
        setGalleryItems(data || []);
      } catch (error) {
        console.error("Error fetching gallery items:", error);
        if (!isMounted) return;
        setGalleryItems([]);
        setLoadError(null);
      } finally {
        window.clearTimeout(emptyStateTimeout);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchGalleryItems();

    return () => {
      isMounted = false;
      window.clearTimeout(emptyStateTimeout);
    };
  }, []);

  const currentImage = galleryItems[currentImageIndex];
  const getImageAlt = (item?: GalleryItem) => item?.alt || item?.title || "รูปผลงานติดตั้งกันสาด";

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
    setCurrentImageIndex((prev) => (prev + 1) % galleryItems.length);
  }, [galleryItems.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  }, [galleryItems.length]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (galleryItems.length === 0) return;
      
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
  }, [lightboxOpen, galleryItems.length, nextImage, prevImage, closeLightbox]);

  return (
    <div className="min-h-screen font-prompt bg-gray-50 overflow-x-hidden pt-16 sm:pt-20">
      {/* ลบ background pattern ออก */}
      {/* Hero Section - เหมือน Materials */}
      <section className="relative bg-linear-to-r from-[#1E2E4F] to-[#314874] text-white py-8 sm:py-12 lg:py-16">
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
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 sm:gap-2 lg:gap-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="w-full animate-pulse bg-gray-200" style={{ aspectRatio: "4/3" }} />
              ))}
            </div>
          ) : loadError ? (
            <div className="rounded-lg bg-white p-8 text-center text-gray-600 shadow-sm">
              {loadError}
            </div>
          ) : galleryItems.length === 0 ? (
            <div className="rounded-lg bg-white p-8 text-center text-gray-600 shadow-sm">
              ยังไม่มีรูปผลงานในระบบ
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 sm:gap-2 lg:gap-3">
              {galleryItems.map((item, index) => (
                <div key={item.id} className="group w-full cursor-pointer" onClick={() => openLightbox(index)}>
                  <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
                    <Image
                      src={item.image_url}
                      alt={getImageAlt(item)}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={false}
                    />
                    <div className="absolute inset-0 bg-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:bg-black/40 pointer-events-none" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <span className="text-white text-xs sm:text-sm lg:text-base font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] text-center px-2 sm:px-3">
                        {getImageAlt(item)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
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
      {lightboxOpen && currentImage && (
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
                src={currentImage.image_url}
                alt={getImageAlt(currentImage)}
                width={1200}
                height={900}
                className="max-w-full max-h-[80vh] object-contain mx-auto"
                priority
              />
            </div>
            
            {/* Image info */}
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p className="text-white text-lg font-medium mb-2">
                {getImageAlt(currentImage)}
              </p>
              <p className="text-white/70 text-sm">
                {currentImageIndex + 1} / {galleryItems.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
