'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { Dictionary } from '@/lib/i18n';
import type { BlogMeta } from '@/lib/content';

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

  const categories = [
    { key: 'all', label: t('blog.categories.all') },
    { key: 'tech', label: t('blog.categories.tech') },
    { key: 'community', label: t('blog.categories.community') },
    { key: 'latest', label: t('blog.categories.latest') },
  ];

  const filtered = articles.filter((a) => CATEGORY_FILTERS[active]?.(a.category) ?? true);

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
        <p className="text-slate-600 dark:text-slate-400 text-lg">{t('blog.page.subtitle')}</p>
      </div>

      <div className="border-b border-lobster/10 mb-8 overflow-x-auto">
        <div className="flex gap-8 whitespace-nowrap min-w-max">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className={`border-b-2 pb-4 px-1 text-sm font-bold transition-colors cursor-pointer ${
                active === cat.key
                  ? 'border-lobster text-lobster'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-lobster'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
        {filtered.map((article) => (
          <Link key={article.slug} href={`/${lang}/blog/${article.slug}`} className="group flex flex-col gap-4">
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
              <p className="text-slate-500 dark:text-slate-400 text-sm">{t('blog.publishedAt')} {article.date}</p>
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
