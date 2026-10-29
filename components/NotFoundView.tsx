import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Dictionary } from '@/lib/i18n';

export default function NotFoundView({ lang, dict }: { lang: string; dict: Dictionary }) {
  const t = (key: keyof Dictionary) => dict[key];

  return (
    <main className="cocoon-home mx-auto flex min-h-[75svh] w-full max-w-[1120px] items-center px-5 pb-20 pt-28 sm:px-6 sm:pt-36 lg:pt-40">
      <section className="w-full max-w-[850px] border-y border-rule py-12 md:py-20">
        <p className="mb-6 font-mono text-[10px] tracking-[0.14em] text-signal">{t('notFound.eyebrow')}</p>
        <h1 className="max-w-3xl text-[clamp(2.8rem,7vw,6rem)] font-medium leading-[0.95] tracking-[-0.065em] text-paper">
          {t('notFound.title')}
        </h1>
        <p className="mt-6 max-w-xl text-base leading-8 text-fog">{t('notFound.description')}</p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href={`/${lang}`}
            className="inline-flex items-center gap-3 rounded-full bg-paper px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-white"
          >
            {t('notFound.home')}
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href={`/${lang}/practice`}
            className="inline-flex items-center gap-2 rounded-full border border-rule px-5 py-3 text-sm text-paper transition-colors hover:border-fog"
          >
            {t('notFound.practice')}
          </Link>
          <Link
            href={`/${lang}/blogs`}
            className="inline-flex items-center gap-2 px-2 py-3 text-sm text-fog transition-colors hover:text-paper"
          >
            {t('notFound.blog')}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
