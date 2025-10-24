"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft, FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';
import { AdminAuth } from '@/lib/auth';

interface Material {
  id: string;
  name: string;
  description: string;
  image_url?: string;
  features: string[];
  price_range?: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export default function AdminMaterials() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // ตรวจสอบ authentication
    if (!AdminAuth.isAuthenticated()) {
      router.push('/admin/login');
      return;
    }

    fetchMaterials();
  }, [router]);

  const fetchMaterials = async () => {
    try {
      const { data, error } = await supabase
        .from('materials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMaterials(data || []);
    } catch (err) {
      console.error('Error fetching materials:', err);
      setError('ไม่สามารถโหลดข้อมูลวัสดุได้');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`คุณต้องการลบวัสดุ "${name}" หรือไม่?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('materials')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      // อัพเดท state
      setMaterials(materials.filter(material => material.id !== id));
    } catch (err) {
      console.error('Error deleting material:', err);
      alert('ไม่สามารถลบวัสดุได้');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E2E4F]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/admin/dashboard"
                className="text-[#1E2E4F] hover:text-[#314874] transition-colors"
              >
                <FaArrowLeft className="h-6 w-6" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">จัดการวัสดุ</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border-2 border-[#1E2E4F] text-[#1E2E4F] px-4 py-2 rounded-lg hover:bg-[#1E2E4F] hover:text-white transition-colors flex items-center space-x-2"
              >
                <FaEye />
                <span>ดูหน้าเว็บ</span>
              </Link>
              <Link
                href="/admin/categories"
                className="bg-white border-2 border-[#1E2E4F] text-[#1E2E4F] px-4 py-2 rounded-lg hover:bg-[#1E2E4F] hover:text-white transition-colors flex items-center space-x-2"
              >
                <span>จัดการหมวดหมู่</span>
              </Link>
              <Link
                href="/admin/materials/new"
                className="bg-[#1E2E4F] text-white px-4 py-2 rounded-lg hover:bg-[#314874] transition-colors flex items-center space-x-2"
              >
                <FaPlus />
                <span>เพิ่มวัสดุใหม่</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {materials.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-gray-500 mb-4">ยังไม่มีวัสดุในระบบ</p>
            <Link
              href="/admin/materials/new"
              className="inline-flex items-center space-x-2 bg-[#1E2E4F] text-white px-6 py-3 rounded-lg hover:bg-[#314874] transition-colors"
            >
              <FaPlus />
              <span>เพิ่มวัสดุแรก</span>
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      วัสดุ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ราคา
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      หมวดหมู่
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      วันที่สร้าง
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      การจัดการ
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {materials.map((material) => (
                    <tr key={material.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-12 w-12 flex-shrink-0">
                            <Image
                              className="h-12 w-12 rounded-lg object-cover"
                              src={material.image_url || '/images/placeholder.jpg'}
                              alt={material.name}
                              width={48}
                              height={48}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {material.name}
                            </div>
                            <div className="text-sm text-gray-500 max-w-xs truncate">
                              {material.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {material.price_range || 'ไม่ระบุ'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {material.category || 'ไม่ระบุ'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(material.created_at).toLocaleDateString('th-TH')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <Link
                            href={`/materials`}
                            className="text-gray-600 hover:text-blue-600 transition-colors"
                            title="ดู"
                          >
                            <FaEye />
                          </Link>
                          <Link
                            href={`/admin/materials/edit/${material.id}`}
                            className="text-gray-600 hover:text-blue-600 transition-colors"
                            title="แก้ไข"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            onClick={() => handleDelete(material.id, material.name)}
                            className="text-gray-600 hover:text-red-600 transition-colors"
                            title="ลบ"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}