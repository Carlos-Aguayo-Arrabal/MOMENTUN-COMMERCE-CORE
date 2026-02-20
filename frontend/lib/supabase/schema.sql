-- ==========================================
-- Catalog schema for Supabase (Postgres)
-- Run inside the SQL editor or via Supabase CLI:
--   supabase db push --file frontend/lib/supabase/schema.sql
-- ==========================================

create extension if not exists "uuid-ossp";

create table if not exists public.categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  description text,
  price_in_cents integer not null check (price_in_cents >= 0),
  currency text not null default 'USD',
  status text not null default 'draft' check (status in ('draft', 'active', 'archived')),
  stock integer not null default 0,
  sku text,
  metadata jsonb,
  category_id uuid references public.categories (id) on delete set null,
  media_urls text[],
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_name_idx on public.products using gin (to_tsvector('spanish', name));
create index if not exists products_status_idx on public.products (status);
create index if not exists products_category_idx on public.products (category_id);
