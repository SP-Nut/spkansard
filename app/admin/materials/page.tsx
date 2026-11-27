"use client";

import { AdminHeading, adminPrimary, adminSecondary } from '@/app/admin/AdminHeading';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
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
      const response = await fetch(`/api/admin/materials?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.error || 'Delete failed');
      
      // อัพเดท state
      setMaterials(materials.filter(material => material.id !== id));
    } catch (err) {
      console.error('Error deleting material:', err);
      alert('ไม่สามารถลบวัสดุได้');
    }
  };

  if (loading) {
    return (
      <div className="grid min-h-32 place-items-center" role="status" aria-label="กำลังโหลด">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E2E4F]"></div>
      </div>
    );
  }

  return (
    <div>
      <AdminHeading title="จัดการวัสดุ">
        <Link href="/admin/categories" className={adminSecondary}>หมวดหมู่วัสดุ</Link>
        <Link href="/admin/materials/new" className={adminPrimary}><FaPlus /> เพิ่มวัสดุ</Link>
      </AdminHeading>

      <div className="space-y-3">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-3">
            {error}
          </div>
        )}

        {materials.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <p className="text-gray-500 mb-4">ยังไม่มีวัสดุในระบบ</p>
            <Link
              href="/admin/materials/new"
              className="inline-flex items-center space-x-2 bg-[#1E2E4F] text-white px-3 py-3 rounded-lg hover:bg-[#314874] transition-colors"
            >
              <FaPlus />
              <span>เพิ่มวัสดุแรก</span>
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="admin-table min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      วัสดุ
                    </th>
                    <th className="admin-table-extra px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ราคา
                    </th>
                    <th className="admin-table-extra px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      หมวดหมู่
                    </th>
                    <th className="admin-table-extra px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      วันที่สร้าง
                    </th>
                    <th className="admin-table-actions px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      การจัดการ
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {materials.map((material) => (
                    <tr key={material.id} className="hover:bg-gray-50">
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-2">
                          <div className="size-9 shrink-0 sm:size-10">
                            <Image
                              className="size-full rounded-md object-cover"
                              src={material.image_url || '/images/logo.png'}
                              alt={material.name}
                              width={48}
                              height={48}
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="break-words text-sm font-medium text-gray-900">
                              {material.name}
                            </div>
                            <div className="hidden max-w-xs truncate text-xs text-gray-500 sm:block">
                              {material.description}
                            </div>
                            <p className="truncate text-xs text-slate-600 md:hidden">{material.price_range || material.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="admin-table-extra px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                        {material.price_range || 'ไม่ระบุ'}
                      </td>
                      <td className="admin-table-extra px-3 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {material.category || 'ไม่ระบุ'}
                        </span>
                      </td>
                      <td className="admin-table-extra px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(material.created_at).toLocaleDateString('th-TH')}
                      </td>
                      <td className="admin-table-actions px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-0.5">
                          <Link
                            href={`/materials`}
                            className="admin-icon-action text-gray-600 hover:text-blue-700"
                            title="ดู"
                          >
                            <FaEye />
                          </Link>
                          <Link
                            href={`/admin/materials/edit/${material.id}`}
                            className="admin-icon-action text-gray-600 hover:text-blue-700"
                            title="แก้ไข"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            onClick={() => handleDelete(material.id, material.name)}
                            className="admin-icon-action text-gray-600 hover:text-red-700"
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
      </div>
    </div>
  );
}
