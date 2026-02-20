'use client';

import { useEffect, useState } from 'react';

import type { CategoryRow } from '@/lib/supabase';

import { catalogService } from '../services/catalogService';
import { mockCategories } from '../mocks';
import { isSupabaseConfigured } from '../utils/env';

interface CategoriesState {
  categories: CategoryRow[];
  isLoading: boolean;
  error?: string;
}

export const useCatalogCategories = () => {
  const [state, setState] = useState<CategoriesState>({
    categories: [],
    isLoading: true,
    error: undefined,
  });

  useEffect(() => {
    let isMounted = true;
    setState(prev => ({ ...prev, isLoading: true }));

    if (!isSupabaseConfigured()) {
      setState({ categories: mockCategories, isLoading: false, error: undefined });
      return () => {
        isMounted = false;
      };
    }

    catalogService
      .listCategories()
      .then(categories => {
        if (!isMounted) return;
        setState({ categories, isLoading: false, error: undefined });
      })
      .catch(error => {
        if (!isMounted) return;
        const message = error instanceof Error ? error.message : 'Error al cargar las categorías.';
        setState({ categories: [], isLoading: false, error: message });
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return state;
};
