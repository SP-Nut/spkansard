"use client";

import { FormEvent } from "react";
import { FaLine, FaTimes } from "react-icons/fa";
import type { CustomerInfo } from "../types/estimate.types";

const inputClass =
  "mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-950 outline-none transition focus:border-[#00A2EA] focus:ring-4 focus:ring-[#00A2EA]/15";

export function ContactLeadForm({
  open,
  customer,
  status,
  statusText,
  onClose,
  onCustomerChange,
  onSubmit,
}: {
  open: boolean;
  customer: CustomerInfo;
  status: "idle" | "sending" | "success" | "error";
  statusText: string;
  onClose: () => void;
  onCustomerChange: (customer: CustomerInfo) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-slate-950/45 p-3" role="dialog" aria-modal="true">
      <div className="mx-auto flex min-h-full max-w-2xl items-end sm:items-center">
        <form onSubmit={onSubmit} className="max-h-[92vh] w-full overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00A2EA]">Contact</p>
              <h2 className="mt-1 text-2xl font-black text-[#202166]">ส่งผลประเมินให้แอดมินทาง LINE</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">กรอกข้อมูลติดต่อ ทีมงานจะใช้รายละเอียดประเมินนี้คุยต่อและออกใบเสนอราคาให้</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-slate-100 text-slate-600"
              aria-label="ปิดฟอร์ม"
            >
              <FaTimes />
            </button>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field label="ชื่อ *">
              <input value={customer.name} onChange={(event) => onCustomerChange({ ...customer, name: event.target.value })} required className={inputClass} />
            </Field>
            <Field label="เบอร์โทร *">
              <input value={customer.phone} onChange={(event) => onCustomerChange({ ...customer, phone: event.target.value })} required inputMode="tel" className={inputClass} />
            </Field>
            <Field label="LINE ID *">
              <input value={customer.lineId} onChange={(event) => onCustomerChange({ ...customer, lineId: event.target.value })} required className={inputClass} />
            </Field>
            <Field label="อีเมล">
              <input value={customer.email} onChange={(event) => onCustomerChange({ ...customer, email: event.target.value })} type="email" className={inputClass} />
            </Field>
            <Field label="พื้นที่ติดตั้ง / จังหวัด" className="sm:col-span-2">
              <input value={customer.location} onChange={(event) => onCustomerChange({ ...customer, location: event.target.value })} placeholder="เช่น กรุงเทพฯ, นนทบุรี, ปทุมธานี" className={inputClass} />
            </Field>
            <Field label="ลิงก์รูปหน้างาน หรือแบบที่ชอบ" className="sm:col-span-2">
              <input value={customer.imageUrl} onChange={(event) => onCustomerChange({ ...customer, imageUrl: event.target.value })} type="url" placeholder="Google Drive, LINE album, URL รูป" className={inputClass} />
            </Field>
            <Field label="รายละเอียดเพิ่มเติม" className="sm:col-span-2">
              <textarea value={customer.message} onChange={(event) => onCustomerChange({ ...customer, message: event.target.value })} rows={4} placeholder="เช่น มีเสาเดิม พื้นที่หน้างาน ข้อจำกัด หรือช่วงเวลาที่สะดวกให้ติดต่อ" className={inputClass} />
            </Field>
          </div>

          {statusText ? (
            <p className={`mt-4 rounded-2xl px-4 py-3 text-sm ${status === "success" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
              {statusText}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#FF2B8C] px-5 py-4 text-base font-black text-white shadow-lg shadow-[#FF2B8C]/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
          >
            <FaLine />
            {status === "sending" ? "กำลังส่งข้อมูล..." : "ส่งข้อมูลให้ทีมงาน"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({ label, className = "", children }: { label: string; className?: string; children: React.ReactNode }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-sm font-black text-slate-700">{label}</span>
      {children}
    </label>
  );
}
