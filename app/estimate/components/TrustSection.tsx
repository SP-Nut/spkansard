import { FaClipboardCheck, FaFileInvoice, FaSearchLocation, FaUpload } from "react-icons/fa";

const cards = [
  {
    title: "ประเมินจากข้อมูลราคาวัสดุจริง",
    description: "ราคาตั้งต้นจัดการจากหลังบ้าน ไม่ต้องแก้โค้ดหน้าเว็บทุกครั้ง",
    Icon: FaClipboardCheck,
  },
  {
    title: "ตรวจสอบหน้างานก่อนยืนยันราคา",
    description: "ทีมงานช่วยดูรายละเอียดโครงสร้าง พื้นที่ติดตั้ง และข้อจำกัดจริง",
    Icon: FaSearchLocation,
  },
  {
    title: "ขอใบเสนอราคาได้ทันที",
    description: "ส่งข้อมูลที่เลือกทั้งหมดให้ทีมงานต่อยอดเป็นใบเสนอราคาแบบละเอียด",
    Icon: FaFileInvoice,
  },
  {
    title: "ส่งรูปหน้างานให้ทีมช่วยประเมินได้",
    description: "แนบลิงก์รูปหรือแบบที่ชอบเพื่อให้คุยรายละเอียดได้เร็วขึ้น",
    Icon: FaUpload,
  },
];

export function TrustSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00A2EA]">Trust</p>
        <h2 className="mt-2 text-3xl font-black text-[#202166]">ทำไมต้องประเมินราคากับ SP Kansard?</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ title, description, Icon }) => (
          <article key={title} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#e7f7ff] text-[#00A2EA]">
              <Icon />
            </div>
            <h3 className="mt-4 text-lg font-black text-slate-950">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
