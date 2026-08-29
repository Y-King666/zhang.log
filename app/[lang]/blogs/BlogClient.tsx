'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { Dictionary } from '@/lib/i18n';
import type { BlogMeta } from '@/lib/content';
import ListFilters from '@/components/ListFilters';

// Maps the 4 UI filter tabs to the blog frontmatter `category` values.
const CATEGORY_FILTERS: Record<string, (category: string) => boolean> = {
  all: () => true,
  tech: (c) => ['新手教程', '技术科普', '架构实践', '前端视野'].includes(c),
  community: (c) => c === '生态治理',
  latest: (c) => c === '行业趋势',
};

export default function BlogClient({
  dict,
  lang,
  articles,
}: {
  dict: Dictionary;
  lang: string;
  articles: BlogMeta[];
}) {
  const t = (key: keyof Dictionary) => dict[key];
  const [active, setActive] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('latest');

  const categories = [
    { value: 'all', label: t('list.filter.all') },
    { value: 'tech', label: t('blog.categories.tech') },
    { value: 'community', label: t('blog.categories.community') },
    { value: 'latest', label: t('blog.categories.latest') },
  ];

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return articles
      .filter((article) => CATEGORY_FILTERS[active]?.(article.category) ?? true)
      .filter((article) => {
        if (!query) return true;
        return [article.title, article.slug, article.category, ...article.tags]
          .join(' ')
          .toLowerCase()
          .includes(query);
      })
      .sort((a, b) => {
        if (sort === 'oldest') return a.date.localeCompare(b.date);
        if (sort === 'title') return a.title.localeCompare(b.title);
        return b.date.localeCompare(a.date);
      });
  }, [active, articles, search, sort]);

  return (
    <main className="max-w-6xl mx-auto px-6 pb-20 pt-40">
      <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-12">
        <Link href={`/${lang}`} className="hover:text-lobster transition-colors">
          {t('blog.detail.home')}
        </Link>
        <span className="size-1 rounded-full bg-lobster"></span>
        <span className="text-slate-300">{t('nav.blog')}</span>
      </nav>
      <div className="mb-10">
        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">{t('blog.page.title')}</h2>
      </div>

      <ListFilters
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder={t('list.search')}
        sort={sort}
        onSortChange={setSort}
        sortLabel={t('list.sort')}
        sortOptions={[
          { value: 'latest', label: t('list.sort.latest') },
          { value: 'oldest', label: t('list.sort.oldest') },
          { value: 'title', label: t('list.sort.title') },
        ]}
        filter={active}
        onFilterChange={setActive}
        filterOptions={categories}
        clearLabel={t('list.clear')}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
        {filtered.map((article) => (
          <Link key={article.slug} href={`/${lang}/blogs/${article.slug}`} className="group flex flex-col gap-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-lobster/10">
              <Image
                alt={article.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                src={article.image}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-bold text-lobster uppercase tracking-wider">{article.category}</p>
              <h3 className="text-xl font-bold leading-snug group-hover:text-lobster transition-colors">
                {article.title}
              </h3>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-500 dark:text-slate-400 text-sm">
                <span>{t('blog.publishedAt')} {article.date}</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">schedule</span> {t('blog.readTime.format').replace('{n}', article.readTime || '—')}
                </span>
              </div>
              <div className="text-lobster text-sm font-bold flex items-center gap-1 mt-2">
                {t('blog.readMore')} <ArrowRight className="size-4" />
              </div>
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full flex items-center justify-center py-20 text-slate-500">
            {t('blog.noArticles')}
          </div>
        )}
      </div>
    </main>
  );
}
