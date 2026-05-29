import { FaCheckCircle, FaCloudSun, FaShieldAlt } from "react-icons/fa";
import type { MaterialType } from "../estimateData";

const roofCards: Array<{
  type: MaterialType;
  title: string;
  description: string;
  badge: string;
  Icon: typeof FaShieldAlt;
}> = [
  {
    type: "ทึบแสง",
    title: "หลังคาทึบแสง",
    description: "เหมาะกับงานกันแดด กันฝน กันร้อน ใช้งานทนทาน",
    badge: "ทนแดดฝน",
    Icon: FaShieldAlt,
  },
  {
    type: "โปร่งแสง",
    title: "หลังคาโปร่งแสง",
    description: "เหมาะกับพื้นที่ต้องการแสงธรรมชาติ ดูโปร่ง สว่าง โมเดิร์น",
    badge: "แสงธรรมชาติ",
    Icon: FaCloudSun,
  },
];

export function RoofTypeStep({
  selectedType,
  onSelect,
}: {
  selectedType: MaterialType | "";
  onSelect: (type: MaterialType) => void;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <StepHeading eyebrow="Step 1" title="เลือกประเภทหลังคา" description="เริ่มจากลักษณะพื้นที่และบรรยากาศที่ต้องการ" />
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {roofCards.map(({ type, title, description, badge, Icon }) => {
          const selected = selectedType === type;
          return (
            <button
              key={type}
              type="button"
              onClick={() => onSelect(type)}
              className={`group relative rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-lg ${
                selected
                  ? "border-[#314874] bg-[#eaf4ff] ring-4 ring-[#314874]/15"
                  : "border-slate-200 bg-white hover:border-[#314874]/50"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#1E2E4F] text-white shadow-lg shadow-[#1E2E4F]/20">
                  <Icon className="h-6 w-6" />
                </div>
                {selected ? <FaCheckCircle className="h-6 w-6 text-[#314874]" /> : null}
              </div>
              <span className="mt-4 inline-flex rounded-full bg-white px-3 py-1 text-xs font-black text-[#1E2E4F]">
                {badge}
              </span>
              <h3 className="mt-3 text-xl font-black text-slate-950">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
            </button>
          );
        })}
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
