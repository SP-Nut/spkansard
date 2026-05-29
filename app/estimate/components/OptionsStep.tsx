import { FaCheckCircle, FaTint } from "react-icons/fa";
import { formatCurrency, unitLabels, type PriceSize, type ServiceOption } from "../estimateData";

const inputClass =
  "mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base font-bold text-slate-950 outline-none transition focus:border-[#314874] focus:ring-4 focus:ring-[#314874]/15 disabled:bg-slate-100 disabled:text-slate-400";

export function OptionsStep({
  selectedSize,
  selectedColor,
  selectedCeiling,
  selectedGutter,
  gutterMeters,
  selectedServices,
  mainServices,
  extraServices,
  gutters,
  freeColors,
  area,
  onColorChange,
  onCeilingChange,
  onGutterChange,
  onGutterMetersChange,
  onExtraToggle,
  onExtraQuantityChange,
}: {
  selectedSize: PriceSize | "";
  selectedColor: string;
  selectedCeiling: string;
  selectedGutter: string;
  gutterMeters: number;
  selectedServices: Record<string, number>;
  mainServices: ServiceOption[];
  extraServices: ServiceOption[];
  gutters: ServiceOption[];
  freeColors: string[];
  area: number;
  onColorChange: (color: string) => void;
  onCeilingChange: (name: string) => void;
  onGutterChange: (name: string) => void;
  onGutterMetersChange: (meters: number) => void;
  onExtraToggle: (name: string, checked: boolean) => void;
  onExtraQuantityChange: (name: string, quantity: number) => void;
}) {
  const ceilingServices = mainServices.filter((service) => service.group === "งานฝ้า ใช้เฉพาะ L+");

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <StepHeading eyebrow="Step 6" title="เลือกสีและของเสริม" description="แยกเป็นกลุ่มเพื่อให้เห็นผลต่อราคาได้ง่ายขึ้น" />

      <div className="mt-4 grid gap-4">
        <OptionGroup title="สีโครงสร้าง" description="สีมาตรฐานฟรี สีผสมพิเศษคิดตามพื้นที่">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {[...freeColors, "สีผสมพิเศษ"].map((color) => {
              const selected = selectedColor === color;
              return (
                <button
                  key={color}
                  type="button"
                  onClick={() => onColorChange(color)}
                  className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-black transition ${
                    selected ? "border-[#314874] bg-[#eaf4ff] text-[#1E2E4F]" : "border-slate-200 bg-white text-slate-700 hover:border-[#314874]/50"
                  }`}
                >
                  <span>{color}</span>
                  <span className="text-xs font-bold">{color === "สีผสมพิเศษ" ? "200 บาท/ตร.ม." : "ฟรี"}</span>
                </button>
              );
            })}
          </div>
        </OptionGroup>

        <OptionGroup title="ฝ้าใต้หลังคา" description={selectedSize === "L+" ? "เลือกงานฝ้าใต้หลังคาได้ตามรายการบริการหลัก" : "งานฝ้าเลือกได้เฉพาะไซซ์ L+"}>
          <select
            value={selectedSize === "L+" ? selectedCeiling : ""}
            disabled={selectedSize !== "L+"}
            onChange={(event) => onCeilingChange(event.target.value)}
            className={inputClass}
          >
            <option value="">ไม่เลือกงานฝ้า</option>
            {ceilingServices.map((service) => (
              <option key={service.name} value={service.name}>
                {service.name} - {formatCurrency(service.price)}/ตร.ม.
              </option>
            ))}
          </select>
        </OptionGroup>

        <OptionGroup title="รางน้ำ" description="คิดราคาตามจำนวนเมตรที่กรอก">
          <div className="grid gap-3 sm:grid-cols-[1fr_160px]">
            <select value={selectedGutter} onChange={(event) => onGutterChange(event.target.value)} className={inputClass}>
              <option value="">ไม่เลือกรางน้ำ</option>
              {gutters.map((service) => (
                <option key={service.name} value={service.name}>
                  {service.group} - {service.name} ({formatCurrency(service.price)}/เมตร)
                </option>
              ))}
            </select>
            <label className="block">
              <span className="text-sm font-black text-slate-700">เมตร</span>
              <input
                type="number"
                min="0"
                step="0.5"
                value={gutterMeters}
                disabled={!selectedGutter}
                onChange={(event) => onGutterMetersChange(Number(event.target.value))}
                className={inputClass}
              />
            </label>
          </div>
        </OptionGroup>

        <OptionGroup title="บริการเสริม" description="งานรากฐาน งานไฟ งานท่อน้ำ และบริการอื่นจากฐานข้อมูล">
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-[#1E2E4F]">
              <span>เลือกบริการเสริม {Object.keys(selectedServices).length ? `(${Object.keys(selectedServices).length})` : ""}</span>
              <span className="text-slate-400 transition group-open:rotate-45">+</span>
            </summary>
          <div className="mt-3 grid max-h-[360px] gap-2 overflow-y-auto pr-1">
            {extraServices.map((service) => {
              const selected = selectedServices[service.name] !== undefined;
              const isQuantityLocked = service.unit === "sqm" || service.unit === "free";
              return (
                <div
                  key={service.name}
                  className={`grid gap-3 rounded-2xl border p-3 transition sm:grid-cols-[minmax(0,1fr)_120px] ${
                    selected ? "border-[#314874] bg-[#eaf4ff]" : "border-slate-200 bg-white"
                  }`}
                >
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={(event) => onExtraToggle(service.name, event.target.checked)}
                      className="mt-1 h-5 w-5 rounded border-slate-300 text-[#314874] focus:ring-[#314874]"
                    />
                    <span className="min-w-0">
                      <span className="flex items-center gap-2 text-sm font-black text-slate-950">
                        {service.group} - {service.name}
                        {selected ? <FaCheckCircle className="h-4 w-4 shrink-0 text-[#314874]" /> : null}
                      </span>
                      <span className="mt-1 block text-xs font-bold text-slate-500">
                        {service.unit === "free"
                          ? "ฟรี / ประเมินหน้างาน"
                          : `${formatCurrency(service.price)}/${unitLabels[service.unit]}`}
                        {service.unit === "sqm" && area > 0 ? ` x ${area.toFixed(2)} ตร.ม.` : ""}
                      </span>
                    </span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={service.unit === "sqm" ? area.toFixed(2) : selectedServices[service.name] ?? 1}
                    disabled={!selected || isQuantityLocked}
                    onChange={(event) => onExtraQuantityChange(service.name, Number(event.target.value))}
                    className={inputClass}
                    aria-label={`จำนวน ${service.name}`}
                  />
                </div>
              );
            })}
          </div>
          </details>
        </OptionGroup>
      </div>
    </section>
  );
}

function OptionGroup({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
      <div className="mb-3 flex items-start gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-[#314874]">
          <FaTint />
        </div>
        <div>
          <h3 className="font-black text-[#1E2E4F]">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
        </div>
      </div>
      {children}
    </div>
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
