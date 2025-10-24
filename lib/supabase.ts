import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// สำหรับการใช้งานทั่วไป
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface Material {
  id: string
  name: string
  description: string
  image_url?: string
  features: string[]
  price_range?: string
  category: string
  created_at: string
  updated_at: string
}

export interface Article {
  id: string
  title: string
  content: string
  summary?: string  // New field we want to use
  excerpt?: string  // Existing field in database
  image_url?: string
  tags: string[]
  published: boolean
  created_at: string
  updated_at: string
}

// Helper function to get summary from article (prioritize summary over excerpt)
export function getArticleSummary(article: Article): string {
  return article.summary || article.excerpt || '';
}

export interface AdminUser {
  id: string
  username: string
  password_hash: string
  created_at: string
  last_login?: string
}