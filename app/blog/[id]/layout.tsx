import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;
  
  // Try to fetch article by slug first
  let article = null;
  
  const { data: slugData } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', id)
    .eq('published', true)
    .maybeSingle();

  if (slugData) {
    article = slugData;
  } else {
    // Try by ID
    const { data: idData } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .eq('published', true)
      .maybeSingle();
    
    article = idData;
  }

  if (!article) {
    return {
      title: 'บทความไม่พบ | SP Kansard',
      description: 'ไม่พบบทความที่คุณกำลังค้นหา',
    };
  }

  const title = `${article.title} | SP Kansard`;
  const description = article.summary || article.excerpt || article.title;
  const imageUrl = article.image_url || 'https://spkansard.com/og-image.jpg';

  return {
    title,
    description,
    keywords: article.tags?.join(', '),
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: article.created_at,
      modifiedTime: article.updated_at,
      authors: ['SP Kansard'],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `https://spkansard.com/blog/${article.slug || article.id}`,
    },
  };
}

export default function BlogArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
