import type { CatalogFilters, CatalogProduct } from '../types';

import { catalogApi } from '../api/catalog.api';

export const catalogService = {
  listProducts: (filters?: CatalogFilters): Promise<CatalogProduct[]> =>
    catalogApi.listProducts(filters),

  getProductById: (id: string): Promise<CatalogProduct | null> =>
    catalogApi.getProductById(id),

  getProductBySlug: (slug: string): Promise<CatalogProduct | null> =>
    catalogApi.getProductBySlug(slug),

  listCategories: () => catalogApi.listCategories(),
};
