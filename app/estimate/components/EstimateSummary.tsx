import { FaChevronUp, FaLine, FaPhoneAlt, FaTimes } from "react-icons/fa";
import { formatCurrency } from "../estimateData";
import type { EstimateResult, EstimateSelectionSummary } from "../types/estimate.types";

export function EstimateSummary({
  selection,
  estimate,
  freeInstallName,
  missingText,
  onOpenContact,
  onSaveSummaryImage,
  mobileOpen,
  onMobileOpenChange,
}: {
  selection: EstimateSelectionSummary;
  estimate: EstimateResult;
  freeInstallName: string;
  missingText: string;
  onOpenContact: () => void;
  onSaveSummaryImage: () => void;
  mobileOpen: boolean;
  onMobileOpenChange: (open: boolean) => void;
}) {
  return (
    <>
      <aside className="hidden lg:block lg:sticky lg:top-28 lg:self-start">
        <SummaryPanel
          selection={selection}
          estimate={estimate}
          freeInstallName={freeInstallName}
          missingText={missingText}
          onOpenContact={onOpenContact}
          onSaveSummaryImage={onSaveSummaryImage}
        />
      </aside>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-sky-100 bg-white p-3 shadow-[0_-16px_40px_rgba(15,23,42,0.12)] lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <button
            type="button"
            onClick={() => onMobileOpenChange(true)}
            className="flex min-w-0 flex-1 items-center gap-3 text-left"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#eaf4ff] text-[#314874]">
              <FaChevronUp />
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-bold text-slate-500">ราคาประเมินเบื้องต้น</span>
              <span className="block truncate text-xl font-black text-[#1E2E4F]">
                {estimate.isReady ? formatCurrency(estimate.total) : "รอข้อมูล"}
              </span>
            </span>
          </button>
          <button
            type="button"
            disabled={!estimate.isReady}
            onClick={onOpenContact}
            className="rounded-2xl bg-[#314874] px-4 py-3 text-sm font-black text-white shadow-lg shadow-[#314874]/20 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
          >
            ส่ง LINE
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 bg-slate-950/40 p-3 lg:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-x-3 bottom-3 max-h-[86vh] overflow-y-auto rounded-2xl bg-white p-4 shadow-2xl">
            <button
              type="button"
              onClick={() => onMobileOpenChange(false)}
              className="ml-auto grid h-10 w-10 place-items-center rounded-2xl bg-slate-100 text-slate-600"
              aria-label="ปิดรายละเอียดราคา"
            >
              <FaTimes />
            </button>
            <SummaryPanel
              selection={selection}
              estimate={estimate}
              freeInstallName={freeInstallName}
              missingText={missingText}
              onOpenContact={onOpenContact}
              onSaveSummaryImage={onSaveSummaryImage}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

function SummaryPanel({
  selection,
  estimate,
  freeInstallName,
  missingText,
  onOpenContact,
  onSaveSummaryImage,
}: {
  selection: EstimateSelectionSummary;
  estimate: EstimateResult;
  freeInstallName: string;
  missingText: string;
  onOpenContact: () => void;
  onSaveSummaryImage: () => void;
}) {
  const selectedServices = estimate.extraServiceItems.map((item) => item.service.name).join(", ");

  return (
    <section className="overflow-hidden rounded-2xl border border-[#1E2E4F]/10 bg-white shadow-[0_18px_54px_rgba(30,46,79,0.14)]">
      <div className="bg-[#1E2E4F] p-4 text-white">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-white/70">ราคาประเมินเบื้องต้น</p>
        {estimate.isReady ? (
          <div className="mt-3 text-4xl font-black leading-none transition">{formatCurrency(estimate.total)}</div>
        ) : (
          <p className="mt-3 text-lg font-bold leading-7 text-white/85">
            เริ่มเลือกประเภทหลังคาและกรอกขนาด ระบบจะแสดงราคาประเมินให้ทันที
          </p>
        )}
        {!estimate.isReady ? <p className="mt-3 text-sm text-white/70">{missingText}</p> : null}
      </div>

      <div className="space-y-4 p-4">
        <div className="grid gap-2 text-sm">
          <InfoRow label="ประเภทหลังคา" value={selection.roofType || "-"} />
          <InfoRow label="สินค้า" value={selection.product?.name || "-"} />
          <InfoRow label="ไซซ์" value={selection.size || "-"} />
          <InfoRow label="พื้นที่" value={estimate.squareMeters > 0 ? `${estimate.squareMeters.toFixed(2)} ตร.ม.` : "-"} />
          <InfoRow label="ติดตั้ง" value={selection.installType || "-"} />
          {selection.installType === "มีเสา" ? <InfoRow label="จำนวนเสา" value={`${selection.postCount} ต้น`} /> : null}
          {selection.installType === "ไร้เสา" ? <InfoRow label="รูปแบบไร้เสา" value={freeInstallName} /> : null}
          <InfoRow label="สี" value={selection.color || "-"} />
          {estimate.ceilingService ? <InfoRow label="ฝ้า" value={estimate.ceilingService.name} /> : null}
          {estimate.gutterService ? <InfoRow label="รางน้ำ" value={`${estimate.gutterService.name} ${selection.gutterMeters} เมตร`} /> : null}
          {selectedServices ? <InfoRow label="บริการเสริม" value={selectedServices} /> : null}
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <PriceRow label="ราคาวัสดุ" value={estimate.materialTotal} />
          <PriceRow label="ราคางานเสา" value={estimate.postTotal} />
          <PriceRow label="ราคาสีพิเศษ" value={estimate.colorTotal} />
          <PriceRow label="ราคางานฝ้า" value={estimate.ceilingTotal} />
          <PriceRow label="ราคารางน้ำ" value={estimate.gutterTotal} />
          <PriceRow label="ราคารวมบริการเสริม" value={estimate.extraTotal} />
        </div>

        <p className="rounded-2xl bg-[#f7fbff] p-4 text-xs leading-6 text-[#1E2E4F]">
          ราคานี้เป็นราคาเบื้องต้น อาจเปลี่ยนแปลงตามสภาพหน้างาน ระยะติดตั้ง รายละเอียดโครงสร้าง และการตรวจสอบจริงจากทีมงาน
        </p>

        <div className="grid gap-2">
          <button
            type="button"
            disabled={!estimate.isReady}
            onClick={onOpenContact}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#314874] px-5 py-3 text-sm font-black text-white shadow-lg shadow-[#314874]/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
          >
            <FaLine />
            ส่งผลประเมินให้แอดมินทาง LINE
          </button>
          <button
            type="button"
            disabled={!estimate.isReady}
            onClick={onOpenContact}
            className="rounded-2xl bg-[#314874] px-5 py-3 text-sm font-black text-white transition hover:bg-[#1E2E4F] disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            ขอใบเสนอราคาแบบละเอียด
          </button>
          <button
            type="button"
            disabled={!estimate.isReady}
            onClick={onSaveSummaryImage}
            className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-black text-[#1E2E4F] transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-400"
          >
            บันทึกผลประเมินเป็นรูปภาพ
          </button>
          <a
            href="tel:02-936-8841"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-5 py-3 text-sm font-black text-[#1E2E4F] transition hover:bg-slate-50"
          >
            <FaPhoneAlt />
            โทรปรึกษาทีมงาน
          </a>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[110px_1fr] gap-3 rounded-2xl bg-white text-sm">
      <span className="text-slate-500">{label}</span>
      <strong className="text-right text-slate-900">{value}</strong>
    </div>
  );
}

function PriceRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white py-2 text-sm last:border-b-0">
      <span className="text-slate-500">{label}</span>
      <strong className="text-slate-950">{formatCurrency(value)}</strong>
    </div>
  );
}
