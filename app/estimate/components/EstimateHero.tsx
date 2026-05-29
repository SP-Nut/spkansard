import Link from "next/link";
import { FaCalculator, FaChevronRight, FaHome, FaLine } from "react-icons/fa";

export function EstimateHero() {
  return (
    <section className="relative overflow-hidden bg-[#f4fbff] pt-20 text-slate-950 sm:pt-24">
      <div className="absolute inset-x-0 top-0 h-24 bg-[#30318B]" />
      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-5 sm:px-6 lg:px-8">
        <nav className="mb-5 flex items-center gap-2 text-xs font-semibold text-white/80">
          <Link href="/" className="transition hover:text-white" aria-label="หน้าแรก">
            <FaHome className="h-4 w-4" />
          </Link>
          <FaChevronRight className="h-3 w-3" />
          <span>ประเมินราคากันสาด</span>
        </nav>

        <div className="rounded-[2rem] border border-white/70 bg-white p-5 shadow-[0_24px_80px_rgba(48,49,139,0.16)] sm:p-8 lg:grid lg:grid-cols-[1fr_360px] lg:items-center lg:gap-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#e7f7ff] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#30318B]">
              <FaCalculator className="text-[#00A2EA]" />
              SP Kansard Estimate
            </div>
            <h1 className="mt-4 max-w-3xl text-3xl font-black leading-tight text-[#202166] sm:text-5xl">
              ประเมินราคากันสาดออนไลน์ใน 1 นาที
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              คำนวณราคากันสาด เลือกวัสดุ กรอกขนาดพื้นที่ ดูราคาติดตั้งกันสาดเบื้องต้น
              แล้วส่งข้อมูลให้ทีม SP Kansard ช่วยตรวจรายละเอียดต่อได้ทันที
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="#estimate-calculator"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#00A2EA] px-5 py-3 text-sm font-black text-white shadow-lg shadow-[#00A2EA]/25 transition hover:-translate-y-0.5 hover:bg-[#008ed0]"
              >
                เริ่มประเมินราคา
                <FaChevronRight className="h-3 w-3" />
              </a>
              <a
                href="https://line.me/R/ti/p/@spkansard"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#00A2EA]/30 bg-white px-5 py-3 text-sm font-black text-[#30318B] transition hover:border-[#00A2EA] hover:bg-[#f4fbff]"
              >
                <FaLine className="text-[#00A2EA]" />
                ปรึกษาทาง LINE
              </a>
            </div>
          </div>

          <div className="mt-8 rounded-3xl bg-[#30318B] p-5 text-white lg:mt-0">
            <p className="text-sm font-black text-white/80">เหมาะสำหรับ</p>
            <div className="mt-4 grid gap-3 text-sm">
              {["ประเมินราคากันสาด", "กันสาดเมทัลชีทและไวนิล", "กันสาดโปร่งแสง", "ขอใบเสนอราคากันสาด"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FF2B8C]" />
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
