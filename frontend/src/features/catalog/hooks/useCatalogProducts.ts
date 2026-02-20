'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { catalogService } from '../services/catalogService';
import type { CatalogFilters, CatalogProduct, CatalogState } from '../types';
import { filterMockProducts } from '../mocks';

const createInitialState = (filters: CatalogFilters): CatalogState => ({
  products: [],
  isLoading: true,
  error: undefined,
  filters,
});

const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const useCatalogProducts = (initialFilters: CatalogFilters = {}) => {
  const filters = useMemo(() => ({ ...initialFilters }), [initialFilters]);
  const [state, setState] = useState<CatalogState>(() => createInitialState(filters));

  const loadProducts = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: undefined }));

    if (!isSupabaseConfigured) {
      const demoProducts = filterMockProducts(filters);
      setState({ products: demoProducts, isLoading: false, error: undefined, filters });
      return;
    }

    try {
      const products = await catalogService.listProducts(filters);
      setState({ products, isLoading: false, error: undefined, filters });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'No pudimos cargar el catálogo.';
      setState(prev => ({ ...prev, isLoading: false, error: message }));
    }
  }, [filters]);

  useEffect(() => {
    let isMounted = true;
    setState(createInitialState(filters));

    if (!isSupabaseConfigured) {
      const demoProducts = filterMockProducts(filters);
      setState({ products: demoProducts, isLoading: false, error: undefined, filters });
    } else {
      catalogService
        .listProducts(filters)
        .then(products => {
          if (!isMounted) return;
          setState({ products, isLoading: false, error: undefined, filters });
        })
        .catch(error => {
          if (!isMounted) return;
          const message = error instanceof Error ? error.message : 'No pudimos cargar el catálogo.';
          setState(prev => ({ ...prev, isLoading: false, error: message }));
        });
    }

    return () => {
      isMounted = false;
    };
  }, [filters]);

  return {
    products: state.products,
    isLoading: state.isLoading,
    error: state.error,
    filters: state.filters,
    refresh: loadProducts,
  } satisfies {
    products: CatalogProduct[];
    isLoading: boolean;
    error?: string;
    filters: CatalogFilters;
    refresh: () => Promise<void> | void;
  };
};
