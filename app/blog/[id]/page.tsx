'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { FaHome, FaChevronRight, FaClock, FaArrowLeft, FaShare } from 'react-icons/fa';
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

const ArticlePage = () => {
  const params = useParams();
  const router = useRouter();
  const articleId = params.id as string;
  
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // Fetch the main article by slug or id
        let articleData = null;
        
        // Try to fetch by slug first
        const { data: slugData } = await supabase
          .from('articles')
          .select('*')
          .eq('slug', articleId)
          .eq('published', true)
          .maybeSingle();

        if (slugData) {
          articleData = slugData;
        } else {
          // If no slug found, try by ID (for backward compatibility)
          const { data: idData } = await supabase
            .from('articles')
            .select('*')
            .eq('id', articleId)
            .eq('published', true)
            .maybeSingle();
          
          if (idData) {
            articleData = idData;
            // Redirect to slug URL if article has slug
            if (idData.slug) {
              router.replace(`/blog/${idData.slug}`);
              return;
            }
          }
        }

        if (!articleData) {
          console.error('Article not found');
          router.push('/blog');
          return;
        }

        setArticle(articleData);
          
        // Fetch related articles based on tags
        if (articleData.tags && articleData.tags.length > 0) {
          const { data: relatedData, error: relatedError } = await supabase
            .from('articles')
            .select('*')
            .eq('published', true)
            .neq('id', articleData.id)
            .overlaps('tags', articleData.tags)
            .limit(3);

          if (!relatedError && relatedData) {
            setRelatedArticles(relatedData);
          }
        }
      } catch (error) {
        console.error('Error:', error);
        router.push('/blog');
      } finally {
        setLoading(false);
      }
    };

    if (articleId) {
      fetchArticle();
    }
  }, [articleId, router]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = async () => {
    if (navigator.share && article) {
      try {
        await navigator.share({
          title: article.title,
          text: article.summary || article.excerpt || '',
          url: window.location.href,
        });
      } catch (err) {
        console.error('Share failed:', err);
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href);
        alert('คัดลอกลิงก์แล้ว');
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      alert('คัดลอกลิงก์แล้ว');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E2E4F] mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลดบทความ...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">ไม่พบบทความ</h1>
          <Link href="/blog" className="text-[#314874] hover:text-[#1E2E4F] font-medium">
            ← กลับไปหน้าบทความ
          </Link>
        </div>
      </div>
    );
  }

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.summary || article.excerpt || '',
    "image": article.image_url || '',
    "datePublished": article.created_at,
    "dateModified": article.updated_at,
    "author": {
      "@type": "Organization",
      "name": "SP Kansard",
      "url": "https://spkansard.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SP Kansard",
      "logo": {
        "@type": "ImageObject",
        "url": "https://spkansard.com/logo.png"
      }
    },
    "keywords": article.tags?.join(', '),
    "articleSection": article.tags?.[0] || 'บทความ',
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://spkansard.com/blog/${article.slug || article.id}`
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
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
            <Link href="/blog" className="text-white/80 hover:text-white transition-colors">
              บทความ
            </Link>
            <FaChevronRight className="text-white/60" />
            <span className="text-white">{article.title}</span>
          </nav>

          {/* Back Button */}
          <Link 
            href="/blog"
            className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-6"
          >
            <FaArrowLeft className="mr-2" />
            กลับไปหน้าบทความ
          </Link>

          <div className="max-w-4xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              {article.title}
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-6">
              {article.summary || article.excerpt || ''}
            </p>
            
            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 text-white/80">
              <div className="flex items-center">
                <FaClock className="mr-1" />
                {formatDate(article.created_at)}
              </div>
              <button 
                onClick={handleShare}
                className="flex items-center hover:text-white transition-colors"
              >
                <FaShare className="mr-1" />
                แชร์
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Featured Cover Image */}
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
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-500">ไม่มีรูปปกสำหรับบทความนี้</p>
                  </div>
                </div>
              )}
              {/* Article Category Badge */}
              {article.tags.length > 0 && (
                <div className="absolute top-4 left-4">
                  <span className="bg-[#1E2E4F] text-white text-sm px-3 py-1 rounded-full">
                    {article.tags[0]}
                  </span>
                </div>
              )}
            </div>

            {/* Article Body */}
            <div className="p-8">
              {/* Tags */}
              {article.tags.length > 1 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {article.tags.slice(1).map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block bg-[#eaf4ff] text-[#314874] text-sm px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Content */}
              <div 
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-[#314874] prose-a:hover:text-[#1E2E4F] prose-strong:text-gray-900"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>
          </article>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">บทความที่เกี่ยวข้อง</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <Link
                    key={relatedArticle.id}
                    href={`/blog/${relatedArticle.slug || relatedArticle.id}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-video relative bg-gray-200">
                      {relatedArticle.image_url ? (
                        <Image
                          src={relatedArticle.image_url}
                          alt={relatedArticle.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      {/* Category Badge */}
                      {relatedArticle.tags.length > 0 && (
                        <div className="absolute top-2 left-2">
                          <span className="bg-[#1E2E4F] text-white text-xs px-2 py-1 rounded-full">
                            {relatedArticle.tags[0]}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {relatedArticle.summary || relatedArticle.excerpt || ''}
                      </p>
                      <div className="flex items-center text-xs text-gray-500 mt-2">
                        <FaClock className="mr-1" />
                        {formatDate(relatedArticle.created_at)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center bg-[#314874] text-white px-6 py-3 rounded-lg hover:bg-[#1E2E4F] transition-colors font-medium"
            >
              <FaArrowLeft className="mr-2" />
              ดูบทความอื่นๆ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;