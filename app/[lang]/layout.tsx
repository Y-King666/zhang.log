import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Inter, JetBrains_Mono, Playfair_Display } from 'next/font/google';
import '../globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import { getDictionary } from '@/lib/i18n';
import type { Language } from '@/lib/i18n';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'ZHANG.LOG | 个人主页',
  description: '张的个人主页 - 记录技术、生活与 AI 智能体探索',
};

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
        className={`${inter.variable} ${jetbrainsMono.variable} ${playfair.variable} bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen antialiased selection:bg-lobster/30`}
        suppressHydrationWarning
      >
        <SmoothScroll />
        <Navbar lang={lang} dict={dict} />
        {children}
        <Footer dict={dict} />
      </body>
    </html>
  );
}
