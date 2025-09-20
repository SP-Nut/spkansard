"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  FaHome, 
  FaChevronRight, 
  FaShieldAlt, 
  FaTools, 
  FaClock, 
  FaCheckCircle,
  FaPhone,
  FaFileAlt,
  FaPlay,
  FaPause,
  FaExpand
} from "react-icons/fa";
import { SiLine } from "react-icons/si";

// Types for portfolio projects
interface Project {
  id: string;
  category: string; // ประเภทงาน เช่น กันสาด/โรงรถ/ระแนง
  name: string; // ชื่อโปรเจคท์/ชื่องาน
  shortDescription: string; // คำโปรยสั้น
  description: string; // รายละเอียดงาน
  images: string[];
  videos?: string[];
  features: string[]; // ไฮไลท์/จุดเด่นของงานนี้
  specifications: {
    material: string; // วัสดุหลัก
    installation: string; // ระยะเวลาติดตั้ง
    area?: string; // ขนาดพื้นที่โดยประมาณ
  };
  location?: string; // ทำที่เขต/จังหวัดไหน
  isFeatured?: boolean; // ใช้แทน popular/bestseller ในบริบทธรรมดา
}

// Sample portfolio data
const portfolioCategories: Record<string, Project[]> = {
  "กันสาดหน้าบ้าน": [
    {
      id: "metal-sheet",
      category: "กันสาดหน้าบ้าน",
      name: "กันสาดเมทัลชีท",
      shortDescription: "แข็งแรง ทนทาน กันแสงแดดได้ดี",
      description: "กันสาดเมทัลชีทคุณภาพสูง ทำจากวัสดุเกรดพรีเมียม ทนทานต่อสภาพอากาศ ป้องกันแสงแดดและฝนได้อย่างมีประสิทธิภาพ",
      images: ["/herosection/01.jpg", "/herosection/02.jpg", "/herosection/03.jpg"],
      videos: ["/video.mp4"],
      features: ["กันแสงแดด 100%", "ทนทานต่อสภาพอากาศ", "ติดตั้งง่าย", "ราคาประหยัด"],
      specifications: {
        material: "เมทัลชีท เกรด A",
        installation: "1-2 วัน",
        area: "ประมาณ 20-30 ตร.ม."
      },
      location: "จตุจักร กรุงเทพฯ",
      isFeatured: true
    },
    {
      id: "polycarbonate",
      category: "กันสาด",
      name: "กันสาดโพลีคาร์บอเนต",
      shortDescription: "โปร่งใส ให้แสงธรรมชาติ น้ำหนักเบา",
      description: "กันสาดโพลีคาร์บอเนตใส ให้แสงธรรมชาติผ่านได้ พร้อมกันรังสี UV น้ำหนักเบา แข็งแรงกว่ากระจกทั่วไป",
      images: ["/herosection/04.jpg", "/herosection/05.jpg", "/herosection/01.jpg"],
      features: ["โปร่งใส", "กัน UV 99%", "น้ำหนักเบา", "แข็งแรงกว่ากระจก"],
      specifications: {
        material: "โพลีคาร์บอเนต เกรดพรีเมียม",
        installation: "1-2 วัน",
        area: "ประมาณ 15-25 ตร.ม."
      },
      location: "นนทบุรี",
      isFeatured: true
    }
  ],
  "กันสาดหลังบ้าน": [
    {
      id: "single-carport",
      category: "กันสาดหลังบ้าน",
      name: "กันสาดหลังบ้าน ขนาดกะทัดรัด",
      shortDescription: "ต่อเติมหลังบ้าน เพิ่มพื้นที่ใช้สอย กันแดดกันฝน",
      description: "กันสาดหลังบ้านสำหรับพื้นที่ทั่วไป โครงสร้างแข็งแรง วัสดุคุณภาพสูง ช่วยเพิ่มพื้นที่อเนกประสงค์",
      images: ["/herosection/02.jpg", "/herosection/03.jpg", "/herosection/04.jpg"],
      features: ["ขนาดมาตรฐาน", "โครงสร้างแข็งแรง", "ติดตั้งรวดเร็ว", "ออกแบบสวยงาม"],
      specifications: {
        material: "โครงเหล็ก + หลังคาเมทัลชีท",
        installation: "2-3 วัน",
        area: "จอด 1 คัน"
      },
      location: "บางเขน กรุงเทพฯ",
      isFeatured: true
    },
    {
      id: "double-carport",
      category: "กันสาดหลังบ้าน",
      name: "กันสาดหลังบ้าน ขนาดใหญ่",
      shortDescription: "พื้นที่หลังบ้านแบบยาว รองรับกิจกรรมได้มาก",
      description: "กันสาดหลังบ้านสำหรับพื้นที่ยาวหรือกว้าง เหมาะกับครอบครัวใหญ่ ใช้งานอเนกประสงค์",
      images: ["/herosection/05.jpg", "/herosection/01.jpg", "/herosection/02.jpg"],
      features: ["พื้นที่กว้าง", "รองรับรถ 2 คัน", "อเนกประสงค์", "โครงสร้างแข็งแกร่ง"],
      specifications: {
        material: "โครงเหล็ก + หลังคาเมทัลชีท",
        installation: "3-4 วัน",
        area: "จอด 2 คัน"
      },
      location: "ปทุมธานี",
      isFeatured: true
    }
  ],
  "กันสาดข้างบ้าน": [
    {
      id: "wooden-louver",
      category: "กันสาดข้างบ้าน",
      name: "กันสาดข้างบ้าน แบบเรียบ",
      shortDescription: "เพิ่มร่มเงาทางเดินด้านข้างบ้าน",
      description: "ต่อเติมทางเดินข้างบ้านเพื่อกันแดดกันฝน เดินสะดวกขึ้นในทุกสภาพอากาศ",
      images: ["/herosection/03.jpg", "/herosection/04.jpg", "/herosection/05.jpg"],
      features: ["ความเป็นธรรมชาติ", "สวยงาม", "ปรับแสงได้", "ระบายอากาศดี"],
      specifications: {
        material: "ไม้เนื้อแข็ง ผ่านการปรับสภาพ",
        installation: "2-3 วัน",
        area: "ปรับตามหน้างาน"
      },
      location: "พระโขนง กรุงเทพฯ"
    }
  ],
  "ทางเดิน": [
    {
      id: "aluminum-louver",
      category: "ทางเดิน",
      name: "กันสาดทางเดิน",
      shortDescription: "กันฝนตลอดแนวทางเดิน เชื่อมต่ออาคาร",
      description: "งานกันสาดทางเดินสำหรับเชื่อมต่อส่วนต่าง ๆ ของบ้านหรืออาคาร ป้องกันฝนสาด เดินสบาย",
      images: ["/herosection/01.jpg", "/herosection/02.jpg", "/herosection/03.jpg"],
      features: ["กันฝนได้ดี", "แข็งแรง", "ดูแลง่าย"],
      specifications: {
        material: "อลูมิเนียมอัลลอย",
        installation: "1-2 วัน",
        area: "ตามแนวทางเดิน"
      },
      location: "สมุทรปราการ"
    }
  ],
  "กันสาดหน้าต่าง": [
    {
      id: "polycarbonate-window",
      category: "กันสาดหน้าต่าง",
      name: "กันสาดหน้าต่าง โพลีคาร์บอเนต",
      shortDescription: "ลดฝนสาดเข้าหน้าต่าง รับแสงสว่าง",
      description: "กันสาดหน้าต่างขนาดกะทัดรัด ให้แสงธรรมชาติ น้ำหนักเบา ไม่บังทัศนียภาพ",
      images: ["/herosection/04.jpg", "/herosection/05.jpg", "/herosection/01.jpg"],
      features: ["โปร่งแสง", "กัน UV", "น้ำหนักเบา"],
      specifications: {
        material: "โพลีคาร์บอเนต",
        installation: "ครึ่งวัน-1 วัน",
        area: "ต่อบาน"
      },
      location: "นนทบุรี",
      isFeatured: true
    }
  ],
  "โรงจอดรถ": [
    {
      id: "carport-single",
      category: "โรงจอดรถ",
      name: "โรงจอดรถ 1 คัน",
      shortDescription: "โครงสร้างแข็งแรง ขนาดพอดีคัน",
      description: "โรงจอดรถสำหรับ 1 คัน โครงสร้างเหล็ก หลังคาเมทัลชีท ติดตั้งรวดเร็ว",
      images: ["/herosection/02.jpg", "/herosection/03.jpg", "/herosection/04.jpg"],
      features: ["โครงสร้างแข็งแรง", "ติดตั้งรวดเร็ว", "ดูแลง่าย"],
      specifications: {
        material: "เหล็ก + เมทัลชีท",
        installation: "2-3 วัน",
        area: "จอด 1 คัน"
      },
      location: "ลาดพร้าว กรุงเทพฯ",
      isFeatured: true
    },
    {
      id: "carport-double",
      category: "โรงจอดรถ",
      name: "โรงจอดรถ 2 คัน",
      shortDescription: "พื้นที่กว้าง ใช้งานอเนกประสงค์",
      description: "โรงจอดรถสำหรับ 2 คัน รองรับการใช้งานหลายรูปแบบ พื้นที่โปร่ง",
      images: ["/herosection/05.jpg", "/herosection/01.jpg", "/herosection/02.jpg"],
      features: ["พื้นที่กว้าง", "แข็งแรง", "ออกแบบปรับแต่งได้"],
      specifications: {
        material: "เหล็ก + เมทัลชีท",
        installation: "3-4 วัน",
        area: "จอด 2 คัน"
      },
      location: "รังสิต ปทุมธานี"
    }
  ]
};

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ทั้งหมด");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const categories = ["ทั้งหมด", ...Object.keys(portfolioCategories)];
  const currentProjects = selectedCategory === "ทั้งหมด"
    ? Object.values(portfolioCategories).flat()
    : (portfolioCategories[selectedCategory as keyof typeof portfolioCategories] || []);

  const handleVideoToggle = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  return (
    <div className="font-prompt bg-gray-50">
      {/* Hero Section with Breadcrumb */}
      <section className="relative bg-gradient-to-r from-[#1E2E4F] to-[#314874] text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm mb-6 sm:mb-8">
            <Link href="/" className="hover:text-white/80 transition-colors">
              <FaHome className="w-4 h-4" />
            </Link>
            <FaChevronRight className="w-3 h-3 text-white/70" />
            <span className="text-white/80">ผลงานของเรา</span>
          </nav>

          {/* Title */}
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">ผลงานติดตั้ง</h1>
            <p className="text-lg sm:text-xl text-[#eaf4ff] max-w-3xl mx-auto">รวมตัวอย่างงานจริง กันสาด โรงรถ และระแนง จากหน้างานลูกค้า</p>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setSelectedProject(null);
                }}
                className={`px-6 py-4 text-sm sm:text-base font-medium border-b-2 transition-colors whitespace-nowrap ${
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
      </section>

      {/* Products Grid */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!selectedProject ? (
            <>
              {/* Category Description */}
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4" style={{color:'var(--brand-900)'}}>
                  {selectedCategory}
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  {selectedCategory === "ทั้งหมด" && "รวมผลงานทั้งหมดจากทุกหมวดหมู่"}
                  {selectedCategory === "กันสาดหน้าบ้าน" && "กันสาดสำหรับหน้าบ้าน เพิ่มความโดดเด่นและกันแดดกันฝน"}
                  {selectedCategory === "กันสาดหลังบ้าน" && "กันสาดหลังบ้าน เพิ่มพื้นที่ใช้สอยอเนกประสงค์"}
                  {selectedCategory === "กันสาดข้างบ้าน" && "กันสาดทางเดินด้านข้าง เดินสะดวกทุกสภาพอากาศ"}
                  {selectedCategory === "ทางเดิน" && "กันสาดตามแนวทางเดิน เชื่อมต่อพื้นที่ให้ใช้งานได้ต่อเนื่อง"}
                  {selectedCategory === "กันสาดหน้าต่าง" && "กันฝนสาดเข้าหน้าต่าง รับแสงธรรมชาติ ไม่บังวิว"}
                  {selectedCategory === "โรงจอดรถ" && "โรงจอดรถ ปกป้องรถจากแดดและฝน ใช้งานได้อเนกประสงค์"}
                </p>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {currentProjects.map((project) => (
                  <div 
                    key={project.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    {/* Product Image */}
                    <div className="relative h-48 sm:h-56 overflow-hidden">
                      <Image
                        src={project.images[0]}
                        alt={project.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Featured badge */}
                      <div className="absolute top-3 left-3 space-y-2">
                        {project.isFeatured && (
                          <span className="bg-[#1E2E4F] text-white px-2 py-1 text-xs font-medium rounded">แนะนำ</span>
                        )}
                      </div>
                      {/* Caption gradient for location/area */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent text-white">
                        <div className="text-xs opacity-90">{project.location || "พื้นที่กรุงเทพฯ"}</div>
                        <div className="text-sm font-medium">{project.specifications.area || "ขนาดตามหน้างาน"}</div>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold mb-2" style={{color:'var(--brand-900)'}}>
                        {project.name}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base mb-4">
                        {project.shortDescription}
                      </p>

                      {/* Highlights */}
                      <div className="space-y-2 mb-4">
                        {project.features.slice(0, 3).map((feature, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-600">
                            <FaCheckCircle className="w-4 h-4 text-[#314874] mr-2 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>

                      {/* View Details Button */}
                      <button className="w-full bg-[#314874] hover:bg-[#1E2E4F] text-white py-2 px-4 rounded-lg font-medium transition-colors">ดูรายละเอียด</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Project Detail View */
            <div className="max-w-6xl mx-auto">
              {/* Back Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="flex items-center text-[#314874] hover:text-[#1E2E4F] mb-8 font-medium"
              >
                <FaChevronRight className="w-4 h-4 mr-2 rotate-180" />
                กลับไปยังรายการผลงาน
              </button>

              {/* Project Detail Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
                {/* Images and Videos */}
                <div className="space-y-4">
                  {/* Main Image/Video */}
                  <div className="relative aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden">
                    {selectedProject.videos && selectedProject.videos.length > 0 && currentImageIndex === selectedProject.images.length ? (
                      <div className="relative w-full h-full">
                        <video
                          ref={videoRef}
                          src={selectedProject.videos[0]}
                          className="w-full h-full object-cover"
                          controls={false}
                          muted
                          loop
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button
                            onClick={handleVideoToggle}
                            className="bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition-colors"
                          >
                            {isVideoPlaying ? <FaPause className="w-6 h-6" /> : <FaPlay className="w-6 h-6" />}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <Image
                        src={selectedProject.images[currentImageIndex]}
                        alt={selectedProject.name}
                        fill
                        className="object-cover"
                      />
                    )}
                    
                    {/* Expand Button */}
                    <button className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded">
                      <FaExpand className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Thumbnails */}
                  <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
                      {selectedProject.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                          currentImageIndex === index ? 'border-[#314874]' : 'border-gray-200'
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${selectedProject.name} ${index + 1}`}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                      {selectedProject.videos && selectedProject.videos.length > 0 && (
                      <button
                        onClick={() => setCurrentImageIndex(selectedProject.images.length)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 bg-gray-900 flex items-center justify-center ${
                          currentImageIndex === selectedProject.images.length ? 'border-[#314874]' : 'border-gray-200'
                        }`}
                      >
                        <FaPlay className="w-6 h-6 text-white" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Project Information */}
                <div className="space-y-6">
                  {/* Header */}
                  <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4" style={{color:'var(--brand-900)'}}>
                      {selectedProject.name}
                    </h1>
                    <p className="text-lg text-gray-600 mb-4">
                      {selectedProject.description}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
                      <div><span className="text-[#314874]">พื้นที่:</span> {selectedProject.specifications.area || "ตามหน้างาน"}</div>
                      <div><span className="text-[#314874]">ระยะเวลาติดตั้ง:</span> {selectedProject.specifications.installation}</div>
                      <div><span className="text-[#314874]">วัสดุหลัก:</span> {selectedProject.specifications.material}</div>
                      <div><span className="text-[#314874]">สถานที่:</span> {selectedProject.location || "กรุงเทพฯ และปริมณฑล"}</div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div>
                    <h3 className="text-lg font-bold mb-3" style={{color:'var(--brand-900)'}}>
                      ไฮไลท์ของงานนี้
                    </h3>
                    <div className="space-y-2">
                      {selectedProject.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <FaCheckCircle className="w-5 h-5 text-[#314874] mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* End of detail blocks for portfolio */}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{color:'var(--brand-900)'}}>
            พร้อมเริ่มโปรเจคท์ของคุณแล้วใช่ไหม?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            ติดต่อเราเพื่อรับคำปรึกษาฟรี และใบเสนอราคาที่ชัดเจน โปร่งใส
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
            <a
              href="tel:02-936-8841"
              className="flex items-center justify-center bg-[#314874] hover:bg-[#1E2E4F] text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              <FaPhone className="w-4 h-4 mr-2" />
              โทร 02-936-8841
            </a>
            
            <a
              href="https://line.me/R/ti/p/@spkansard"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center border-2 border-[#06C755]/50 text-[#06C755]/80 hover:bg-[#06C755]/8 py-3 px-6 rounded-lg font-medium transition-colors"
            >
              <SiLine className="w-4 h-4 mr-2" />
              LINE @spkansard
            </a>
            
            <a
              href="/contact"
              className="flex items-center justify-center border-2 border-[#314874] text-[#314874] hover:bg-[#314874] hover:text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              <FaFileAlt className="w-4 h-4 mr-2" />
              แบบฟอร์ม
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <FaShieldAlt className="w-4 h-4 mr-2 text-[#314874]" />
              รับประกันงาน 5 ปี
            </div>
            <div className="flex items-center">
              <FaClock className="w-4 h-4 mr-2 text-[#314874]" />
              บริการรวดเร็ว
            </div>
            <div className="flex items-center">
              <FaTools className="w-4 h-4 mr-2 text-[#314874]" />
              ทีมงานมืออาชีพ
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
