'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';

import {
  CatalogGrid,
  ProductDetail,
  useCatalogProduct,
  useCatalogProducts,
} from '@/features/catalog';

import type { CatalogFilters } from '@/features/catalog';

const ProductDetailSkeleton = () => (
  <div className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr]">
    <div className="space-y-4">
      <div className="h-[420px] animate-pulse rounded-3xl bg-slate-200" />
      <div className="grid grid-cols-3 gap-3">
        {[0, 1, 2].map(index => (
          <div key={`skeleton-thumb-${index}`} className="h-32 animate-pulse rounded-2xl bg-slate-200" />
        ))}
      </div>
    </div>
    <div className="space-y-4 rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-sm">
      <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
      <div className="h-10 w-3/4 animate-pulse rounded bg-slate-200" />
      <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
      <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />
      <div className="h-12 w-48 animate-pulse rounded bg-slate-200" />
      <div className="h-20 w-full animate-pulse rounded bg-slate-200" />
    </div>
  </div>
);

export default function CatalogProductPage() {
  const params = useParams<{ slug?: string }>();
  const slug = typeof params?.slug === 'string' ? params.slug : '';
  const { product, isLoading, error } = useCatalogProduct(slug);
  const categoryId = product?.category_id ?? undefined;
  const currentProductId = product?.id ?? null;

  const relatedFilters: CatalogFilters = useMemo(() => {
    if (!currentProductId) {
      return { status: 'active', limit: 4 };
    }
    return {
      status: 'active',
      limit: 4,
      categoryId,
    };
  }, [categoryId, currentProductId]);

  const {
    products: relatedProducts,
    isLoading: isLoadingRelated,
  } = useCatalogProducts(relatedFilters);

  const curatedRelated = useMemo(() => {
    if (!currentProductId) {
      return relatedProducts;
    }
    return relatedProducts.filter(item => item.id !== currentProductId);
  }, [currentProductId, relatedProducts]);

  return (
    <main className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-6">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" /> Volver al catálogo
          </Link>
        </div>

        {isLoading && (
          <div className="space-y-8">
            <ProductDetailSkeleton />
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Loader2 className="h-4 w-4 animate-spin" /> Cargando producto...
            </div>
          </div>
        )}

        {!isLoading && error && (
          <div className="rounded-3xl border border-rose-100 bg-rose-50 p-8 text-rose-700">
            <p className="font-semibold">Hubo un problema al cargar el producto.</p>
            <p className="text-sm opacity-80">{error}</p>
          </div>
        )}

        {!isLoading && !error && !product && (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <p className="text-lg font-semibold text-slate-900">Producto no encontrado</p>
            <p className="mt-2 text-sm text-slate-500">
              Revisa la URL o regresa a la lista para explorar otros artículos.
            </p>
            <Link
              href="/catalog"
              className="mt-4 inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
            >
              Volver al catálogo
            </Link>
          </div>
        )}

        {product && !isLoading && !error && (
          <div className="space-y-16">
            <ProductDetail product={product} />

            <section className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
                    Descubre más
                  </p>
                  <h2 className="text-2xl font-bold text-slate-900">También puede interesarte</h2>
                </div>
                <Link
                  href="/catalog"
                  className="text-sm font-semibold text-slate-600 hover:text-slate-900"
                >
                  Ver todo
                </Link>
              </div>

              <CatalogGrid
                products={curatedRelated}
                isLoading={isLoadingRelated}
                error={undefined}
                emptyState={<p className="text-sm text-slate-500">Agrega más productos para sugerencias.</p>}
              />
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
