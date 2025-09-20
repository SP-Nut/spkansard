'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaHome, FaChevronRight, FaPhone } from 'react-icons/fa';
import { SiLine } from 'react-icons/si';

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
  const currentCategory = faqs.find((cat) => cat.id === selectedCategory);

  return (
    <div className="font-prompt min-h-screen bg-gray-50">
      {/* Hero Section - unified CI */}
      <section className="relative bg-gradient-to-r from-[#1E2E4F] to-[#314874] text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm mb-6 sm:mb-8">
            <Link href="/" className="hover:text-white/80 transition-colors">
              <FaHome className="w-4 h-4" />
            </Link>
            <FaChevronRight className="w-3 h-3 text-white/70" />
            <span className="text-white/80">คำถามที่พบบ่อย</span>
          </nav>

          {/* Title */}
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
              FAQ ในการต่อเติมหลังคา กันสาด กับ เอสพี กันสาด
            </h1>
            <p className="text-lg sm:text-xl text-[#eaf4ff] max-w-3xl mx-auto">
              คำตอบสำหรับคำถามที่พบบ่อยเกี่ยวกับสินค้าและบริการของเรา
            </p>
          </div>
        </div>
      </section>

      {/* Category Tabs (sticky) */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1800px' }}>
          <div className="flex items-center justify-between py-2 gap-4">
            <div className="flex-1 overflow-x-auto scrollbar-hide">
              <div className="flex space-x-1 min-w-max">
                {faqs.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                      selectedCategory === category.id
                        ? 'border-blue-600 text-blue-600 bg-blue-50'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {category.category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1800px' }}>
          <div className="lg:w-3/4 mx-auto">
            {currentCategory && (
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-700 mb-4 sm:mb-6 lg:mb-8 pb-2 sm:pb-3 border-b-2 border-blue-200">
                  {currentCategory.title}
                </h2>

                <div className="space-y-1">
                  {currentCategory.questions.map((faq, faqIndex) => (
                    <details key={faqIndex} className="group border-b border-gray-100 py-3 sm:py-4">
                      <summary className="flex items-center justify-between cursor-pointer hover:bg-blue-25 p-3 sm:p-4 -mx-3 sm:-mx-4 rounded-lg transition-colors">
                        <div className="flex items-start gap-2 sm:gap-3">
                          <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-75 flex items-center justify-center mt-0.5 sm:mt-1">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 transform transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                          <h3 className="text-base sm:text-lg font-semibold text-gray-700 pr-2 sm:pr-4">{faq.question}</h3>
                        </div>
                      </summary>

                      <div className="mt-3 sm:mt-4 ml-7 sm:ml-9">
                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{faq.answer}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Contact CTA */}
          <div className="mt-8 sm:mt-12 lg:mt-16 rounded-xl p-6 sm:p-8 lg:p-10 text-center bg-gradient-to-r from-[#1E2E4F] to-[#31487A] text-white">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">
              ไม่พบคำตอบที่ต้องการ?
            </h2>
            <p className="text-sm sm:text-base lg:text-lg mb-5 sm:mb-6 text-blue-100 max-w-2xl mx-auto">
              ติดต่อเราเพื่อสอบถามข้อมูลเพิ่มเติม ทีมงานพร้อมให้คำปรึกษาฟรี
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="tel:02-936-8841"
                className="bg-white text-blue-700 hover:bg-gray-100 font-semibold py-2.5 sm:py-3 px-5 sm:px-6 rounded-lg transition-colors duration-200 text-sm sm:text-base shadow flex items-center justify-center gap-2"
              >
                <FaPhone className="h-4 w-4" />
                <span>โทร 02-936-8841</span>
              </a>
              <a
                href="https://line.me/R/ti/p/@spkansard"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white text-white hover:bg-white hover:text-blue-700 font-semibold py-2.5 sm:py-3 px-5 sm:px-6 rounded-lg transition-colors duration-200 text-sm sm:text-base flex items-center justify-center gap-2"
              >
                <SiLine className="h-4 w-4" />
                <span>LINE @spkansard</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
