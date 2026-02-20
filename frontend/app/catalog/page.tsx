'use client';

import { useDeferredValue, useState } from 'react';
import { RefreshCw, Search } from 'lucide-react';

import {
  CatalogFiltersPanel,
  CatalogGrid,
  useCatalogCategories,
  useCatalogProducts,
} from '@/features/catalog';
import type { CatalogFilters } from '@/features/catalog';

export default function CatalogPage() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<CatalogFilters>({ status: 'active' });
  const deferredSearch = useDeferredValue(search);

  const { categories, isLoading: isLoadingCategories, error: categoriesError } = useCatalogCategories();

  const { products, isLoading, error, refresh } = useCatalogProducts({
    ...filters,
    search: deferredSearch.trim() || undefined,
  });

  const handleFiltersChange = (nextFilters: CatalogFilters) => {
    setFilters(nextFilters);
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <header className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">Catálogo</p>
          <h1 className="mt-2 text-4xl font-bold text-slate-900">Productos conectados a Supabase</h1>
          <p className="mt-3 max-w-2xl text-base text-slate-500">
            Administra tu inventario y deja que tus clientes exploren la tienda en tiempo real. Actualiza tu base de
            datos en Supabase y verás los cambios reflejados automáticamente aquí.
          </p>
        </header>

        <section className="mb-8 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <label className="flex flex-1 items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-500 focus-within:border-emerald-400 focus-within:bg-white">
              <Search className="mr-3 h-5 w-5" />
              <input
                type="search"
                placeholder="Busca por nombre…"
                value={search}
                onChange={event => setSearch(event.target.value)}
                className="w-full bg-transparent text-base text-slate-900 placeholder-slate-400 focus:outline-none"
              />
            </label>
            <button
              type="button"
              onClick={() => refresh()}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-slate-800"
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Actualizar
            </button>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Asegúrate de haber ejecutado los scripts `schema.sql` y `seed.sql` en tu proyecto Supabase. Puedes personalizar
            las consultas ajustando los filtros en `src/features/catalog`.
          </p>
        </section>

        <section className="mb-12">
          <CatalogFiltersPanel
            categories={categories}
            value={filters}
            onChange={handleFiltersChange}
            isDisabled={isLoading || isLoadingCategories}
          />
          {categoriesError && (
            <p className="mt-3 rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-600">
              {categoriesError}
            </p>
          )}
        </section>

        <CatalogGrid products={products} isLoading={isLoading} error={error} />
      </div>
    </main>
  );
}
