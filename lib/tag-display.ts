import type { Language } from './i18n';

const TAG_LABELS: Record<Language, Record<string, string>> = {
  cn: {},
  en: {
    效率: 'Efficiency',
  },
};

export function getDisplayTag(tag: string, lang: string): string {
  const language: Language = lang === 'en' ? 'en' : 'cn';
  return TAG_LABELS[language][tag] || tag;
}
