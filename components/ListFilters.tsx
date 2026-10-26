'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

import { Check, ChevronDown, Search, X } from 'lucide-react';

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
  children,
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
  children?: ReactNode;
}) {
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const selectedSort = sortOptions.find((option) => option.value === sort) ?? sortOptions[0];
  const hasActiveFilters = search.length > 0 || Boolean(filter && filter !== 'all');

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!sortRef.current?.contains(event.target as Node)) setSortOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSortOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="mb-6 md:mb-10 border-y border-white/10 py-3 sm:py-4">
      <div className="flex items-center gap-3 lg:gap-4 lg:justify-between">
        <div className="relative min-w-0 flex-1 lg:max-w-md">
          <Search className="pointer-events-none absolute left-3 sm:left-4 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
          <input
            type="search"
            aria-label={searchPlaceholder}
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={searchPlaceholder}
            className="h-9 sm:h-10 lg:h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-9 pr-8 text-xs text-white outline-none transition-colors placeholder:text-slate-600 focus:border-lobster/60 sm:pl-11 sm:pr-10 sm:text-sm"
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

        <div className="relative flex items-center justify-end gap-3 text-sm text-slate-400">
          <span className="whitespace-nowrap">{sortLabel}</span>
          <div ref={sortRef} className="relative min-w-28 sm:min-w-32 lg:min-w-40">
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={sortOpen}
              onClick={() => setSortOpen((open) => !open)}
              className={`flex h-9 sm:h-10 lg:h-11 w-full items-center justify-between gap-3 sm:gap-4 rounded-xl border bg-[#111827] pl-3.5 pr-3 text-left text-sm text-white outline-none transition-all ${
                sortOpen
                  ? 'border-lobster/60 shadow-[0_0_0_3px_rgba(255,69,0,0.08)]'
                  : 'border-white/10 hover:border-white/20 hover:bg-[#151b2a]'
              }`}
            >
              <span className="truncate">{selectedSort?.label}</span>
              <ChevronDown className={`size-4 shrink-0 transition-transform ${sortOpen ? 'rotate-180 text-lobster' : 'text-slate-300'}`} />
            </button>

            {sortOpen && (
              <div
                role="listbox"
                aria-label={sortLabel}
                className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-max min-w-full whitespace-nowrap overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f0f]/95 p-1.5 shadow-[0_20px_55px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl"
              >
                {sortOptions.map((option) => {
                  const selected = option.value === sort;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onClick={() => {
                        onSortChange(option.value);
                        setSortOpen(false);
                      }}
                      className={`group flex w-full items-center justify-between gap-5 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                        selected
                          ? 'bg-lobster/10 text-white shadow-[inset_0_0_0_1px_rgba(255,69,0,0.14)]'
                          : 'text-slate-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span className="whitespace-nowrap">{option.label}</span>
                      {selected ? (
                        <Check className="size-4 shrink-0 text-lobster" />
                      ) : (
                        <span className="size-1.5 shrink-0 rounded-full bg-white/10 transition-colors group-hover:bg-lobster/40" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {filterOptions && onFilterChange && (
        <div className="mt-4 flex w-full flex-nowrap items-center gap-1 overflow-hidden pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-2 lg:w-auto lg:flex-wrap lg:gap-3 lg:pb-0">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onFilterChange(option.value)}
              className={`min-w-0 flex-1 whitespace-nowrap rounded-full px-1 py-1.5 text-center text-[10px] font-bold transition-colors sm:px-3 sm:text-xs lg:flex-none lg:px-3.5 ${
                filter === option.value
                  ? 'bg-lobster text-white'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {children && <div className="mt-4">{children}</div>}

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
