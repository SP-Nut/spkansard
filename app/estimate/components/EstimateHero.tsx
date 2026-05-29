import Link from "next/link";
import { FaCalculator, FaChevronRight, FaHome, FaLine } from "react-icons/fa";

export function EstimateHero() {
  return (
    <section className="relative overflow-hidden bg-[#f7fbff] pt-16 text-slate-950 sm:pt-20">
      <div className="absolute inset-x-0 top-0 h-20 bg-linear-to-r from-[#1E2E4F] to-[#314874]" />
      <div className="relative mx-auto max-w-7xl px-4 pb-5 pt-4 sm:px-6 lg:px-8">
        <nav className="mb-5 flex items-center gap-2 text-xs font-semibold text-white/80">
          <Link href="/" className="transition hover:text-white" aria-label="หน้าแรก">
            <FaHome className="h-4 w-4" />
          </Link>
          <FaChevronRight className="h-3 w-3" />
          <span>ประเมินราคากันสาด</span>
        </nav>

        <div className="rounded-2xl border border-white/70 bg-white p-4 shadow-[0_18px_54px_rgba(30,46,79,0.12)] sm:p-5 lg:grid lg:grid-cols-[1fr_320px] lg:items-center lg:gap-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#eaf4ff] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#1E2E4F]">
              <FaCalculator className="text-[#314874]" />
              SP Kansard Estimate
            </div>
            <h1 className="mt-3 max-w-3xl text-3xl font-black leading-tight text-[#1E2E4F] sm:text-4xl lg:text-5xl">
              ประเมินราคากันสาดออนไลน์ใน 1 นาที
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
              คำนวณราคากันสาด เลือกวัสดุ กรอกขนาดพื้นที่ ดูราคาติดตั้งกันสาดเบื้องต้น
              แล้วส่งข้อมูลให้ทีม SP Kansard ช่วยตรวจรายละเอียดต่อได้ทันที
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <a
                href="#estimate-calculator"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#314874] px-5 py-3 text-sm font-black text-white shadow-lg shadow-[#314874]/25 transition hover:-translate-y-0.5 hover:bg-[#1E2E4F]"
              >
                เริ่มประเมินราคา
                <FaChevronRight className="h-3 w-3" />
              </a>
              <a
                href="https://line.me/R/ti/p/@spkansard"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#314874]/30 bg-white px-5 py-3 text-sm font-black text-[#1E2E4F] transition hover:border-[#314874] hover:bg-[#f7fbff]"
              >
                <FaLine className="text-[#314874]" />
                ปรึกษาทาง LINE
              </a>
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-[#1E2E4F] p-4 text-white lg:mt-0">
            <p className="text-sm font-black text-white/80">เหมาะสำหรับ</p>
            <div className="mt-3 grid gap-2 text-sm">
              {["ประเมินราคากันสาด", "กันสาดเมทัลชีทและไวนิล", "กันสาดโปร่งแสง", "ขอใบเสนอราคากันสาด"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#314874]" />
                  <span className="font-bold">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
