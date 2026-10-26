import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogSlugs, getBlogMeta } from '@/lib/content';
import type { BlogMeta } from '@/lib/content';
import Link from 'next/link';
import { getDictionary } from '@/lib/i18n';
import type { Language, Dictionary } from '@/lib/i18n';

import { blogComponents, blogComponentsEn } from '@/lib/mdx-registry';
import ZoomableImage from '@/components/ZoomableImage';
import BackToTop from '@/components/BackToTop';
import { getDisplayTag } from '@/lib/tag-display';

export function generateStaticParams() {
  return getBlogSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const meta = getBlogMeta(slug, lang as Language);
  if (!meta) return {};
  return { title: `${meta.title} | ZHANG.LOG` };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const dict = getDictionary(lang as Language);
  const t = (key: keyof Dictionary) => dict[key];
  const meta = getBlogMeta(slug, lang as Language);
  if (!meta) notFound();

  const MDXContent = (lang === 'en' ? blogComponentsEn[slug] : blogComponents[slug]) ?? blogComponents[slug];
  const posts = getBlogSlugs()
    .map((s) => getBlogMeta(s, lang as Language))
    .filter((post): post is BlogMeta => post !== null)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <main className="max-w-6xl mx-auto px-5 sm:px-6 py-8 md:py-12 pt-20 sm:pt-28 lg:pt-40">
      <nav className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] text-slate-500 mb-6 sm:mb-8 lg:mb-12">
        <Link href={`/${lang}`} className="hover:text-lobster transition-colors">
          {t('blog.detail.home')}
        </Link>
        <span className="size-1 rounded-full bg-white/20"></span>
        <Link href={`/${lang}/blogs`} className="hover:text-lobster transition-colors">
          {t('blog.detail.blog')}
        </Link>
        <span className="size-1 rounded-full bg-lobster"></span>
        <span className="text-slate-300">{t(`blog.category.${meta.category}` as keyof Dictionary)}</span>
      </nav>

      <div className="lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-12">
        {/* 往期博客：正文左侧常驻，当前这篇用龙虾色高亮 */}
        <aside className="hidden lg:block">
          <section className="lg:sticky lg:top-1/2 lg:-translate-y-1/2 edge-lit-card rounded-3xl p-4 md:p-6 backdrop-blur-md">
            <span className="text-white font-bold">{t('blog.detail.archive')}</span>
            {/* 列表高度固定为 8 条，文章多少都不让卡片跳动 */}
            <nav className="mt-4 h-80 overflow-y-auto" aria-label={t('blog.detail.archive')}>
              {posts.map((post) => {
                const current = post.slug === slug;
                return (
                  <Link
                    key={post.slug}
                    href={`/${lang}/blogs/${post.slug}`}
                    aria-current={current ? 'page' : undefined}
                    className={`group flex h-10 flex-col justify-center rounded-lg px-2.5 transition-colors ${
                      current ? 'bg-lobster/10 text-lobster' : 'text-slate-500 hover:bg-white/5 hover:text-slate-200'
                    }`}
                  >
                    <span
                      className={`font-mono text-[10px] leading-none tracking-wider ${
                        current ? 'text-lobster/70' : 'text-slate-600 group-hover:text-slate-500'
                      }`}
                    >
                      {post.date}
                    </span>
                    <span className="mt-1 truncate text-[13px] font-medium leading-none">{post.title}</span>
                  </Link>
                );
              })}
            </nav>
          </section>
        </aside>

        <div className="min-w-0">
          <div className="mb-6 sm:mb-8 lg:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight tracking-tight text-white">
              {meta.title}
            </h1>
          </div>

          <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-6 sm:mb-8 lg:mb-12 border border-white/10">
            <ZoomableImage src={meta.image} alt={t('blog.detail.featuredAlt')} sizes="(min-width: 1024px) 848px, 100vw" className="absolute inset-0" priority />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent"></div>
          </div>

          <article className="prose prose-invert lg:prose-lg max-w-none text-slate-300 leading-relaxed">
            {MDXContent ? <MDXContent /> : null}
          </article>

          <div className="mt-10 md:mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 md:gap-6">
            <div className="flex gap-2">
              {meta.tags.map((tag: string) => (
                <span key={tag} className="px-4 py-1.5 rounded-full bg-white/5 text-sm text-slate-400 border border-white/5">
                  {getDisplayTag(tag, lang)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <BackToTop label={t('nav.backToTop')} />
    </main>
  );
}
