import { getDictionary } from '@/lib/i18n';
import type { Language } from '@/lib/i18n';
import AboutClient from './AboutClient';

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang as Language);

  return <AboutClient dict={dict} lang={lang} />;
}
