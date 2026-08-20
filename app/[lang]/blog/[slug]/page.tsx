import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogSlugs, getBlogMeta } from '@/lib/content';
import Link from 'next/link';
import Image from 'next/image';
import { getDictionary } from '@/lib/i18n';
import type { Language, Dictionary } from '@/lib/i18n';

import { blogComponents } from '@/lib/mdx-registry';

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
        <Link href={`/${lang}/blog`} className="hover:text-lobster transition-colors">
          {t('blog.detail.blog')}
        </Link>
        <span className="size-1 rounded-full bg-lobster"></span>
        <span className="text-slate-300">{meta.category}</span>
      </nav>

      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight text-white">
          {meta.title}
        </h1>
        <div className="flex items-center gap-6 p-6 rounded-2xl glass-card bg-white/[0.03] backdrop-blur-md border border-white/10">
          <div className="size-16 rounded-full border-2 border-lobster/30 p-0.5 overflow-hidden relative">
            <Image
              alt={t('blog.detail.authorAlt')}
              fill
              sizes="64px"
              className="object-cover rounded-full"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXP2WgE-eBqiSDnE0pYx5tdhkwJJ5_NYvFynSNG66ERN5ivr547iFYga_Gr6xlNRNEUeTCxLGkzjVl-9Ir1VWlJBoI_Rh-Wu5jM4DWP6hbi0n9U27ZApt7o1Is9EONF9SuZRWrMMrpvMaNHUI0klc30Ua0N8shNn9mvYPklJrMbioWe2A4dMNskGBugREN3LmbjSoUMsOF6393BKYOwjVQ6m6Cy91MbgbaMuZ6NZVM0s9GvdfsYtLNZyGjxsQuOSoYT8i8k_nj82L7"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-lg text-white">{t('blog.detail.author')}</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-lobster/20 text-lobster uppercase">
                {t('blog.detail.role')}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-400">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-base">calendar_today</span> {meta.date}
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-base">schedule</span> {t('blog.detail.readTime')}
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-base">category</span> {meta.category}
              </span>
            </div>
          </div>
        </div>
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
              {tag}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
