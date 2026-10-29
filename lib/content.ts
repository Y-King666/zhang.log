import { statSync } from 'node:fs';
import { join } from 'node:path';
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
  imageBlur?: string;
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
  imageBlur?: string;
  tags: string[];
  featured?: string | boolean;
  icon?: string;
  scenario?: string;
  scenarioEn?: string;
}

export type BlogMeta = BlogRecord;

export interface PracticeMeta extends Omit<PracticeRecord, 'featured'> {
  featured: boolean;
}

const blogs = contentData.blogs as BlogRecord[];
const practiceProjects = contentData.projects as PracticeRecord[];

// 给封面 URL 追加文件指纹：同名图片被替换后 URL 随之变化，浏览器与图片优化缓存都不会再命中旧图。
function versionedAsset(path: string): string {
  if (!path.startsWith('/')) return path;
  try {
    const { mtimeMs, size } = statSync(join(process.cwd(), 'public', path));
    return `${path}?v=${Math.floor(mtimeMs).toString(36)}${size.toString(36)}`;
  } catch {
    return path;
  }
}

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
    image: versionedAsset(raw.image),
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
    image: versionedAsset(raw.image),
    featured: !!raw.featured && (raw.featured === 'true' || raw.featured === 'featured'),
  };
}
