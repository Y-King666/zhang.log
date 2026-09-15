import { getPracticeSlugs, getPracticeMeta } from '@/lib/content';
import { getDictionary } from '@/lib/i18n';
import type { Language } from '@/lib/i18n';
import PracticeClient from './PracticeClient';

export default async function PracticePage({ params, searchParams }: { params: Promise<{ lang: string }>; searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const { lang } = await params;
  const { scenario } = await searchParams;
  const dict = getDictionary(lang as Language);

  const projects = getPracticeSlugs()
    .map((slug) => getPracticeMeta(slug))
    .filter((m): m is NonNullable<typeof m> => m !== null);

  return <PracticeClient dict={dict} lang={lang} projects={projects} initialScenario={scenario} />;
}
