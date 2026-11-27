"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminAuth } from '@/lib/auth';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft, FiEye, FiEyeOff } from 'react-icons/fi';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        // เก็บ token ใน localStorage และ cookie
        AdminAuth.setToken(data.token);
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'รหัสผ่านไม่ถูกต้อง');
      }
    } catch {
      setError('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-auth grid min-h-dvh place-items-center bg-[#edf2f7] px-4 py-6 text-slate-900">
      <section className="w-full max-w-[360px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-[#263f5c] bg-[#14233c] px-4 py-3 text-white">
          <Image src="/images/logotab.png" alt="" width={32} height={32} className="rounded-md bg-white p-0.5" />
          <span className="text-sm font-semibold">SP Kansard</span>
        </div>
        <div className="px-4 py-4 sm:px-5">
          <h1 className="mb-3 text-xl font-semibold tracking-tight">เข้าสู่ระบบหลังบ้าน</h1>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">รหัสผ่าน</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="h-10 w-full rounded-md border border-slate-300 bg-slate-50 py-2 pl-3 pr-10 text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'}
                  className="absolute inset-y-0 right-0 grid w-10 place-items-center rounded-md text-slate-500 hover:text-[#1e3b5b]"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
            {error && <p role="alert" className="rounded-md border border-red-200 bg-red-50 p-2 text-sm text-red-800">{error}</p>}
            <button
              type="submit"
              disabled={isLoading || !password}
              className="h-10 w-full rounded-md bg-[#1e3b5b] text-sm font-semibold text-white hover:bg-[#2c5073] disabled:opacity-50"
            >
              {isLoading ? 'กำลังเข้าสู่ระบบ…' : 'เข้าสู่ระบบ'}
            </button>
          </form>
          <Link href="/" className="mt-3 inline-flex min-h-8 items-center gap-1.5 text-xs text-slate-600 hover:text-[#1e3b5b]">
            <FiArrowLeft aria-hidden /> กลับสู่เว็บไซต์
          </Link>
        </div>
      </section>
    </div>
  );
}
