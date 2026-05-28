'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { sanitizeHtml } from '@/lib/sanitize';
import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues
const RichTextEditor = dynamic(() => import('@/app/components/RichTextEditor'), {
  ssr: false,
  loading: () => <p>กำลังโหลด editor...</p>
});

interface ArticleFormData {
  title: string;
  content: string;
  summary: string;  // User input field
  image_url: string;
  tags: string[];
  published: boolean;
}

export default function AddArticlePage() {
  const router = useRouter();
  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    content: '',
    summary: '',
    image_url: '',
    tags: [],
    published: false
  });
  const [newTag, setNewTag] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');

  const suggestedTags = [
    'ผ้าใบกันสาด',
    'การติดตั้ง',
    'วัสดุใหม่',
    'บำรุงรักษา',
    'ราคา',
    'คุณภาพ',
    'ออกแบบ',
    'โครงสร้าง',
    'การเลือกซื้อ',
    'เทคนิค'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleAddTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !formData.tags.includes(trimmedTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, trimmedTag]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setFormData(prev => ({ ...prev, image_url: url }));
    setImagePreview(url);
    setImageFile(null);
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    return data.url;
  };

  // Function to generate SEO-friendly slug from title
  const generateSlug = (title: string): string => {
    // Transliterate Thai to English (optional, can remove if want pure Thai slug)
    let slug = title
      .toLowerCase()
      .trim()
      // Remove special characters except Thai, English, numbers, spaces and hyphens
      .replace(/[^\u0E00-\u0E7Fa-z0-9\s-]/g, '')
      // Replace multiple spaces with single hyphen
      .replace(/\s+/g, '-')
      // Replace multiple hyphens with single hyphen
      .replace(/-+/g, '-')
      // Remove leading/trailing hyphens
      .replace(/^-+|-+$/g, '');
    
    // Limit slug length (max 100 chars for SEO)
    if (slug.length > 100) {
      slug = slug.substring(0, 100).replace(/-[^-]*$/, '');
    }
    
    // Add short timestamp to ensure uniqueness
    const timestamp = Date.now().toString().slice(-6); // last 6 digits
    
    return `${slug}-${timestamp}`;
  };

  const handleSubmit = async (e: React.FormEvent, publishOverride?: boolean) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = formData.image_url;

      // Upload cover image if file is selected
      if (imageFile) {
        setUploading(true);
        imageUrl = await handleImageUpload(imageFile);
        setUploading(false);
      }

      // Generate slug from title
      const slug = generateSlug(formData.title);

      const response = await fetch('/api/admin/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          slug,
          content: sanitizeHtml(formData.content),
          excerpt: formData.summary,
          image_url: imageUrl || null,
          tags: formData.tags,
          published: publishOverride ?? formData.published,
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        console.error('Error inserting article:', result.error);
        alert('เกิดข้อผิดพลาดในการเพิ่มบทความ: ' + result.error);
        return;
      }

      alert('เพิ่มบทความสำเร็จแล้ว');
      router.push('/admin/articles');
    } catch (error) {
      console.error('Error:', error);
      alert('เกิดข้อผิดพลาดในการเพิ่มบทความ');
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  const handleSaveDraft = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const form = e.currentTarget.form;
    if (!form?.reportValidity()) return;
    await handleSubmit(e as unknown as React.FormEvent, false);
  };

  const handlePublish = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const form = e.currentTarget.form;
    if (!form?.reportValidity()) return;
    await handleSubmit(e as unknown as React.FormEvent, true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">เขียนบทความใหม่</h1>
            <button
              onClick={() => router.back()}
              className="text-gray-600 hover:text-gray-800"
            >
              ← กลับ
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                หัวข้อบทความ *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="ใส่หัวข้อบทความ..."
              />
            </div>

            {/* Summary */}
            <div>
              <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-2">
                สรุปบทความ *
              </label>
              <textarea
                id="summary"
                name="summary"
                value={formData.summary}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="เขียนสรุปสั้นๆ ของบทความ..."
              />
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                เนื้อหาบทความ *
              </label>
              <RichTextEditor
                content={formData.content}
                onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                onImageUpload={handleImageUpload}
              />
              <p className="text-sm text-gray-500 mt-1">
                💡 คุณสามารถคลิกปุ่ม &quot;🖼️ รูปภาพ&quot; เพื่อแทรกรูปภาพในเนื้อหาได้ตามต้องการ
              </p>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                รูปภาพหน้าปก
              </label>
              <div className="space-y-4">
                {/* File Upload */}
                <div>
                  <label htmlFor="image" className="block text-sm text-gray-600 mb-1">
                    อัปโหลดไฟล์รูปภาพ:
                  </label>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* URL Input */}
                <div>
                  <label htmlFor="image_url" className="block text-sm text-gray-600 mb-1">
                    หรือใส่ URL รูปภาพ:
                  </label>
                  <input
                    type="url"
                    id="image_url"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleUrlChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                {/* Image Preview */}
                {imagePreview && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">ตัวอย่างรูปภาพ:</p>
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      width={200}
                      height={150}
                      className="rounded-lg object-cover border"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                แท็ก
              </label>
              
              {/* Suggested Tags */}
              <div className="mb-3">
                <p className="text-sm text-gray-600 mb-2">แท็กแนะนำ:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleAddTag(tag)}
                      disabled={formData.tags.includes(tag)}
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${
                        formData.tags.includes(tag)
                          ? 'bg-blue-100 text-blue-800 cursor-not-allowed'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Tag Input */}
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag(newTag))}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="เพิ่มแท็กใหม่..."
                />
                <button
                  type="button"
                  onClick={() => handleAddTag(newTag)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  เพิ่ม
                </button>
              </div>
              
              {/* Selected Tags */}
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Publish Status */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">
                  เผยแพร่ทันที (หากไม่เลือกจะบันทึกเป็นแบบร่าง)
                </span>
              </label>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={handleSaveDraft}
                disabled={loading || uploading}
                className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'กำลังบันทึก...' : uploading ? 'กำลังอัปโหลดรูป...' : 'บันทึกแบบร่าง'}
              </button>
              <button
                type="button"
                onClick={handlePublish}
                disabled={loading || uploading}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'กำลังบันทึก...' : uploading ? 'กำลังอัปโหลดรูป...' : 'เผยแพร่บทความ'}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                ยกเลิก
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
