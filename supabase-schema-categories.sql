-- Create categories table for managing material categories
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO categories (name, description, display_order) VALUES
  ('ผ้าใบกันสาด', 'วัสดุผ้าใบสำหรับทำกันสาด', 1),
  ('โครงสร้าง', 'โครงเหล็กและวัสดุโครงสร้าง', 2),
  ('อุปกรณ์ติดตั้ง', 'อุปกรณ์และเครื่องมือติดตั้ง', 3),
  ('อื่นๆ', 'วัสดุอื่นๆ', 4)
ON CONFLICT (name) DO NOTHING;

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_categories_is_active ON categories(is_active);
CREATE INDEX IF NOT EXISTS idx_categories_display_order ON categories(display_order);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access to active categories" ON categories
  FOR SELECT USING (is_active = true);

-- Create policy for authenticated users to manage categories
CREATE POLICY "Allow authenticated users to manage categories" ON categories
  FOR ALL USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_categories_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_categories_updated_at();
