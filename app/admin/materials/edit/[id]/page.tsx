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
        setError('à¹„à¸¡à¹ˆà¸ªà¸²à¸¡à¸²à¸£à¸–à¹‚à¸«à¸¥à¸”à¸‚à¹‰à¸­à¸¡à¸¹à¸¥à¸§à¸±à¸ªà¸”à¸¸à¹„à¸”à¹‰');
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
      
      // à¸ªà¸£à¹‰à¸²à¸‡ preview
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
        throw new Error(result.error || 'à¹„à¸¡à¹ˆà¸ªà¸²à¸¡à¸²à¸£à¸–à¸­à¸±à¸žà¹‚à¸«à¸¥à¸”à¸£à¸¹à¸›à¸ à¸²à¸žà¹„à¸”à¹‰');
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
      // à¸•à¸£à¸§à¸ˆà¸ªà¸­à¸šà¸‚à¹‰à¸­à¸¡à¸¹à¸¥à¸žà¸·à¹‰à¸™à¸à¸²à¸™
      if (!formData.name.trim()) {
        throw new Error('à¸à¸£à¸¸à¸“à¸²à¸à¸£à¸­à¸à¸Šà¸·à¹ˆà¸­à¸§à¸±à¸ªà¸”à¸¸');
      }
      if (!formData.description.trim()) {
        throw new Error('à¸à¸£à¸¸à¸“à¸²à¸à¸£à¸­à¸à¸„à¸³à¸­à¸˜à¸´à¸šà¸²à¸¢');
      }
      if (!formData.category) {
        throw new Error('à¸à¸£à¸¸à¸“à¸²à¹€à¸¥à¸·à¸­à¸à¸«à¸¡à¸§à¸”à¸«à¸¡à¸¹à¹ˆ');
      }

      let imageUrl = formData.image_url;
      
      // à¸­à¸±à¸žà¹‚à¸«à¸¥à¸”à¸£à¸¹à¸›à¸ à¸²à¸žà¹ƒà¸«à¸¡à¹ˆà¸–à¹‰à¸²à¸¡à¸µ
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      // à¸­à¸±à¸žà¹€à¸”à¸—à¸‚à¹‰à¸­à¸¡à¸¹à¸¥à¹ƒà¸™ database
      const response = await fetch('/api/admin/materials', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: materialId,
          name: formData.name.trim(),
          description: formData.description.trim(),
          image_url: imageUrl,
          features: formData.features,
          price_range: formData.price_range,
          category: formData.category,
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        console.error('Material update error:', result.error);
        throw new Error(`ไม่สามารถอัพเดทข้อมูลได้: ${result.error}`);
      }

      // à¸à¸¥à¸±à¸šà¹„à¸›à¸«à¸™à¹‰à¸²à¸ˆà¸±à¸”à¸à¸²à¸£à¸§à¸±à¸ªà¸”à¸¸
      router.push('/admin/materials');
      
    } catch (err) {
      console.error('Error updating material:', err);
      setError(err instanceof Error ? err.message : 'à¹€à¸à¸´à¸”à¸‚à¹‰à¸­à¸œà¸´à¸”à¸žà¸¥à¸²à¸”');
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
              <h1 className="text-2xl font-bold text-gray-900">à¹à¸à¹‰à¹„à¸‚à¸§à¸±à¸ªà¸”à¸¸</h1>
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
              {/* à¸‚à¹‰à¸­à¸¡à¸¹à¸¥à¸žà¸·à¹‰à¸™à¸à¸²à¸™ */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">à¸‚à¹‰à¸­à¸¡à¸¹à¸¥à¸žà¸·à¹‰à¸™à¸à¸²à¸™</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      à¸Šà¸·à¹ˆà¸­à¸§à¸±à¸ªà¸”à¸¸ *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#1E2E4F] focus:border-[#1E2E4F]"
                      placeholder="à¹€à¸Šà¹ˆà¸™ à¸à¸±à¸™à¸ªà¸²à¸”à¸œà¹‰à¸²à¹ƒà¸š PVC"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      à¸„à¸³à¸­à¸˜à¸´à¸šà¸²à¸¢ *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#1E2E4F] focus:border-[#1E2E4F]"
                      placeholder="à¸­à¸˜à¸´à¸šà¸²à¸¢à¸„à¸¸à¸“à¸ªà¸¡à¸šà¸±à¸•à¸´à¹à¸¥à¸°à¸›à¸£à¸°à¹‚à¸¢à¸Šà¸™à¹Œà¸‚à¸­à¸‡à¸§à¸±à¸ªà¸”à¸¸"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      à¸«à¸¡à¸§à¸”à¸«à¸¡à¸¹à¹ˆ *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#1E2E4F] focus:border-[#1E2E4F]"
                      required
                    >
                      <option value="">à¹€à¸¥à¸·à¸­à¸à¸«à¸¡à¸§à¸”à¸«à¸¡à¸¹à¹ˆ</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      à¸£à¸²à¸„à¸²
                    </label>
                    <input
                      type="text"
                      name="price_range"
                      value={formData.price_range}
                      onChange={handleInputChange}
                      placeholder="à¹€à¸Šà¹ˆà¸™ 150 à¸šà¸²à¸—/à¸•à¸²à¸£à¸²à¸‡à¹€à¸¡à¸•à¸£ à¸«à¸£à¸·à¸­ 1,500 - 3,000 à¸šà¸²à¸—"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#1E2E4F] focus:border-[#1E2E4F]"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      à¸à¸£à¸­à¸à¸£à¸²à¸„à¸²à¸«à¸£à¸·à¸­à¸Šà¹ˆà¸§à¸‡à¸£à¸²à¸„à¸²à¸‚à¸­à¸‡à¸§à¸±à¸ªà¸”à¸¸ (à¹€à¸Šà¹ˆà¸™ &quot;150 à¸šà¸²à¸—/à¸•à¸£.à¸¡.&quot; à¸«à¸£à¸·à¸­ &quot;1,000 - 2,000 à¸šà¸²à¸—&quot;)
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL à¸£à¸¹à¸›à¸ à¸²à¸ž
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

              {/* à¸£à¸¹à¸›à¸ à¸²à¸ž */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">à¸£à¸¹à¸›à¸ à¸²à¸ž</h3>
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
                          à¹€à¸›à¸¥à¸µà¹ˆà¸¢à¸™à¸£à¸¹à¸›
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
                          à¸£à¸µà¹€à¸‹à¹‡à¸•
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <label className="cursor-pointer">
                          <span className="mt-2 block text-sm font-medium text-gray-900">
                            à¸„à¸¥à¸´à¸à¹€à¸žà¸·à¹ˆà¸­à¹€à¸¥à¸·à¸­à¸à¸£à¸¹à¸›à¸ à¸²à¸ž
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

              {/* à¸„à¸¸à¸“à¸ªà¸¡à¸šà¸±à¸•à¸´ */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">à¸„à¸¸à¸“à¸ªà¸¡à¸šà¸±à¸•à¸´</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      à¸£à¸²à¸¢à¸à¸²à¸£à¸„à¸¸à¸“à¸ªà¸¡à¸šà¸±à¸•à¸´
                    </label>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={newFeature}
                        onChange={(e) => setNewFeature(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#1E2E4F] focus:border-[#1E2E4F]"
                        placeholder="à¹€à¸Šà¹ˆà¸™ à¸à¸±à¸™à¸™à¹‰à¸³ 100%"
                      />
                      <button
                        type="button"
                        onClick={addFeature}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      >
                        à¹€à¸žà¸´à¹ˆà¸¡
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
                              à¸¥à¸š
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* à¸›à¸¸à¹ˆà¸¡à¸šà¸±à¸™à¸—à¸¶à¸ */}
            <div className="mt-8 flex justify-end space-x-4">
              <Link
                href="/admin/materials"
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                à¸¢à¸à¹€à¸¥à¸´à¸
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-[#1E2E4F] text-white rounded-lg hover:bg-[#314874] transition-colors flex items-center space-x-2 disabled:opacity-50"
              >
                <FaSave />
                <span>{loading ? 'à¸à¸³à¸¥à¸±à¸‡à¸šà¸±à¸™à¸—à¸¶à¸...' : 'à¸šà¸±à¸™à¸—à¸¶à¸à¸à¸²à¸£à¹à¸à¹‰à¹„à¸‚'}</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
