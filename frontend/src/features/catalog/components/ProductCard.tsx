import Link from 'next/link';

import type { CatalogProduct } from '../types';

import { formatCurrency } from '@/lib/utils';

interface ProductCardProps {
  product: CatalogProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const primaryImage = product.media?.[0];

  return (
    <Link
      href={`/catalog/${product.slug}`}
      className="block h-full"
      aria-label={`Ver detalles de ${product.name}`}
      prefetch={false}
    >
      <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl bg-slate-50">
          {primaryImage ? (
            <img
              src={primaryImage}
              alt={product.name}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-slate-400">
              Sin imagen
            </div>
          )}
          <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow">
            {product.category?.name ?? 'General'}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base font-semibold text-slate-900">{product.name}</h3>
            <span className="text-sm font-semibold text-emerald-600">
              {formatCurrency(product.price, product.currency)}
            </span>
          </div>

          {product.description && <p className="text-sm text-slate-500">{product.description}</p>}

          <div className="mt-auto flex items-center justify-between text-xs text-slate-500">
            <span className="rounded-full bg-slate-100 px-3 py-1 font-medium capitalize">{product.status}</span>
            <span className="font-medium text-slate-700">Stock: {product.stock}</span>
          </div>
        </div>
      </article>
    </Link>
  );
};
