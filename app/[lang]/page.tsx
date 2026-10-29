import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { getBlogSlugs, getBlogMeta, getPracticeSlugs, getPracticeMeta } from '@/lib/content';
import { FEATURED_MCPS, FEATURED_SKILLS } from '@/lib/agent-content';
import { getDictionary } from '@/lib/i18n';
import type { Language } from '@/lib/i18n';
import HomeClient from './HomeClient';

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang as Language);

  const projects = getPracticeSlugs()
    .map((slug) => getPracticeMeta(slug, lang as Language))
    .filter((m): m is NonNullable<typeof m> => m !== null);

  const featured = projects.find((p) => p.featured) || projects[0];
  const promptFile = lang === 'en' ? 'global-agents.en.md' : 'global-agents.md';
  const globalPrompt = readFileSync(join(process.cwd(), 'content', 'agents', promptFile), 'utf8');

  const blogs = getBlogSlugs()
    .map((slug) => getBlogMeta(slug, lang as Language))
    .filter((m): m is NonNullable<typeof m> => m !== null)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <HomeClient dict={dict} lang={lang} featured={featured} projects={projects} blogs={blogs} globalPrompt={globalPrompt} featuredSkills={FEATURED_SKILLS} featuredMcps={FEATURED_MCPS} />
  );
}
