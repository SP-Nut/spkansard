import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaPhone, FaEye } from "react-icons/fa";

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
  const awards = [
    { title: "CEO THAILAND AWARDS", year: "2014" },
    { title: "Best Biz & Product Award", year: "2014" },
    { title: "Asean Awards", year: "2015" },
    { title: "Best Product Of The Year", year: "2016" },
    { title: "Best Billion Business Award", year: "2016" },
    { title: "รางวัลสุดยอดนักบริหารแห่งปี", year: "2016" },
    { title: "Press Awards", year: "2018" },
  ];

  const timeline = [
    {
      year: "พ.ศ. 2531",
      title: "เริ่มต้นในสายงานกันสาด",
      desc:
        "นายสมพร แก้วรัศมีโชติ เริ่มเรียนรู้งานกันสาดในกรุงเทพฯ พร้อมประสบการณ์ร่วมงานกับบริษัทระดับนานาชาติ เช่น Barclay Mowlem, Alstom Transportation Services และ John Holland ในงานเชื่อมรางรถไฟสายเหนือ ใต้ อีสาน รวมถึงโครงการรถไฟใต้ดินกรุงเทพฯ",
    },
    {
      year: "พ.ศ. 2547",
      title: "เปิดร้านกันสาดแห่งแรก",
      desc: "เริ่มธุรกิจร้านกันสาดย่านนวมินทร์ 97 วางรากฐานงานบริการติดตั้ง",
    },
    {
      year: "พ.ศ. 2552",
      title: "ก่อตั้ง บริษัท เอสพี สแตนเลส คอนสตรัคชั่น จำกัด",
      desc:
        "มุ่งเน้นจำหน่ายแผ่นหลังคาและติดตั้งกันสาด ครบวงจร ทั้งวัสดุในประเทศและนำเข้า พร้อมลงทุนเครื่องจักรผลิตเมทัลชีท และฉีดฉนวน PU Foam",
    },
    {
      year: "พ.ศ. 2554",
      title: "ก่อตั้ง SP Warehouse",
      desc:
        "รับสร้างโกดัง โรงงาน โรงจอดรถ และอาคารอเนกประสงค์ พร้อมวัตถุดิบและอุปกรณ์ครบถ้วน ควบคุมต้นทุน แต่ยังคงคุณภาพสูง",
    },
    {
      year: "พ.ศ. 2558",
      title: "ก่อตั้ง บริษัท เอสพี กันสาด จำกัด",
      desc:
        "ตอบสนองความต้องการงานกันสาดเต็มรูปแบบ ด้วยทีมงานมืออาชีพและประสบการณ์สูง บริษัทเติบโตอย่างมั่นคงและได้รับความไว้วางใจในวงกว้าง",
    },
    {
      year: "ปัจจุบัน",
      title: "ขยายสาขาครอบคลุม 5 พื้นที่",
      desc:
        "กรุงเทพฯ (รัชดา–รามอินทรา) สำนักงานใหญ่, กรุงเทพฯ (บางแวก), นนทบุรี (ราชพฤกษ์), ปทุมธานี (สามโคก), ภูเก็ต",
    },
  ];
  return (
    <div className="font-prompt animate-fade-in overflow-x-hidden pt-16 sm:pt-20">
      {/* Hero */}

      {/* Overview */}
      <section className="py-10 sm:py-14" style={{ backgroundColor: '#eaf4ff' }}>
        <div
          className="mx-auto px-4 sm:px-6 lg:px-8"
          style={{ maxWidth: "1800px" }}
        >
          <div className="max-w-4xl mx-auto text-center text-gray-700 space-y-4 sm:space-y-5">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold italic tracking-tight text-[#314874]">
              เอสพี กันสาด
            </h1>
            <p className="text-sm sm:text-base md:text-lg leading-7 md:leading-8 font-light">
              เราคือผู้นำอันดับ 1 ด้านกันสาดในกรุงเทพฯและปริมณฑล
              เราสร้างสรรค์พื้นที่ภายนอกบ้านและอาคารให้ทั้งสวยงาม ทันสมัย
              และใช้งานได้จริง ด้วยประสบการณ์ยาวนานกว่า 38 ปี
              และผลงานที่ได้รับความไว้วางใจกว่า 35,000 ครัวเรือน SP Kansard
              ได้รับการยอมรับว่าเป็นผู้เชี่ยวชาญด้านกันสาดที่เจ้าของบ้านและโครงการเลือกใช้มากที่สุดในประเทศไทย
            </p>
            <p className="text-sm sm:text-base md:text-lg leading-7 md:leading-8 font-light">
              จุดแข็งของเราคือการเป็นบริษัทที่มี<Link href="/materials" className="text-[#314874] hover:underline font-medium">วัสดุกันสาดให้เลือกมากที่สุดในไทย</Link>
              ครอบคลุมตั้งแต่ กันสาดเมทัลชีท, ไวนิลดรีมรูฟ รุ่นคลิปล็อค,
              อลูมิเนียมรูฟ, โพลีคาร์บอเนต, ชินโคไลท์ ไปจนถึง
              ระแนงและฝ้าทุกประเภท ไม่ว่าคุณต้องการดีไซน์แบบไหน
              เรามีวัสดุที่ตอบโจทย์ทั้งความสวยงาม ความแข็งแรง และความคุ้มค่า
              นอกจากนี้ เรายังใส่ใจในมาตรฐานการติดตั้งและการรับประกันหลังการขาย
              เพื่อให้ลูกค้ามั่นใจได้ว่า<Link href="/gallery" className="text-[#314874] hover:underline font-medium">ทุกผลงานจาก SP Kansard</Link> ไม่เพียงแค่ดูดี
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
              className="w-full sm:w-auto text-center rounded-full px-6 sm:px-8 py-3 bg-[#314874] hover:bg-[#1E2E4F] text-white font-semibold text-sm sm:text-base transition-colors"
            >
              LINE ›
            </a>
            <a
              href="tel:02-936-8841"
              className="w-full sm:w-auto text-center rounded-full px-6 sm:px-8 py-3 bg-[#314874] hover:bg-[#1E2E4F] text-white font-semibold text-sm sm:text-base transition-colors"
            >
              CALL ›
            </a>
            <a
              href="/contact"
              className="w-full sm:w-auto text-center rounded-full px-6 sm:px-8 py-3 bg-[#314874] hover:bg-[#1E2E4F] text-white font-semibold text-sm sm:text-base transition-colors"
            >
              ปรึกษาเรา ›
            </a>
            <a
              href="https://cal-customer.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center rounded-full px-6 sm:px-8 py-3 bg-[#314874] hover:bg-[#1E2E4F] text-white font-semibold text-sm sm:text-base transition-colors"
            >
              คำนวณราคาฟรี ›
            </a>
          </div>
        </div>
      </section>

      {/* Company History */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: "1800px" }}>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 text-center">ประวัติบริษัท</h2>
            <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5 text-gray-700 text-sm sm:text-base leading-7 sm:leading-8">
              <p>
                นายสมพร แก้วรัศมีโชติ ประธานบริษัท เอสพี กันสาด จำกัด เริ่มต้นจากการเรียนรู้งานด้านกันสาดในกรุงเทพมหานคร ตั้งแต่ปี พ.ศ. 2531 โดยก่อนหน้านี้ได้มีโอกาสร่วมงานกับบริษัทระดับนานาชาติ เช่น Barclay Mowlem, Alstom Transportation Services และ John Holland เกี่ยวกับงานเชื่อมรางรถไฟสายเหนือ สายใต้ สายอีสาน รวมถึงโครงการรถไฟใต้ดินในกรุงเทพฯ
              </p>
              <p>
                ในปี พ.ศ. 2547 ได้เริ่มต้นธุรกิจร้านกันสาดแห่งแรกย่านนวมินทร์ 97 ก่อนที่จะพัฒนาต่อมาเป็นการก่อตั้ง บริษัท เอสพี สแตนเลส คอนสตรัคชั่น จำกัด เมื่อวันที่ 4 พฤษภาคม 2552 โดยมุ่งเน้นงานจำหน่ายแผ่นหลังคาและติดตั้งกันสาด ทั้งวัสดุในประเทศและนำเข้าจากแบรนด์ชั้นนำ พร้อมอุปกรณ์ติดตั้งครบวงจร อีกทั้งยังได้ลงทุนในเครื่องจักรผลิตแผ่นเมทัลชีท และเครื่องฉีดฉนวน PU Foam เพื่อเพิ่มคุณภาพและมาตรฐานของงานติดตั้ง
              </p>
              <p>
                ต่อมาในวันที่ 24 กันยายน 2558 ได้ก่อตั้ง บริษัท เอสพี กันสาด จำกัด อย่างเป็นทางการ เพื่อตอบสนองความต้องการของลูกค้าในงานกันสาดเต็มรูปแบบ ด้วยทีมงานที่มีความเป็นมืออาชีพและประสบการณ์สูง ทำให้บริษัทเติบโตอย่างมั่นคง ได้รับความไว้วางใจ และเป็นที่ยอมรับอย่างกว้างขวางในวงการกันสาด <Link href="/gallery" className="text-[#314874] hover:underline font-medium">ดูผลงานที่ภาคภูมิใจของเรา</Link>
              </p>
              <p>
                ปัจจุบัน SP Kansard มีทั้งหมด 5 สาขา ได้แก่ กรุงเทพฯ (รัชดา–รามอินทรา) สำนักงานใหญ่, กรุงเทพฯ (บางแวก), นนทบุรี (ราชพฤกษ์), ปทุมธานี (สามโคก), และภูเก็ต
              </p>
              <p>
                เพื่อตอบโจทย์ลูกค้าในวงกว้างมากขึ้น ในปี พ.ศ. 2554 ได้ก่อตั้ง SP Warehouse เพื่อรับสร้างโกดัง โรงงาน โรงจอดรถ และอาคารอเนกประสงค์ โดยมีความพร้อมด้านวัตถุดิบและอุปกรณ์ครบถ้วน เช่น โรงงานผลิตแผ่นเมทัลชีท โรงจำหน่ายเหล็กรูปพรรณ และการเป็นตัวแทนจำหน่ายสี TOA ทำให้สามารถควบคุมต้นทุนได้ต่ำลง แต่ยังคงคุณภาพงานระดับสูง
              </p>
              <p>
                ด้วยทีมงานวิศวกร สถาปนิก และช่างผู้ชำนาญการ SP Warehouse สามารถส่งมอบงานที่ รวดเร็ว แข็งแรง ไม่ทิ้งงาน และราคาประหยัด เพื่อช่วยให้ลูกค้าสามารถต่อยอดธุรกิจได้อย่างมั่นใจ
              </p>
            </div>

            {/* Founder Quote */}
            <div className="mt-8 sm:mt-10 bg-[#eaf4ff] border border-[#eaf4ff] rounded-2xl p-6 sm:p-8">
              <blockquote className="text-center">
                <p className="text-lg sm:text-xl text-gray-800 font-semibold">“สร้างได้ไว สร้างได้จริง มั่นใจไปกับครอบครัว SP”</p>
                <footer className="mt-3 text-gray-700 text-sm sm:text-base">
                  — นายสมพร แก้วรัศมีโชติ, ประธานบริษัท เอสพี กันสาด จำกัด
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: "1800px" }}>
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800">รางวัลอันทรงเกียรติด้านบริหาร</h2>
            <div className="mx-auto mt-3 h-1 w-24 bg-[#314874] rounded-full" />
            {/* Mobile: horizontal scroll; Desktop: grid */}
            <div className="mt-8">
              {/* Mobile horizontal scroller */}
              <div className="sm:hidden -mx-4 px-4">
                <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-p-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none]" style={{ WebkitOverflowScrolling: 'touch' }}>
                  {awards.map((a) => (
                    <div key={a.title + a.year} className="snap-start shrink-0 w-64 rounded-xl bg-[#314874] text-white px-4 py-5 shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-wide leading-tight text-white/90 text-center">{a.title}</p>
                      <div className="mt-3 text-3xl font-extrabold text-center">{a.year}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tablet/Desktop grid */}
              <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
                {awards.map((a) => (
                  <div key={a.title + a.year} className="rounded-xl bg-[#314874] text-white px-5 py-6 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-wide leading-tight text-white/90 text-center">{a.title}</p>
                    <div className="mt-3 text-4xl font-extrabold text-center">{a.year}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-10 sm:py-14 bg-gray-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: "1800px" }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 text-center">Timeline บริษัท</h2>
            <div className="mt-8 relative">
              <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-0 bottom-0 w-px bg-gray-300" aria-hidden="true" />
              <ol className="space-y-8 pl-8 sm:pl-0">
                {timeline.map((t, idx) => (
                  <li key={t.year + idx} className="relative">
                    <div className="flex flex-col sm:grid sm:grid-cols-2 sm:gap-8 items-start">
                      {/* Dot */}
                      <div className="hidden sm:block sm:col-span-2">
                        <div className="relative h-0">
                          <span className="absolute left-1/2 -translate-x-1/2 -top-4 w-3 h-3 rounded-full bg-[#314874] ring-4 ring-white" />
                        </div>
                      </div>
                      {/* Left (Year) */}
                      <div className="sm:text-right">
                        <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-[#314874]">
                          {t.year}
                        </div>
                      </div>
                      {/* Right (Content) */}
                      <div>
                        <h3 className="mt-2 sm:mt-0 text-lg sm:text-xl font-bold text-gray-800">{t.title}</h3>
                        <p className="mt-2 text-gray-700 leading-relaxed text-sm sm:text-base">{t.desc}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Why SP overlay section */}
      <section
        className="relative w-screen ml-[calc(50%-50vw)] overflow-hidden"
        aria-label="ทำไมต้องใช้บริการของ เอสพี กันสาด"
      >
  <div className="relative overflow-hidden min-h-[560px] sm:min-h-[560px] lg:min-h-[600px]">
          <Image
            src="/bg-contact.webp"
            alt="ตัวอย่างงานกันสาดของ SPK Ansard"
            fill
            priority
            sizes="(max-width: 640px) 100vw, 100vw"
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
                    desc: "จากผู้มีประสบการณ์การทำงานมากกว่า 38ปี",
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
                        className="w-6 h-6 sm:w-7 sm:h-7 text-[#eaf4ff]"
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


      {/* CTA */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div
          className="mx-auto px-4 sm:px-6 lg:px-8"
          style={{ maxWidth: "1800px" }}
        >
          <div className="rounded-2xl p-6 sm:p-8 lg:p-10 text-center bg-gradient-to-r from-[#314874] to-[#1E2E4F] shadow-sm">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white mb-3 sm:mb-4">
              ต้องการคำปรึกษาหรือประเมินราคา?
            </h2>
            <p className="text-white/90 text-sm sm:text-base lg:text-lg mb-5 sm:mb-6">
              ทีมงานพร้อมให้คำแนะนำและสำรวจหน้างานฟรี ไม่มีค่าใช้จ่าย
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-6 sm:px-8 py-3 bg-white text-[#314874] hover:bg-white/90 font-semibold text-sm sm:text-base transition-colors"
              >
                <FaPhone className="hidden sm:inline-block" /> ติดต่อเรา
              </a>
              <a
                href="/gallery"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-6 sm:px-8 py-3 border border-white/80 text-white hover:bg-white/10 font-semibold text-sm sm:text-base transition-colors"
              >
                <FaEye className="hidden sm:inline-block" /> ดูผลงาน
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
