'use client';

import React, { useState } from 'react';

// Since this is now a client component, we'll need to move metadata to a separate file
// or handle it differently. For now, let's comment it out and handle SEO later.

// Since this is now a client component, we'll need to move metadata to a separate file
// or handle it differently. For now, let's comment it out and handle SEO later.

/*
export const metadata: Metadata = {
  title: "คำถามที่พบบ่อย - SPK Ansard",
  description: "คำถามและคำตอบที่พบบ่อยเกี่ยวกับกันสาด ประตูรั้ว และงานเหล็ก",
  keywords: "FAQ, คำถาม, กันสาด, ประตูรั้ว, งานเหล็ก, SPK Ansard",
  openGraph: {
    title: "คำถามที่พบบ่อย - SPK Ansard",
    description: "คำถามและคำตอบที่พบบ่อยเกี่ยวกับกันสาด ประตูรั้ว และงานเหล็ก",
    type: "website",
  },
};
*/

const faqs = [
  {
    id: "common",
    category: "Common",
    title: "คำถามทั่วไป",
    questions: [
      {
        question: "บริษัทของเราให้บริการอะไรบ้าง?",
        answer: "เราเป็นผู้เชี่ยวชาญด้านงานเหล็กครบวงจร ให้บริการกันสาด โรงจอดรถ งานฝ้า งานระแนง ประตูรั้ว และงานเหล็กอื่นๆ ด้วยคุณภาพมาตรฐานสูง"
      },
      {
        question: "มีการรับประกันงานไหม?",
        answer: "มีครับ เรารับประกันคุณภาพงานติดตั้ง 1 ปี และวัสดุตามเงื่อนไขของผู้ผลิต พร้อมบริการหลังการขายและซ่อมบำรุง"
      },
      {
        question: "มีบริการสำรวจหน้างานฟรีไหม?",
        answer: "ใช่ครับ เรามีบริการสำรวจหน้างานและประเมินราคาฟรี โดยทีมช่างผู้เชี่ยวชาญจะไปตรวจสอบพื้นที่และให้คำแนะนำ"
      }
    ]
  },
  {
    id: "awning",
    category: "Awning", 
    title: "กันสาด",
    questions: [
      {
        question: "กันสาดมีกี่ประเภท?",
        answer: "เรามีกันสาดหลายประเภท ได้แก่ กันสาดผ้าใบ กันสาดโพลีคาร์บอเนต กันสาดเหล็ก และกันสาดอลูมิเนียม แต่ละประเภทมีข้อดีและการใช้งานที่แตกต่างกัน"
      },
      {
        question: "กันสาดใช้งานได้นานแค่ไหน?",
        answer: "อายุการใช้งานขึ้นอยู่กับวัสดุและการดูแลรักษา โดยทั่วไปกันสาดเหล็กและอลูมิเนียมสามารถใช้งานได้ 10-15 ปี ส่วนกันสาดผ้าใบ 3-5 ปี"
      },
      {
        question: "สามารถติดตั้งกันสาดที่บ้านเก่าได้ไหม?",
        answer: "ได้ครับ เราสามารถติดตั้งกันสาดได้กับบ้านทุกประเภท ทีมช่างจะไปสำรวจหน้างานและประเมินโครงสร้างก่อนการติดตั้ง"
      },
      {
        question: "ราคากันสาดเริ่มต้นเท่าไหร่?",
        answer: "ราคาขึ้นอยู่กับขนาด วัสดุ และความซับซ้อนของงาน โดยประมาณเริ่มต้นที่ 3,000-5,000 บาทต่อตารางเมตร สามารถติดต่อเพื่อประเมินราคาฟรี"
      }
    ]
  },
  {
    id: "carport",
    category: "Carport",
    title: "โรงจอดรถ",
    questions: [
      {
        question: "โรงจอดรถสามารถจอดรถได้กี่คัน?",
        answer: "ขึ้นอยู่กับขนาดที่ออกแบบ เราสามารถทำโรงจอดรถได้ตั้งแต่ 1 คัน จนถึงโรงจอดรถขนาดใหญ่หลายสิบคัน ตามความต้องการของลูกค้า"
      },
      {
        question: "วัสดุหลังคาโรงจอดรถมีอะไรให้เลือกบ้าง?",
        answer: "มีให้เลือกหลากหลาย เช่น โพลีคาร์บอเนต กระเบื้องเหล็ก แผ่นเหล็กลูกฟูก หรือกระเบื้องคอนกรีต แต่ละแบบมีข้อดีและราคาแตกต่างกัน"
      },
      {
        question: "โรงจอดรถสามารถต่อเติมได้ไหม?",
        answer: "สามารถต่อเติมได้ครับ หากออกแบบโครงสร้างให้รองรับการขยายตั้งแต่แรก การต่อเติมจะทำได้ง่ายและประหยัดกว่า"
      }
    ]
  },
  {
    id: "ceiling",
    category: "Ceiling",
    title: "งานฝ้า",
    questions: [
      {
        question: "ฝ้าเพดานมีประเภทไหนบ้าง?",
        answer: "เรามีฝ้าหลายประเภท เช่น ฝ้าเหล็ก ฝ้าอลูมิเนียม ฝ้าเส้นใย และฝ้าบอร์ด แต่ละประเภทเหมาะกับการใช้งานและงบประมาณที่แตกต่างกัน"
      },
      {
        question: "งานฝ้าช่วยลดเสียงได้ไหม?",
        answer: "ได้ครับ โดยเฉพาะฝ้าเส้นใยและฝ้าพิเศษที่มีคุณสมบัติดูดซับเสียง ช่วยลดเสียงสะท้อนและเสียงรบกวนได้เป็นอย่างดี"
      },
      {
        question: "ฝ้าเพดานสามารถซ่อนสายไฟได้ไหม?",
        answer: "ได้ครับ งานฝ้าช่วยซ่อนสายไฟ ท่อแอร์ และระบบต่างๆ ทำให้เพดานดูสวยงามและเรียบร้อย"
      }
    ]
  },
  {
    id: "facade",
    category: "Facade",
    title: "งานระแนง",
    questions: [
      {
        question: "ระแนงมีรูปแบบไหนให้เลือกบ้าง?",
        answer: "เรามีระแนงหลากหลายรูปแบบ เช่น ระแนงเหล็ก ระแนงอลูมิเนียม ระแนงไม้สังเคราะห์ และระแนงผสมผสาน สามารถออกแบบตามสถาปัตยกรรมของอาคาร"
      },
      {
        question: "ระแนงช่วยประหยัดพลังงานได้ไหม?",
        answer: "ได้ครับ ระแนงช่วยกรองแสงแดด ลดความร้อน และยังคงความโปร่งสวาง ช่วยประหยัดค่าไฟแอร์ได้อย่างมาก"
      },
      {
        question: "การบำรุงรักษาระแนงยากไหม?",
        answer: "ไม่ยากครับ ขึ้นอยู่กับวัสดุที่เลือกใช้ ระแนงอลูมิเนียมและเหล็กเคลือบสีต้องการการดูแลน้อย ส่วนระแนงไม้อาจต้องทาสีเป็นระยะ"
      }
    ]
  }
];

