import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';

interface Props {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}

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

async function fetchArticle(id: string): Promise<Article | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return null;
  }

  try {
    // Try to fetch by slug first
    const { data: slugData } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', id)
      .eq('published', true)
      .maybeSingle();

    if (slugData) {
      return slugData;
    }

    // Try by ID
    const { data: idData } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .eq('published', true)
      .maybeSingle();

    return idData;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  
  const article = await fetchArticle(id);

  if (!article) {
    return {
      title: 'บทความไม่พบ | SP Kansard',
      description: 'ไม่พบบทความที่คุณกำลังค้นหา',
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const title = `${article.title} | SP Kansard Blog`;
  const description = article.summary || article.excerpt || `อ่านบทความ ${article.title} จาก SP Kansard ผู้เชี่ยวชาญด้านกันสาดและโรงจอดรถ`;
  const canonicalUrl = `https://www.spkansard.co/blog/${article.slug || article.id}`;
  const imageUrl = article.image_url || 'https://www.spkansard.co/images/logo.png';

  return {
    title,
    description,
    keywords: article.tags?.join(', ') || 'กันสาด, โรงจอดรถ, SP Kansard',
    authors: [{ name: 'SP Kansard Expert Team' }],
    creator: 'SP Kansard Co., Ltd.',
    publisher: 'SP Kansard Co., Ltd.',
    category: article.tags?.[0] || 'บทความ',
    openGraph: {
      title: article.title,
      description,
      url: canonicalUrl,
      siteName: 'SP Kansard',
      type: 'article',
      publishedTime: article.created_at,
      modifiedTime: article.updated_at,
      authors: ['SP Kansard Expert Team'],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      tags: article.tags,
      locale: 'th_TH',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description,
      images: [imageUrl],
      creator: '@spkansard',
      site: '@spkansard',
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function BlogArticleLayout({
  children,
  params,
}: Props) {
  const { id } = await params;
  const article = await fetchArticle(id);

  if (!article) {
    return <>{children}</>;
  }

  const canonicalUrl = `https://www.spkansard.co/blog/${article.slug || article.id}`;
  const imageUrl = article.image_url || 'https://www.spkansard.co/images/logo.png';

  // BlogPosting Schema for rich snippets
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.summary || article.excerpt || '',
    "image": imageUrl,
    "datePublished": article.created_at,
    "dateModified": article.updated_at,
    "author": {
      "@type": "Organization",
      "name": "SP Kansard",
      "url": "https://www.spkansard.co"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SP Kansard",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.spkansard.co/images/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "keywords": article.tags?.join(', '),
    "articleSection": article.tags?.[0] || 'บทความ',
    "inLanguage": "th-TH"
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "หน้าแรก",
        "item": "https://www.spkansard.co"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "บทความ",
        "item": "https://www.spkansard.co/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article.title,
        "item": canonicalUrl
      }
    ]
  };

  return (
    <>
      {/* BlogPosting Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
