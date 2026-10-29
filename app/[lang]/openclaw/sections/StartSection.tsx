import { getOpenClawContent } from '@/lib/i18n';
import OpenClawCodeBlock from './OpenClawCodeBlock';
import OpenClawSourceLink from './OpenClawSourceLink';
import OpenClawSectionHeading from './OpenClawSectionHeading';
import OpenClawSpecBoard from './OpenClawSpecBoard';

interface StartSectionProps {
  lang: string;
}

const INSTALL_COMMANDS = {
  unix: 'curl -fsSL https://openclaw.ai/install.sh | bash',
  windows: 'iwr -useb https://openclaw.ai/install.ps1 | iex',
  npm: 'npm install -g openclaw@latest --allow-scripts=openclaw',
};

const CONFIG_COMMANDS = `openclaw onboard --install-daemon
openclaw configure
openclaw config validate`;

const VERIFY_COMMANDS = `openclaw gateway status
openclaw health
openclaw dashboard`;

export default function StartSection({ lang }: StartSectionProps) {
  const content = getOpenClawContent(lang).start;

  return (
    <section id="start" className="scroll-mt-36">
      <OpenClawSectionHeading index={3} label="Quickstart" title={content.title} subtitle={content.subtitle} />

      <OpenClawSpecBoard
        columns={3}
        items={content.requirements.map(([title, description], index) => ({
          id: title,
          index: String(index + 1).padStart(2, '0'),
          title,
          description,
        }))}
      />

      <div className="mt-8 grid min-w-0 gap-5 md:gap-8 xl:grid-cols-[0.78fr_1.22fr]">
        <div className="min-w-0">
          <h3 className="text-lg font-medium text-paper">{content.pathTitle}</h3>
          <p className="mt-2 text-xs leading-6 text-fog">{content.pathDesc}</p>
          <ol className="mt-6 space-y-6">
            {content.steps.map(([key, title, description], index) => (
              <li key={key} className="flex gap-4 py-1">
                <span className="shrink-0 font-mono text-[10px] text-signal">
                  {index + 1}
                </span>
                <div>
                  <p className="text-sm font-medium text-paper">{title}</p>
                  <p className="mt-2 text-xs leading-6 text-fog">{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="min-w-0 space-y-4">
          <OpenClawCodeBlock title="macOS / Linux / WSL2" code={INSTALL_COMMANDS.unix} />
          <OpenClawCodeBlock title="Windows PowerShell" code={INSTALL_COMMANDS.windows} />
          <OpenClawCodeBlock title="npm install" code={INSTALL_COMMANDS.npm} />
          <OpenClawCodeBlock title="Configure / validate" code={CONFIG_COMMANDS} />
          <OpenClawCodeBlock title="Verify" code={VERIFY_COMMANDS} />
        </div>
      </div>

      <div className="mt-8 rounded-xl bg-white/[0.025] p-4">
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-signal">info</span>
          <p className="text-xs leading-6 text-fog">{content.note}</p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-fog md:mt-5">
        <span>{content.source}</span>
        <OpenClawSourceLink href="https://docs.openclaw.ai/start/getting-started">Getting started</OpenClawSourceLink>
        <OpenClawSourceLink href="https://docs.openclaw.ai/channels">Channels</OpenClawSourceLink>
        <OpenClawSourceLink href="https://docs.openclaw.ai/concepts/multi-agent">Multi-agent</OpenClawSourceLink>
      </div>
    </section>
  );
}
