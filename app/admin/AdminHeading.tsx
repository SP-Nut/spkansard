import Link from 'next/link';
import type { ReactNode } from 'react';
import { FiArrowLeft } from 'react-icons/fi';

export const adminPrimary = 'inline-flex min-h-9 items-center justify-center gap-1.5 rounded-md bg-[#1e3b5b] px-3 text-sm font-medium text-white hover:bg-[#2c5073] disabled:opacity-50';
export const adminSecondary = 'inline-flex min-h-9 items-center justify-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-50';

export function AdminHeading({ title, back, children }: { title: string; back?: string; children?: ReactNode }) {
  return (
    <header className="mb-3 flex min-h-10 flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
      <div className="flex min-w-0 items-center gap-2">
        {back && <Link href={back} aria-label="กลับหน้ารายการ"
          className="rounded-md border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-100"><FiArrowLeft /></Link>}
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h1>
      </div>
      {children && <div className="flex flex-wrap gap-2">{children}</div>}
    </header>
  );
}
