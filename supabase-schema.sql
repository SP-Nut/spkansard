-- Create materials table
CREATE TABLE materials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT,
  features TEXT[] DEFAULT '{}',
  price_range VARCHAR(100),
  category VARCHAR(50) CHECK (category IN ('metal_sheet', 'vinyl', 'aluminum', 'polycarbonate')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create articles table
CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  image_url TEXT,
  slug VARCHAR(255) UNIQUE NOT NULL,
  published BOOLEAN DEFAULT false,
  author VARCHAR(100) DEFAULT 'SP Kansard',
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_users table
CREATE TABLE admin_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- Insert default admin user (password: admin123)
-- Note: In production, use proper password hashing
INSERT INTO admin_users (username, password_hash) 
VALUES ('admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- Create indexes for better performance
CREATE INDEX idx_materials_category ON materials(category);
CREATE INDEX idx_articles_published ON articles(published);
CREATE INDEX idx_articles_slug ON articles(slug);

-- Enable Row Level Security (RLS)
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on materials" ON materials
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on published articles" ON articles
  FOR SELECT USING (published = true);

-- Create policies for admin access (you'll need to implement proper auth)
CREATE POLICY "Allow admin full access on materials" ON materials
  FOR ALL USING (true);

CREATE POLICY "Allow admin full access on articles" ON articles
  FOR ALL USING (true);

CREATE POLICY "Allow admin read access on admin_users" ON admin_users
  FOR SELECT USING (true);