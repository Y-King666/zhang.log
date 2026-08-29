import { getBlogSlugs, getBlogMeta, getProjectSlugs, getProjectMeta } from '@/lib/content';
import { getDictionary } from '@/lib/i18n';
import type { Language } from '@/lib/i18n';
import HomeClient from './HomeClient';

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang as Language);

  const projects = getProjectSlugs()
    .map((slug) => getProjectMeta(slug))
    .filter((m): m is NonNullable<typeof m> => m !== null);

  const featured = projects.find((p) => p.featured) || projects[0];

  const blogs = getBlogSlugs()
    .map((slug) => getBlogMeta(slug))
    .filter((m): m is NonNullable<typeof m> => m !== null)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <HomeClient dict={dict} lang={lang} featured={featured} projects={projects} blogs={blogs} />
  );
}
