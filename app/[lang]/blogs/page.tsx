import { getBlogSlugs, getBlogMeta } from '@/lib/content';
import { getDictionary } from '@/lib/i18n';
import type { Language } from '@/lib/i18n';
import BlogClient from './BlogClient';

export default async function BlogListPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang as Language);

  const articles = getBlogSlugs()
    .map((slug) => getBlogMeta(slug, lang as Language))
    .filter((m): m is NonNullable<typeof m> => m !== null)
    .sort((a, b) => b.date.localeCompare(a.date));

  return <BlogClient dict={dict} lang={lang} articles={articles} />;
}
