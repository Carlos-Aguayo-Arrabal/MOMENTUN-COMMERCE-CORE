import type { ReactNode } from 'react';

import type { CatalogProduct } from '../types';
import { ProductCard } from './ProductCard';

interface CatalogGridProps {
  products: CatalogProduct[];
  isLoading?: boolean;
  error?: string;
  emptyState?: ReactNode;
}

const skeletonItems = Array.from({ length: 6 });

export const CatalogGrid = ({ products, isLoading, error, emptyState }: CatalogGridProps) => {
  if (error) {
    return (
      <div className="rounded-2xl border border-rose-100 bg-rose-50 p-6 text-rose-700">
        <p className="font-semibold">Hubo un problema al cargar los productos.</p>
        <p className="text-sm opacity-80">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skeletonItems.map((_, index) => (
          <div key={`catalog-skeleton-${index}`} className="animate-pulse rounded-2xl border border-slate-200 bg-white">
            <div className="aspect-[4/3] rounded-t-2xl bg-slate-100" />
            <div className="space-y-3 p-4">
              <div className="h-4 w-1/2 rounded bg-slate-100" />
              <div className="h-3 w-5/6 rounded bg-slate-100" />
              <div className="h-3 w-2/3 rounded bg-slate-100" />
              <div className="flex items-center justify-between pt-2">
                <div className="h-6 w-20 rounded-full bg-slate-100" />
                <div className="h-6 w-16 rounded-full bg-slate-100" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      (emptyState ?? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
          <h3 className="text-lg font-semibold text-slate-900">Tu catálogo aún está vacío</h3>
          <p className="mt-2 text-sm text-slate-500">
            Conecta Supabase y comienza a sincronizar tus productos.
          </p>
        </div>
      ))
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
