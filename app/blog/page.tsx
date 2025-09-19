import React from 'react';
import Link from 'next/link';
import { FaHome, FaChevronRight, FaTools, FaClock } from 'react-icons/fa';

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#1E2E4F] to-[#314874] text-white py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm mb-6">
            <Link href="/" className="flex items-center text-white/80 hover:text-white transition-colors">
              <FaHome className="mr-1" />
              หน้าแรก
            </Link>
            <FaChevronRight className="text-white/60" />
            <span className="text-white">บทความ</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              บทความและเคล็ดลับ
            </h1>
            <p className="text-lg sm:text-xl text-white/90">
              ความรู้และข้อมูลเกี่ยวกับกันสาด โรงจอดรถ และงานเหล็กจากผู้เชี่ยวชาญ
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Under Development Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-[#eaf4ff] rounded-full mb-6">
              <FaTools className="text-[#314874] text-3xl" />
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              หน้าบทความกำลังพัฒนา
            </h2>
            
            <p className="text-lg text-gray-600 mb-6">
              เรากำลังเตรียมเนื้อหาบทความที่มีประโยชน์สำหรับคุณ<br />
              โปรดติดตามอัปเดตในเร็วๆ นี้
            </p>

            {/* Coming Soon Badge */}
            <div className="inline-flex items-center gap-2 bg-[#314874] text-white px-4 py-2 rounded-full text-sm font-medium mb-8">
              <FaClock className="text-sm" />
              เร็วๆ นี้
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="bg-[#314874] hover:bg-[#1E2E4F] text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                กลับหน้าแรก
              </Link>
              
              <Link
                href="/contact"
                className="border border-[#314874] text-[#314874] hover:bg-[#eaf4ff] px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                ติดต่อเรา
              </Link>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              สิ่งที่คุณจะได้อ่านในบทความของเรา
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#314874] rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-600">เทคนิคการเลือกกันสาดที่เหมาะสม</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#314874] rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-600">คู่มือบำรุงรักษาโรงจอดรถ</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#314874] rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-600">ไอเดียออกแบบงานเหล็ก</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#314874] rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-600">เคล็ดลับจากผู้เชี่ยวชาญ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
