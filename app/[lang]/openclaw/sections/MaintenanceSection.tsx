import { getOpenClawContent } from '@/lib/i18n';
import OpenClawCodeBlock from './OpenClawCodeBlock';
import OpenClawSourceLink from './OpenClawSourceLink';
import OpenClawSectionHeading from './OpenClawSectionHeading';
import OpenClawSpecBoard from './OpenClawSpecBoard';

interface MaintenanceSectionProps {
  lang: string;
}

const MAINTENANCE_COMMANDS = `openclaw gateway status
openclaw health
openclaw config validate
openclaw doctor
openclaw update --dry-run
openclaw update`;

const MEMORY_COMMANDS = `openclaw memory-pro export --scope global --output memories-backup.json
git status
git add .
git commit -m "Update memory"
git push`;

export default function MaintenanceSection({ lang }: MaintenanceSectionProps) {
  const content = getOpenClawContent(lang).maintenance;

  return (
    <section id="maintenance" className="scroll-mt-36">
      <OpenClawSectionHeading index={6} label="Maintenance" title={content.title} subtitle={content.subtitle} />

      <OpenClawSpecBoard
        layout="stacked"
        columns={4}
        items={content.cadence.map(([title, description], index) => ({
          id: title,
          index: String(index + 1).padStart(2, '0'),
          title,
          description,
          icon: ['today', 'calendar_view_week', 'cleaning_services', 'system_update'][index],
        }))}
      />

      <div className="mt-8 grid gap-5 md:gap-8 xl:grid-cols-[1fr_0.78fr]">
        <div>
          <h3 className="text-lg font-black text-white">{content.incidentsTitle}</h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-500">{content.incidentsDesc}</p>
          <div className="display-card mt-5 overflow-hidden rounded-xl">
            <div className="hidden grid-cols-[0.7fr_0.8fr_1.3fr] gap-4 bg-white/[0.04] px-4 py-3 text-[10px] font-bold tracking-[0.15em] text-slate-500 md:grid">
              {content.tableLabels.map((label) => <span key={label}>{label}</span>)}
            </div>
            {content.incidents.map(([symptom, check, action]) => (
              <div key={symptom} className="grid gap-3 border-t border-white/10 p-4 first:border-t-0 md:grid-cols-[0.7fr_0.8fr_1.3fr] md:gap-4">
                <p className="text-xs font-bold text-white">{symptom}</p>
                <p className="font-mono text-[11px] leading-relaxed text-lobster">{check}</p>
                <p className="text-xs leading-relaxed text-slate-400">{action}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-0 space-y-5">
          <div>
            <h3 className="mb-3 text-lg font-black text-white">{content.commandsTitle}</h3>
            <OpenClawCodeBlock title={content.commandsLabel} code={MAINTENANCE_COMMANDS} />
          </div>
          <div>
            <h3 className="mb-3 text-lg font-black text-white">{content.memoryTitle}</h3>
            <OpenClawCodeBlock title={content.memoryLabel} code={MEMORY_COMMANDS} />
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.05] p-4">
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-emerald-300">shield</span>
          <p className="text-xs leading-relaxed text-emerald-100/65">{content.security}</p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-slate-600 md:mt-5">
        <span>{content.source}</span>
        <OpenClawSourceLink href="https://docs.openclaw.ai/install/updating">Updating</OpenClawSourceLink>
        <OpenClawSourceLink href="https://docs.openclaw.ai/concepts/memory">Memory</OpenClawSourceLink>
        <OpenClawSourceLink href="https://docs.openclaw.ai/gateway/security">Security</OpenClawSourceLink>
      </div>
    </section>
  );
}
