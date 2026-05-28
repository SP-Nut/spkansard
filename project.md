# SP Kansard Project Guide

คู่มือสั้นสำหรับ AI/ผู้ช่วยรอบถัดไป อ่านไฟล์นี้ก่อนเริ่มงาน เพื่อเข้าใจโปรเจคและประหยัด token

## โปรเจคนี้คืออะไร

SP Kansard เป็นเว็บบริษัทรับออกแบบและติดตั้งกันสาด โรงจอดรถ งานเหล็ก งานฝ้า และงานระแนง ใช้ Next.js App Router สำหรับหน้าเว็บไซต์, ระบบบทความ, แกลเลอรี่, วัสดุ, ติดต่อ และหน้า admin หลังบ้านที่เชื่อม Supabase

## Stack หลัก

- Framework: Next.js 16, React 19, TypeScript
- Styling: Tailwind CSS 4 ผ่าน `app/globals.css`
- Database/storage: Supabase
- Rich text editor: Tiptap ใช้ในหน้า admin บทความ
- Email contact: Nodemailer ใน `app/api/contact/route.ts`
- Analytics: `@vercel/analytics`

## โครงสร้างสำคัญ

- `app/page.tsx`: หน้าแรกและ section หลักหลายส่วน
- `app/components/HeroSection.tsx`: hero slider หน้าแรก
- `app/components/header.tsx`, `footer.tsx`, `FloatingContactButton.tsx`: layout component หลักของเว็บ
- `app/components/StructuredData.tsx`: JSON-LD schema รวมของ organization, website, local business, service และ FAQ
- `app/blog`, `app/gallery`, `app/materials`, `app/contact`, `app/about`, `app/faq`: public pages
- `app/estimate`: ระบบคำนวณราคากันสาด/โรงจอดรถเบื้องต้นในเว็บหลัก พร้อม lead form ส่งเข้า `/api/contact`
- `app/admin`: admin dashboard สำหรับ articles, materials, categories
- `app/api/admin`: API หลังบ้าน ใช้ `lib/admin-api.ts` และ `lib/admin-token.ts`
- `lib/supabase.ts`: Supabase client ฝั่ง client แบบ lazy init เพื่อไม่ให้ build พังตอน env ยังไม่ครบ
- `lib/sanitize.ts`: helper sanitize/escape HTML
- `public/herosection`, `public/heroMobile`, `public/images`: static assets ที่ถูกใช้บนหน้าเว็บ
- `supabase-gallery.sql`: SQL สำหรับตาราง `gallery_items`

## Environment

ดูตัวอย่างที่ `.env.example`

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_PASSWORD`
- `JWT_SECRET`
- `EMAIL_USER`
- `EMAIL_PASS`

## คำสั่งที่ควรใช้

- `npm run dev`: รัน dev server
- `npm run lint`: ตรวจ lint แบบเร็ว
- `npm run build`: ใช้เฉพาะเมื่อจำเป็น เช่น เปลี่ยน config, routing, server code, metadata, หรือก่อน deploy

อย่า build ใหม่ทุกครั้งถ้าแก้แค่ copy, style เล็ก ๆ, หรือเอกสาร ให้ใช้ `npm run lint` หรืออ่าน diff แทนก่อน เพื่อประหยัดเวลาและ token

## แนวทางทำงานสำหรับ AI รอบหน้า

- อ่าน `project.md`, `package.json`, และไฟล์ที่เกี่ยวข้องกับงานเท่านั้น อย่าไล่เปิดทั้ง repo ถ้าไม่จำเป็น
- ใช้ `rg` หรือ `rg --files` เพื่อค้นหา reference ก่อนแก้/ลบไฟล์
- อย่า rewrite component ใหญ่ทั้งไฟล์ถ้าแก้เฉพาะจุดได้
- รักษาภาษาไทยและ SEO metadata ให้ดี โดยเฉพาะหน้า public
- อย่าลบ `.next` หรือ `node_modules` เพื่อ “ทำความสะอาด” เพราะช่วย cache/build และ dependency ไว้
- ก่อนลบ static asset ต้องค้น reference ทั้ง repo ก่อน เช่น `/herosection/...`, `/heroMobile/...`, `/images/...`
- Hero หน้าแรกควรเป็นข้อความจัดกลางบนภาพเต็มจอ มี overlay อ่านง่าย และปุ่ม CTA อยู่กลางตามดีไซน์เดิม
- ปุ่มประเมินราคา/คำนวณราคาให้ชี้ไป `/estimate` ในเว็บหลัก ไม่ต้องกลับไปใช้ `cal-customer.vercel.app`
- Schema/JSON-LD ให้ใช้ `StructuredData.tsx` เป็นที่รวมหลัก อย่าสร้าง component schema แยกซ้ำโดยไม่จำเป็น

## หมายเหตุด้าน performance

- ใช้ `next/image` กับรูป public และ remote Supabase storage
- `next.config.ts` ตั้ง cache header สำหรับ `/images` และ `/herosection`
- Hero มี animation class `.hero-drift` ใน `app/globals.css` พร้อม `prefers-reduced-motion`
- Supabase client เป็น lazy proxy เพื่อหลีกเลี่ยง error ตอน build ที่ env ยังไม่พร้อม

## สิ่งที่ควรระวัง

- บางไฟล์มีข้อความภาษาไทยจำนวนมาก ถ้า PowerShell แสดงเป็นตัวเพี้ยน ให้ตรวจ encoding ก่อน อย่าสรุปว่าไฟล์เสียทันที
- หน้า admin เป็น client-heavy และพึ่งพา `localStorage` token ผ่าน `lib/auth.ts`
- Blog article มีทั้ง metadata/schema ใน `app/blog/[id]/layout.tsx` และ client fetch ใน `app/blog/[id]/page.tsx`; ถ้าจะ refactor ให้แยก server/client ให้ชัด
- หลีกเลี่ยงการเปลี่ยน URL รูปหรือ slug โดยไม่ตรวจ SEO impact
