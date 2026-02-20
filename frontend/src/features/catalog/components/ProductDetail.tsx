import Link from 'next/link';
import { ShoppingCart, Sparkles } from 'lucide-react';

import type { CatalogProduct } from '../types';

import { formatCurrency } from '@/lib/utils';

interface ProductDetailProps {
  product: CatalogProduct;
}

const formatLabel = (key: string) =>
  key
    .replace(/[_-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^(.)/, (_, char) => char.toUpperCase());

export const ProductDetail = ({ product }: ProductDetailProps) => {
  const media = product.media?.length ? product.media : product.media_urls ?? [];
  const highlightedMetadata =
    product.metadata && typeof product.metadata === 'object' && !Array.isArray(product.metadata)
      ? Object.entries(product.metadata)
      : [];

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3 text-sm text-slate-500">
        <Link href="/catalog" className="text-emerald-600 hover:text-emerald-500">
          Catálogo
        </Link>
        <span>/</span>
        <span>{product.category?.name ?? 'General'}</span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr]">
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            {media.length ? (
              <img
                src={media[0]}
                alt={product.name}
                className="h-full w-full object-cover"
                loading="eager"
              />
            ) : (
              <div className="flex h-full min-h-[360px] items-center justify-center text-slate-400">
                Sin imagen disponible
              </div>
            )}
            <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-4 py-1 text-xs font-semibold text-slate-700 shadow">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" /> Tendencia
            </span>
          </div>

          {media.length > 1 && (
            <div className="grid grid-cols-3 gap-3">
              {media.slice(1, 4).map(url => (
                <div key={url} className="overflow-hidden rounded-2xl border border-slate-200">
                  <img src={url} alt={`${product.name} gallery`} className="h-32 w-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6 rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-lg shadow-slate-900/5">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
              {product.category?.name ?? 'Colección principal'}
            </p>
            <h1 className="text-4xl font-bold text-slate-900">{product.name}</h1>
            {product.description && <p className="text-base text-slate-600">{product.description}</p>}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-900">
            <span className="text-4xl font-semibold text-slate-900">
              {formatCurrency(product.price, product.currency)}
            </span>
            <span className="rounded-full bg-slate-100 px-4 py-1 text-sm capitalize text-slate-600">
              {product.status}
            </span>
            <span className="text-sm text-slate-500">SKU: {product.sku ?? 'N/A'}</span>
          </div>

          <dl className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
              <dt className="text-xs uppercase tracking-wide text-slate-500">Disponibilidad</dt>
              <dd className="text-lg font-semibold text-slate-900">{product.stock > 0 ? `${product.stock} en stock` : 'Sin stock'}</dd>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
              <dt className="text-xs uppercase tracking-wide text-slate-500">Actualizado</dt>
              <dd className="text-lg font-semibold text-slate-900">
                {new Date(product.updated_at).toLocaleDateString('es-ES', {
                  month: 'short',
                  day: 'numeric',
                })}
              </dd>
            </div>
          </dl>

          {highlightedMetadata.length > 0 && (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-5">
              <p className="mb-3 text-sm font-semibold text-slate-600">Detalles</p>
              <dl className="grid gap-3 sm:grid-cols-2">
                {highlightedMetadata.map(([key, value]) => (
                  <div key={key} className="rounded-xl bg-white/70 px-4 py-3">
                    <dt className="text-xs uppercase tracking-wide text-slate-400">{formatLabel(key)}</dt>
                    <dd className="text-sm font-semibold text-slate-800">{String(value)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-600/30 transition hover:-translate-y-0.5 hover:bg-emerald-500"
            >
              <ShoppingCart className="h-5 w-5" /> Agregar al carrito
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-6 py-4 text-base font-semibold text-slate-700 hover:border-slate-300"
            >
              Guardar para después
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
