'use client';

import { ChevronDown, Search, X } from 'lucide-react';

export interface ListFilterOption {
  value: string;
  label: string;
}

export interface ListSortOption {
  value: string;
  label: string;
}

export default function ListFilters({
  search,
  onSearchChange,
  searchPlaceholder,
  sort,
  onSortChange,
  sortLabel,
  sortOptions,
  filter,
  onFilterChange,
  filterOptions,
  clearLabel,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder: string;
  sort: string;
  onSortChange: (value: string) => void;
  sortLabel: string;
  sortOptions: ListSortOption[];
  filter?: string;
  onFilterChange?: (value: string) => void;
  filterOptions?: ListFilterOption[];
  clearLabel: string;
}) {
  const hasActiveFilters = search.length > 0 || Boolean(filter && filter !== 'all');

  return (
    <div className="mb-10 border-y border-white/10 py-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={searchPlaceholder}
            className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-11 pr-10 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-lobster/60"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label={clearLabel}
              title={clearLabel}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-500 transition-colors hover:text-white"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        <label className="relative flex items-center gap-3 text-sm text-slate-400">
          <span className="whitespace-nowrap">{sortLabel}</span>
          <select
            value={sort}
            onChange={(event) => onSortChange(event.target.value)}
            className="h-11 min-w-40 flex-1 appearance-none rounded-xl border border-white/10 bg-[#111827] pl-3 pr-11 text-sm text-white outline-none focus:border-lobster/60"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-slate-300" />
        </label>
      </div>

      {filterOptions && onFilterChange && (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onFilterChange(option.value)}
              className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-bold transition-colors ${
                filter === option.value
                  ? 'border-lobster bg-lobster/15 text-lobster'
                  : 'border-white/10 text-slate-500 hover:border-lobster/40 hover:text-lobster'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {hasActiveFilters && (
        <button
          type="button"
          onClick={() => {
            onSearchChange('');
            onFilterChange?.('all');
          }}
          className="mt-3 text-xs font-bold text-slate-500 transition-colors hover:text-lobster"
        >
          {clearLabel}
        </button>
      )}
    </div>
  );
}
