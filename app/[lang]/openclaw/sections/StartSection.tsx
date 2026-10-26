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
          <h3 className="text-lg font-black text-white">{content.pathTitle}</h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-500">{content.pathDesc}</p>
          <ol className="display-card mt-6 overflow-hidden rounded-xl">
            {content.steps.map(([key, title, description], index) => (
              <li key={key} className={`flex gap-4 p-4 md:p-5 ${index > 0 ? 'border-t border-white/8' : ''}`}>
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-lobster/12 font-mono text-[10px] font-bold text-lobster">
                  {index + 1}
                </span>
                <div>
                  <p className="text-sm font-bold text-white">{title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">{description}</p>
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

      <div className="mt-6 rounded-2xl border border-lobster/20 bg-lobster/[0.055] p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-lobster">info</span>
          <p className="text-xs leading-relaxed text-slate-400">{content.note}</p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-slate-600 md:mt-5">
        <span>{content.source}</span>
        <OpenClawSourceLink href="https://docs.openclaw.ai/start/getting-started">Getting started</OpenClawSourceLink>
        <OpenClawSourceLink href="https://docs.openclaw.ai/channels">Channels</OpenClawSourceLink>
        <OpenClawSourceLink href="https://docs.openclaw.ai/concepts/multi-agent">Multi-agent</OpenClawSourceLink>
      </div>
    </section>
  );
}
