import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getPracticeSlugs, getPracticeMeta } from '@/lib/content';
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

function getRelatedSlugs(currentSlug: string, lang: Language): string[] {
  const currentScenarios = (getPracticeMeta(currentSlug, lang)?.tags ?? []).filter((tag) => SCENARIO_SET.has(tag));
  const byDateDesc = (a: string, b: string) =>
    (getPracticeMeta(b, lang)?.date ?? '').localeCompare(getPracticeMeta(a, lang)?.date ?? '');
  const peers = getPracticeSlugs().filter((slug) => slug !== currentSlug);

  const same = peers
    .filter((slug) =>
      (getPracticeMeta(slug, lang)?.tags ?? []).some(
        (tag) => SCENARIO_SET.has(tag) && currentScenarios.includes(tag),
      ),
    )
    .sort(byDateDesc)
    .slice(0, MAX_RELATED);

  const fillCount = MAX_RELATED - same.length;
  if (fillCount <= 0) return same;

  const fill = peers.filter((slug) => !same.includes(slug)).sort(byDateDesc).slice(0, fillCount);
  return [...same, ...fill];
}

export function generateStaticParams() {
  return getPracticeSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const meta = getPracticeMeta(slug, lang as Language);
  if (!meta) return {};
  return { title: `${meta.title} | ZHANG.LOG` };
}

export default async function PracticeDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const dict = getDictionary(lang as Language);
  const t = (key: keyof Dictionary) => dict[key];
  const meta = getPracticeMeta(slug, lang as Language);
  if (!meta) notFound();

  const MDXContent =
    (lang === 'en' ? practiceComponentsEn[slug] : practiceComponents[slug]) ?? practiceComponents[slug];
  const relatedSlugs = getRelatedSlugs(slug, lang as Language);

  return (
    <main className="cocoon-home mx-auto w-full max-w-[1120px] px-5 pb-16 pt-28 sm:px-6 sm:pt-36 lg:pb-24 lg:pt-40">
      <nav className="mb-10 flex items-center gap-3 font-mono text-[10px] tracking-[0.12em] text-fog sm:mb-14">
        <Link href={`/${lang}`} className="transition-colors hover:text-paper">
          {t('blog.detail.home')}
        </Link>
        <span className="text-rule">/</span>
        <Link href={`/${lang}/practice`} className="transition-colors hover:text-paper">
          {t('nav.projects')}
        </Link>
        <span className="text-rule">/</span>
        <span className="text-paper">{t('blog.detail.techArticle')}</span>
      </nav>

      <header className="max-w-[850px] border-b border-rule pb-10 sm:pb-14">
        <div className="mb-5 flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-fog">
          {meta.tags
            .filter((tag) => !SCENARIO_SET.has(tag))
            .map((tag, index) => (
              <span key={tag} className={index === 0 ? 'text-signal' : undefined}>
                {getDisplayTag(tag, lang)}
              </span>
            ))}
        </div>
        <h1 className="text-[clamp(2.7rem,6vw,5.4rem)] font-medium leading-[0.98] tracking-[-0.06em] text-paper">
          {meta.title}
        </h1>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[10px] text-fog">
          <span>
            {t('practice.detail.published')} {meta.date}
          </span>
          <span>
            {t('practice.detail.readTime')} {meta.readTime}
          </span>
        </div>
      </header>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="min-w-0 lg:col-span-8">
          <div className="relative mb-10 aspect-[16/9] sm:mb-14">
            <ZoomableImage
              src={meta.image}
              alt={meta.title}
              sizes="(min-width: 1024px) 66vw, 100vw"
              blurDataURL={meta.imageBlur}
              className="absolute inset-0"
              priority
              distance={28}
              fit="contain"
            />
          </div>

          {MDXContent ? (
            <article
              data-project-content
              className="prose prose-invert max-w-none text-fog lg:prose-lg"
            >
              <MDXContent components={{ pre: CodeBlock }} />
            </article>
          ) : (
            <article data-project-content className="prose prose-invert max-w-none text-fog lg:prose-lg">
              <p className="text-xl font-light leading-relaxed text-paper">{meta.slug}</p>
            </article>
          )}
        </div>

        <aside className="lg:col-span-4">
          <div className="space-y-10 lg:sticky lg:top-28">
            <PracticeTableOfContents title={t('practice.detail.navigation')} />

            <section className="border-t border-rule pt-5">
              <h3 className="text-xs text-fog">{t('practice.detail.related')}</h3>
              <div className="mt-3">
                {relatedSlugs.map((relatedSlug) => {
                  const relatedMeta = getPracticeMeta(relatedSlug, lang as Language);
                  if (!relatedMeta) return null;
                  const displayTag = relatedMeta.tags?.find((tag) => !SCENARIO_SET.has(tag));
                  return (
                    <Link
                      key={relatedSlug}
                      href={`/${lang}/practice/${relatedSlug}`}
                      prefetch={false}
                      className="group flex items-start justify-between gap-4 border-b border-rule py-4"
                    >
                      <span>
                        {displayTag && (
                          <span className="mb-1.5 block text-[10px] text-fog">
                            {getDisplayTag(displayTag, lang)}
                          </span>
                        )}
                        <span className="block text-sm leading-6 text-paper transition-colors group-hover:text-signal">
                          {relatedMeta.title}
                        </span>
                      </span>
                      <ArrowUpRight className="mt-1 size-4 shrink-0 text-fog transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  );
                })}
                {relatedSlugs.length === 0 && (
                  <p className="py-4 text-xs text-fog">{t('practice.detail.noRelated')}</p>
                )}
              </div>
            </section>
          </div>
        </aside>
      </div>
      <BackToTop label={t('nav.backToTop')} />
    </main>
  );
}
