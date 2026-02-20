import { getSupabaseBrowserClient } from '@/lib/supabase';

import type { CatalogFilters, CatalogProduct } from '../types';
import type { CategoryRow, ProductRow } from '@/lib/supabase';

type ProductWithCategory = ProductRow & { categories: CategoryRow | null };

const mapProduct = (product: ProductWithCategory): CatalogProduct => ({
  ...product,
  category: product.categories,
  price: product.price_in_cents / 100,
  media: product.media_urls ?? [],
});

const buildPriceValue = (value?: number) =>
  typeof value === 'number' && !Number.isNaN(value) ? Math.max(value, 0) * 100 : undefined;

export const catalogApi = {
  async listProducts(filters: CatalogFilters = {}): Promise<CatalogProduct[]> {
    const supabase = getSupabaseBrowserClient();

    let query = supabase
      .from('products')
      .select('*, categories:category_id(*)')
      .order('created_at', { ascending: false });

    if (filters.categoryId) {
      query = query.eq('category_id', filters.categoryId);
    }

    if (filters.status) {
      query = query.eq('status', filters.status);
    }

    if (filters.search) {
      query = query.ilike('name', `%${filters.search}%`);
    }

    const minPrice = buildPriceValue(filters.minPrice);
    const maxPrice = buildPriceValue(filters.maxPrice);

    if (typeof minPrice === 'number') {
      query = query.gte('price_in_cents', minPrice);
    }

    if (typeof maxPrice === 'number') {
      query = query.lte('price_in_cents', maxPrice);
    }

    if (typeof filters.limit === 'number') {
      query = query.limit(filters.limit);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    return (data ?? []).map(product => mapProduct(product as ProductWithCategory));
  },

  async getProductById(id: string): Promise<CatalogProduct | null> {
    const supabase = getSupabaseBrowserClient();

    const { data, error } = await supabase
      .from('products')
      .select('*, categories:category_id(*)')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(error.message);
    }

    return data ? mapProduct(data as ProductWithCategory) : null;
  },

  async getProductBySlug(slug: string): Promise<CatalogProduct | null> {
    const supabase = getSupabaseBrowserClient();

    const { data, error } = await supabase
      .from('products')
      .select('*, categories:category_id(*)')
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(error.message);
    }

    return data ? mapProduct(data as ProductWithCategory) : null;
  },

  async listCategories(): Promise<CategoryRow[]> {
    const supabase = getSupabaseBrowserClient();

    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return (data ?? []) as CategoryRow[];
  },
};
