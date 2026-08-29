import { getBlogMeta, getBlogSlugs } from '@/lib/content';
import { getDictionary } from '@/lib/i18n';
import type { Language } from '@/lib/i18n';
import AgentsClient from './AgentsClient';

export default async function AgentsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang as Language);
  const articles = getBlogSlugs()
    .map((slug) => getBlogMeta(slug))
    .filter((article): article is NonNullable<typeof article> => article !== null)
    .sort((a, b) => b.date.localeCompare(a.date));

  return <AgentsClient dict={dict} lang={lang} articles={articles} />;
}
