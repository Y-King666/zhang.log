interface OpenClawSpecItem {
  id: string;
  label?: string;
  title: string;
  description?: string;
  icon?: string;
  index?: string;
}

interface OpenClawSpecBoardProps {
  items: readonly OpenClawSpecItem[];
  columns?: 1 | 3 | 4;
  layout?: 'inline' | 'stacked';
}

const GRID_CLASS: Record<1 | 3 | 4, string> = {
  1: 'grid-cols-1',
  3: 'grid-cols-1 md:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
};

export default function OpenClawSpecBoard({ items, columns = 3, layout = 'inline' }: OpenClawSpecBoardProps) {
  const gridClass = GRID_CLASS[columns];

  return (
    <div className="display-card overflow-hidden rounded-xl">
      <div className={`grid ${gridClass}`}>
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`min-w-0 p-4 sm:p-5 md:p-6 ${
              index > 0
                ? columns === 1
                  ? 'border-t border-white/8'
                  : 'border-t border-white/8 md:border-l md:border-t-0'
                : ''
            }`}
          >
            {layout === 'stacked' ? (
              <div className="flex flex-col md:min-h-[11rem]">
                <div className="flex items-center gap-4">
                  {item.icon && (
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] border border-white/10 bg-white/[0.025] text-lobster">
                      <span className="material-symbols-outlined !text-xl">{item.icon}</span>
                    </span>
                  )}
                  {item.index && (
                    <span className="font-mono text-[11px] font-black tracking-[0.16em] text-lobster">
                      {item.index}
                    </span>
                  )}
                </div>
                <div className="mt-4 min-w-0 md:mt-5">
                  <h3 className="text-base font-black leading-snug text-white">{item.title}</h3>
                  {item.description && (
                    <p className="mt-2 text-xs leading-relaxed text-slate-400">{item.description}</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-4">
                {item.icon && (
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] border border-white/10 bg-white/[0.025] text-lobster">
                    <span className="material-symbols-outlined !text-xl">{item.icon}</span>
                  </span>
                )}
                {item.index && (
                  <span className="pt-0.5 font-mono text-[11px] font-black tracking-[0.16em] text-lobster">
                    {item.index}
                  </span>
                )}
                <div className="min-w-0">
                  {item.label && (
                    <p className="text-[10px] font-bold tracking-[0.16em] text-slate-500">{item.label}</p>
                  )}
                  <h3 className={`${item.label ? 'mt-1.5' : 'mt-0.5'} text-base font-black leading-snug text-white`}>
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="mt-2 text-xs leading-relaxed text-slate-400">{item.description}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
