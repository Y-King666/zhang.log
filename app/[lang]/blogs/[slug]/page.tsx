import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBlogSlugs, getBlogMeta } from '@/lib/content';
import type { BlogMeta } from '@/lib/content';
import { getDictionary } from '@/lib/i18n';
import type { Language, Dictionary } from '@/lib/i18n';
import { blogComponents, blogComponentsEn } from '@/lib/mdx-registry';
import ZoomableImage from '@/components/ZoomableImage';
import BackToTop from '@/components/BackToTop';
import { getDisplayTag } from '@/lib/tag-display';

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const meta = getBlogMeta(slug, lang as Language);
  if (!meta) return {};
  return { title: `${meta.title} | ZHANG.LOG` };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const dict = getDictionary(lang as Language);
  const t = (key: keyof Dictionary) => dict[key];
  const meta = getBlogMeta(slug, lang as Language);
  if (!meta) notFound();

  const MDXContent =
    (lang === 'en' ? blogComponentsEn[slug] : blogComponents[slug]) ?? blogComponents[slug];
  const posts = getBlogSlugs()
    .map((postSlug) => getBlogMeta(postSlug, lang as Language))
    .filter((post): post is BlogMeta => post !== null)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <main className="cocoon-home mx-auto w-full max-w-[1120px] px-5 pb-16 pt-28 sm:px-6 sm:pt-36 lg:pb-24 lg:pt-40">
      <nav className="mb-10 flex items-center gap-3 font-mono text-[10px] tracking-[0.12em] text-fog sm:mb-14">
        <Link href={`/${lang}`} className="transition-colors hover:text-paper">
          {t('blog.detail.home')}
        </Link>
        <span className="text-rule">/</span>
        <Link href={`/${lang}/blogs`} className="transition-colors hover:text-paper">
          {t('blog.detail.blog')}
        </Link>
        <span className="text-rule">/</span>
        <span className="text-paper">{t(`blog.category.${meta.category}` as keyof Dictionary)}</span>
      </nav>

      <div className="lg:grid lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-14">
        <aside className="hidden lg:block">
          <section className="sticky top-28 flex max-h-[calc(100dvh-8.5rem)] flex-col border-t border-rule pt-5">
            <span className="text-xs text-fog">{t('blog.detail.archive')}</span>
            <nav
              className="mt-3 min-h-0 flex-1 overflow-y-auto"
              aria-label={t('blog.detail.archive')}
            >
              {posts.map((post) => {
                const current = post.slug === slug;
                return (
                  <Link
                    key={post.slug}
                    href={`/${lang}/blogs/${post.slug}`}
                    aria-current={current ? 'page' : undefined}
                    className={`group block border-b border-rule py-3 ${
                      current ? 'text-paper' : 'text-fog hover:text-paper'
                    }`}
                  >
                    <span className="font-mono text-[9px] text-fog">{post.date}</span>
                    <span className="mt-1 block text-xs leading-5">{post.title}</span>
                  </Link>
                );
              })}
            </nav>
          </section>
        </aside>

        <div className="min-w-0">
          <header className="max-w-4xl border-b border-rule pb-8 sm:pb-10">
            <p className="mb-5 flex flex-wrap gap-x-4 font-mono text-[10px] text-fog">
              <span>{meta.date}</span>
              <span>{t('blog.readTime.format').replace('{n}', meta.readTime || '—')}</span>
            </p>
            <h1 className="text-[clamp(2.7rem,5.5vw,5rem)] font-medium leading-[0.98] tracking-[-0.06em] text-paper">
              {meta.title}
            </h1>
          </header>

          <div className="relative mb-10 aspect-[16/9] sm:mb-14">
            <ZoomableImage
              src={meta.image}
              alt={t('blog.detail.featuredAlt')}
              sizes="(min-width: 1024px) 848px, 100vw"
              className="absolute inset-0"
              priority
              distance={28}
            />
          </div>

          <article className="prose prose-invert max-w-none text-fog lg:prose-lg">
            {MDXContent ? <MDXContent /> : null}
          </article>

          <div className="mt-10 flex flex-wrap gap-x-4 gap-y-2 border-t border-rule pt-5 text-[10px] text-fog md:mt-16">
            {meta.tags.map((tag) => (
              <span key={tag}>{getDisplayTag(tag, lang)}</span>
            ))}
          </div>
        </div>
      </div>
      <BackToTop label={t('nav.backToTop')} />
    </main>
  );
}
