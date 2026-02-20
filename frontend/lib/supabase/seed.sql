-- ==========================================
-- Sample catalog data for local development
-- Usage: supabase db push --file frontend/lib/supabase/seed.sql
-- ==========================================

insert into public.categories (id, name, slug, description)
values
  (uuid_generate_v4(), 'Colección Primavera', 'coleccion-primavera', 'Productos frescos para la nueva temporada'),
  (uuid_generate_v4(), 'Tecnología', 'tecnologia', 'Gadgets y accesorios inteligentes'),
  (uuid_generate_v4(), 'Hogar', 'hogar', 'Decoración y artículos para tu espacio');

insert into public.products (
  id,
  name,
  slug,
  description,
  price_in_cents,
  currency,
  status,
  stock,
  sku,
  metadata,
  category_id,
  media_urls
)
select
  uuid_generate_v4(),
  name,
  slug,
  description,
  price_in_cents,
  currency,
  status,
  stock,
  sku,
  metadata,
  category_id,
  media_urls
from (
  values
    (
      'Bolso Arena',
      'bolso-arena',
      'Bolso artesanal hecho con fibras naturales.',
      8900,
      'USD',
      'active',
      45,
      'BAG-001',
      jsonb_build_object('color', 'arena', 'destacado', true),
      (select id from public.categories where slug = 'coleccion-primavera' limit 1),
      array['https://images.supabase.co/catalog/bolso-arena.jpg']
    ),
    (
      'Smartwatch Aurora',
      'smartwatch-aurora',
      'Monitoriza tu salud y recibe notificaciones en tu muñeca.',
      15900,
      'USD',
      'active',
      80,
      'GAD-210',
      jsonb_build_object('color', 'negro'),
      (select id from public.categories where slug = 'tecnologia' limit 1),
      array['https://images.supabase.co/catalog/smartwatch-aurora.jpg']
    ),
    (
      'Difusor Calm',
      'difusor-calm',
      'Difusor aromático con temporizador inteligente.',
      4900,
      'USD',
      'draft',
      25,
      'HOME-014',
      jsonb_build_object('fragancia', 'lavanda'),
      (select id from public.categories where slug = 'hogar' limit 1),
      array['https://images.supabase.co/catalog/difusor-calm.jpg']
    )
) as sample (
  name,
  slug,
  description,
  price_in_cents,
  currency,
  status,
  stock,
  sku,
  metadata,
  category_id,
  media_urls
);
