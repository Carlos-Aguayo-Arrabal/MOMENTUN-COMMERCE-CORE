'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { catalogService } from '../services/catalogService';
import type { CatalogProduct } from '../types';
import { getMockProductBySlug } from '../mocks';
import { isSupabaseConfigured } from '../utils/env';

interface ProductState {
  product: CatalogProduct | null;
  isLoading: boolean;
  error?: string;
}

const supabaseReady = isSupabaseConfigured();

export const useCatalogProduct = (slug?: string) => {
  const [state, setState] = useState<ProductState>({
    product: null,
    isLoading: Boolean(slug),
    error: undefined,
  });
  const isMountedRef = useRef(true);

  const setSafeState = useCallback(
    (updater: ProductState | ((prev: ProductState) => ProductState)) => {
      if (!isMountedRef.current) return;
      setState(updater);
    },
    []
  );

  const loadProduct = useCallback(async () => {
    if (!slug) {
      setSafeState({ product: null, isLoading: false, error: 'Producto inválido.' });
      return;
    }

    setSafeState(prev => ({ ...prev, isLoading: true, error: undefined }));

    if (!supabaseReady) {
      const mockProduct = getMockProductBySlug(slug);
      setSafeState({
        product: mockProduct ?? null,
        isLoading: false,
        error: mockProduct ? undefined : 'Producto no encontrado.',
      });
      return;
    }

    try {
      const product = await catalogService.getProductBySlug(slug);
      setSafeState({
        product: product ?? null,
        isLoading: false,
        error: product ? undefined : 'Producto no encontrado.',
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al cargar el producto.';
      setSafeState(prev => ({ ...prev, isLoading: false, error: message }));
    }
  }, [setSafeState, slug]);

  useEffect(() => {
    isMountedRef.current = true;
    loadProduct();

    return () => {
      isMountedRef.current = false;
    };
  }, [loadProduct]);

  return {
    product: state.product,
    isLoading: state.isLoading,
    error: state.error,
    refresh: loadProduct,
  } satisfies {
    product: CatalogProduct | null;
    isLoading: boolean;
    error?: string;
    refresh: () => Promise<void> | void;
  };
};
