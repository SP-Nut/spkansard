'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaHome, FaChevronRight, FaClock } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';

interface Article {
  id: string;
  slug?: string;
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

const BlogPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string>('');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching articles:', error);
        return;
      }

      setArticles(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get all unique tags from published articles
  const allTags = [...new Set(articles.flatMap(article => article.tags))];

  const filteredArticles = articles.filter(article =>
    (selectedTag === '' || article.tags.includes(selectedTag)) &&
    (article.title.toLowerCase().includes('') || 
     (article.summary || article.excerpt || '').toLowerCase().includes('') ||
     article.tags.some(tag => tag.toLowerCase().includes('')))
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#1E2E4F] to-[#314874] text-white py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm mb-6">
            <Link href="/" className="flex items-center text-white/80 hover:text-white transition-colors">
              <FaHome className="mr-1" />
              หน้าแรก
            </Link>
            <FaChevronRight className="text-white/60" />
            <span className="text-white">บทความ</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              บทความและเคล็ดลับ
            </h1>
            <p className="text-lg sm:text-xl text-white/90">
              ความรู้และข้อมูลเกี่ยวกับกันสาด โรงจอดรถ และงานเหล็กจากผู้เชี่ยวชาญ<br />
              ในขณะเดียวกันสามารถดู<Link href="/materials" className="underline hover:text-white transition-colors mx-1">วัสดุคุณภาพ</Link>และ<Link href="/gallery" className="underline hover:text-white transition-colors mx-1">ผลงานจริง</Link>ของเราได้
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E2E4F] mx-auto mb-4"></div>
            <p className="text-gray-600">กำลังโหลดบทความ...</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-[#eaf4ff] rounded-full mb-6">
                <FaClock className="text-[#314874] text-3xl" />
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                ยังไม่มีบทความ
              </h2>
              
              <p className="text-lg text-gray-600 mb-6">
                เรากำลังเตรียมเนื้อหาบทความที่มีประโยชน์สำหรับคุณ<br />
                โปรดติดตามอัปเดตในเร็วๆ นี้
              </p>

              {/* Call to Action */}
              <div className="space-y-4">
                <p className="text-sm text-gray-500">
                  ในขณะที่รอบทความ สามารถดูข้อมูลอื่นๆ ได้ที่
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/materials" 
                    className="inline-flex items-center justify-center bg-[#314874] text-white px-6 py-3 rounded-lg hover:bg-[#1E2E4F] transition-colors font-medium"
                  >
                    ดูวัสดุและอุปกรณ์
                  </Link>
                  <Link 
                    href="/gallery" 
                    className="inline-flex items-center justify-center border border-[#314874] text-[#314874] px-6 py-3 rounded-lg hover:bg-[#314874] hover:text-white transition-colors font-medium"
                  >
                    ดูผลงานจริง
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Filter Tags */}
            {allTags.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">หมวดหมู่บทความ</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedTag('')}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      selectedTag === ''
                        ? 'bg-[#1E2E4F] text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    ทั้งหมด
                  </button>
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-4 py-2 rounded-full text-sm transition-colors ${
                        selectedTag === tag
                          ? 'bg-[#1E2E4F] text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Article Cover Image */}
                  <div className="aspect-video relative bg-gray-200">
                    {article.image_url ? (
                      <Image
                        src={article.image_url}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                        <div className="text-center">
                          <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-xs text-gray-500">ไม่มีรูปปก</p>
                        </div>
                      </div>
                    )}
                    {/* Article Category Badge */}
                    {article.tags.length > 0 && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-[#1E2E4F] text-white text-xs px-2 py-1 rounded-full">
                          {article.tags[0]}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Article Content */}
                  <div className="p-6">
                    {/* Tags */}
                    {article.tags.length > 1 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {article.tags.slice(1).map((tag, index) => (
                          <span
                            key={index}
                            className="inline-block bg-[#eaf4ff] text-[#314874] text-xs px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {/* Title */}
                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {article.title}
                    </h2>
                    
                    {/* Summary */}
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.summary || article.excerpt || ''}
                    </p>
                    
                    {/* Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <FaClock className="mr-1" />
                        {formatDate(article.created_at)}
                      </div>
                    </div>
                    
                    {/* Read More Link */}
                    <Link
                      href={`/blog/${article.slug || article.id}`}
                      className="inline-flex items-center text-[#314874] hover:text-[#1E2E4F] font-medium transition-colors"
                    >
                      อ่านต่อ
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* No Articles in Selected Tag */}
            {selectedTag && filteredArticles.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">ไม่พบบทความในหมวดหมู่ &quot;{selectedTag}&quot;</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
