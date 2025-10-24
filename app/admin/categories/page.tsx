'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaArrowUp, FaArrowDown, FaEye } from 'react-icons/fa';
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
      console.log('Categories Page - Is Authenticated:', isAuth);
      
      if (!isAuth) {
        console.log('Not authenticated, redirecting to login...');
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

      if (isAdding) {
        const { error } = await supabase
          .from('categories')
          .insert([{
            name: formData.name.trim(),
            description: formData.description.trim() || null,
            display_order: formData.display_order,
            is_active: formData.is_active
          }]);

        if (error) throw error;
        alert('เพิ่มหมวดหมู่สำเร็จ');
      } else if (editingId) {
        const { error } = await supabase
          .from('categories')
          .update({
            name: formData.name.trim(),
            description: formData.description.trim() || null,
            display_order: formData.display_order,
            is_active: formData.is_active
          })
          .eq('id', editingId);

        if (error) throw error;
        alert('อัพเดทหมวดหมู่สำเร็จ');
      }

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

      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
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
      for (const update of updates) {
        await supabase
          .from('categories')
          .update({ display_order: update.display_order })
          .eq('id', update.id);
      }
      
      fetchCategories();
    } catch (error) {
      console.error('Error reordering categories:', error);
      alert('เกิดข้อผิดพลาดในการเรียงลำดับ');
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
                href="/admin/materials"
                className="text-[#1E2E4F] hover:text-[#314874] transition-colors"
              >
                <FaArrowLeft className="h-6 w-6" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">จัดการหมวดหมู่วัสดุ</h1>
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
              <button
                onClick={handleAdd}
                className="bg-[#1E2E4F] text-white px-4 py-2 rounded-lg hover:bg-[#314874] transition-colors flex items-center space-x-2"
              >
                <FaPlus />
                <span>เพิ่มหมวดหมู่</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* Add/Edit Form */}
          {(isAdding || editingId) && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
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
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ลำดับ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ชื่อหมวดหมู่
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    คำอธิบาย
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    สถานะ
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    จัดการ
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories.map((category, index) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center space-x-2">
                        <span>{index + 1}</span>
                        <div className="flex flex-col">
                          <button
                            onClick={() => moveCategory(category.id, 'up')}
                            disabled={index === 0}
                            className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                          >
                            <FaArrowUp className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => moveCategory(category.id, 'down')}
                            disabled={index === categories.length - 1}
                            className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                          >
                            <FaArrowDown className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{category.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">{category.description || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        category.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {category.is_active ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(category)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <FaEdit className="inline h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id, category.name)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTrash className="inline h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {categories.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                ยังไม่มีหมวดหมู่ กดปุ่ม &quot;เพิ่มหมวดหมู่&quot; เพื่อเริ่มต้น
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
