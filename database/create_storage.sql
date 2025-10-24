-- สร้าง Storage bucket สำหรับรูปภาพ
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);

-- สร้าง policy สำหรับ public read access
CREATE POLICY "Public read access" ON storage.objects FOR SELECT USING (bucket_id = 'images');

-- สร้าง policy สำหรับ authenticated users สามารถ upload ได้
CREATE POLICY "Authenticated users can upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');

-- สร้าง policy สำหรับ authenticated users สามารถ delete ได้
CREATE POLICY "Authenticated users can delete" ON storage.objects FOR DELETE USING (bucket_id = 'images' AND auth.role() = 'authenticated');