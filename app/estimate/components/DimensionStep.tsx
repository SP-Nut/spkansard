import { FaImage, FaRulerCombined } from "react-icons/fa";

const inputClass =
  "mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base font-bold text-slate-950 outline-none transition focus:border-[#314874] focus:ring-4 focus:ring-[#314874]/15";

export function DimensionStep({
  width,
  length,
  area,
  onWidthChange,
  onLengthChange,
}: {
  width: string;
  length: string;
  area: number;
  onWidthChange: (value: string) => void;
  onLengthChange: (value: string) => void;
}) {
  const needsHelp = !Number(width) || !Number(length);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <StepHeading eyebrow="Step 4" title="กรอกขนาดพื้นที่" description="ใส่ขนาดโดยประมาณก่อน ทีมงานจะตรวจหน้างานก่อนยืนยันราคาอีกครั้ง" />
      <div className="mt-4 grid gap-4 md:grid-cols-[1fr_260px]">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-black text-slate-700">ความกว้าง</span>
            <input
              type="number"
              min="0"
              step="0.1"
              value={width}
              onChange={(event) => onWidthChange(event.target.value)}
              placeholder="เช่น 3"
              className={inputClass}
            />
            <span className="mt-2 block text-xs font-bold text-slate-500">หน่วยเมตร</span>
          </label>
          <label className="block">
            <span className="text-sm font-black text-slate-700">ความยาว</span>
            <input
              type="number"
              min="0"
              step="0.1"
              value={length}
              onChange={(event) => onLengthChange(event.target.value)}
              placeholder="เช่น 5"
              className={inputClass}
            />
            <span className="mt-2 block text-xs font-bold text-slate-500">หน่วยเมตร</span>
          </label>
        </div>
        <div className="rounded-2xl bg-[#1E2E4F] p-4 text-white">
          <FaRulerCombined className="h-6 w-6 text-[#314874]" />
          <p className="mt-4 text-sm font-bold text-white/75">พื้นที่ประมาณ</p>
          <p className="mt-1 text-3xl font-black">{area > 0 ? area.toFixed(2) : "--"} ตร.ม.</p>
          {needsHelp ? (
            <p className="mt-3 text-xs leading-5 text-white/70">กรอกกว้างและยาวมากกว่า 0 เพื่อให้ระบบแสดงราคา</p>
          ) : null}
        </div>
      </div>
      <div className="mt-4 grid gap-3 rounded-2xl border border-[#314874]/20 bg-[#f7fbff] p-4 sm:grid-cols-[auto_1fr]">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-[#314874]">
          <FaImage />
        </div>
        <div>
          <h3 className="font-black text-[#1E2E4F]">ไม่แน่ใจขนาดพื้นที่?</h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            ส่งรูปหน้างานหรือแบบที่ชอบให้ทีมงานช่วยประเมินได้ หรือวัดกว้าง x ยาวจากพื้นที่ติดตั้งโดยประมาณก่อน
          </p>
        </div>
      </div>
    </section>
  );
}

function StepHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div>
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#314874]">{eyebrow}</p>
      <h2 className="mt-1 text-2xl font-black text-[#1E2E4F]">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}
