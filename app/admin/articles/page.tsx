'use client';

import { AdminHeading, adminPrimary } from '@/app/admin/AdminHeading';

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
      const response = await fetch('/api/admin/articles', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, published: !currentStatus }),
      });
      const result = await response.json();

      if (!response.ok) {
        console.error('Error updating article:', result.error);
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
      const response = await fetch(`/api/admin/articles?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      const result = await response.json();

      if (!response.ok) {
        console.error('Error deleting article:', result.error);
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
      <div className="grid min-h-32 place-items-center" role="status" aria-label="กำลังโหลด">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="min-w-0">
        <AdminHeading title="จัดการบทความ">
          <button type="button" onClick={() => router.push('/admin/articles/new')} className={adminPrimary}>+ เพิ่มบทความ</button>
        </AdminHeading>
        <div className="rounded-lg bg-white p-3 shadow mb-3">
          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              aria-label="ค้นหาบทความ"
              placeholder="ค้นหาบทความ (ชื่อ, สรุป, หรือแท็ก)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-blue-50 p-2 sm:p-3 rounded-md">
              <h3 className="text-sm font-medium text-blue-800">บทความทั้งหมด</h3>
              <p className="text-2xl font-bold text-blue-600">{articles.length}</p>
            </div>
            <div className="bg-green-50 p-2 sm:p-3 rounded-md">
              <h3 className="text-sm font-medium text-green-800">บทความที่เผยแพร่</h3>
              <p className="text-2xl font-bold text-green-600">
                {articles.filter(article => article.published).length}
              </p>
            </div>
            <div className="bg-yellow-50 p-2 sm:p-3 rounded-md">
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
            <div className="p-4 text-center">
              <p className="text-gray-500 text-lg">
                {searchTerm ? 'ไม่พบบทความที่ตรงกับการค้นหา' : 'ยังไม่มีบทความ'}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => router.push('/admin/articles/new')}
                  className="mt-4 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  เพิ่มบทความแรก
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="admin-table w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      บทความ
                    </th>
                    <th className="admin-table-extra px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      แท็ก
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      สถานะ
                    </th>
                    <th className="admin-table-extra px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      วันที่อัปเดต
                    </th>
                    <th className="admin-table-actions px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      การจัดการ
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredArticles.map((article) => (
                    <tr key={article.id} className="hover:bg-gray-50">
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-2">
                          {article.image_url && (
                            <Image
                              src={article.image_url}
                              alt={article.title}
                              width={48}
                              height={48}
                              className="hidden size-10 shrink-0 rounded-md object-cover sm:block"
                            />
                          )}
                          <div className="min-w-0">
                            <div className="break-words text-sm font-medium text-gray-900">
                              {article.title}
                            </div>
                            <div className="hidden text-xs text-gray-500 sm:line-clamp-2">
                              {article.summary || article.excerpt || ''}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="admin-table-extra px-3 py-4">
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
                      <td className="px-3 py-4">
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
                      <td className="admin-table-extra px-3 py-4 text-sm text-gray-500">
                        {new Date(article.updated_at).toLocaleDateString('th-TH', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="admin-table-actions px-3 py-4 whitespace-nowrap text-right text-xs font-medium">
                        <button
                          onClick={() => router.push(`/admin/articles/edit/${article.id}`)}
                          className="rounded px-1 py-1 text-blue-700 hover:bg-blue-50"
                        >
                          แก้ไข
                        </button>
                        <button
                          onClick={() => deleteArticle(article.id, article.title)}
                          className="rounded px-1 py-1 text-red-700 hover:bg-red-50"
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
