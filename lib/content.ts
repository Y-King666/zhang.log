import contentData from './data/content-data.json';
import type { Language } from './i18n';

interface BlogRecord {
  slug: string;
  title: string;
  titleEn?: string;
  date: string;
  readTime?: string;
  category: string;
  image: string;
  tags: string[];
}

interface PracticeRecord {
  slug: string;
  title: string;
  titleEn?: string;
  date: string;
  readTime: string;
  readTimeEn?: string;
  image: string;
  tags: string[];
  featured?: string | boolean;
  icon?: string;
  scenario?: string;
  scenarioEn?: string;
}

export interface BlogMeta extends Omit<BlogRecord, 'featured'> {}

export interface PracticeMeta extends Omit<PracticeRecord, 'featured'> {
  featured: boolean;
}

const blogs = contentData.blogs as BlogRecord[];
const practiceProjects = contentData.projects as PracticeRecord[];

export function getBlogSlugs(): string[] {
  return blogs.map(b => b.slug);
}

export function getPracticeSlugs(): string[] {
  return practiceProjects.map(p => p.slug);
}

export function getBlogMeta(slug: string, lang: Language): BlogMeta | null {
  const raw = blogs.find(b => b.slug === slug);
  if (!raw) return null;
  return {
    ...raw,
    title: lang === 'en' ? raw.titleEn || raw.title : raw.title,
  };
}

export function getPracticeMeta(slug: string, lang: Language): PracticeMeta | null {
  const raw = practiceProjects.find(p => p.slug === slug);
  if (!raw) return null;
  return {
    ...raw,
    title: lang === 'en' ? raw.titleEn || raw.title : raw.title,
    readTime: lang === 'en' ? raw.readTimeEn || raw.readTime : raw.readTime,
    scenario: lang === 'en' ? raw.scenarioEn || raw.scenario : raw.scenario,
    featured: !!raw.featured && (raw.featured === 'true' || raw.featured === 'featured'),
  };
}
