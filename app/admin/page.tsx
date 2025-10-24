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

  // แสดง loading state ระหว่างรอ redirect
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E2E4F] mx-auto mb-4"></div>
        <p className="text-gray-600 mb-2">กำลังตรวจสอบสิทธิ์...</p>
        <p className="text-sm text-gray-500">จะ redirect ไปหน้า login หรือ dashboard อัตโนมัติ</p>
      </div>
    </div>
  );
}