'use client';

import { useI18n } from '@/lib/i18n-context';
import NotFoundView from '@/components/NotFoundView';

export default function NotFound() {
  const { dict, lang } = useI18n();
  return <NotFoundView lang={lang} dict={dict} />;
}
