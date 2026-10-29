import { redirect } from 'next/navigation';

export default async function AgentsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  redirect(`/${lang}#agent-experience`);
}
