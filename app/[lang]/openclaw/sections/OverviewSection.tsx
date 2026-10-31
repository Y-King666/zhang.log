import { getOpenClawContent } from '@/lib/i18n';
import ProgressiveImage from '@/components/ProgressiveImage';
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
        <div className="py-2 pr-0 md:py-3 lg:pr-10">
          <p className="text-base leading-8 text-paper/85">{overview.intro}</p>
          <div className="mt-8 rounded-2xl bg-white/[0.025] px-5 py-4 md:mt-10">
            <div className="flex items-center gap-2 text-xs text-signal">
              <span className="material-symbols-outlined !text-base">construction</span>
              {overview.currentTitle}
            </div>
            <p className="mt-2 text-xs leading-6 text-fog">{overview.currentDesc}</p>
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

      <div className="mt-10">
        <div className="pb-4">
          <div>
            <h3 className="font-medium text-paper">{overview.mapTitle}</h3>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenMindmap}
          className="group relative block w-full overflow-hidden bg-surface text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-4 focus-visible:ring-offset-ink"
          aria-label={overview.mapOpen}
        >
          <ProgressiveImage
            src="/images/openclaw_map.png?v=20261031"
            alt={overview.mapAlt}
            width={5712}
            height={2976}
            sizes="(min-width: 1120px) 1120px, 100vw"
            className="block h-auto w-full transition duration-500 ease-out group-hover:scale-[1.01] group-hover:opacity-90"
          />
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20">
            <span className="translate-y-2 rounded-full bg-paper px-4 py-2 text-xs font-medium text-ink opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              {overview.mapOpen}
            </span>
          </span>
        </button>
      </div>

      <p className="mt-3 text-[11px] text-fog md:mt-5">{overview.source}</p>
    </section>
  );
}
