import OpenClawClient from './OpenClawClient';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const WORKSPACE_FILES = [
  'IDENTITY.md',
  'SOUL.md',
  'AGENTS.md',
  'USER.md',
  'MEMORY.md',
  'TOOLS.md',
] as const;

export default async function OpenClawPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const workspaceFileContents = Object.fromEntries(
    WORKSPACE_FILES.map((file) => [
      file,
      readFileSync(join(process.cwd(), 'content', 'openclaw', 'workspace', file), 'utf8'),
    ]),
  );

  return <OpenClawClient lang={lang} workspaceFileContents={workspaceFileContents} />;
}
