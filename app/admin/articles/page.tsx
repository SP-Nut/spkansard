'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

interface Article {
  id: string;
  title: string;
  content: string;
  summary?: string;
  excerpt?: string;
  image_url: string | null;
  tags: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
}

export default function ArticlesManagementPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching articles:', error);
        alert('เกิดข้อผิดพลาดในการดึงข้อมูลบทความ');
        return;
      }

      setArticles(data || []);
    } catch (error) {
      console.error('Error:', error);
      alert('เกิดข้อผิดพลาดในการดึงข้อมูลบทความ');
    } finally {
      setLoading(false);
    }
  };

  const togglePublished = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('articles')
        .update({ published: !currentStatus })
        .eq('id', id);

      if (error) {
        console.error('Error updating article:', error);
        alert('เกิดข้อผิดพลาดในการอัปเดตสถานะ');
        return;
      }

      // Update local state
      setArticles(articles.map(article => 
        article.id === id 
          ? { ...article, published: !currentStatus }
          : article
      ));
    } catch (error) {
      console.error('Error:', error);
      alert('เกิดข้อผิดพลาดในการอัปเดตสถานะ');
    }
  };

  const deleteArticle = async (id: string, title: string) => {
    if (!confirm(`ต้องการลบบทความ "${title}" หรือไม่?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting article:', error);
        alert('เกิดข้อผิดพลาดในการลบบทความ');
        return;
      }

      // Update local state
      setArticles(articles.filter(article => article.id !== id));
      alert('ลบบทความสำเร็จแล้ว');
    } catch (error) {
      console.error('Error:', error);
      alert('เกิดข้อผิดพลาดในการลบบทความ');
    }
  };

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (article.summary || article.excerpt || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow mb-6 p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">จัดการบทความ</h1>
            <div className="flex gap-4">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1E2E4F] border-2 border-[#1E2E4F] px-4 py-2 rounded-md hover:bg-[#1E2E4F] hover:text-white transition-colors flex items-center gap-2"
              >
                <span>👁️</span>
                ดูหน้าเว็บ
              </a>
              <button
                onClick={() => router.push('/admin/articles/new')}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <span>+</span>
                เพิ่มบทความใหม่
              </button>
              <button
                onClick={() => router.push('/admin')}
                className="text-gray-600 hover:text-gray-800 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                ← กลับหน้าหลัก
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="ค้นหาบทความ (ชื่อ, สรุป, หรือแท็ก)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-blue-800">บทความทั้งหมด</h3>
              <p className="text-2xl font-bold text-blue-600">{articles.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-green-800">บทความที่เผยแพร่</h3>
              <p className="text-2xl font-bold text-green-600">
                {articles.filter(article => article.published).length}
              </p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-yellow-800">บทความแบบร่าง</h3>
              <p className="text-2xl font-bold text-yellow-600">
                {articles.filter(article => !article.published).length}
              </p>
            </div>
          </div>
        </div>

        {/* Articles List */}
        <div className="bg-white rounded-lg shadow">
          {filteredArticles.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500 text-lg">
                {searchTerm ? 'ไม่พบบทความที่ตรงกับการค้นหา' : 'ยังไม่มีบทความ'}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => router.push('/admin/articles/new')}
                  className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  เพิ่มบทความแรก
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      บทความ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      แท็ก
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      สถานะ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      วันที่อัปเดต
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      การจัดการ
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredArticles.map((article) => (
                    <tr key={article.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {article.image_url && (
                            <Image
                              src={article.image_url}
                              alt={article.title}
                              width={48}
                              height={48}
                              className="h-12 w-12 rounded-lg object-cover mr-4"
                            />
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {article.title}
                            </div>
                            <div className="text-sm text-gray-500 line-clamp-2">
                              {article.summary || article.excerpt || ''}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {article.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => togglePublished(article.id, article.published)}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors ${
                            article.published
                              ? 'bg-green-100 text-green-800 hover:bg-green-200'
                              : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                          }`}
                        >
                          {article.published ? 'เผยแพร่แล้ว' : 'แบบร่าง'}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(article.updated_at).toLocaleDateString('th-TH', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                        <button
                          onClick={() => router.push(`/admin/articles/edit/${article.id}`)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                        >
                          แก้ไข
                        </button>
                        <button
                          onClick={() => deleteArticle(article.id, article.title)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                        >
                          ลบ
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}