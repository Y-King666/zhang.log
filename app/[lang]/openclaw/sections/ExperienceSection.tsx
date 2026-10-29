import { ArrowUpRight } from 'lucide-react';
import { getOpenClawContent } from '@/lib/i18n';
import OpenClawSourceLink from './OpenClawSourceLink';
import OpenClawSectionHeading from './OpenClawSectionHeading';

interface ExperienceSectionProps {
  lang: string;
}

export default function ExperienceSection({ lang }: ExperienceSectionProps) {
  const content = getOpenClawContent(lang).experience;

  return (
    <section id="experience" className="scroll-mt-36">
      <OpenClawSectionHeading index={5} label="Experience" title={content.title} subtitle={content.subtitle} />

      <div className="space-y-10">
        {content.cases.map(([key, title, goal, result, process, issue, boundary], index) => (
          <article key={key}>
            <div className="grid gap-5 py-6 md:grid-cols-[auto_1fr_1fr] md:items-start md:py-8">
              <span className="font-mono text-xs text-signal">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="text-lg font-medium text-paper">{title}</h3>
                <p className="mt-2 text-xs leading-6 text-fog">{goal}</p>
              </div>
              <div>
                <p className="text-[10px] text-fog">{content.resultLabel}</p>
                <p className="mt-2 text-xs leading-6 text-paper/80">{result}</p>
              </div>
            </div>

            <details className="group border-t border-rule">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-xs text-fog transition-colors hover:text-paper">
                {content.detailsLabel}
                <span className="material-symbols-outlined !text-base transition-transform group-open:rotate-180">keyboard_arrow_down</span>
              </summary>
              <div className="grid gap-4 border-t border-rule py-5 md:grid-cols-3">
                {[process, issue, boundary].map((description, fieldIndex) => (
                  <div key={content.fields[fieldIndex]}>
                    <p className="text-[10px] text-fog">{content.fields[fieldIndex]}</p>
                    <p className="mt-2 text-xs leading-6 text-fog">{description}</p>
                  </div>
                ))}
              </div>
            </details>
          </article>
        ))}
      </div>

      <div className="mt-16">
        <div className="grid min-w-0 gap-5 md:gap-8 xl:grid-cols-2 xl:items-start xl:gap-10">
          <div className="min-w-0 xl:col-span-2">
            <h3 className="text-lg font-medium text-paper">{content.costTitle}</h3>
            <p className="mt-3 text-xs leading-6 text-fog">{content.costDesc}</p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-fog md:mt-5">
              <span>{content.costSourceLabel}</span>
              <OpenClawSourceLink href="https://docs.openclaw.ai/tools/subagents">Sub-agents</OpenClawSourceLink>
              <OpenClawSourceLink href="https://docs.openclaw.ai/concepts/models">Models</OpenClawSourceLink>
              <OpenClawSourceLink href="https://docs.openclaw.ai/reference/api-usage-costs">API usage and costs</OpenClawSourceLink>
            </div>
          </div>

          <div className="relative min-w-0 pl-6">
            {content.costSteps.map(([key, label, title, description], index) => (
              <div key={key} className="relative pb-6 last:pb-0">
                <span className="absolute -left-[1.78rem] top-0 flex size-5 items-center justify-center bg-ink font-mono text-[9px] text-signal">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="font-mono text-[10px] text-fog">{label}</p>
                <h4 className="mt-1.5 text-sm font-medium text-paper">{title}</h4>
                <p className="mt-2 text-xs leading-6 text-fog">{description}</p>
              </div>
            ))}
          </div>

          <div className="min-w-0">
            <div className="overflow-hidden border-y border-rule">
              <div className="hidden grid-cols-[1.1fr_0.8fr_1.1fr] gap-4 px-4 py-3 text-[10px] text-fog md:grid">
                {content.costRoutingLabels.map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </div>
              {content.costRouting.map(([task, route, output]) => (
                <div key={task} className="grid gap-3 border-t border-rule px-4 py-4 text-xs first:border-t-0 md:grid-cols-[1.1fr_0.8fr_1.1fr] md:gap-4">
                  <p className="font-medium text-paper">{task}</p>
                  <p className="text-signal">{route}</p>
                  <p className="leading-6 text-fog">{output}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 rounded-xl bg-white/[0.025] p-4 text-xs leading-6 text-fog">{content.costNote}</p>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <h3 className="text-lg font-medium text-paper">{content.resourcesTitle}</h3>
        <p className="mt-3 max-w-4xl text-xs leading-6 text-fog">{content.resourcesDesc}</p>
        <div className="mt-5 space-y-6">
          {content.resources.map(([name, url, category, description, bestFor], index) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noreferrer"
              className="group grid min-w-0 gap-3 py-1 md:grid-cols-[2.5rem_0.9fr_1.45fr_auto] md:gap-5"
            >
              <span className="font-mono text-[10px] text-signal/80">{String(index + 1).padStart(2, '0')}</span>
              <div className="min-w-0">
                <p className="font-mono text-[10px] text-fog">{category}</p>
                <h4 className="mt-1.5 break-words text-sm font-medium text-paper transition-colors group-hover:text-signal">{name}</h4>
              </div>
              <div className="min-w-0">
                <p className="text-xs leading-6 text-fog">{description}</p>
                <p className="mt-2 text-[11px] leading-5 text-fog">{bestFor}</p>
              </div>
              <ArrowUpRight className="size-4 text-fog transition-[color,transform] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-paper" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}