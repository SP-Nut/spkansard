"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiArrowUpRight, FiBox, FiFileText, FiImage, FiPercent, FiSend } from 'react-icons/fi';
import { AdminHeading } from '@/app/admin/AdminHeading';
import { AdminAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

interface Stats {
  totalMaterials: number;
  totalArticles: number;
  publishedArticles: number;
  totalEstimateProducts: number;
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({
    totalMaterials: 0,
    totalArticles: 0,
    publishedArticles: 0,
    totalEstimateProducts: 0,
  });
  const router = useRouter();

  const fetchStats = async () => {
    try {
      // Fetch materials count
      const { count: materialsCount } = await supabase
        .from('materials')
        .select('*', { count: 'exact', head: true });

      // Fetch articles count
      const { count: articlesCount } = await supabase
        .from('articles')
        .select('*', { count: 'exact', head: true });

      // Fetch published articles count
      const { count: publishedCount } = await supabase
        .from('articles')
        .select('*', { count: 'exact', head: true })
        .eq('published', true);

      const { count: estimateProductsCount } = await supabase
        .from('estimate_products')
        .select('*', { count: 'exact', head: true });

      setStats({
        totalMaterials: materialsCount || 0,
        totalArticles: articlesCount || 0,
        publishedArticles: publishedCount || 0,
        totalEstimateProducts: estimateProductsCount || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    const init = async () => {
      if (!AdminAuth.isAuthenticated()) {
        router.push('/admin/login');
        return;
      }
      await fetchStats();
      setLoading(false);
    };
    init();
  }, [router]);

  const quickActions = [
    { icon: FiImage, label: 'เพิ่มผลงาน', href: '/admin/gallery' },
    { icon: FiBox, label: 'เพิ่มวัสดุ', href: '/admin/materials/new' },
    { icon: FiFileText, label: 'เขียนบทความ', href: '/admin/articles/new' },
    { icon: FiPercent, label: 'จัดการคำนวณราคา', href: '/admin/estimate' },
  ];
  const metrics = [
    { label: 'วัสดุทั้งหมด', value: stats.totalMaterials, icon: FiBox, href: '/admin/materials' },
    { label: 'บทความทั้งหมด', value: stats.totalArticles, icon: FiFileText, href: '/admin/articles' },
    { label: 'บทความเผยแพร่', value: stats.publishedArticles, icon: FiSend, href: '/admin/articles' },
    { label: 'สินค้าคำนวณราคา', value: stats.totalEstimateProducts, icon: FiPercent, href: '/admin/estimate' },
  ];

  return (
    <div>
      <AdminHeading title="ภาพรวม" />
      <div className="grid grid-cols-2 gap-2 sm:gap-3 xl:grid-cols-4" aria-busy={loading}>
        {metrics.map(({ label, value, icon: Icon, href }) => (
          <Link key={label} href={href}
            className="group min-w-0 rounded-lg border border-slate-200 bg-white p-3 transition-colors hover:border-[#859db6]">
            <div className="mb-2 flex items-center justify-between gap-1">
              <Icon className="size-7 rounded-md bg-[#e8eff6] p-1.5 text-[#294867]" aria-hidden />
              <FiArrowUpRight className="size-4 text-slate-400 group-hover:text-slate-700" aria-hidden />
            </div>
            <p className="text-xs text-slate-600">{label}</p>
            <p className="mt-0.5 text-2xl font-semibold tabular-nums">{loading ? '–' : value}</p>
          </Link>
        ))}
      </div>
      <section className="mt-3 rounded-lg border border-slate-200 bg-white">
        <h2 className="border-b border-slate-100 px-3 py-2.5 text-sm font-semibold">ทางลัด</h2>
        <div className="grid gap-1 p-2 sm:grid-cols-2">
          {quickActions.map(({ icon: Icon, label, href }) => (
            <Link key={href} href={href}
              className="flex min-h-10 items-center gap-2 rounded-md px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-[#1e3b5b]">
              <Icon className="size-4 text-[#375b80]" aria-hidden />
              {label}
              <FiArrowUpRight className="ml-auto size-3.5 text-slate-400" aria-hidden />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
