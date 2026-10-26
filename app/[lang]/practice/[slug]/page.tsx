import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPracticeSlugs, getPracticeMeta } from '@/lib/content';
import Link from 'next/link';
import { getDictionary } from '@/lib/i18n';
import type { Language, Dictionary } from '@/lib/i18n';

import { practiceComponents, practiceComponentsEn } from '@/lib/mdx-registry';
import { SCENARIO_SET } from '@/lib/scenarios';
import { getDisplayTag } from '@/lib/tag-display';
import PracticeTableOfContents from '@/components/PracticeTableOfContents';
import CodeBlock from '@/components/CodeBlock';
import ZoomableImage from '@/components/ZoomableImage';
import BackToTop from '@/components/BackToTop';

const MAX_RELATED = 3;

// 详情页「你可能感兴趣」：优先同场景、不足补齐、按日期最新，最多 3 篇
function getRelatedSlugs(currentSlug: string, lang: Language): string[] {
  const currentScenarios = (getPracticeMeta(currentSlug, lang)?.tags ?? []).filter((t) => SCENARIO_SET.has(t));
  const byDateDesc = (a: string, b: string) => (getPracticeMeta(b, lang)?.date ?? '').localeCompare(getPracticeMeta(a, lang)?.date ?? '');
  const peers = getPracticeSlugs().filter((s) => s !== currentSlug);

  const same = peers
    .filter((s) => (getPracticeMeta(s, lang)?.tags ?? []).some((t) => SCENARIO_SET.has(t) && currentScenarios.includes(t)))
    .sort(byDateDesc)
    .slice(0, MAX_RELATED);

  const fillCount = MAX_RELATED - same.length;
  if (fillCount <= 0) return same;

  const fill = peers.filter((s) => !same.includes(s)).sort(byDateDesc).slice(0, fillCount);
  return [...same, ...fill];
}

export function generateStaticParams() {
  return getPracticeSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const meta = getPracticeMeta(slug, lang as Language);
  if (!meta) return {};
  return { title: `${meta.title} | ZHANG.LOG` };
}

export default async function PracticeDetailPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const dict = getDictionary(lang as Language);
  const t = (key: keyof Dictionary) => dict[key];
  const meta = getPracticeMeta(slug, lang as Language);
  if (!meta) notFound();

  const MDXContent = (lang === 'en' ? practiceComponentsEn[slug] : practiceComponents[slug]) ?? practiceComponents[slug];
  const relatedSlugs = getRelatedSlugs(slug, lang as Language);
  return (
    <main className="max-w-7xl mx-auto px-5 sm:px-6 pt-20 pb-8 sm:pt-28 lg:pt-44 lg:pb-24">
      <nav className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] text-slate-500 mb-6 sm:mb-8 lg:mb-12">
        <Link href={`/${lang}`} className="hover:text-lobster transition-colors">
          {t('blog.detail.home')}
        </Link>
        <span className="size-1 rounded-full bg-white/20"></span>
        <Link href={`/${lang}/practice`} className="hover:text-lobster transition-colors">
          {t('nav.projects')}
        </Link>
        <span className="size-1 rounded-full bg-lobster"></span>
        <span className="text-slate-300">{t('blog.detail.techArticle')}</span>
      </nav>
      <header className="max-w-4xl mb-8 sm:mb-12 lg:mb-16">
        <div className="flex flex-wrap gap-2 mb-4 sm:mb-6 lg:mb-8">
          {meta.tags.filter((tag) => !SCENARIO_SET.has(tag)).map((tag: string, i: number) => (
            <span key={i} className={`px-3 py-1 rounded-full ${i === 0 ? 'bg-lobster/10 border border-lobster/20 text-lobster' : 'bg-white/5 border border-white/10 text-slate-400'} text-[10px] font-bold tracking-widest`}>
              {getDisplayTag(tag, lang)}
            </span>
          ))}
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white leading-tight mb-4 sm:mb-6 lg:mb-8 tracking-tight">
          {meta.title}
        </h1>
        <div className="flex flex-wrap items-center gap-5 md:gap-8 py-4 sm:py-6 lg:py-8 border-y border-white/10">
          <div className="flex flex-col">
            <span className="text-slate-500 text-[10px] font-bold tracking-[0.2em] mb-1">{t('practice.detail.published')}</span>
            <span className="text-slate-200 font-medium">{meta.date}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-500 text-[10px] font-bold tracking-[0.2em] mb-1">{t('practice.detail.readTime')}</span>
            <span className="text-slate-200 font-medium">{meta.readTime}</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-8 lg:gap-12">
        <div className="lg:col-span-8">
          <div className="rounded-3xl overflow-hidden mb-6 sm:mb-8 lg:mb-12 aspect-[16/9] border border-white/10 shadow-2xl relative group">
            <ZoomableImage src={meta.image} alt={meta.title} sizes="(min-width: 1024px) 66vw, 100vw" className="absolute inset-0" priority />
          </div>


          {MDXContent ? (
            <article data-project-content className="prose prose-invert lg:prose-lg max-w-none text-slate-400">
              <MDXContent components={{ pre: CodeBlock }} />
            </article>
          ) : (
            <article data-project-content className="prose prose-invert lg:prose-lg max-w-none text-slate-400">
              <p className="text-xl text-slate-300 leading-relaxed font-light mb-8 md:mb-12">{meta.slug}</p>
            </article>
          )}

        </div>

        <aside className="lg:col-span-4 space-y-5 md:space-y-8">
          <div className="space-y-5 md:space-y-8 lg:sticky lg:top-36">
            <PracticeTableOfContents title={t('practice.detail.navigation')} />
            <div className="mt-12 pt-10 border-t border-white/10">
              <h3 className="text-white font-bold mb-6">{t('practice.detail.related')}</h3>
              <div className="space-y-4">
                {relatedSlugs.map((relatedSlug) => {
                    const relatedMeta = getPracticeMeta(relatedSlug, lang as Language);
                    if (!relatedMeta) return null;
                    const displayTag = relatedMeta.tags?.find((tag) => !SCENARIO_SET.has(tag));
                    return (
                      <Link
                        key={relatedSlug}
                        href={`/${lang}/practice/${relatedSlug}`}
                        className="edge-lit-card group block rounded-2xl p-4 transition-all"
                      >
                        {displayTag && (
                          <p className="text-[10px] text-lobster font-bold tracking-widest mb-1">
                            {getDisplayTag(displayTag, lang)}
                          </p>
                        )}
                        <h4 className="text-sm font-bold text-slate-200 group-hover:text-lobster transition-colors">
                          {relatedMeta.title}
                        </h4>
                      </Link>
                    );
                  })}
                {relatedSlugs.length === 0 && (
                  <p className="text-xs text-slate-500 italic">{t('practice.detail.noRelated')}</p>
                )}
              </div>
            </div>
          </div>
        </aside>
      </div>
      <BackToTop label={t('nav.backToTop')} />
    </main>
  );
}
