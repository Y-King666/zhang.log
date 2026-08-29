import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogSlugs, getBlogMeta } from '@/lib/content';
import Link from 'next/link';
import Image from 'next/image';
import { getDictionary } from '@/lib/i18n';
import type { Language, Dictionary } from '@/lib/i18n';

import { blogComponents } from '@/lib/mdx-registry';
import { getDisplayTag } from '@/lib/tag-display';

export function generateStaticParams() {
  return getBlogSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const meta = getBlogMeta(slug);
  if (!meta) return {};
  return { title: `${meta.title} | ZHANG.LOG` };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const dict = getDictionary(lang as Language);
  const t = (key: keyof Dictionary) => dict[key];
  const meta = getBlogMeta(slug);
  if (!meta) notFound();

  const MDXContent = blogComponents[slug];

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 pt-40">
      <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-12">
        <Link href={`/${lang}`} className="hover:text-lobster transition-colors">
          {t('blog.detail.home')}
        </Link>
        <span className="size-1 rounded-full bg-white/20"></span>
        <Link href={`/${lang}/blogs`} className="hover:text-lobster transition-colors">
          {t('blog.detail.blog')}
        </Link>
        <span className="size-1 rounded-full bg-lobster"></span>
        <span className="text-slate-300">{meta.category}</span>
      </nav>

      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight text-white">
          {meta.title}
        </h1>
      </div>

      <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-12 border border-white/10">
        <Image
          alt={t('blog.detail.featuredAlt')}
          fill
          sizes="(min-width: 1024px) 896px, 100vw"
          className="object-cover"
          src={meta.image}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent"></div>
      </div>

      <article className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed">
        {MDXContent ? <MDXContent /> : null}
      </article>

      <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-6">
        <div className="flex gap-2">
          {meta.tags.map((tag: string) => (
            <span key={tag} className="px-4 py-1.5 rounded-full bg-white/5 text-sm text-slate-400 border border-white/5">
              {getDisplayTag(tag, lang)}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
