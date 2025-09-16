import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา - SPK Ansard",
  description:
    "เกี่ยวกับบริษัท เอสพีเค แอนซาร์ด ผู้เชี่ยวชาญด้านกันสาด โรงจอดรถ งานฝ้า งานระแนง และงานเหล็กครบวงจร มาตรฐานงานคุณภาพ ใส่ใจทุกรายละเอียด",
  openGraph: {
    title: "เกี่ยวกับเรา - SPK Ansard",
    description:
      "รู้จักเราให้มากขึ้น วิสัยทัศน์ พันธกิจ และคุณค่าที่เรายึดมั่นในการให้บริการ",
    type: "website",
  },
};

export default function About() {
  return (
    <div className="font-prompt animate-fade-in">
      {/* Hero */}

      {/* Overview */}
      <section className="py-10 sm:py-14 bg-gray-50">
        <div
          className="mx-auto px-4 sm:px-6 lg:px-8"
          style={{ maxWidth: "1800px" }}
        >
          <div className="max-w-4xl mx-auto text-center text-gray-700 space-y-4 sm:space-y-5">
            <p className="text-sm sm:text-base md:text-lg leading-7 md:leading-8 font-light">
              เราคือผู้นำอันดับ 1 ด้านกันสาดในกรุงเทพฯและปริมณฑล
              เราสร้างสรรค์พื้นที่ภายนอกบ้านและอาคารให้ทั้งสวยงาม ทันสมัย
              และใช้งานได้จริง ด้วยประสบการณ์ยาวนานกว่า 35 ปี
              และผลงานที่ได้รับความไว้วางใจกว่า 35,000 ครัวเรือน SP Kansard
              ได้รับการยอมรับว่าเป็นผู้เชี่ยวชาญด้านกันสาดที่เจ้าของบ้านและโครงการเลือกใช้มากที่สุดในประเทศไทย
            </p>
            <p className="text-sm sm:text-base md:text-lg leading-7 md:leading-8 font-light">
              จุดแข็งของเราคือการเป็นบริษัทที่มีวัสดุกันสาดให้เลือกมากที่สุดในไทย
              ครอบคลุมตั้งแต่ กันสาดเมทัลชีท, ไวนิลดรีมรูฟ รุ่นคลิปล็อค,
              อลูมิเนียมรูฟ, โพลีคาร์บอเนต, ชินโคไลท์ ไปจนถึง
              ระแนงและฝ้าทุกประเภท ไม่ว่าคุณต้องการดีไซน์แบบไหน
              เรามีวัสดุที่ตอบโจทย์ทั้งความสวยงาม ความแข็งแรง และความคุ้มค่า
              นอกจากนี้ เรายังใส่ใจในมาตรฐานการติดตั้งและการรับประกันหลังการขาย
              เพื่อให้ลูกค้ามั่นใจได้ว่าทุกผลงานจาก SP Kansard ไม่เพียงแค่ดูดี
              แต่ยังทนทานต่อทุกสภาพอากาศ และใช้งานได้จริงในระยะยาว โดย{" "}
              <span className="font-semibold tracking-wide">
                SP KANSARD CO., LTD.
              </span>{" "}
              คือทางเลือกอันดับหนึ่งสำหรับผู้ที่กำลังมองหากันสาดคุณภาพ
              ด้วยตัวเลือกวัสดุที่ครบที่สุดในประเทศไทย
            </p>
          </div>

          {/* CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center text-center">
            <a
              href="https://line.me/R/ti/p/@spkansard"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-6 sm:px-8 py-3 bg-[#00447c] hover:bg-[#003366] text-white font-semibold text-sm sm:text-base transition-colors"
            >
              LINE ›
            </a>
            <a
              href="tel:021368899"
              className="rounded-full px-6 sm:px-8 py-3 bg-[#00447c] hover:bg-[#003366] text-white font-semibold text-sm sm:text-base transition-colors"
            >
              CALL ›
            </a>
            <a
              href="/free-service"
              className="rounded-full px-6 sm:px-8 py-3 bg-[#00447c] hover:bg-[#003366] text-white font-semibold text-sm sm:text-base transition-colors"
            >
              ปรึกษาเรา ›
            </a>
            <a
              href="/support/quote"
              className="rounded-full px-6 sm:px-8 py-3 bg-[#00447c] hover:bg-[#003366] text-white font-semibold text-sm sm:text-base transition-colors"
            >
              คำนวณราคาฟรี ›
            </a>
          </div>
        </div>
      </section>

      {/* Why SP overlay section */}
      <section
        className="relative w-screen ml-[calc(50%-50vw)]"
        aria-label="ทำไมต้องใช้บริการของ เอสพี กันสาด"
      >
  <div className="relative overflow-hidden min-h-[560px] sm:min-h-[560px] lg:min-h-[600px]">
          <Image
            src="/images/bg-contact.webp"
            alt="ตัวอย่างงานกันสาดของ SPK Ansard"
            fill
            priority
            sizes="(max-width: 640px) 160vw, 100vw"
            quality={95}
            className="object-cover object-[45%_20%] sm:object-center select-none scale-[1.15] sm:scale-100"
          />
          <div className="absolute inset-0 bg-black/70 sm:bg-black/60" />
          <div
            className="absolute inset-0 z-[1] mx-auto w-full px-4 sm:px-6 lg:px-8 flex items-center"
            style={{ maxWidth: "1800px" }}
          >
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Heading left */}
              <div className="text-white max-w-md sm:max-w-lg mx-auto text-center lg:mx-0 lg:ml-auto lg:text-right">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight drop-shadow text-balance lg:text-right">
                  <span className="block">ทำไมต้องใช้บริการของ</span>
                  <span className="block lg:text-left">เอสพี กันสาด</span>
                </h2>
              
              </div>

              {/* Features right */}
              <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 text-white max-w-[640px] lg:max-w-[700px]">
                {[
                  {
                    title: "บริการให้คำปรึกษา",
                    desc: "จากผู้มีประสบการณ์การทำงานมากกว่า 35ปี",
                    icon: (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 2a7 7 0 00-7 7c0 2.6 1.5 4.8 3.7 6l-.7 3.5a1 1 0 001.5 1l3.2-1.8h.1A7 7 0 0012 2z"
                      />
                    ),
                  },
                  {
                    title: "ออกแบบได้ตามงบประมาณ",
                    desc: "เพื่อความสวยงามและสอดรับงบประมาณให้ลูกค้า",
                    icon: (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 7h18M3 12h12M3 17h8"
                      />
                    ),
                  },
                  {
                    title: "รับประกันงานติดตั้ง",
                    desc: "ระยะเวลา 5 ปีเต็ม",
                    icon: (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 2l7 4v6c0 5-3.8 9.7-7 10-3.2-.3-7-5-7-10V6l7-4z"
                      />
                    ),
                  },
                  {
                    title: "ความมั่นใจในสินค้า",
                    desc: "เรามีสินค้าในเครือและวัสดุหลังคาจากแบรนด์ชั้นนำทั่วประเทศ",
                    icon: (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3l2.5 5 5.5.8-4 3.9.9 5.6L12 15l-4.9 3.3.9-5.6-4-3.9 5.5-.8L12 3z"
                      />
                    ),
                  },
                  {
                    title: "งานติดตั้ง",
                    desc: "ติดตั้งโดยทีมงานมืออาชีพ ไม่ใช้ผู้รับเหมา รวดเร็ว ไม่ทิ้งงาน",
                    icon: (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 13h2l2 7h10l2-7h2M5 13l4-8h6l4 8"
                      />
                    ),
                  },
                  {
                    title: "บริการและการขาย",
                    desc: "เราพร้อมที่จะดูแลคุณตลอดอายุการใช้งาน",
                    icon: (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 12a5 5 0 100-10 5 5 0 000 10zm-7 9a7 7 0 0114 0H5z"
                      />
                    ),
                  },
                ].map((f) => (
                  <div key={f.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-white/10 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {f.icon}
                      </svg>
                    </div>
                    <div>
                      <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white leading-tight">
                        {f.title}
                      </p>
                      <p className="text-sm sm:text-base lg:text-lg text-white/85 mt-1">
                        {f.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Warranty */}
      <section className="py-10 sm:py-14 lg:py-16 bg-gray-50">
        <div
          className="mx-auto px-4 sm:px-6 lg:px-8"
          style={{ maxWidth: "1800px" }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
              Warranty
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-700">
              โปรแกรมการรับประกัน
            </p>
            <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed">
              SP Kansard มั่นใจในคุณภาพวัสดุและงานติดตั้งทุกขั้นตอน
              จึงมีโปรแกรมรับประกันเพื่อความอุ่นใจของลูกค้า
              โปรดศึกษาคู่มือการใช้งานอย่างละเอียด และเงื่อนไขการรับประกันของเรา
            </p>
          </div>

          <div className="mt-8 sm:mt-10 grid grid-cols-1 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {/* Product warranty */}
            <div className="border border-gray-200 rounded-xl bg-white p-8 sm:p-10 text-center shadow-sm">
              <div className="text-5xl sm:text-6xl font-extrabold text-gray-800">
                5 ปี
              </div>
              <p className="mt-3 font-semibold text-gray-800">
                รับประกันสินค้ามาตรฐาน ไม่บกพร่อง และหลุดล่อน
              </p>
              <p className="text-gray-600 mt-1">เป็นระยะเวลา 5 ปี</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div
          className="mx-auto px-4 sm:px-6 lg:px-8"
          style={{ maxWidth: "1800px" }}
        >
          <div className="bg-blue-100 rounded-xl p-5 sm:p-6 lg:p-8 text-center">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
              ต้องการคำปรึกษาหรือประเมินราคา?
            </h2>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
              ทีมงานพร้อมให้คำแนะนำและสำรวจหน้างานฟรี ไม่มีค่าใช้จ่าย
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="/contact"
                className="bg-blue-300 text-blue-900 hover:bg-blue-200 font-medium py-2 sm:py-3 px-5 sm:px-6 rounded-lg transition-colors duration-200 text-sm sm:text-base"
              >
                ติดต่อเรา
              </a>
              <a
                href="/gallery"
                className="bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 font-medium py-2 sm:py-3 px-5 sm:px-6 rounded-lg transition-colors duration-200 text-sm sm:text-base"
              >
                ดูผลงาน
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
