"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import {
  FaCalculator,
  FaCheckCircle,
  FaChevronRight,
  FaHome,
  FaLine,
  FaPhoneAlt,
  FaRulerCombined,
} from "react-icons/fa";

const jobTypes = [
  { id: "canopy", label: "กันสาดบ้าน", rate: 3600, note: "หน้าบ้าน ข้างบ้าน หลังบ้าน" },
  { id: "carport", label: "โรงจอดรถ", rate: 4300, note: "โครงสร้างแข็งแรงสำหรับจอดรถ" },
  { id: "lath", label: "ระแนง / ฝ้า", rate: 2800, note: "งานตกแต่งและบังแดด" },
  { id: "steel", label: "งานโครงสร้างเหล็ก", rate: 5200, note: "งานออกแบบเฉพาะพื้นที่" },
];

const materials = [
  { id: "metal-sheet", label: "เมทัลชีท", multiplier: 1, note: "คุ้มค่า ติดตั้งไว" },
  { id: "vinyl", label: "ไวนิล", multiplier: 1.24, note: "เรียบหรู ลดเสียงฝน" },
  { id: "aluminum", label: "อลูมิเนียม", multiplier: 1.34, note: "น้ำหนักเบา งานเนี้ยบ" },
  { id: "polycarbonate", label: "โพลีคาร์บอเนต", multiplier: 1.12, note: "โปร่งแสง บ้านไม่มืด" },
  { id: "shinko-lite", label: "ชินโคไลท์", multiplier: 1.68, note: "พรีเมียม โปร่งใส" },
];

const structureOptions = [
  { id: "standard", label: "มาตรฐาน", multiplier: 1 },
  { id: "premium", label: "พรีเมียม", multiplier: 1.18 },
  { id: "heavy-duty", label: "งานโครงสร้างหนัก", multiplier: 1.35 },
];

const addOns = [
  { id: "gutter", label: "รางน้ำฝน", price: 4500 },
  { id: "downpipe", label: "ท่อน้ำทิ้ง", price: 2200 },
  { id: "insulation", label: "ฉนวนกันร้อน", price: 6500 },
  { id: "lighting", label: "ไฟส่องสว่าง", price: 3500 },
];

