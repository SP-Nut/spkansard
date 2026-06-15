'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaHome, FaChevronRight, FaPhone, FaEnvelope, FaFax, FaGlobe, FaMapMarkerAlt, FaFacebookF, FaYoutube, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { SiLine } from 'react-icons/si';
import StructuredData from '../components/StructuredData';

const initialForm = {
  name: '',
  lastname: '',
  phone: '',
  email: '',
  lineId: '',
  services: [] as string[],
  message: '',
};

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusText, setStatusText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      if (!/^[0-9\s\-\+\(\)]*$/.test(value)) return;
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (service: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      services: checked
        ? [...prev.services, service]
        : prev.services.filter(s => s !== service),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const phonePattern = /^[0-9\s\-\+\(\)]+$/;
    if (!phonePattern.test(formData.phone)) {
      setStatus('error');
      setStatusText('กรุณากรอกเบอร์โทรเป็นตัวเลขเท่านั้น');
      return;
    }
    if (!formData.lineId.trim()) {
      setStatus('error');
      setStatusText('กรุณากรอก LINE ID');
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('success');
        setStatusText(result.message || 'ขอบคุณสำหรับการติดต่อ เราจะติดต่อกลับในเร็ว ๆ นี้');
        setFormData(initialForm);
      } else {
        setStatus('error');
        setStatusText(result.error || 'เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง');
      }
    } catch {
      setStatus('error');
      setStatusText('เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-prompt min-h-screen bg-gray-50 pt-16 sm:pt-20">
      <StructuredData type="localBusiness" />
      {/* Hero Section - unified CI (gradient like other pages) */}
      <section className="relative bg-linear-to-r from-[#1E2E4F] to-[#314874] text-white py-8 sm:py-12 lg:py-16">
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
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
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
                      pattern="[0-9\s\-\+\(\)]+"
                      title="กรุณากรอกเบอร์โทรเป็นตัวเลขเท่านั้น"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#314874] focus:border-[#314874] transition-colors text-sm sm:text-base"
                      placeholder="เบอร์โทร (ตัวเลขเท่านั้น)"
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
                    ID LINE <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lineId"
                    name="lineId"
                    value={formData.lineId}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#314874] focus:border-[#314874] transition-colors text-sm sm:text-base"
                    placeholder="ID LINE (บังคับกรอก)"
                    title="กรุณากรอก LINE ID"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    บริการที่สนใจ (ดู<Link href="/gallery" className="text-blue-600 hover:text-blue-800 underline">ผลงาน</Link>เพิ่มเติม)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-3 sm:gap-4">
                    {[
                      { id: 'วัสดุกันแสง', label: 'วัสดุกันแสง', link: '/materials' },
                      { id: 'วัสดุโรงรถ', label: 'วัสดุโรงรถ', link: '/materials' },
                      { id: 'ระแนง/ฟ้า', label: 'ระแนง/ฟ้า', link: '/gallery' },
                      { id: 'หลังคาโรงรถ', label: 'หลังคาโรงรถ', link: '/gallery' },
                      { id: 'อื่นๆ', label: 'อื่นๆ', link: '/faq' }
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
                  disabled={isSubmitting}
                  className="w-full bg-[#314874] hover:bg-[#1E2E4F] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-sm sm:text-base"
                >
                  {isSubmitting ? 'กำลังส่งข้อมูล...' : 'ส่งข้อมูล'}
                </button>

                {status !== 'idle' && (
                  <div className={`flex items-start gap-3 rounded-lg px-4 py-3 text-sm font-medium ${
                    status === 'success'
                      ? 'bg-green-50 text-green-800 border border-green-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    {status === 'success'
                      ? <FaCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                      : <FaExclamationCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />}
                    <span>{statusText}</span>
                  </div>
                )}
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
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 bg-[#eaf4ff] text-[#314874]">
                    <FaPhone className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">โทรศัพท์</h3>
                    <p className="text-gray-600 text-sm sm:text-base">02-936-8841</p>
                  </div>
                </div>

                {/* Email Us */}
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 bg-[#eaf4ff] text-[#314874]">
                    <FaEnvelope className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">อีเมล</h3>
                    <p className="text-gray-600 text-sm sm:text-base">spkansards@gmail.com</p>
                  </div>
                </div>

                {/* LINE */}
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 bg-[#eaf4ff] text-[#314874]">
                    <SiLine className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">LINE</h3>
                    <p className="text-gray-600 text-sm sm:text-base">@spkansard</p>
                  </div>
                </div>

                {/* Fax */}
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 bg-[#eaf4ff] text-[#314874]">
                    <FaFax className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">แฟกซ์</h3>
                    <p className="text-gray-600 text-sm sm:text-base">02-936-8843</p>
                  </div>
                </div>

                {/* Website */}
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 bg-[#eaf4ff] text-[#314874]">
                    <FaGlobe className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">เว็บไซต์</h3>
                    <p className="text-gray-600 text-sm sm:text-base">www.spkansard.com</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 bg-[#eaf4ff] text-[#314874]">
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
                  <a href="https://www.facebook.com/spkansard/" target="_blank" rel="noopener noreferrer" aria-label="Facebook SP Kansard" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors bg-[#314874] hover:bg-[#1E2E4F]">
                    <FaFacebookF className="w-5 h-5 text-white" />
                  </a>
                  <a href="https://line.me/R/ti/p/@spkansard" target="_blank" rel="noopener noreferrer" aria-label="LINE @spkansard" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors bg-[#314874] hover:bg-[#1E2E4F]">
                    <SiLine className="w-5 h-5 text-white" />
                  </a>
                  <a href="https://www.youtube.com/@spkansard" target="_blank" rel="noopener noreferrer" aria-label="YouTube SP Kansard" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors bg-[#314874] hover:bg-[#1E2E4F]">
                    <FaYoutube className="w-5 h-5 text-white" />
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
