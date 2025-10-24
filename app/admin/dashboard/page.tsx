"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  FaHome, 
  FaBox, 
  FaNewspaper, 
  FaSignOutAlt, 
  FaPlus,
  FaChartBar,
  FaUsers
} from 'react-icons/fa';
import { AdminAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

interface Stats {
  totalMaterials: number;
  totalArticles: number;
  publishedArticles: number;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({
    totalMaterials: 0,
    totalArticles: 0,
    publishedArticles: 0,
  });
  const router = useRouter();

  useEffect(() => {
    // ตรวจสอบ token ใน localStorage
    if (!AdminAuth.isAuthenticated()) {
      router.push('/admin/login');
      return;
    }

    // TODO: ตรวจสอบ token กับ server
    setIsAuthenticated(true);
    fetchStats();
    setLoading(false);
  }, [router]);

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

      setStats({
        totalMaterials: materialsCount || 0,
        totalArticles: articlesCount || 0,
        publishedArticles: publishedCount || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogout = () => {
    AdminAuth.clearToken();
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E2E4F]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const menuItems = [
    { icon: FaChartBar, label: 'Dashboard', href: '/admin/dashboard', active: true },
    { icon: FaBox, label: 'จัดการวัสดุ', href: '/admin/materials' },
    { icon: FaNewspaper, label: 'จัดการบทความ', href: '/admin/articles' },
  ];

  const quickActions = [
    { icon: FaPlus, label: 'เพิ่มวัสดุใหม่', href: '/admin/materials/new', color: 'bg-blue-500' },
    { icon: FaPlus, label: 'เขียนบทความใหม่', href: '/admin/articles/new', color: 'bg-green-500' },
  ];

  const statsDisplay = [
    { label: 'วัสดุทั้งหมด', value: stats.totalMaterials.toString(), icon: FaBox, color: 'text-blue-600' },
    { label: 'บทความ', value: stats.totalArticles.toString(), icon: FaNewspaper, color: 'text-green-600' },
    { label: 'บทความที่เผยแพร่', value: stats.publishedArticles.toString(), icon: FaUsers, color: 'text-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-[#1E2E4F] hover:text-[#314874] transition-colors">
                <FaHome className="h-6 w-6" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">SP Kansard Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-[#1E2E4F] text-white rounded-lg hover:bg-[#314874] transition-colors"
              >
                <FaHome />
                <span>ดูหน้าเว็บ</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <FaSignOutAlt />
                <span>ออกจากระบบ</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-6">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      item.active 
                        ? 'bg-[#1E2E4F] text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">ยินดีต้อนรับ</h2>
            <p className="text-gray-600">จัดการเนื้อหาเว็บไซต์ SP Kansard</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {statsDisplay.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">การกระทำด่วน</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  href={action.href}
                  className={`${action.color} text-white rounded-lg p-6 hover:opacity-90 transition-opacity`}
                >
                  <div className="flex items-center space-x-3">
                    <action.icon className="h-6 w-6" />
                    <span className="font-semibold">{action.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-900">กิจกรรมล่าสุด</h3>
            </div>
            <div className="p-6">
              <div className="text-center text-gray-500 py-8">
                <p>ยังไม่มีกิจกรรมล่าสุด</p>
                <p className="text-sm mt-2">เริ่มจัดการเนื้อหาเพื่อดูกิจกรรมที่นี่</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}