import { getProjectSlugs, getProjectMeta } from '@/lib/content';
import { getDictionary } from '@/lib/i18n';
import type { Language } from '@/lib/i18n';
import ProjectsClient from './ProjectsClient';

export default async function ProjectsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang as Language);

  const projects = getProjectSlugs()
    .map((slug) => getProjectMeta(slug))
    .filter((m): m is NonNullable<typeof m> => m !== null);

  return <ProjectsClient dict={dict} lang={lang} projects={projects} />;
}
