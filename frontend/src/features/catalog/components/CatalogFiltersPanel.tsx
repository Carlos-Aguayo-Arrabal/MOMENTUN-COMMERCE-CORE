import type { ChangeEvent } from 'react';

import type { CatalogFilters } from '../types';
import type { CategoryRow } from '@/lib/supabase';

interface CatalogFiltersPanelProps {
  categories: CategoryRow[];
  value: CatalogFilters;
  onChange: (filters: CatalogFilters) => void;
  isDisabled?: boolean;
}

const statusOptions: Array<{ value?: CatalogFilters['status']; label: string }> = [
  { value: undefined, label: 'Todas' },
  { value: 'active', label: 'Activas' },
  { value: 'draft', label: 'Borrador' },
  { value: 'archived', label: 'Archivadas' },
];

export const CatalogFiltersPanel = ({ categories, value, onChange, isDisabled }: CatalogFiltersPanelProps) => {
  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value: nextValue } = event.target;
    onChange({
      ...value,
      [name]: nextValue || undefined,
    });
  };

  const handlePrice = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value: raw } = event.target;
    const numeric = raw === '' ? undefined : Math.max(Number(raw), 0);
    onChange({
      ...value,
      [name]: Number.isFinite(numeric as number) ? (numeric as number) : undefined,
    });
  };

  const handleStatusChange = (status?: CatalogFilters['status']) => {
    onChange({
      ...value,
      status,
    });
  };

  const resetFilters = () => {
    onChange({});
  };

  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur">
      <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-500">
        <span className="text-slate-900">Estado:</span>
        <div className="flex flex-wrap gap-2">
          {statusOptions.map(option => {
            const isActive = value.status === option.value || (!option.value && !value.status);
            return (
              <button
                key={option.label}
                type="button"
                onClick={() => handleStatusChange(option.value)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
                disabled={isDisabled}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
          Categoría
          <select
            name="categoryId"
            value={value.categoryId ?? ''}
            onChange={handleSelect}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 focus:border-emerald-400 focus:ring-0"
            disabled={isDisabled || !categories.length}
          >
            <option value="">Todas</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
          Precio mínimo
          <input
            type="number"
            name="minPrice"
            min={0}
            step="10"
            value={value.minPrice ?? ''}
            onChange={handlePrice}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 focus:border-emerald-400 focus:ring-0"
            placeholder="0"
            disabled={isDisabled}
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
          Precio máximo
          <input
            type="number"
            name="maxPrice"
            min={0}
            step="10"
            value={value.maxPrice ?? ''}
            onChange={handlePrice}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 focus:border-emerald-400 focus:ring-0"
            placeholder="500"
            disabled={isDisabled}
          />
        </label>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
        <p>{categories.length ? `${categories.length} categorías disponibles` : 'Sin categorías sincronizadas'}</p>
        <button
          type="button"
          onClick={resetFilters}
          className="text-sm font-semibold text-emerald-600 hover:text-emerald-500"
          disabled={isDisabled}
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  );
};
