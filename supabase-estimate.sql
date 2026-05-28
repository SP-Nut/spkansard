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
