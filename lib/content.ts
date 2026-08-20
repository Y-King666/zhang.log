import contentData from './data/content-data.json';

export interface BlogMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  image: string;
  tags: string[];
}

export interface ProjectMeta {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  role: string;
  image: string;
  tags: string[];
  featured?: boolean;
}

export function getBlogSlugs(): string[] {
  return contentData.blogs.map(b => b.slug);
}

export function getProjectSlugs(): string[] {
  return contentData.projects.map(p => p.slug);
}

export function getBlogMeta(slug: string): BlogMeta | null {
  return contentData.blogs.find(b => b.slug === slug) || null;
}

export function getProjectMeta(slug: string): ProjectMeta | null {
  const raw = contentData.projects.find(p => p.slug === slug);
  if (!raw) return null;
  return {
    ...raw,
    featured: !!raw.featured && (raw.featured === 'true' || raw.featured === 'featured'),
  };
}
