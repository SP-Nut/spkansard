-- ลบ check constraint สำหรับ category ใน materials table
-- เพราะตอนนี้เราใช้ระบบ categories แบบ dynamic แล้ว

-- ลบ constraint เก่า
ALTER TABLE materials 
DROP CONSTRAINT IF EXISTS materials_category_check;

-- ตอนนี้ category สามารถเป็นค่าใดก็ได้ที่อยู่ใน categories table
-- ไม่จำเป็นต้องมี constraint แบบ hardcoded แล้ว

-- หากต้องการเพิ่ม foreign key constraint เพื่อให้ category ต้องอ้างอิงถึง categories.name
-- สามารถใช้คำสั่งนี้ (แนะนำ):
-- ALTER TABLE materials
-- ADD CONSTRAINT materials_category_fkey
-- FOREIGN KEY (category) REFERENCES categories(name)
-- ON DELETE RESTRICT
-- ON UPDATE CASCADE;

-- แต่ถ้าไม่ต้องการ constraint ก็ไม่ต้องเพิ่มอะไร
-- เพราะ application จะจัดการให้เอง
