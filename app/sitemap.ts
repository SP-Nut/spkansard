import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.spkansard.co'
  
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/materials`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]
  
  // Fetch published articles for sitemap (only if env vars are available)
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      )
      
      const { data: articles } = await supabase
        .from('articles')
        .select('id, slug, updated_at, created_at')
        .eq('published', true)
        .order('created_at', { ascending: false })
      
      if (articles && articles.length > 0) {
        const articleUrls: MetadataRoute.Sitemap = articles.map((article) => ({
          url: `${baseUrl}/blog/${article.slug || article.id}`,
          lastModified: new Date(article.updated_at || article.created_at),
          changeFrequency: 'monthly' as const,
          priority: 0.6,
        }))
        
        return [...staticRoutes, ...articleUrls]
      }
    } catch (error) {
      console.error('Error fetching articles for sitemap:', error)
    }
  }
  
  return staticRoutes
}