const serviceAreas = [
  { id: "bangkok", label: "กรุงเทพฯ", surcharge: 0 },
  { id: "metro", label: "ปริมณฑล", surcharge: 3500 },
  { id: "other", label: "ต่างจังหวัด / พื้นที่พิเศษ", surcharge: 9000 },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(value);

export default function EstimatePage() {
  const [jobType, setJobType] = useState(jobTypes[0].id);
  const [material, setMaterial] = useState(materials[0].id);
  const [structure, setStructure] = useState(structureOptions[0].id);
  const [area, setArea] = useState(serviceAreas[0].id);
  const [width, setWidth] = useState(3);
  const [depth, setDepth] = useState(5);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(["gutter"]);
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    lineId: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [statusText, setStatusText] = useState("");

  const estimate = useMemo(() => {
    const selectedJob = jobTypes.find((item) => item.id === jobType) ?? jobTypes[0];
    const selectedMaterial = materials.find((item) => item.id === material) ?? materials[0];
    const selectedStructure =
      structureOptions.find((item) => item.id === structure) ?? structureOptions[0];
    const selectedArea = serviceAreas.find((item) => item.id === area) ?? serviceAreas[0];
    const squareMeters = Math.max(1, width * depth);
    const base = squareMeters * selectedJob.rate * selectedMaterial.multiplier * selectedStructure.multiplier;
    const addOnTotal = selectedAddOns.reduce((sum, id) => {
      const addOn = addOns.find((item) => item.id === id);
      return sum + (addOn?.price ?? 0);
    }, 0);
    const subtotal = base + addOnTotal + selectedArea.surcharge;
    const min = Math.round(subtotal * 0.9);
    const max = Math.round(subtotal * 1.15);

    return {
      selectedJob,
      selectedMaterial,
      selectedStructure,
      selectedArea,
      squareMeters,
      addOnTotal,
      min,
      max,
      selectedAddOns: addOns.filter((item) => selectedAddOns.includes(item.id)),
    };
  }, [area, depth, jobType, material, selectedAddOns, structure, width]);

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setStatusText("");

    const estimateMessage = [
      "ข้อมูลประเมินราคาเบื้องต้นจากหน้า /estimate",
      `ประเภทงาน: ${estimate.selectedJob.label}`,
      `วัสดุ: ${estimate.selectedMaterial.label}`,
      `โครงสร้าง: ${estimate.selectedStructure.label}`,
      `พื้นที่: ${width} x ${depth} ม. (${estimate.squareMeters.toFixed(1)} ตร.ม.)`,
      `พื้นที่ให้บริการ: ${estimate.selectedArea.label}`,
      `อุปกรณ์เสริม: ${estimate.selectedAddOns.map((item) => item.label).join(", ") || "ไม่มี"}`,
      `ช่วงราคา: ${formatCurrency(estimate.min)} - ${formatCurrency(estimate.max)}`,
      customer.message ? `ข้อความเพิ่มเติม: ${customer.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: customer.name,
          phone: customer.phone,
          lineId: customer.lineId,
          email: customer.email,
          services: [estimate.selectedJob.label, estimate.selectedMaterial.label, "ประเมินราคาออนไลน์"],
          message: estimateMessage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "ส่งข้อมูลไม่สำเร็จ");
      }

      setStatus("success");
      setStatusText("ส่งข้อมูลแล้ว ทีมงานจะติดต่อกลับพร้อมรายละเอียดหน้างานครับ");
      setCustomer({ name: "", phone: "", lineId: "", email: "", message: "" });
    } catch (error) {
      setStatus("error");
      setStatusText(error instanceof Error ? error.message : "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f8fc] pt-16 sm:pt-20">
      <section className="bg-[#1E2E4F] text-white">
        <div className="mx-auto max-w-[1760px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <nav className="mb-8 flex items-center gap-2 text-sm text-white/75">
            <Link href="/" className="transition hover:text-white" aria-label="หน้าแรก">
              <FaHome className="h-4 w-4" />
            </Link>
            <FaChevronRight className="h-3 w-3" />
            <span>ประเมินราคา</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/65">
                SP KANSARD ESTIMATE
              </p>
              <h1 className="max-w-3xl text-3xl font-bold leading-tight sm:text-4xl lg:text-6xl">
                คำนวณราคากันสาดและโรงจอดรถเบื้องต้น
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
                เลือกประเภทงาน วัสดุ และขนาดพื้นที่ เพื่อดูช่วงงบประมาณคร่าว ๆ ก่อนส่งข้อมูลให้ทีมงานตรวจหน้างานจริง
              </p>
            </div>

            <div className="rounded-lg border border-white/12 bg-white/8 p-5 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white text-[#1E2E4F]">
                  <FaCalculator className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">ราคาเป็นเพียงการประเมินเบื้องต้น</h2>
                  <p className="mt-2 text-sm leading-6 text-white/72">
                    ราคาจริงขึ้นอยู่กับโครงสร้างเดิม ระยะหน้างาน รูปแบบเสา งานรางน้ำ และรายละเอียดติดตั้ง
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1760px] gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-8 lg:py-12">
        <div className="space-y-6">
          <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
            <h2 className="text-xl font-semibold text-[#1E2E4F]">1. เลือกประเภทงาน</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {jobTypes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setJobType(item.id)}
                  className={`rounded-lg border p-4 text-left transition ${
                    jobType === item.id
                      ? "border-[#314874] bg-[#eaf4ff] text-[#1E2E4F]"
                      : "border-gray-200 bg-white text-gray-700 hover:border-[#314874]/40"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold">{item.label}</span>
                    {jobType === item.id && <FaCheckCircle className="h-4 w-4 text-[#314874]" />}
                  </div>
                  <p className="mt-2 text-sm text-gray-500">{item.note}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
            <h2 className="text-xl font-semibold text-[#1E2E4F]">2. ขนาดพื้นที่</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-gray-700">กว้าง (เมตร)</span>
                <input
                  type="number"
                  min="1"
                  step="0.5"
                  value={width}
                  onChange={(event) => setWidth(Number(event.target.value))}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-[#314874] focus:outline-none focus:ring-2 focus:ring-[#314874]/20"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">ยื่น / ลึก (เมตร)</span>
                <input
                  type="number"
                  min="1"
                  step="0.5"
                  value={depth}
                  onChange={(event) => setDepth(Number(event.target.value))}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-[#314874] focus:outline-none focus:ring-2 focus:ring-[#314874]/20"
                />
              </label>
            </div>
            <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-700">
              <FaRulerCombined className="h-4 w-4 text-[#314874]" />
              พื้นที่รวมประมาณ {estimate.squareMeters.toFixed(1)} ตร.ม.
            </div>
          </div>

          <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
            <h2 className="text-xl font-semibold text-[#1E2E4F]">3. เลือกวัสดุและโครงสร้าง</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {materials.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setMaterial(item.id)}
                  className={`rounded-lg border p-4 text-left transition ${
                    material === item.id
                      ? "border-[#314874] bg-[#eaf4ff]"
                      : "border-gray-200 bg-white hover:border-[#314874]/40"
                  }`}
                >
                  <span className="font-semibold text-[#1E2E4F]">{item.label}</span>
                  <p className="mt-2 text-sm text-gray-500">{item.note}</p>
                </button>
              ))}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {structureOptions.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setStructure(item.id)}
                  className={`rounded-lg border px-4 py-3 text-sm font-semibold transition ${
                    structure === item.id
                      ? "border-[#314874] bg-[#314874] text-white"
                      : "border-gray-200 bg-white text-gray-700 hover:border-[#314874]/40"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
            <h2 className="text-xl font-semibold text-[#1E2E4F]">4. รายละเอียดเสริม</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {addOns.map((item) => (
                <label
                  key={item.id}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4"
                >
                  <input
                    type="checkbox"
                    checked={selectedAddOns.includes(item.id)}
                    onChange={() => toggleAddOn(item.id)}
                    className="h-5 w-5 rounded border-gray-300 accent-[#314874]"
                  />
                  <span className="flex-1 text-sm font-medium text-gray-800">{item.label}</span>
                  <span className="text-sm text-gray-500">+{formatCurrency(item.price)}</span>
                </label>
              ))}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {serviceAreas.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setArea(item.id)}
                  className={`rounded-lg border px-4 py-3 text-sm font-semibold transition ${
                    area === item.id
                      ? "border-[#314874] bg-[#eaf4ff] text-[#1E2E4F]"
                      : "border-gray-200 bg-white text-gray-700 hover:border-[#314874]/40"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-lg bg-[#1E2E4F] p-5 text-white shadow-sm sm:p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Estimated Range</p>
            <div className="mt-4 text-3xl font-bold leading-tight">
              {formatCurrency(estimate.min)}
              <span className="block text-xl text-white/70">ถึง {formatCurrency(estimate.max)}</span>
            </div>
            <div className="mt-5 space-y-3 border-t border-white/12 pt-5 text-sm text-white/78">
              <div className="flex justify-between gap-4">
                <span>ประเภทงาน</span>
                <strong className="text-right text-white">{estimate.selectedJob.label}</strong>
              </div>
              <div className="flex justify-between gap-4">
                <span>วัสดุ</span>
                <strong className="text-right text-white">{estimate.selectedMaterial.label}</strong>
              </div>
              <div className="flex justify-between gap-4">
                <span>พื้นที่</span>
                <strong className="text-right text-white">{estimate.squareMeters.toFixed(1)} ตร.ม.</strong>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
            <h2 className="text-xl font-semibold text-[#1E2E4F]">ส่งข้อมูลให้ทีมงานติดต่อกลับ</h2>
            <div className="mt-5 space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-gray-700">ชื่อ *</span>
                <input
                  value={customer.name}
                  onChange={(event) => setCustomer((data) => ({ ...data, name: event.target.value }))}
                  required
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#314874] focus:outline-none focus:ring-2 focus:ring-[#314874]/20"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">เบอร์โทร *</span>
                <input
                  value={customer.phone}
                  onChange={(event) => setCustomer((data) => ({ ...data, phone: event.target.value }))}
                  required
                  inputMode="tel"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#314874] focus:outline-none focus:ring-2 focus:ring-[#314874]/20"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">LINE ID *</span>
                <input
                  value={customer.lineId}
                  onChange={(event) => setCustomer((data) => ({ ...data, lineId: event.target.value }))}
                  required
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#314874] focus:outline-none focus:ring-2 focus:ring-[#314874]/20"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">อีเมล</span>
                <input
                  value={customer.email}
                  onChange={(event) => setCustomer((data) => ({ ...data, email: event.target.value }))}
                  type="email"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#314874] focus:outline-none focus:ring-2 focus:ring-[#314874]/20"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">รายละเอียดเพิ่มเติม</span>
                <textarea
                  value={customer.message}
                  onChange={(event) => setCustomer((data) => ({ ...data, message: event.target.value }))}
                  rows={4}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#314874] focus:outline-none focus:ring-2 focus:ring-[#314874]/20"
                  placeholder="เช่น ต้องการทำหน้าบ้าน มีเสาเดิมหรือยังไม่มีเสา"
                />
              </label>
            </div>

            {statusText && (
              <p
                className={`mt-4 rounded-lg px-4 py-3 text-sm ${
                  status === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                }`}
              >
                {statusText}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-5 w-full rounded-lg bg-[#314874] px-5 py-3 font-semibold text-white transition hover:bg-[#1E2E4F] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? "กำลังส่งข้อมูล..." : "ส่งข้อมูลประเมินราคา"}
            </button>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <a
                href="tel:02-936-8841"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-3 text-sm font-semibold text-[#1E2E4F] transition hover:bg-gray-50"
              >
                <FaPhoneAlt className="h-4 w-4" />
                โทรหาเรา
              </a>
              <a
                href="https://line.me/R/ti/p/@spkansard"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#06C755] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#05B84E]"
              >
                <FaLine className="h-4 w-4" />
                LINE
              </a>
            </div>
          </form>
        </aside>
      </section>
    </div>
  );
}
