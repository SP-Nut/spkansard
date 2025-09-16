import { Metadata } from "next";

export const metadata: Metadata = {
  title: "หน้าแรก - SPK Ansard",
  description: "เว็บไซต์ที่เน้นความเร็วและ SEO สำหรับธุรกิจของคุณ พร้อมการใช้งาน Prompt font สำหรับภาษาไทย",
  keywords: "fast website, SEO, Thai business, ความเร็ว, เว็บไซต์, Prompt font",
  openGraph: {
    title: "หน้าแรก - SPK Ansard",
    description: "เว็บไซต์ที่เน้นความเร็วและ SEO สำหรับธุรกิจของคุณ",
    type: "website",
  },
};

export default function Home() {
  return (
    <div className="font-prompt animate-fade-in">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <section className="text-center mb-8 sm:mb-12 lg:mb-16 animate-slide-up">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
            ยินดีต้อนรับสู่ <span className="text-blue-600">SPK Ansard</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto">
            เว็บไซต์ที่เน้น<strong>ความเร็ว</strong>และ<strong>SEO</strong> พร้อมฟอนต์ Prompt สำหรับภาษาไทย
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a
              href="/product"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 sm:py-3 px-6 sm:px-8 rounded-full transition-colors duration-200 text-base sm:text-lg"
            >
              ดูผลิตภัณฑ์
            </a>
            <a
              href="/contact"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-medium py-2 sm:py-3 px-6 sm:px-8 rounded-full transition-colors duration-200 text-base sm:text-lg"
            >
              ติดต่อเรา
            </a>
          </div>
        </section>

        <section className="mb-8 sm:mb-12 lg:mb-16">
          {/* Desktop: Grid layout */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">ความเร็วสูง</h3>
              <p className="text-gray-600 text-sm sm:text-base">เว็บไซต์โหลดเร็วด้วย Next.js และการปรับแต่งที่เหมาะสม</p>
            </div>

            <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">SEO ที่เป็นเลิศ</h3>
              <p className="text-gray-600 text-sm sm:text-base">ปรับแต่งเพื่อการค้นหาที่ดีในเสิร์ชเอนจิน</p>
            </div>

            <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">ฟอนต์ Prompt</h3>
              <p className="text-gray-600 text-sm sm:text-base">สนับสนุนภาษาไทยได้อย่างสมบูรณ์และสวยงาม</p>
            </div>
          </div>

          {/* Mobile: Horizontal scroll */}
          <div className="md:hidden overflow-x-auto">
            <div className="flex gap-4 pb-4 px-1">
              <div className="flex-none w-72 text-center p-4 bg-white rounded-lg shadow-md">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">ความเร็วสูง</h3>
                <p className="text-gray-600 text-sm">เว็บไซต์โหลดเร็วด้วย Next.js และการปรับแต่งที่เหมาะสม</p>
              </div>

              <div className="flex-none w-72 text-center p-4 bg-white rounded-lg shadow-md">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">SEO ที่เป็นเลิศ</h3>
                <p className="text-gray-600 text-sm">ปรับแต่งเพื่อการค้นหาที่ดีในเสิร์ชเอนจิน</p>
              </div>

              <div className="flex-none w-72 text-center p-4 bg-white rounded-lg shadow-md">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">ฟอนต์ Prompt</h3>
                <p className="text-gray-600 text-sm">สนับสนุนภาษาไทยได้อย่างสมบูรณ์และสวยงาม</p>
              </div>
            </div>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">พร้อมใช้งานแล้ว</h2>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
            เริ่มต้นใช้งานเว็บไซต์ที่เร็วและเหมาะสำหรับ SEO วันนี้
          </p>
          <a
            href="/free-service"
            className="bg-blue-300 text-blue-900 hover:bg-blue-200 font-medium py-2 sm:py-3 px-6 sm:px-8 rounded-full transition-colors duration-200 text-base sm:text-lg inline-block"
          >
            บริการฟรี
          </a>
        </section>
      </div>
    </div>
  );
}