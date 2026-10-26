import { getOpenClawContent } from '@/lib/i18n';
import OpenClawSectionHeading from './OpenClawSectionHeading';
import OpenClawSpecBoard from './OpenClawSpecBoard';

interface OverviewSectionProps {
  lang: string;
  onOpenMindmap: () => void;
}

export default function OverviewSection({ lang, onOpenMindmap }: OverviewSectionProps) {
  const overview = getOpenClawContent(lang).overview;

  return (
    <section id="overview" className="scroll-mt-36">
      <OpenClawSectionHeading index={1} label="Overview" title={overview.title} subtitle={overview.subtitle} />

      <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
        <div className="display-card rounded-2xl p-4 md:p-7">
          <p className="text-base leading-relaxed text-slate-300">{overview.intro}</p>
          <div className="mt-4 rounded-xl border border-lobster/20 md:mt-6 bg-lobster/[0.06] p-4">
            <div className="flex items-center gap-2 text-xs font-black tracking-[0.18em] text-lobster">
              <span className="material-symbols-outlined !text-base">construction</span>
              {overview.currentTitle}
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-400">{overview.currentDesc}</p>
          </div>
        </div>

        <OpenClawSpecBoard
          columns={1}
          items={overview.status.map(([title, value, icon], index) => ({
            id: String(index),
            label: title,
            title: value,
            icon,
          }))}
        />
      </div>

      <div className="glass-glow mt-6 rounded-2xl p-2 md:p-3">
        <div className="px-3 pb-4 pt-2">
          <div>
            <h3 className="font-bold text-white">{overview.mapTitle}</h3>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenMindmap}
          className="group relative block w-full overflow-hidden rounded-xl border border-white/10 bg-[#121212] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lobster focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0a]"
          aria-label={overview.mapOpen}
        >
          <img
            src="/images/openclaw_map.png"
            alt={overview.mapAlt}
            className="block h-auto w-full transition duration-500 ease-out group-hover:scale-[1.01] group-hover:opacity-90"
          />
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20">
            <span className="translate-y-2 rounded-full border border-white/20 bg-black/65 px-4 py-2 text-xs font-bold text-white opacity-0 backdrop-blur-md transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              {overview.mapOpen}
            </span>
          </span>
        </button>
      </div>

      <p className="mt-3 text-[11px] text-slate-600 md:mt-5">{overview.source}</p>
    </section>
  );
}
