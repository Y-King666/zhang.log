'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { Dictionary } from './i18n';

interface I18nContextValue {
  lang: string;
  dict: Dictionary;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ lang, dict, children }: I18nContextValue & { children: ReactNode }) {
  return <I18nContext.Provider value={{ lang, dict }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within I18nProvider');
  return context;
}
