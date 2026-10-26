import { getOpenClawContent } from '@/lib/i18n';
import OpenClawSourceLink from './OpenClawSourceLink';
import OpenClawSectionHeading from './OpenClawSectionHeading';

interface StructureSectionProps {
  lang: string;
}

const CARD_ICONS: Record<string, string> = {
  gateway: 'router',
  agent: 'groups',
  workspace: 'folder_managed',
  channel: 'forum',
  models: 'neurology',
  memory: 'database',
  tools: 'extension',
  security: 'verified_user',
};

export default function StructureSection({ lang }: StructureSectionProps) {
  const content = getOpenClawContent(lang).structure;

  return (
    <section id="structure" className="scroll-mt-36">
      <OpenClawSectionHeading index={2} label="Structure" title={content.title} subtitle={content.subtitle} />

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {content.cards.map(([key, title, description]) => (
          <article key={key} className="display-card rounded-2xl p-4 sm:p-5">
            <div className="flex items-start justify-between gap-4">
              <span className="material-symbols-outlined text-lobster">{CARD_ICONS[key]}</span>
              <span className="font-mono text-[10px] text-slate-600">{key}</span>
            </div>
            <h3 className="mt-3 text-base font-black text-white md:mt-5">{title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-400">{description}</p>
          </article>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-slate-600 md:mt-5">
        <span>{content.source}</span>
        <OpenClawSourceLink href="https://docs.openclaw.ai/concepts/multi-agent">Multi-agent</OpenClawSourceLink>
        <OpenClawSourceLink href="https://docs.openclaw.ai/channels">Channels</OpenClawSourceLink>
        <OpenClawSourceLink href="https://docs.openclaw.ai/gateway/configuration">Configuration</OpenClawSourceLink>
      </div>
    </section>
  );
}
