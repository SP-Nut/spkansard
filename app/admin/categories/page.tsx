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
    // à¸•à¸£à¸§à¸ˆà¸ªà¸­à¸š authentication
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
      alert('à¹€à¸à¸´à¸”à¸‚à¹‰à¸­à¸œà¸´à¸”à¸žà¸¥à¸²à¸”à¹ƒà¸™à¸à¸²à¸£à¹‚à¸«à¸¥à¸”à¸«à¸¡à¸§à¸”à¸«à¸¡à¸¹à¹ˆ');
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
        alert('à¸à¸£à¸¸à¸“à¸²à¸à¸£à¸­à¸à¸Šà¸·à¹ˆà¸­à¸«à¸¡à¸§à¸”à¸«à¸¡à¸¹à¹ˆ');
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
        alert('à¸Šà¸·à¹ˆà¸­à¸«à¸¡à¸§à¸”à¸«à¸¡à¸¹à¹ˆà¸™à¸µà¹‰à¸¡à¸µà¸­à¸¢à¸¹à¹ˆà¹à¸¥à¹‰à¸§');
      } else {
        alert('à¹€à¸à¸´à¸”à¸‚à¹‰à¸­à¸œà¸´à¸”à¸žà¸¥à¸²à¸”à¹ƒà¸™à¸à¸²à¸£à¸šà¸±à¸™à¸—à¸¶à¸: ' + errorMessage);
      }
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`à¸•à¹‰à¸­à¸‡à¸à¸²à¸£à¸¥à¸šà¸«à¸¡à¸§à¸”à¸«à¸¡à¸¹à¹ˆ "${name}" à¸«à¸£à¸·à¸­à¹„à¸¡à¹ˆ?`)) {
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
        alert('à¹„à¸¡à¹ˆà¸ªà¸²à¸¡à¸²à¸£à¸–à¸¥à¸šà¸«à¸¡à¸§à¸”à¸«à¸¡à¸¹à¹ˆà¸™à¸µà¹‰à¹„à¸”à¹‰ à¹€à¸™à¸·à¹ˆà¸­à¸‡à¸ˆà¸²à¸à¸¡à¸µà¸§à¸±à¸ªà¸”à¸¸à¸—à¸µà¹ˆà¹ƒà¸Šà¹‰à¸«à¸¡à¸§à¸”à¸«à¸¡à¸¹à¹ˆà¸™à¸µà¹‰à¸­à¸¢à¸¹à¹ˆ');
        return;
      }

      const response = await fetch(`/api/admin/categories?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.error || 'Delete failed');
      
      alert('à¸¥à¸šà¸«à¸¡à¸§à¸”à¸«à¸¡à¸¹à¹ˆà¸ªà¸³à¹€à¸£à¹‡à¸ˆ');
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('à¹€à¸à¸´à¸”à¸‚à¹‰à¸­à¸œà¸´à¸”à¸žà¸¥à¸²à¸”à¹ƒà¸™à¸à¸²à¸£à¸¥à¸šà¸«à¸¡à¸§à¸”à¸«à¸¡à¸¹à¹ˆ');
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
      alert('à¹€à¸à¸´à¸”à¸‚à¹‰à¸­à¸œà¸´à¸”à¸žà¸¥à¸²à¸”à¹ƒà¸™à¸à¸²à¸£à¹€à¸£à¸µà¸¢à¸‡à¸¥à¸³à¸”à¸±à¸š');
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
              <h1 className="text-2xl font-bold text-gray-900">à¸ˆà¸±à¸”à¸à¸²à¸£à¸«à¸¡à¸§à¸”à¸«à¸¡à¸¹à¹ˆà¸§à¸±à¸ªà¸”à¸¸</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border-2 border-[#1E2E4F] text-[#1E2E4F] px-4 py-2 rounded-lg hover:bg-[#1E2E4F] hover:text-white transition-colors flex items-center space-x-2"
              >
                <FaEye />
                <span>à¸”à¸¹à¸«à¸™à¹‰à¸²à¹€à¸§à¹‡à¸š</span>
              </Link>
              <button
                onClick={handleAdd}
                className="bg-[#1E2E4F] text-white px-4 py-2 rounded-lg hover:bg-[#314874] transition-colors flex items-center space-x-2"
              >
                <FaPlus />
                <span>à¹€à¸žà¸´à¹ˆà¸¡à¸«à¸¡à¸§à¸”à¸«à¸¡à¸¹à¹ˆ</span>
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
                {isAdding ? 'à¹€à¸žà¸´à¹ˆà¸¡à¸«à¸¡à¸§à¸”à¸«à¸¡à¸¹à¹ˆà¹ƒà¸«à¸¡à¹ˆ' : 'à¹à¸à¹‰à¹„à¸‚à¸«à¸¡à¸§à¸”à¸«à¸¡à¸¹à¹ˆ'}
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    à¸Šà¸·à¹ˆà¸­à¸«à¸¡à¸§à¸”à¸«à¸¡à¸¹à¹ˆ *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#1E2E4F] focus:border-[#1E2E4F]"
                    placeholder="à¹€à¸Šà¹ˆà¸™ à¸œà¹‰à¸²à¹ƒà¸šà¸à¸±à¸™à¸ªà¸²à¸”"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    à¸„à¸³à¸­à¸˜à¸´à¸šà¸²à¸¢
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#1E2E4F] focus:border-[#1E2E4F]"
                    placeholder="à¸„à¸³à¸­à¸˜à¸´à¸šà¸²à¸¢à¹€à¸à¸µà¹ˆà¸¢à¸§à¸à¸±à¸šà¸«à¸¡à¸§à¸”à¸«à¸¡à¸¹à¹ˆà¸™à¸µà¹‰"
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
                    à¹€à¸›à¸´à¸”à¹ƒà¸Šà¹‰à¸‡à¸²à¸™
                  </label>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleSave}
                    className="bg-[#1E2E4F] text-white px-4 py-2 rounded-lg hover:bg-[#314874] transition-colors flex items-center space-x-2"
                  >
                    <FaSave />
                    <span>à¸šà¸±à¸™à¸—à¸¶à¸</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
                  >
                    <FaTimes />
                    <span>à¸¢à¸à¹€à¸¥à¸´à¸</span>
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
                    à¸¥à¸³à¸”à¸±à¸š
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    à¸Šà¸·à¹ˆà¸­à¸«à¸¡à¸§à¸”à¸«à¸¡à¸¹à¹ˆ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    à¸„à¸³à¸­à¸˜à¸´à¸šà¸²à¸¢
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    à¸ªà¸–à¸²à¸™à¸°
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    à¸ˆà¸±à¸”à¸à¸²à¸£
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
                        {category.is_active ? 'à¹€à¸›à¸´à¸”à¹ƒà¸Šà¹‰à¸‡à¸²à¸™' : 'à¸›à¸´à¸”à¹ƒà¸Šà¹‰à¸‡à¸²à¸™'}
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
                à¸¢à¸±à¸‡à¹„à¸¡à¹ˆà¸¡à¸µà¸«à¸¡à¸§à¸”à¸«à¸¡à¸¹à¹ˆ à¸à¸”à¸›à¸¸à¹ˆà¸¡ &quot;à¹€à¸žà¸´à¹ˆà¸¡à¸«à¸¡à¸§à¸”à¸«à¸¡à¸¹à¹ˆ&quot; à¹€à¸žà¸·à¹ˆà¸­à¹€à¸£à¸´à¹ˆà¸¡à¸•à¹‰à¸™
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
