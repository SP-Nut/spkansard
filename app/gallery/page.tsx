import Image from "next/image";
import Link from "next/link";
import { FaHome, FaChevronRight, FaEye, FaPhone } from "react-icons/fa";

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
  return (
    <div className="bg-white">
      {/* Hero (match materials layout) */}
      <section className="relative bg-gradient-to-r from-[#1E2E4F] to-[#314874] text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm mb-6 sm:mb-8">
            <Link href="/" className="hover:text-white/80 transition-colors">
              <FaHome className="w-4 h-4" />
            </Link>
            <FaChevronRight className="w-3 h-3 text-white/70" />
            <span className="text-white/70">แกลเลอรี</span>
          </nav>

          {/* Title + Subtitle + CTAs */}
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">แกลเลอรีผลงาน</h1>
            <p className="text-lg sm:text-xl text-[#eaf4ff] max-w-3xl mx-auto">
              รวมภาพผลงานติดตั้งจริงจากทีมงานของเรา ทั้งกันสาดหน้าบ้าน หลังบ้าน ข้างบ้าน และโรงจอดรถ
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
                ติดต่อช่าง
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery-grid" className="py-6 sm:py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Landscape grid: fixed 16:9 cards; caption appears on hover */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
            {galleryData.map((item) => (
              <div key={item.id} className="group w-full">
                <div className="relative w-full overflow-hidden rounded-none" style={{ aspectRatio: "16/9" }}>
                  <Image
                    src={item.image}
                    alt={item.alt || "รูปผลงาน"}
                    fill
                    className="object-cover transition-transform duration-300"
                    sizes="33vw"
                    priority={false}
                  />
                  {/* Hover darken layer */}
                  <div className="absolute inset-0 bg-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:bg-black/40 pointer-events-none" />
                  {/* Centered caption on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="text-white text-sm sm:text-base font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] text-center px-3">
                      {item.alt || "ผลงานติดตั้งกันสาด"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
