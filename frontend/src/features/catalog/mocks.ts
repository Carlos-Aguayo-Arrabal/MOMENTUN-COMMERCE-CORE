import type { CategoryRow } from '@/lib/supabase';

import type { CatalogFilters, CatalogProduct } from './types';

const now = new Date().toISOString();

export const mockCategories: CategoryRow[] = [
  {
    id: 'cat-primavera',
    name: 'Colección Primavera',
    slug: 'coleccion-primavera',
    description: 'Productos frescos y ligeros para esta temporada.',
    created_at: now,
    updated_at: now,
  },
  {
    id: 'cat-tecno',
    name: 'Tecnología',
    slug: 'tecnologia',
    description: 'Gadgets inteligentes y accesorios premium.',
    created_at: now,
    updated_at: now,
  },
  {
    id: 'cat-hogar',
    name: 'Hogar',
    slug: 'hogar',
    description: 'Aromas y objetos que elevan tus espacios.',
    created_at: now,
    updated_at: now,
  },
];

const findCategory = (id: string) => mockCategories.find(category => category.id === id) ?? null;

export const mockProducts: CatalogProduct[] = [
  {
    id: 'prod-bolso-arena',
    name: 'Bolso Arena',
    slug: 'bolso-arena',
    description: 'Bolso artesanal tejido con fibras naturales y teñido vegano.',
    price_in_cents: 8900,
    price: 89,
    currency: 'USD',
    status: 'active',
    stock: 45,
    sku: 'BAG-001',
    metadata: { color: 'arena', destacado: true },
    category_id: 'cat-primavera',
    category: findCategory('cat-primavera'),
    created_at: now,
    updated_at: now,
    media_urls: ['https://images.unsplash.com/photo-1500522144261-ea64433bbe27?auto=format&fit=crop&w=800&q=80'],
    media: ['https://images.unsplash.com/photo-1500522144261-ea64433bbe27?auto=format&fit=crop&w=800&q=80'],
  },
  {
    id: 'prod-smartwatch-aurora',
    name: 'Smartwatch Aurora',
    slug: 'smartwatch-aurora',
    description: 'Monitoriza tu salud, recibe notificaciones y paga sin contacto.',
    price_in_cents: 15900,
    price: 159,
    currency: 'USD',
    status: 'active',
    stock: 80,
    sku: 'GAD-210',
    metadata: { color: 'negro', bateria: '48h' },
    category_id: 'cat-tecno',
    category: findCategory('cat-tecno'),
    created_at: now,
    updated_at: now,
    media_urls: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80'],
    media: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80'],
  },
  {
    id: 'prod-difusor-calm',
    name: 'Difusor Calm',
    slug: 'difusor-calm',
    description: 'Difusor ultrasónico con temporizador y apagado automático.',
    price_in_cents: 4900,
    price: 49,
    currency: 'USD',
    status: 'draft',
    stock: 25,
    sku: 'HOME-014',
    metadata: { fragancia: 'lavanda' },
    category_id: 'cat-hogar',
    category: findCategory('cat-hogar'),
    created_at: now,
    updated_at: now,
    media_urls: ['https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80'],
    media: ['https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80'],
  },
  {
    id: 'prod-set-ceramica',
    name: 'Set Cerámica Lumen',
    slug: 'set-ceramica-lumen',
    description: 'Vajilla esmaltada a mano con pigmentos minerales.',
    price_in_cents: 12900,
    price: 129,
    currency: 'USD',
    status: 'active',
    stock: 12,
    sku: 'HOME-045',
    metadata: { piezas: 6 },
    category_id: 'cat-hogar',
    category: findCategory('cat-hogar'),
    created_at: now,
    updated_at: now,
    media_urls: ['https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=900&q=80'],
    media: ['https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=900&q=80'],
  },
  {
    id: 'prod-sneakers-lima',
    name: 'Sneakers Lima',
    slug: 'sneakers-lima',
    description: 'Zapatillas veganas hechas con maíz y algodón reciclado.',
    price_in_cents: 11200,
    price: 112,
    currency: 'USD',
    status: 'active',
    stock: 60,
    sku: 'SNK-777',
    metadata: { genero: 'unisex' },
    category_id: 'cat-primavera',
    category: findCategory('cat-primavera'),
    created_at: now,
    updated_at: now,
    media_urls: ['https://images.unsplash.com/photo-1528701800489-20be3c2c642a?auto=format&fit=crop&w=900&q=80'],
    media: ['https://images.unsplash.com/photo-1528701800489-20be3c2c642a?auto=format&fit=crop&w=900&q=80'],
  },
  {
    id: 'prod-auriculares-velvet',
    name: 'Auriculares Velvet',
    slug: 'auriculares-velvet',
    description: 'Cancelación activa de ruido y estuche con carga rápida.',
    price_in_cents: 9800,
    price: 98,
    currency: 'USD',
    status: 'archived',
    stock: 0,
    sku: 'AUD-503',
    metadata: { edicion: 'limitada' },
    category_id: 'cat-tecno',
    category: findCategory('cat-tecno'),
    created_at: now,
    updated_at: now,
    media_urls: ['https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80'],
    media: ['https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80'],
  },
];

export const filterMockProducts = (filters: CatalogFilters): CatalogProduct[] => {
  let result = [...mockProducts];

  if (filters.status) {
    result = result.filter(product => product.status === filters.status);
  }

  if (filters.categoryId) {
    result = result.filter(product => product.category_id === filters.categoryId);
  }

  if (filters.search) {
    const term = filters.search.toLowerCase();
    result = result.filter(product => product.name.toLowerCase().includes(term));
  }

  if (typeof filters.minPrice === 'number') {
    result = result.filter(product => product.price >= filters.minPrice!);
  }

  if (typeof filters.maxPrice === 'number') {
    result = result.filter(product => product.price <= filters.maxPrice!);
  }

  if (typeof filters.limit === 'number') {
    result = result.slice(0, filters.limit);
  }

  return result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
};
