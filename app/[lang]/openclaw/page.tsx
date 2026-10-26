import OpenClawClient from './OpenClawClient';

export default async function OpenClawPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  return <OpenClawClient lang={lang} />;
}
