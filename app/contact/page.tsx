'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaHome, FaChevronRight, FaPhone, FaEnvelope, FaFax, FaGlobe, FaMapMarkerAlt, FaRoute } from 'react-icons/fa';
import { SiLine } from 'react-icons/si';
import StructuredData from '../components/StructuredData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    phone: '',
    email: '',
    lineId: '',
    services: [] as string[],
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleServiceChange = (service: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      services: checked 
        ? [...prev.services, service]
        : prev.services.filter(s => s !== service)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('ขอบคุณสำหรับการติดต่อ เราจะตอบกลับในเร็วๆ นี้');
  };

  return (
    <div className="font-prompt min-h-screen bg-gray-50">
      <StructuredData type="localBusiness" />
      {/* Hero Section - unified CI (gradient like other pages) */}
      <section className="relative bg-gradient-to-r from-[#1E2E4F] to-[#314874] text-white py-12 sm:py-16 lg:py-20">
        <div className="w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm mb-6 sm:mb-8">
              <Link href="/" className="hover:text-white/80 transition-colors">
                <FaHome className="w-4 h-4" />
              </Link>
              <FaChevronRight className="w-3 h-3 text-white/70" />
              <span className="text-white/80">ติดต่อเรา</span>
            </nav>

            {/* Title */}
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">ติดต่อเรา</h1>
              <p className="text-lg sm:text-xl text-[#eaf4ff] max-w-3xl mx-auto">
                มีคำถามเกี่ยวกับ<Link href="/materials" className="underline hover:text-white transition-colors">วัสดุ</Link>หรือ<Link href="/gallery" className="underline hover:text-white transition-colors">ผลงาน</Link> เรายินดีช่วยเหลือ
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1800px' }}>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
                ส่งข้อความถึงเรา
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      ชื่อ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#314874] focus:border-[#314874] transition-colors text-sm sm:text-base"
                      placeholder="ชื่อ"
                    />
                  </div>

                  <div>
                    <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-2">
                      นามสกุล
                    </label>
                    <input
                      type="text"
                      id="lastname"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#314874] focus:border-[#314874] transition-colors text-sm sm:text-base"
                      placeholder="นามสกุล"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      เบอร์โทร <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#314874] focus:border-[#314874] transition-colors text-sm sm:text-base"
                      placeholder="เบอร์โทร"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#314874] focus:border-[#314874] transition-colors text-sm sm:text-base"
                      placeholder="Email Address"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="lineId" className="block text-sm font-medium text-gray-700 mb-2">
                    ID LINE
                  </label>
                    <input
                    type="text"
                    id="lineId"
                    name="lineId"
                    value={formData.lineId}
                    onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#314874] focus:border-[#314874] transition-colors text-sm sm:text-base"
                    placeholder="ID LINE"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    บริการที่สนใจ (ดู<Link href="/gallery" className="text-blue-600 hover:text-blue-800 underline">ผลงาน</Link>เพิ่มเติม)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-3 sm:gap-4">
                    {[
                      { id: 'awning', label: 'วัสดุกันแสง', link: '/materials' },
                      { id: 'carport', label: 'วัสดุโรงรถ', link: '/materials' },
                      { id: 'roof', label: 'ระแนง/ฟ้า', link: '/gallery' },
                      { id: 'facade', label: 'หลังคาโรงรถ', link: '/gallery' },
                      { id: 'other', label: 'อื่นๆ', link: '/faq' }
                    ].map((service) => (
                      <label key={service.id} className="flex items-center space-x-2 cursor-pointer py-1 group">
                        <input
                          type="checkbox"
                          value={service.id}
                          checked={formData.services.includes(service.id)}
                          onChange={(e) => handleServiceChange(service.id, e.target.checked)}
                          className="w-4 h-4 text-[#314874] border-gray-300 rounded focus:ring-[#314874]"
                        />
                        <span className="text-sm text-gray-700">{service.label}</span>
                        <Link href={service.link} className="text-xs text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity hover:underline ml-1">
                          ดูเพิ่มเติม
                        </Link>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    รายละเอียด <span className="text-xs text-gray-500">(หากมีคำถาม ดู<Link href="/faq" className="text-blue-600 hover:text-blue-800 underline">FAQ</Link>ก่อนได้)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#314874] focus:border-[#314874] transition-colors resize-none text-sm sm:text-base"
                    placeholder="รายละเอียด"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#314874] hover:bg-[#1E2E4F] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-sm sm:text-base"
                >
                  ส่งข้อมูล
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="mt-8 xl:mt-0">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
                ติดต่อเรา
              </h2>
              <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                เราพร้อมให้บริการและตอบคำถามเกี่ยวกับงานกันสาด โรงจอดรถ งานฝ้า งานระแนง 
                และงานเหล็กอื่นๆ ติดต่อเราผ่านช่องทางที่สะดวกสำหรับคุณ
              </p>

              <div className="space-y-4 sm:space-y-6">
                {/* Call Us */}
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-[#eaf4ff] text-[#314874]">
                    <FaPhone className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">โทรศัพท์</h3>
                    <p className="text-gray-600 text-sm sm:text-base">02-936-8841-2</p>
                    <p className="text-gray-600 text-sm sm:text-base">084-909-7777</p>
                  </div>
                </div>

                {/* Email Us */}
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-[#eaf4ff] text-[#314874]">
                    <FaEnvelope className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">อีเมล</h3>
                    <p className="text-gray-600 text-sm sm:text-base">spkansards@gmail.com</p>
                  </div>
                </div>

                {/* LINE */}
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-[#eaf4ff] text-[#314874]">
                    <SiLine className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">LINE</h3>
                    <p className="text-gray-600 text-sm sm:text-base">@spkansard</p>
                  </div>
                </div>

                {/* Fax */}
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-[#eaf4ff] text-[#314874]">
                    <FaFax className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">แฟกซ์</h3>
                    <p className="text-gray-600 text-sm sm:text-base">02-936-8843</p>
                  </div>
                </div>

                {/* Website */}
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-[#eaf4ff] text-[#314874]">
                    <FaGlobe className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">เว็บไซต์</h3>
                    <p className="text-gray-600 text-sm sm:text-base">www.spkansard.co</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-[#eaf4ff] text-[#314874]">
                    <FaMapMarkerAlt className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">ที่อยู่</h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      เลขที่ 28/101 ถ.รัชดา-รามอินทรา<br />
                      แขวงคลองกุ่ม เขตบึงกุ่ม<br />
                      กรุงเทพมหานคร 10230
                    </p>
                  </div>
                </div>
              </div>

              {/* Follow Us On */}
              <div className="mt-8">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">ติดตามเรา</h3>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <a href="https://www.facebook.com/spkansard/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: '#314874' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1E2E4F'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#314874'}>
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: '#314874' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1E2E4F'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#314874'}>
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="https://line.me/R/ti/p/@spkansard" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: '#314874' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1E2E4F'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#314874'}>
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zM24 7.465V16.536C24 20.583 20.583 24 16.537 24H7.465C3.417 24 0 20.583 0 16.537V7.465C0 3.417 3.417 0 7.465 0h9.072C20.583 0 24 3.417 24 7.465"/>
                    </svg>
                  </a>
                  <a href="https://www.youtube.com/@spkansard" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: '#314874' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1E2E4F'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#314874'}>
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Branch Locations Section */}
          <div className="mt-12 lg:mt-16 bg-gray-50 rounded-2xl p-6 sm:p-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                สาขาของเรา
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                เลือกสาขาที่ใกล้ที่สุดกับท่าน เพื่อรับคำปรึกษาและบริการที่ดีที่สุด
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
              {/* สำนักงานใหญ่ */}
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-r from-[#314874] to-[#1E2E4F] p-3 rounded-lg">
                      <FaHome className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 ml-3">สำนักงานใหญ่</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <FaMapMarkerAlt className="h-5 w-5 text-[#314874] mt-1" />
                      <p className="text-gray-600 text-sm leading-relaxed">
                        28/101 ถ.รัชดา-รามอินทรา แขวงคลองกุ่ม เขตบึงกุ่ม กทม. 10230
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <FaPhone className="h-5 w-5 text-[#314874]" />
                      <p className="text-gray-600 text-sm">02-936-8841-2</p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <SiLine className="h-5 w-5 text-[#314874]" />
                      <p className="text-gray-600 text-sm">@spkansard</p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    <a 
                      href="tel:029368841" 
                      className="w-full bg-gradient-to-r from-[#314874] to-[#1E2E4F] hover:from-[#1E2E4F] hover:to-[#0F1829] text-white py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 text-sm font-medium"
                    >
                      <FaPhone className="h-4 w-4" />
                      <span>โทรเลย</span>
                    </a>
                    
                    <a 
                      href="https://www.google.com/maps/search/28%2F101+ถ.รัชดา-รามอินทรา+แขวงคลองกุ่ม+เขตบึงกุ่ม+กทม.+10230" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full bg-white hover:bg-gray-50 border-2 border-[#314874] text-[#314874] py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 text-sm font-medium"
                    >
                      <FaRoute className="h-4 w-4" />
                      <span>นำทาง</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* สาขาบางแวก */}
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-r from-[#314874] to-[#1E2E4F] p-3 rounded-lg">
                      <FaHome className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 ml-3">สาขาบางแวก</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <FaMapMarkerAlt className="h-5 w-5 text-[#314874] mt-1" />
                      <p className="text-gray-600 text-sm leading-relaxed">
                        209/12 หมู่ 1 ถ.พุทธมณฑลสาย 2 ต.ศาลายา อ.พุทธมณฑล นครปฐม 73170
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <FaPhone className="h-5 w-5 text-[#314874]" />
                      <p className="text-gray-600 text-sm">034-109-633</p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <SiLine className="h-5 w-5 text-[#314874]" />
                      <p className="text-gray-600 text-sm">@spkansard</p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    <a 
                      href="tel:034109633" 
                      className="w-full bg-gradient-to-r from-[#314874] to-[#1E2E4F] hover:from-[#1E2E4F] hover:to-[#0F1829] text-white py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 text-sm font-medium"
                    >
                      <FaPhone className="h-4 w-4" />
                      <span>โทรเลย</span>
                    </a>
                    
                    <a 
                      href="https://www.google.com/maps/search/209%2F12+หมู่+1+ถ.พุทธมณฑลสาย+2+ต.ศาลายา+อ.พุทธมณฑล+นครปฐม+73170" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full bg-white hover:bg-gray-50 border-2 border-[#314874] text-[#314874] py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 text-sm font-medium"
                    >
                      <FaRoute className="h-4 w-4" />
                      <span>นำทาง</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* สาขาราชพฤกษ์ */}
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-r from-[#314874] to-[#1E2E4F] p-3 rounded-lg">
                      <FaHome className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 ml-3">สาขาราชพฤกษ์</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <FaMapMarkerAlt className="h-5 w-5 text-[#314874] mt-1" />
                      <p className="text-gray-600 text-sm leading-relaxed">
                        25/145 หมู่ 8 ถ.ราชพฤกษ์ ต.บางรักพัฒนา อ.บางบัวทอง นนทบุรี 11110
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <FaPhone className="h-5 w-5 text-[#314874]" />
                      <p className="text-gray-600 text-sm">02-191-6892</p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <SiLine className="h-5 w-5 text-[#314874]" />
                      <p className="text-gray-600 text-sm">@spkansard</p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    <a 
                      href="tel:021916892" 
                      className="w-full bg-gradient-to-r from-[#314874] to-[#1E2E4F] hover:from-[#1E2E4F] hover:to-[#0F1829] text-white py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 text-sm font-medium"
                    >
                      <FaPhone className="h-4 w-4" />
                      <span>โทรเลย</span>
                    </a>
                    
                    <a 
                      href="https://www.google.com/maps/search/25%2F145+หมู่+8+ถ.ราชพฤกษ์+ต.บางรักพัฒนา+อ.บางบัวทอง+นนทบุรี+11110" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full bg-white hover:bg-gray-50 border-2 border-[#314874] text-[#314874] py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 text-sm font-medium"
                    >
                      <FaRoute className="h-4 w-4" />
                      <span>นำทาง</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* สาขาสามโคก */}
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-r from-[#314874] to-[#1E2E4F] p-3 rounded-lg">
                      <FaHome className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 ml-3">สาขาสามโคก</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <FaMapMarkerAlt className="h-5 w-5 text-[#314874] mt-1" />
                      <p className="text-gray-600 text-sm leading-relaxed">
                        89/1 หมู่ 4 ต.สามโคก อ.สามโคก จ.ปทุมธานี 12160
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <FaPhone className="h-5 w-5 text-[#314874]" />
                      <p className="text-gray-600 text-sm">02-181-1866</p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <SiLine className="h-5 w-5 text-[#314874]" />
                      <p className="text-gray-600 text-sm">@spkansard</p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    <a 
                      href="tel:021811866" 
                      className="w-full bg-gradient-to-r from-[#314874] to-[#1E2E4F] hover:from-[#1E2E4F] hover:to-[#0F1829] text-white py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 text-sm font-medium"
                    >
                      <FaPhone className="h-4 w-4" />
                      <span>โทรเลย</span>
                    </a>
                    
                    <a 
                      href="https://www.google.com/maps/search/89%2F1+หมู่+4+ต.สามโคก+อ.สามโคก+จ.ปทุมธานี+12160" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full bg-white hover:bg-gray-50 border-2 border-[#314874] text-[#314874] py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 text-sm font-medium"
                    >
                      <FaRoute className="h-4 w-4" />
                      <span>นำทาง</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Section */}
            <div className="bg-gradient-to-r from-[#314874] to-[#1E2E4F] rounded-2xl p-6 sm:p-8 text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                ติดต่อเราง่ายๆ ผ่านช่องทางที่สะดวกสำหรับคุณ
              </h3>
              <p className="text-blue-100 mb-6 text-lg">
                ทีมงานผู้เชี่ยวชาญพร้อมให้คำปรึกษาและบริการที่ดีที่สุด
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="tel:029368841" 
                  className="bg-white hover:bg-gray-100 text-[#314874] font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center space-x-2"
                >
                  <FaPhone className="h-5 w-5" />
                  <span>02-936-8841</span>
                </a>
                
                <a 
                  href="https://line.me/R/ti/p/@spkansard" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#06C755] hover:bg-[#05B34D] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center space-x-2"
                >
                  <SiLine className="h-5 w-5" />
                  <span>@spkansard</span>
                </a>
                
                <a 
                  href="mailto:spkansards@gmail.com" 
                  className="bg-[#EA4335] hover:bg-[#D93025] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center space-x-2"
                >
                  <FaEnvelope className="h-5 w-5" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>

       
        </div>
      </section>
     
    </div>
  );
}
