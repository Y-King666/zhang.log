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

      <div className="space-y-4">
        {content.cases.map(([key, title, goal, result, process, issue, boundary], index) => (
          <article key={key} className="display-card overflow-hidden rounded-2xl">
            <div className="grid gap-5 p-4 sm:p-5 md:grid-cols-[auto_1fr_1fr] md:items-start md:p-6">
              <span className="font-mono text-xs font-black text-lobster">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="text-lg font-black text-white">{title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">{goal}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
                <p className="text-[10px] font-bold tracking-[0.16em] text-slate-500">{content.resultLabel}</p>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">{result}</p>
              </div>
            </div>

            <details className="group border-t border-white/10">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-xs font-bold text-slate-400 transition-colors hover:text-white md:px-6">
                {content.detailsLabel}
                <span className="material-symbols-outlined !text-base transition-transform group-open:rotate-180">keyboard_arrow_down</span>
              </summary>
              <div className="grid gap-4 border-t border-white/5 bg-black/20 p-4 sm:p-5 md:grid-cols-3 md:p-6">
                {[process, issue, boundary].map((description, fieldIndex) => (
                  <div key={content.fields[fieldIndex]}>
                    <p className="text-[10px] font-bold tracking-[0.16em] text-slate-600">{content.fields[fieldIndex]}</p>
                    <p className="mt-2 text-xs leading-relaxed text-slate-400">{description}</p>
                  </div>
                ))}
              </div>
            </details>
          </article>
        ))}
      </div>

      <div className="mt-12 border-t border-white/10 pt-8">
        <div className="grid min-w-0 gap-5 md:gap-8 xl:grid-cols-2 xl:items-start xl:gap-10">
          <div className="min-w-0 xl:col-span-2">
            <h3 className="text-lg font-black text-white">{content.costTitle}</h3>
            <p className="mt-3 text-xs leading-relaxed text-slate-400">{content.costDesc}</p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-slate-600 md:mt-5">
              <span>{content.costSourceLabel}</span>
              <OpenClawSourceLink href="https://docs.openclaw.ai/tools/subagents">Sub-agents</OpenClawSourceLink>
              <OpenClawSourceLink href="https://docs.openclaw.ai/concepts/models">Models</OpenClawSourceLink>
              <OpenClawSourceLink href="https://docs.openclaw.ai/reference/api-usage-costs">API usage and costs</OpenClawSourceLink>
            </div>
          </div>

          <div className="relative min-w-0 border-l border-white/10 pl-6">
            {content.costSteps.map(([key, label, title, description], index) => (
              <div key={key} className="relative pb-6 last:pb-0">
                <span className="absolute -left-[1.9rem] top-0 flex size-6 items-center justify-center rounded-full border border-lobster/35 bg-[#0a0a0a] font-mono text-[9px] font-black text-lobster">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="font-mono text-[10px] tracking-[0.16em] text-slate-600">{label}</p>
                <h4 className="mt-1.5 text-sm font-black text-white">{title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">{description}</p>
              </div>
            ))}
          </div>

          <div className="min-w-0">
            <div className="overflow-hidden rounded-xl border border-white/10">
              <div className="hidden grid-cols-[1.1fr_0.8fr_1.1fr] gap-4 bg-white/[0.03] px-4 py-3 text-[10px] font-bold tracking-[0.15em] text-slate-500 md:grid">
                {content.costRoutingLabels.map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </div>
              {content.costRouting.map(([task, route, output]) => (
                <div key={task} className="grid gap-3 border-t border-white/8 px-4 py-4 text-xs first:border-t-0 md:grid-cols-[1.1fr_0.8fr_1.1fr] md:gap-4">
                  <p className="font-bold text-slate-200">{task}</p>
                  <p className="text-lobster/85">{route}</p>
                  <p className="leading-relaxed text-slate-500">{output}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 border-l-2 border-lobster/60 pl-4 text-xs leading-relaxed text-slate-400">{content.costNote}</p>
          </div>
        </div>
      </div>
      <div className="mt-12 border-t border-white/10 pt-8">
        <h3 className="text-lg font-black text-white">{content.resourcesTitle}</h3>
        <p className="mt-3 max-w-4xl text-xs leading-relaxed text-slate-400">{content.resourcesDesc}</p>
        <div className="mt-5 border-y border-white/10">
          {content.resources.map(([name, url, category, description, bestFor], index) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noreferrer"
              className="group grid min-w-0 gap-3 border-t border-white/8 py-5 first:border-t-0 md:grid-cols-[2.5rem_0.9fr_1.45fr_auto] md:gap-5"
            >
              <span className="font-mono text-[10px] font-black text-lobster/80">{String(index + 1).padStart(2, '0')}</span>
              <div className="min-w-0">
                <p className="font-mono text-[10px] tracking-[0.15em] text-slate-600">{category}</p>
                <h4 className="mt-1.5 break-words text-sm font-black text-white transition-colors group-hover:text-lobster">{name}</h4>
              </div>
              <div className="min-w-0">
                <p className="text-xs leading-relaxed text-slate-400">{description}</p>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-600">{bestFor}</p>
              </div>
              <ArrowUpRight className="size-4 text-slate-600 transition-[color,transform] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lobster" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
