import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { getPracticeMeta, getPracticeSlugs } from '@/lib/content';
import { getDictionary } from '@/lib/i18n';
import type { Language } from '@/lib/i18n';
import AgentsClient from './AgentsClient';

export interface FeaturedSkill {
  name: string;
  category: 'featured';
  descriptionKey: string;
  structureKey: string;
}

export interface FeaturedMcp {
  name: string;
  descriptionKey: string;
  useKey: string;
  url: string;
}

const repoRoot = process.cwd();

export const FEATURED_SKILLS: FeaturedSkill[] = [
  { name: 'frontend-design', category: 'featured', descriptionKey: 'frontendDesign', structureKey: 'frontendDesign' },
  { name: 'skill-creator', category: 'featured', descriptionKey: 'skillCreator', structureKey: 'skillCreator' },
  { name: 'imagegen', category: 'featured', descriptionKey: 'imagegen', structureKey: 'imagegen' },
  { name: 'docx / pdf / xlsx / pptx', category: 'featured', descriptionKey: 'artifacts', structureKey: 'artifacts' },
];

export const FEATURED_MCPS: FeaturedMcp[] = [
  {
    name: 'Playwright MCP',
    descriptionKey: 'playwright',
    useKey: 'playwright',
    url: 'https://github.com/microsoft/playwright-mcp',
  },
  {
    name: 'GitNexus MCP',
    descriptionKey: 'gitnexus',
    useKey: 'gitnexus',
    url: 'https://github.com/abhigyanpatwari/GitNexus',
  },
];

export default async function AgentsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang as Language);
  const projects = getPracticeSlugs()
    .map((slug) => getPracticeMeta(slug, lang as Language))
    .filter((project): project is NonNullable<typeof project> => project !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
  const promptFile = lang === 'en' ? 'global-agents.en.md' : 'global-agents.md';
  const globalPrompt = readFileSync(join(repoRoot, 'content', 'agents', promptFile), 'utf8');

  return <AgentsClient dict={dict} lang={lang} projects={projects} globalPrompt={globalPrompt} featuredSkills={FEATURED_SKILLS} featuredMcps={FEATURED_MCPS} />;
}
