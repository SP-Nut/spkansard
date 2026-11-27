'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import {
  FiArrowUpRight, FiBox, FiFileText, FiFolder, FiGrid, FiImage, FiLogOut, FiPercent,
} from 'react-icons/fi';
import { AdminAuth } from '@/lib/auth';

const menu = [
  { href: '/admin/dashboard', label: 'ภาพรวม', icon: FiGrid },
  { href: '/admin/gallery', label: 'ผลงาน', icon: FiImage },
  { href: '/admin/materials', label: 'วัสดุ', icon: FiBox },
  { href: '/admin/categories', label: 'หมวดหมู่วัสดุ', icon: FiFolder },
  { href: '/admin/estimate', label: 'คำนวณราคา', icon: FiPercent },
  { href: '/admin/articles', label: 'บทความ', icon: FiFileText },
];

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    }
    AdminAuth.clearToken();
    router.replace('/admin/login');
  }

  if (pathname === '/admin' || pathname === '/admin/login') return children;

  return (
    <div className="admin-workspace min-h-dvh bg-[#f3f5f9] text-slate-900 lg:grid lg:grid-cols-[190px_minmax(0,1fr)]">
      <aside className="flex flex-col bg-[#14233c] text-white lg:sticky lg:top-0 lg:h-dvh">
        <div className="flex items-center justify-between gap-2 border-b border-white/10 px-3 py-2.5 lg:px-4 lg:py-3">
          <Link href="/admin/dashboard" className="flex items-center gap-2.5">
            <Image src="/images/logotab.png" alt="" width={30} height={30} className="rounded-md bg-white p-0.5" />
            <span className="text-sm font-semibold tracking-tight">SP Kansard</span>
          </Link>
          <div className="flex gap-1.5 lg:hidden">
            <Link href="/" target="_blank" rel="noreferrer" aria-label="เปิดเว็บไซต์"
              className="rounded-md p-2 text-slate-300 hover:bg-white/10 hover:text-white"><FiArrowUpRight /></Link>
            <button type="button" onClick={logout} aria-label="ออกจากระบบ"
              className="rounded-md p-2 text-slate-300 hover:bg-white/10 hover:text-white"><FiLogOut /></button>
          </div>
        </div>
        <nav aria-label="เมนูหลังบ้าน" className="grid grid-cols-3 gap-1 px-2 py-2 lg:flex lg:flex-col lg:overflow-y-auto">
          {menu.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link key={href} href={href} aria-current={active ? 'page' : undefined}
                className={`flex min-h-9 items-center gap-1.5 rounded-md border px-2 text-[11px] font-medium transition-colors sm:text-xs lg:gap-2.5 lg:px-3 lg:text-[13px] ${active
                  ? 'border-[#567293] bg-[#294362] text-white'
                  : 'border-transparent text-slate-300 hover:bg-white/10 hover:text-white'}`}>
                <Icon className="size-4 shrink-0" aria-hidden />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto hidden space-y-1 border-t border-white/10 p-2.5 lg:block">
          <Link href="/" target="_blank" rel="noreferrer"
            className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-xs text-slate-300 hover:bg-white/10 hover:text-white">
            <FiArrowUpRight className="size-4" aria-hidden /> เปิดเว็บไซต์
          </Link>
          <button type="button" onClick={logout}
            className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-xs text-slate-300 hover:bg-white/10 hover:text-white">
            <FiLogOut className="size-4" aria-hidden /> ออกจากระบบ
          </button>
        </div>
      </aside>
      <div className="admin-content min-w-0 px-3 py-3 sm:px-4 lg:px-5 lg:py-4">
        {children}
      </div>
    </div>
  );
}
