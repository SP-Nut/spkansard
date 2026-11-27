begin;

create table if not exists public.gallery_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique check (length(trim(name)) between 1 and 100)
);

alter table public.gallery_categories enable row level security;
grant select on public.gallery_categories to anon, authenticated;
grant select, insert, update, delete on public.gallery_categories to service_role;

drop policy if exists "Public can read gallery categories" on public.gallery_categories;
create policy "Public can read gallery categories"
  on public.gallery_categories for select using (true);

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

alter table public.gallery_items
  add column if not exists category_id uuid;

alter table public.gallery_items
  drop constraint if exists gallery_items_category_id_fkey,
  add constraint gallery_items_category_id_fkey
    foreign key (category_id) references public.gallery_categories(id) on delete restrict;

grant select on public.gallery_items to anon, authenticated;
grant select, insert, update, delete on public.gallery_items to service_role;

drop policy if exists "Public can read active gallery items" on public.gallery_items;
create policy "Public can read active gallery items"
  on public.gallery_items
  for select
  using (is_active = true);

create index if not exists gallery_items_active_order_idx
  on public.gallery_items (is_active, display_order, created_at desc);

create index if not exists gallery_items_category_idx
  on public.gallery_items (category_id);

commit;
