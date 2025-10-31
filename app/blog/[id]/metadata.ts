import { Metadata } from 'next';
import { createClient } from '@supabase/supabase-js';

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
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return null;
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

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

  // If no slug found, try by ID
  const { data: idData } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .eq('published', true)
    .maybeSingle();

  return idData;
}

export async function generateArticleMetadata(
  params: { id: string }
): Promise<Metadata> {
  const article = await fetchArticle(params.id);

  if (!article) {
    return {
      title: 'ไม่พบบทความ | SP Kansard',
      description: 'ไม่พบบทความที่คุณกำลังค้นหา',
    };
  }

  const canonicalUrl = `https://www.spkansard.co/blog/${article.slug || article.id}`;
  const description = article.summary || article.excerpt || `อ่านบทความ ${article.title} จาก SP Kansard`;
  const imageUrl = article.image_url || 'https://www.spkansard.co/images/logo.png';

  return {
    title: `${article.title} | SP Kansard Blog`,
    description: description,
    keywords: article.tags?.join(', '),
    authors: [{ name: 'SP Kansard Expert Team' }],
    openGraph: {
      title: article.title,
      description: description,
      url: canonicalUrl,
      siteName: 'SP Kansard',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      locale: 'th_TH',
      type: 'article',
      publishedTime: article.created_at,
      modifiedTime: article.updated_at,
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: description,
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
