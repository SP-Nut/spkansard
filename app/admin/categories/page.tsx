'use client';

import { AdminHeading, adminPrimary } from '@/app/admin/AdminHeading';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';
import { AdminAuth } from '@/lib/auth';

interface Category {
  id: string;
  name: string;
  description: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    display_order: 0,
    is_active: true
  });

  useEffect(() => {
    // ตรวจสอบ authentication
    const checkAuth = () => {
      const isAuth = AdminAuth.isAuthenticated();
      
      if (!isAuth) {
        router.push('/admin/login');
        return false;
      }
      return true;
    };

    if (checkAuth()) {
      fetchCategories();
    }
  }, [router]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      alert('เกิดข้อผิดพลาดในการโหลดหมวดหมู่');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({
      name: '',
      description: '',
      display_order: categories.length,
      is_active: true
    });
  };

  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setIsAdding(false);
    setFormData({
      name: category.name,
      description: category.description || '',
      display_order: category.display_order,
      is_active: category.is_active
    });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({ name: '', description: '', display_order: 0, is_active: true });
  };

  const handleSave = async () => {
    try {
      if (!formData.name.trim()) {
        alert('กรุณากรอกชื่อหมวดหมู่');
        return;
      }

      const payload = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        display_order: formData.display_order,
        is_active: formData.is_active,
      };

      const response = await fetch('/api/admin/categories', {
        method: isAdding ? 'POST' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingId ? { ...payload, id: editingId } : payload),
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.error || 'Save failed');
      alert(isAdding ? 'เพิ่มหมวดหมู่สำเร็จ' : 'อัพเดทหมวดหมู่สำเร็จ');

      handleCancel();
      fetchCategories();
    } catch (error) {
      console.error('Error saving category:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      if (errorMessage.includes('duplicate')) {
        alert('ชื่อหมวดหมู่นี้มีอยู่แล้ว');
      } else {
        alert('เกิดข้อผิดพลาดในการบันทึก: ' + errorMessage);
      }
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`ต้องการลบหมวดหมู่ "${name}" หรือไม่?`)) {
      return;
    }

    try {
      // Check if any materials use this category
      const { data: materials, error: checkError } = await supabase
        .from('materials')
        .select('id')
        .eq('category', name)
        .limit(1);

      if (checkError) throw checkError;

      if (materials && materials.length > 0) {
        alert('ไม่สามารถลบหมวดหมู่นี้ได้ เนื่องจากมีวัสดุที่ใช้หมวดหมู่นี้อยู่');
        return;
      }

      const response = await fetch(`/api/admin/categories?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.error || 'Delete failed');
      
      alert('ลบหมวดหมู่สำเร็จ');
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('เกิดข้อผิดพลาดในการลบหมวดหมู่');
    }
  };

  const moveCategory = async (id: string, direction: 'up' | 'down') => {
    const index = categories.findIndex(c => c.id === id);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === categories.length - 1)
    ) {
      return;
    }

    const newCategories = [...categories];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap
    [newCategories[index], newCategories[targetIndex]] = 
    [newCategories[targetIndex], newCategories[index]];

    // Update display_order
    const updates = newCategories.map((cat, idx) => ({
      id: cat.id,
      display_order: idx
    }));

    try {
      const response = await fetch('/api/admin/categories', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates }),
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.error || 'Reorder failed');

      fetchCategories();
    } catch (error) {
      console.error('Error reordering categories:', error);
      alert('เกิดข้อผิดพลาดในการเรียงลำดับ');
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
      <AdminHeading title="หมวดหมู่วัสดุ" back="/admin/materials">
        <button type="button" onClick={handleAdd} className={adminPrimary}><FaPlus /> เพิ่มหมวดหมู่</button>
      </AdminHeading>

      <div className="space-y-3">
        <div className="min-w-0">
          {/* Add/Edit Form */}
          {(isAdding || editingId) && (
            <div className="bg-white rounded-lg shadow-sm p-4 mb-3">
              <h2 className="text-xl font-bold mb-4">
                {isAdding ? 'เพิ่มหมวดหมู่ใหม่' : 'แก้ไขหมวดหมู่'}
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ชื่อหมวดหมู่ *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#1E2E4F] focus:border-[#1E2E4F]"
                    placeholder="เช่น ผ้าใบกันสาด"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    คำอธิบาย
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#1E2E4F] focus:border-[#1E2E4F]"
                    placeholder="คำอธิบายเกี่ยวกับหมวดหมู่นี้"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="h-4 w-4 text-[#1E2E4F] focus:ring-[#1E2E4F] border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    เปิดใช้งาน
                  </label>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleSave}
                    className="bg-[#1E2E4F] text-white px-4 py-2 rounded-lg hover:bg-[#314874] transition-colors flex items-center space-x-2"
                  >
                    <FaSave />
                    <span>บันทึก</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
                  >
                    <FaTimes />
                    <span>ยกเลิก</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Categories List */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="admin-table min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="admin-table-order px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ลำดับ
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ชื่อหมวดหมู่
                  </th>
                  <th className="admin-table-extra px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    คำอธิบาย
                  </th>
                  <th className="admin-table-status px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    สถานะ
                  </th>
                  <th className="admin-table-actions px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    จัดการ
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories.map((category, index) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="admin-table-order px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center space-x-2">
                        <span>{index + 1}</span>
                        <div className="flex flex-col">
                          <button
                            aria-label="เลื่อนหมวดหมู่ขึ้น"
                            onClick={() => moveCategory(category.id, 'up')}
                            disabled={index === 0}
                            className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                          >
                            <FaArrowUp className="h-3 w-3" />
                          </button>
                          <button
                            aria-label="เลื่อนหมวดหมู่ลง"
                            onClick={() => moveCategory(category.id, 'down')}
                            disabled={index === categories.length - 1}
                            className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                          >
                            <FaArrowDown className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4">
                      <div className="break-words text-sm font-medium text-gray-900">{category.name}</div>
                    </td>
                    <td className="admin-table-extra px-3 py-4">
                      <div className="text-sm text-gray-500">{category.description || '-'}</div>
                    </td>
                    <td className="admin-table-status px-3 py-4 whitespace-nowrap text-center">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        category.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {category.is_active ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
                      </span>
                    </td>
                    <td className="admin-table-actions px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(category)}
                        aria-label="แก้ไขหมวดหมู่"
                        className="admin-icon-action text-blue-700"
                      >
                        <FaEdit className="inline h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id, category.name)}
                        aria-label="ลบหมวดหมู่"
                        className="admin-icon-action text-red-700"
                      >
                        <FaTrash className="inline h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {categories.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                ยังไม่มีหมวดหมู่ กดปุ่ม &quot;เพิ่มหมวดหมู่&quot; เพื่อเริ่มต้น
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
