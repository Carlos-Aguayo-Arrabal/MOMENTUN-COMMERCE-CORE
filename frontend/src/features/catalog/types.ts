import type { CategoryRow, ProductRow } from '@/lib/supabase';

export interface CatalogProduct extends ProductRow {
  category?: CategoryRow | null;
  price: number;
  media: string[];
}

export interface CatalogFilters {
  search?: string;
  categoryId?: string;
  status?: ProductRow['status'];
  minPrice?: number;
  maxPrice?: number;
  limit?: number;
}

export interface CatalogState {
  products: CatalogProduct[];
  isLoading: boolean;
  error?: string;
  filters: CatalogFilters;
}
