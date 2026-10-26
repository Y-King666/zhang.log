import { getDictionary } from '@/lib/i18n';
import type { Language } from '@/lib/i18n';
import { getPracticeSlugs, getPracticeMeta } from '@/lib/content';
import AboutClient from './AboutClient';

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang as Language);
  // 实践经历：精选优先、其余按日期倒序，取前三条
  const projects = getPracticeSlugs()
    .map((slug) => getPracticeMeta(slug, lang as Language))
    .filter((m): m is NonNullable<typeof m> => m !== null)
    .sort((a, b) => Number(b.featured) - Number(a.featured) || b.date.localeCompare(a.date))
    .slice(0, 3);

  return <AboutClient dict={dict} lang={lang} projects={projects} />;
}
