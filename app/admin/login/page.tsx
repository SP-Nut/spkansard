"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminAuth } from '@/lib/auth';
import Link from 'next/link';
import Image from 'next/image';
import { FaEye, FaEyeSlash, FaLock, FaUser } from 'react-icons/fa';

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
    <div className="min-h-screen bg-gradient-to-br from-[#1E2E4F] via-[#314874] to-[#1E2E4F] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo และ Header */}
        <div className="text-center mb-8">
          <div className="mb-6">
            <Image
              src="/images/logo.png"
              alt="SP Kansard Logo"
              width={120}
              height={40}
              className="mx-auto h-12 w-auto"
            />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-white/70">เข้าสู่ระบบจัดการเนื้อหา</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-2xl border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                <FaLock className="inline mr-2" />
                รหัสผ่าน Admin
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                  placeholder="กรอกรหัสผ่าน"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-100 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !password}
              className="w-full bg-white text-[#1E2E4F] hover:bg-white/90 font-semibold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#1E2E4F]"></div>
              ) : (
                <>
                  <FaUser className="mr-2" />
                  เข้าสู่ระบบ
                </>
              )}
            </button>
          </form>

          {/* Info */}
          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-white/60 text-xs text-center">
              หากลืมรหัสผ่าน กรุณาติดต่อผู้ดูแลระบบ
            </p>
          </div>
        </div>

        {/* Back to Website */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-white/70 hover:text-white text-sm transition-colors"
          >
            ← กลับสู่เว็บไซต์หลัก
          </Link>
        </div>
      </div>
    </div>
  );
}