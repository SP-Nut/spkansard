'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminAuth } from '@/lib/auth';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // ตรวจสอบว่ามี token หรือไม่
    if (AdminAuth.isAuthenticated()) {
      // มี token ให้ไปหน้า dashboard
      router.push('/admin/dashboard');
    } else {
      // ไม่มี token ให้ไปหน้า login และลบ token ที่เหลืออยู่
      AdminAuth.clearToken();
      router.push('/admin/login');
    }
  }, [router]);

  return (
    <div className="admin-auth grid min-h-dvh place-items-center bg-[#edf2f7] p-4" role="status">
      <p className="text-sm text-slate-600">กำลังตรวจสอบสิทธิ์…</p>
    </div>
  );
}
