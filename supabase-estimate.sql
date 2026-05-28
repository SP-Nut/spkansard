create table if not exists public.estimate_products (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('โปร่งแสง', 'ทึบแสง')),
  name text not null,
  image_url text,
  image_alt text,
  prices jsonb not null default '{}'::jsonb,
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.estimate_services (
  id uuid primary key default gen_random_uuid(),
  service_type text not null check (service_type in ('main', 'extra', 'gutter')),
  service_group text not null,
  name text not null,
  price integer not null default 0,
  unit text not null check (unit in ('sqm', 'post', 'set', 'point', 'meter', 'free')),
  only_size text check (only_size in ('M', 'M+', 'L', 'L+', 'Stainless S', 'Stainless M')),
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

with duplicate_products as (
  select id
  from (
    select
      id,
      row_number() over (partition by type, name order by updated_at desc, created_at desc, id) as duplicate_rank
    from public.estimate_products
  ) ranked_products
  where duplicate_rank > 1
)
delete from public.estimate_products
where id in (select id from duplicate_products);

with duplicate_services as (
  select id
  from (
    select
      id,
      row_number() over (partition by service_type, service_group, name order by updated_at desc, created_at desc, id) as duplicate_rank
    from public.estimate_services
  ) ranked_services
  where duplicate_rank > 1
)
delete from public.estimate_services
where id in (select id from duplicate_services);

create unique index if not exists estimate_products_type_name_key
  on public.estimate_products (type, name);

create unique index if not exists estimate_services_type_group_name_key
  on public.estimate_services (service_type, service_group, name);

alter table public.estimate_products enable row level security;
alter table public.estimate_services enable row level security;

drop policy if exists "Public can read active estimate products" on public.estimate_products;
create policy "Public can read active estimate products"
  on public.estimate_products
  for select
  using (is_active = true);

drop policy if exists "Public can read active estimate services" on public.estimate_services;
create policy "Public can read active estimate services"
  on public.estimate_services
  for select
  using (is_active = true);

create index if not exists estimate_products_active_order_idx
  on public.estimate_products (is_active, type, display_order, created_at desc);

create index if not exists estimate_services_active_order_idx
  on public.estimate_services (is_active, service_type, display_order, created_at desc);

insert into public.estimate_products (type, name, image_url, image_alt, prices, display_order, is_active)
values
  ('โปร่งแสง', 'อะคริลิค Shinkolite Prime 10 มม.', null, null, '{"M":8350,"M+":8890,"L":9100,"L+":10300,"Stainless S":0,"Stainless M":15900}'::jsonb, 0, true),
  ('โปร่งแสง', 'อะคริลิค Shinkolite Heat Cut/Nature 6 มม.', null, null, '{"M":5550,"M+":5700,"L":5900,"L+":6100,"Stainless S":0,"Stainless M":11900}'::jsonb, 1, true),
  ('โปร่งแสง', 'อะคริลิค Shinkolite Superior 6 มม.', null, null, '{"M":4250,"M+":4400,"L":4600,"L+":4800,"Stainless S":0,"Stainless M":9900}'::jsonb, 2, true),
  ('โปร่งแสง', 'อะคริลิค Shinkolite Shade Series 4 มม.', null, null, '{"M":3850,"M+":4050,"L":4250,"L+":4400,"Stainless S":0,"Stainless M":9100}'::jsonb, 3, true),
  ('โปร่งแสง', 'โพลีคาร์บอเนต Embossed Sheet 3 มม.', null, null, '{"M":3300,"M+":3400,"L":3600,"L+":3750,"Stainless S":4800,"Stainless M":6600}'::jsonb, 4, true),
  ('โปร่งแสง', 'ไฟเบอร์กลาส ลอนเรียบ D-Lite 1.5 มม. / J-Roof 1.2 มม.', null, null, '{"M":3100,"M+":3200,"L":3400,"L+":3600,"Stainless S":4600,"Stainless M":6400}'::jsonb, 5, true),
  ('โปร่งแสง', 'ไฟเบอร์กลาส ลอนคลื่น D-Lite 1.2 มม. สีเทาอัลลอยด์', null, null, '{"M":2650,"M+":2750,"L":2850,"L+":2900,"Stainless S":4200,"Stainless M":5900}'::jsonb, 6, true),
  ('โปร่งแสง', 'ไฟเบอร์กลาส ลอนคลื่น D-Lite 1.2 มม.', null, null, '{"M":2550,"M+":2650,"L":2750,"L+":2850,"Stainless S":4100,"Stainless M":5700}'::jsonb, 7, true),
  ('โปร่งแสง', 'โพลีลอนเล็ก 1.2 มม./1.5 มม.', null, null, '{"M":2550,"M+":2650,"L":2750,"L+":2850,"Stainless S":4100,"Stainless M":5700}'::jsonb, 8, true),
  ('โปร่งแสง', 'แผ่นใสไฟเบอร์กลาส/โพลี ลอนเมทัลชีท 1.2 มม.', null, null, '{"M":2150,"M+":2250,"L":2350,"L+":2450,"Stainless S":3700,"Stainless M":4800}'::jsonb, 9, true),
  ('โปร่งแสง', 'โพลีคาร์บอเนต 10 มม.', null, null, '{"M":2150,"M+":2250,"L":2350,"L+":2450,"Stainless S":3700,"Stainless M":4800}'::jsonb, 10, true),
  ('โปร่งแสง', 'โพลีคาร์บอเนต 8 มม.', null, null, '{"M":2000,"M+":2100,"L":2150,"L+":2250,"Stainless S":3500,"Stainless M":4600}'::jsonb, 11, true),
  ('โปร่งแสง', 'โพลีคาร์บอเนต 6 มม.', null, null, '{"M":1800,"M+":1900,"L":2000,"L+":2100,"Stainless S":3300,"Stainless M":4400}'::jsonb, 12, true),
  ('ทึบแสง', 'หลังคาอลูมิเนียม 3 มม.', null, null, '{"M":3650,"M+":3850,"L":4050,"L+":4250,"Stainless S":0,"Stainless M":9500}'::jsonb, 13, true),
  ('ทึบแสง', 'หลังคาไวนิล ดรีมรูฟ ไวนิลคริปล๊อค 6 มม.', null, null, '{"M":2750,"M+":2850,"L":2900,"L+":2900,"Stainless S":4300,"Stainless M":6000}'::jsonb, 14, true),
  ('ทึบแสง', 'หลังคาไวนิล ท้องเรียบ หัวกลม/เหลี่ยม 6 มม.', null, null, '{"M":2750,"M+":2850,"L":2900,"L+":3000,"Stainless S":4300,"Stainless M":6000}'::jsonb, 15, true),
  ('ทึบแสง', 'หลังคาไวนิล ท้องเรียบ หัวเหลี่ยม 5 มม. PR-6', null, null, '{"M":2650,"M+":2750,"L":2800,"L+":2900,"Stainless S":4200,"Stainless M":5900}'::jsonb, 16, true),
  ('ทึบแสง', 'หลังคาวินเทอร์รูฟ 2 มม.', null, null, '{"M":2350,"M+":2450,"L":2550,"L+":2650,"Stainless S":3900,"Stainless M":5000}'::jsonb, 17, true),
  ('ทึบแสง', 'เมทัลชีท แผ่นแซนวิช 0.35 มม. + PU 25 มม.', null, null, '{"M":2150,"M+":2250,"L":2350,"L+":2450,"Stainless S":3700,"Stainless M":4800}'::jsonb, 18, true),
  ('ทึบแสง', 'เมทัลชีท แผ่นแซนวิช บลูสโคป 0.35 มม. + PU 25 มม.', null, null, '{"M":2350,"M+":2450,"L":2550,"L+":2650,"Stainless S":3900,"Stainless M":5000}'::jsonb, 19, true),
  ('ทึบแสง', 'เมทัลชีท ลอนสแนปล็อค 0.35 มม. + PU 25 มม.', null, null, '{"M":2100,"M+":2200,"L":2300,"L+":2400,"Stainless S":3650,"Stainless M":4750}'::jsonb, 20, true),
  ('ทึบแสง', 'เมทัลชีท 0.35 มม. + PU 25 มม.', null, null, '{"M":1800,"M+":1900,"L":2000,"L+":2100,"Stainless S":3300,"Stainless M":4400}'::jsonb, 21, true),
  ('ทึบแสง', 'เมทัลชีท 0.35 มม. + PU 50 มม.', null, null, '{"M":2000,"M+":2100,"L":2200,"L+":2300,"Stainless S":3500,"Stainless M":4600}'::jsonb, 22, true),
  ('ทึบแสง', 'เมทัลชีท 0.35 มม. + PE 5 มม.', null, null, '{"M":1600,"M+":1700,"L":1800,"L+":1900,"Stainless S":3100,"Stainless M":4200}'::jsonb, 23, true),
  ('ทึบแสง', 'บลูสโคป ลอนสแนปล็อค 0.35 มม.', null, null, '{"M":1800,"M+":1900,"L":2000,"L+":2100,"Stainless S":3300,"Stainless M":4400}'::jsonb, 24, true),
  ('ทึบแสง', 'บลูสโคป ลอนสแนปล็อค 0.40 มม.', null, null, '{"M":1900,"M+":2000,"L":2100,"L+":2200,"Stainless S":3400,"Stainless M":4500}'::jsonb, 25, true),
  ('ทึบแสง', 'บลูสโคป ลอนสแนปล็อค 0.47 มม.', null, null, '{"M":2000,"M+":2100,"L":2200,"L+":2300,"Stainless S":3500,"Stainless M":4600}'::jsonb, 26, true),
  ('ทึบแสง', 'เหล็กนอก ลอนสแนปล็อค 0.35 มม.', null, null, '{"M":1700,"M+":1800,"L":1900,"L+":2000,"Stainless S":3200,"Stainless M":4300}'::jsonb, 27, true),
  ('ทึบแสง', 'เหล็กนอก ลอนสแนปล็อค 0.40 มม.', null, null, '{"M":1800,"M+":1900,"L":2000,"L+":2100,"Stainless S":3300,"Stainless M":4400}'::jsonb, 28, true),
  ('ทึบแสง', 'เหล็กนอก ลอนสแนปล็อค 0.47 มม.', null, null, '{"M":1900,"M+":2000,"L":2100,"L+":2200,"Stainless S":3400,"Stainless M":4500}'::jsonb, 29, true),
  ('ทึบแสง', 'บลูสโคป แซคส์ คูล 0.35 มม.', null, null, '{"M":1600,"M+":1700,"L":1800,"L+":1900,"Stainless S":3100,"Stainless M":4200}'::jsonb, 30, true),
  ('ทึบแสง', 'เมทัลชีท มาตรฐาน 0.35 มม.', null, null, '{"M":1500,"M+":1600,"L":1700,"L+":1800,"Stainless S":3000,"Stainless M":4100}'::jsonb, 31, true),
  ('ทึบแสง', 'เมทัลชีท มาตรฐาน 0.40 มม.', null, null, '{"M":1600,"M+":1700,"L":1800,"L+":1900,"Stainless S":3100,"Stainless M":4200}'::jsonb, 32, true),
  ('ทึบแสง', 'เมทัลชีท มาตรฐาน 0.47 มม.', null, null, '{"M":1700,"M+":1800,"L":1900,"L+":2000,"Stainless S":3200,"Stainless M":4300}'::jsonb, 33, true)
on conflict (type, name) do update set
  image_url = excluded.image_url,
  image_alt = excluded.image_alt,
  prices = excluded.prices,
  display_order = excluded.display_order,
  is_active = excluded.is_active,
  updated_at = now();

insert into public.estimate_services (service_type, service_group, name, price, unit, only_size, display_order, is_active)
values
  ('main', 'งานเสา', 'เสาเดี่ยว', 2000, 'post', null, 0, true),
  ('main', 'งานเสา', 'เสาระแนง', 3500, 'post', null, 1, true),
  ('main', 'งานเสา', 'เสาเรียง', 2800, 'post', null, 2, true),
  ('main', 'สีโครงสร้าง', 'สีผสมพิเศษ', 200, 'sqm', null, 3, true),
  ('main', 'งานฝ้า ใช้เฉพาะ L+', 'ฝ้าตะแกรงเหล็ก', 1100, 'sqm', 'L+', 4, true),
  ('main', 'งานฝ้า ใช้เฉพาะ L+', 'ฝ้าระแนงเชอรา 8 มม.', 1500, 'sqm', 'L+', 5, true),
  ('main', 'งานฝ้า ใช้เฉพาะ L+', 'ฝ้าเมทัลชีทสีธรรมดา', 1500, 'sqm', 'L+', 6, true),
  ('main', 'งานฝ้า ใช้เฉพาะ L+', 'ฝ้าระแนงเหล็กใต้หลังคา', 1600, 'sqm', 'L+', 7, true),
  ('main', 'งานฝ้า ใช้เฉพาะ L+', 'ฝ้าเมทัลชีทลายไม้', 1600, 'sqm', 'L+', 8, true),
  ('main', 'งานฝ้า ใช้เฉพาะ L+', 'ฝ้าระแนงเหล็กลายไม้ Aron', 3700, 'sqm', 'L+', 9, true),
  ('extra', 'งานรากฐาน', 'ฟุตติ้ง ไม่ลงเข็ม', 3000, 'set', null, 0, true),
  ('extra', 'งานรากฐาน', 'เข็มหกเหลี่ยม 3 ม. + ฟุตติ้ง', 5000, 'set', null, 1, true),
  ('extra', 'งานรากฐาน', 'เข็มหกเหลี่ยม 4 ม. + ฟุตติ้ง', 6000, 'set', null, 2, true),
  ('extra', 'งานรากฐาน', 'เข็มหกเหลี่ยม 6 ม. + ฟุตติ้ง', 7000, 'set', null, 3, true),
  ('extra', 'งานรากฐาน', 'ไมโครไพล์ I18 1 ต้น', 20000, 'post', null, 4, true),
  ('extra', 'งานรากฐาน', 'ไมโครไพล์ I18 2 ต้น', 17000, 'post', null, 5, true),
  ('extra', 'งานรากฐาน', 'ไมโครไพล์ I18 3 ต้น', 15000, 'post', null, 6, true),
  ('extra', 'งานรากฐาน', 'ไมโครไพล์ I18 4 ต้น', 13000, 'post', null, 7, true),
  ('extra', 'งานรากฐาน', 'ไมโครไพล์ I22 1 ต้น', 22000, 'post', null, 8, true),
  ('extra', 'งานรากฐาน', 'ไมโครไพล์ I22 2 ต้น', 19000, 'post', null, 9, true),
  ('extra', 'งานรากฐาน', 'ไมโครไพล์ I22 3 ต้น', 17000, 'post', null, 10, true),
  ('extra', 'งานรากฐาน', 'ไมโครไพล์ I22 4 ต้น', 13000, 'post', null, 11, true),
  ('extra', 'งานรากฐาน', 'เข็มเหล็ก F76 ลึก 2 ม.', 9500, 'post', null, 12, true),
  ('extra', 'งานรากฐาน', 'เข็มเหล็ก F76 ลึก 3 ม.', 12500, 'post', null, 13, true),
  ('extra', 'งานไฟฟ้า', 'จุดไฟส่องสว่าง', 1500, 'point', null, 14, true),
  ('extra', 'งานท่อน้ำ', 'PVC 3 นิ้ว', 550, 'meter', null, 15, true),
  ('extra', 'งานท่อน้ำ', 'ไวนิล Lion 3 นิ้ว สีขาว', 700, 'meter', null, 16, true),
  ('extra', 'งานท่อน้ำ', 'ไวนิล VG 3 นิ้ว สีขาว', 900, 'meter', null, 17, true),
  ('gutter', 'รางน้ำพับพิเศษ', 'L1 สแตนเลส 304 หลังบ้าน', 2600, 'meter', null, 0, true),
  ('gutter', 'รางน้ำพับพิเศษ', 'L1 อลูมิเนียม หลังบ้าน', 1600, 'meter', null, 1, true),
  ('gutter', 'รางน้ำพับพิเศษ', 'L2 สแตนเลส 304 ซ่อนราง', 1600, 'meter', null, 2, true),
  ('gutter', 'รางน้ำพับพิเศษ', 'L2 อลูมิเนียม ซ่อนราง', 850, 'meter', null, 3, true),
  ('gutter', 'รางน้ำพับพิเศษ', 'L3 สแตนเลส 304 หน้าบ้าน', 1500, 'meter', null, 4, true),
  ('gutter', 'รางน้ำพับพิเศษ', 'L3 อลูมิเนียม หน้าบ้าน', 550, 'meter', null, 5, true),
  ('gutter', 'รางน้ำมาตรฐาน', '6 นิ้ว เกรด 304', 850, 'meter', null, 6, true),
  ('gutter', 'รางน้ำมาตรฐาน', '5 นิ้ว เกรด 304', 700, 'meter', null, 7, true),
  ('gutter', 'รางน้ำไวนิล', 'VG สีขาว', 900, 'meter', null, 8, true),
  ('gutter', 'รางน้ำไวนิล', 'Lion สีขาว', 700, 'meter', null, 9, true)
on conflict (service_type, service_group, name) do update set
  price = excluded.price,
  unit = excluded.unit,
  only_size = excluded.only_size,
  display_order = excluded.display_order,
  is_active = excluded.is_active,
  updated_at = now();
