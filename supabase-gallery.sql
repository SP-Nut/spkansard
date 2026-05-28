create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text,
  alt text,
  image_url text not null,
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.gallery_items enable row level security;

drop policy if exists "Public can read active gallery items" on public.gallery_items;
create policy "Public can read active gallery items"
  on public.gallery_items
  for select
  using (is_active = true);

create index if not exists gallery_items_active_order_idx
  on public.gallery_items (is_active, display_order, created_at desc);
