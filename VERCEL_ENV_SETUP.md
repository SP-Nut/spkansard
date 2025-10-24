# Vercel Environment Variables Setup

## Required Environment Variables

ต้องตั้งค่าใน Vercel Dashboard:

1. **NEXT_PUBLIC_SUPABASE_URL**
   - Value: URL ของ Supabase project
   - Example: `https://xxxxx.supabase.co`

2. **NEXT_PUBLIC_SUPABASE_ANON_KEY**
   - Value: Anon/Public key ของ Supabase
   - Example: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

3. **SUPABASE_SERVICE_ROLE_KEY** (Optional - for admin features)
   - Value: Service Role key ของ Supabase
   - Example: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

4. **ADMIN_PASSWORD**
   - Value: รหัสผ่านสำหรับ admin login
   - Example: `your-secure-password`

## วิธีตั้งค่าใน Vercel:

1. ไปที่ Vercel Dashboard → เลือก Project
2. คลิก Settings → Environment Variables
3. เพิ่ม Variables ทั้ง 4 ตัว
4. เลือก Environment: Production, Preview, Development (ทั้งหมด)
5. คลิก Save
6. Redeploy โปรเจ็ค

## หา Supabase Keys:

1. ไปที่ Supabase Dashboard
2. เลือก Project
3. ไปที่ Settings → API
4. คัดลอก:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon/public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role key → `SUPABASE_SERVICE_ROLE_KEY`
