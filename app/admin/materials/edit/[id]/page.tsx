"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft, FaSave, FaUpload } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';

interface MaterialFormData {
  name: string;
  description: string;
  image_url: string;
  features: string[];
  price_range: string;
  category: string;
}

interface Category {
  id: string;
  name: string;
  is_active: boolean;
}

export default function EditMaterial() {
  const router = useRouter();
  const params = useParams();
  const materialId = params.id as string;
  
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  
  const [formData, setFormData] = useState<MaterialFormData>({
    name: '',
    description: '',
    image_url: '',
    features: [],
    price_range: '',
    category: ''
  });
  const [newFeature, setNewFeature] = useState('');

  useEffect(() => {
    fetchCategories();
    const fetchMaterial = async () => {
      try {
        const { data, error } = await supabase
          .from('materials')
          .select('*')
          .eq('id', materialId)
          .single();

        if (error) throw error;
        
        if (data) {
          setFormData({
            name: data.name || '',
            description: data.description || '',
            image_url: data.image_url || '',
            features: data.features || [],
            price_range: data.price_range || '',
            category: data.category || ''
          });
          
          setOriginalImageUrl(data.image_url || '');
          setImagePreview(data.image_url || '');
        }
      } catch (err) {
        console.error('Error fetching material:', err);
        setError('ไม่สามารถโหลดข้อมูลวัสดุได้');
      } finally {
        setLoadingData(false);
      }
    };

    if (materialId) {
      fetchMaterial();
    }
  }, [materialId]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      
      // สร้าง preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'ไม่สามารถอัพโหลดรูปภาพได้');
      }

      return result.url;
    } catch (error) {
      console.error('Upload function error:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // ตรวจสอบข้อมูลพื้นฐาน
      if (!formData.name.trim()) {
        throw new Error('กรุณากรอกชื่อวัสดุ');
      }
      if (!formData.description.trim()) {
        throw new Error('กรุณากรอกคำอธิบาย');
      }
      if (!formData.category) {
        throw new Error('กรุณาเลือกหมวดหมู่');
      }

      let imageUrl = formData.image_url;
      
      // อัพโหลดรูปภาพใหม่ถ้ามี
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      // อัพเดทข้อมูลใน database
      const { error: updateError } = await supabase
        .from('materials')
        .update({
          name: formData.name.trim(),
          description: formData.description.trim(),
          image_url: imageUrl,
          features: formData.features,
          price_range: formData.price_range,
          category: formData.category,
          updated_at: new Date().toISOString()
        })
        .eq('id', materialId);

      if (updateError) {
        console.error('Supabase update error:', updateError);
        throw new Error(`ไม่สามารถอัพเดทข้อมูลได้: ${updateError.message}`);
      }

      // กลับไปหน้าจัดการวัสดุ
      router.push('/admin/materials');
      
    } catch (err) {
      console.error('Error updating material:', err);
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด');
    } finally {
      setLoading(false);
    }
  };

  const resetImage = () => {
    setImagePreview(originalImageUrl);
    setImageFile(null);
  };

  if (loadingData) {
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
              <h1 className="text-2xl font-bold text-gray-900">แก้ไขวัสดุ</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
            <div className="space-y-6">
              {/* ข้อมูลพื้นฐาน */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">ข้อมูลพื้นฐาน</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ชื่อวัสดุ *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#1E2E4F] focus:border-[#1E2E4F]"
                      placeholder="เช่น กันสาดผ้าใบ PVC"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      คำอธิบาย *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#1E2E4F] focus:border-[#1E2E4F]"
                      placeholder="อธิบายคุณสมบัติและประโยชน์ของวัสดุ"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      หมวดหมู่ *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#1E2E4F] focus:border-[#1E2E4F]"
                      required
                    >
                      <option value="">เลือกหมวดหมู่</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ราคา
                    </label>
                    <input
                      type="text"
                      name="price_range"
                      value={formData.price_range}
                      onChange={handleInputChange}
                      placeholder="เช่น 150 บาท/ตารางเมตร หรือ 1,500 - 3,000 บาท"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#1E2E4F] focus:border-[#1E2E4F]"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      กรอกราคาหรือช่วงราคาของวัสดุ (เช่น &quot;150 บาท/ตร.ม.&quot; หรือ &quot;1,000 - 2,000 บาท&quot;)
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL รูปภาพ
                    </label>
                    <input
                      type="url"
                      name="image_url"
                      value={formData.image_url}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#1E2E4F] focus:border-[#1E2E4F]"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
              </div>

              {/* รูปภาพ */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">รูปภาพ</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {imagePreview ? (
                    <div className="space-y-4">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        width={200}
                        height={150}
                        className="mx-auto rounded-lg object-cover"
                      />
                      <div className="flex justify-center space-x-2">
                        <label className="cursor-pointer bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
                          เปลี่ยนรูป
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </label>
                        <button
                          type="button"
                          onClick={resetImage}
                          className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                        >
                          รีเซ็ต
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <label className="cursor-pointer">
                          <span className="mt-2 block text-sm font-medium text-gray-900">
                            คลิกเพื่อเลือกรูปภาพ
                          </span>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* คุณสมบัติ */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">คุณสมบัติ</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      รายการคุณสมบัติ
                    </label>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={newFeature}
                        onChange={(e) => setNewFeature(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#1E2E4F] focus:border-[#1E2E4F]"
                        placeholder="เช่น กันน้ำ 100%"
                      />
                      <button
                        type="button"
                        onClick={addFeature}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      >
                        เพิ่ม
                      </button>
                    </div>
                    
                    {formData.features.length > 0 && (
                      <div className="space-y-2">
                        {formData.features.map((feature, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                            <span className="text-gray-700">{feature}</span>
                            <button
                              type="button"
                              onClick={() => removeFeature(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              ลบ
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ปุ่มบันทึก */}
            <div className="mt-8 flex justify-end space-x-4">
              <Link
                href="/admin/materials"
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                ยกเลิก
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-[#1E2E4F] text-white rounded-lg hover:bg-[#314874] transition-colors flex items-center space-x-2 disabled:opacity-50"
              >
                <FaSave />
                <span>{loading ? 'กำลังบันทึก...' : 'บันทึกการแก้ไข'}</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}