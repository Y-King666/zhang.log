import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import AutoHideScrollbar from '@/components/AutoHideScrollbar';
import { I18nProvider } from '@/lib/i18n-context';
import { getDictionary } from '@/lib/i18n';
import type { Language } from '@/lib/i18n';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang === 'en' ? 'en' : 'cn');
  return {
    title: dict['meta.title'],
    description: dict['meta.description'],
  };
}

export function generateStaticParams() {
  return [{ lang: 'cn' }, { lang: 'en' }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (lang !== 'cn' && lang !== 'en') notFound();
  const dict = getDictionary(lang as Language);

  return (
    <html lang={lang === 'en' ? 'en' : 'zh-CN'} className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geist.variable} ${geistMono.variable} bg-ink text-paper font-sans min-h-screen antialiased selection:bg-signal/25`}
        suppressHydrationWarning
      >
        <SmoothScroll />
        <AutoHideScrollbar />
        <I18nProvider lang={lang} dict={dict}>
          <Navbar lang={lang} dict={dict} />
          {children}
          <Footer dict={dict} />
        </I18nProvider>
      </body>
    </html>
  );
}
