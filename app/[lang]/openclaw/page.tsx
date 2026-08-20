import { getDictionary } from '@/lib/i18n';
import type { Language } from '@/lib/i18n';
import OpenClawClient from './OpenClawClient';

export default async function OpenClawPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang as Language);

  return <OpenClawClient dict={dict} lang={lang} />;
}
