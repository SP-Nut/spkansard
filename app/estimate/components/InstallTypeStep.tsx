import { FaCheckCircle, FaColumns, FaHome } from "react-icons/fa";
import { formatCurrency, unitLabels, type ServiceOption } from "../estimateData";
import type { InstallType } from "../types/estimate.types";

const inputClass =
  "mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base font-bold text-slate-950 outline-none transition focus:border-[#314874] focus:ring-4 focus:ring-[#314874]/15";

export function InstallTypeStep({
  installType,
  postServiceName,
  postCount,
  freeInstallName,
  mainServices,
  freeInstallOptions,
  onInstallTypeChange,
  onPostServiceChange,
  onPostCountChange,
  onFreeInstallChange,
}: {
  installType: InstallType;
  postServiceName: string;
  postCount: number;
  freeInstallName: string;
  mainServices: ServiceOption[];
  freeInstallOptions: string[];
  onInstallTypeChange: (type: InstallType) => void;
  onPostServiceChange: (name: string) => void;
  onPostCountChange: (count: number) => void;
  onFreeInstallChange: (name: string) => void;
}) {
  const postServices = mainServices.filter((service) => service.group === "งานเสา");

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <StepHeading eyebrow="Step 5" title="เลือกรูปแบบติดตั้ง" description="ระบบจะคิดค่าเสาเฉพาะงานแบบมีเสาตามสูตรเดิม" />
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <InstallCard
          selected={installType === "มีเสา"}
          title="มีเสา"
          description="แข็งแรง เหมาะกับพื้นที่กว้าง หรือยื่นออกจากตัวบ้าน"
          Icon={FaColumns}
          onClick={() => onInstallTypeChange("มีเสา")}
        />
        <InstallCard
          selected={installType === "ไร้เสา"}
          title="ไร้เสา"
          description="ดูโล่ง สวยงาม ขาค้ำ / แขนดึง / แฟลตบาร์ เป็นตัวเลือกฟรี"
          Icon={FaHome}
          onClick={() => onInstallTypeChange("ไร้เสา")}
        />
      </div>

      {installType === "มีเสา" ? (
        <div className="mt-4 grid gap-4 rounded-2xl bg-slate-50 p-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-black text-slate-700">รูปแบบเสา</span>
            <select value={postServiceName} onChange={(event) => onPostServiceChange(event.target.value)} className={inputClass}>
              {postServices.map((service) => (
                <option key={service.name} value={service.name}>
                  {service.name} - {formatCurrency(service.price)}/{unitLabels[service.unit]}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-black text-slate-700">จำนวนเสา</span>
            <input
              type="number"
              min="0"
              value={postCount}
              onChange={(event) => onPostCountChange(Number(event.target.value))}
              className={inputClass}
            />
          </label>
        </div>
      ) : null}

      {installType === "ไร้เสา" ? (
        <div className="mt-4 rounded-2xl bg-[#f7fbff] p-4">
          <label className="block">
            <span className="text-sm font-black text-slate-700">รูปแบบไร้เสา</span>
            <select value={freeInstallName} onChange={(event) => onFreeInstallChange(event.target.value)} className={inputClass}>
              {freeInstallOptions.map((option) => (
                <option key={option} value={option}>
                  {option} - ฟรี
                </option>
              ))}
            </select>
          </label>
          <p className="mt-3 text-sm leading-6 text-[#1E2E4F]">
            งานไร้เสาต้องตรวจสอบโครงสร้างเดิมก่อนยืนยันราคา
          </p>
        </div>
      ) : null}
    </section>
  );
}

function InstallCard({
  selected,
  title,
  description,
  Icon,
  onClick,
}: {
  selected: boolean;
  title: string;
  description: string;
  Icon: typeof FaColumns;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-lg ${
        selected ? "border-[#314874] bg-[#eaf4ff] ring-4 ring-[#314874]/15" : "border-slate-200 bg-white hover:border-[#314874]/50"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#1E2E4F] text-white">
          <Icon />
        </div>
        {selected ? <FaCheckCircle className="h-5 w-5 text-[#314874]" /> : null}
      </div>
      <h3 className="mt-4 text-xl font-black text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </button>
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