export default function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState('common');

  const currentCategory = faqs.find(cat => cat.id === selectedCategory);

  return (
    <div className="font-prompt min-h-screen bg-blue-25">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-100 via-blue-75 to-blue-50 text-gray-700 py-8 sm:py-12 lg:py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1800px' }}>
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-gray-800">
              FAQ ในการต่อเติมหลังคา กันสาด กับ เอสพี กันสาด
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              คำตอบสำหรับคำถามที่พบบ่อยเกี่ยวกับสินค้าและบริการของเรา
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1800px' }}>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Sidebar Categories */}
            <div className="lg:w-1/4 mb-6 lg:mb-0">
              <div className="lg:sticky lg:top-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4">หมวดหมู่</h3>
                
                {/* Desktop: Vertical layout */}
                <div className="hidden lg:block space-y-2">
                  {faqs.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 sm:px-4 py-1 sm:py-1.5 rounded-lg border transition-all duration-200 ${
                        selectedCategory === category.id
                          ? 'text-white'
                          : 'border-gray-100 hover:border-blue-100 hover:bg-blue-25'
                      }`}
                      style={selectedCategory === category.id ? { backgroundColor: '#00447c', borderColor: '#00447c' } : {}}
                    >
                      <div className={`font-medium text-sm sm:text-base ${
                        selectedCategory === category.id ? 'text-white' : 'text-gray-600'
                      }`}>
                        {category.category}
                      </div>
                      <div className={`text-xs sm:text-sm mt-0.5 ${
                        selectedCategory === category.id ? 'text-blue-100' : 'text-gray-400'
                      }`}>
                        {category.title}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Mobile: Horizontal scroll */}
                <div className="lg:hidden overflow-x-auto">
                  <div className="flex gap-3 pb-2">
                    {faqs.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`flex-none px-4 py-1.5 rounded-lg border transition-all duration-200 min-w-32 ${
                          selectedCategory === category.id
                            ? 'text-white'
                            : 'border-gray-100 hover:border-blue-100 hover:bg-blue-25'
                        }`}
                        style={selectedCategory === category.id ? { backgroundColor: '#00447c', borderColor: '#00447c' } : {}}
                      >
                        <div className={`font-medium text-sm ${
                          selectedCategory === category.id ? 'text-white' : 'text-gray-600'
                        }`}>
                          {category.category}
                        </div>
                        <div className={`text-xs mt-0.5 ${
                          selectedCategory === category.id ? 'text-blue-100' : 'text-gray-400'
                        }`}>
                          {category.title}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Content */}
            <div className="lg:w-3/4">
              {currentCategory && (
                <div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-700 mb-4 sm:mb-6 lg:mb-8 pb-2 sm:pb-3 border-b-2 border-blue-200">
                    {currentCategory.title}
                  </h2>
                  
                  <div className="space-y-1">
                    {currentCategory.questions.map((faq, faqIndex) => (
                      <details 
                        key={faqIndex}
                        className="group border-b border-gray-100 py-3 sm:py-4"
                      >
                        <summary className="flex items-center justify-between cursor-pointer hover:bg-blue-25 p-3 sm:p-4 -mx-3 sm:-mx-4 rounded-lg transition-colors">
                          <div className="flex items-start gap-2 sm:gap-3">
                            <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-75 flex items-center justify-center mt-0.5 sm:mt-1">
                              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 transform transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                            <h3 className="text-base sm:text-lg font-semibold text-gray-700 pr-2 sm:pr-4">
                              {faq.question}
                            </h3>
                          </div>
                        </summary>
                        
                        <div className="mt-3 sm:mt-4 ml-7 sm:ml-9">
                          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                            {faq.answer}
                          </p>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="mt-8 sm:mt-12 lg:mt-16 bg-blue-100 rounded-xl p-4 sm:p-6 lg:p-8 text-center">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-gray-700">
              ไม่พบคำตอบที่ต้องการ?
            </h2>
            <p className="text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 text-gray-600">
              ติดต่อเราเพื่อสอบถามข้อมูลเพิ่มเติม ทีมงานพร้อมให้คำปรึกษาฟรี
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="tel:021368899"
                className="bg-white text-blue-600 hover:bg-blue-25 font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors duration-200 border border-blue-200 text-sm sm:text-base"
              >
                📞 โทร 02-136-8899
              </a>
              <a
                href="https://line.me/R/ti/p/@spkansard"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-100 hover:bg-green-200 text-green-700 font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors duration-200 border border-green-200 text-sm sm:text-base"
              >
                💬 LINE @spkansard
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
