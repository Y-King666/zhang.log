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
    <div className="border-t border-rule">
      <div className={`grid ${gridClass}`}>
        {items.map((item) => (
          <div
            key={item.id}
            className="min-w-0 p-4 sm:p-5 md:p-6"
          >
            {layout === 'stacked' ? (
              <div className="flex flex-col md:min-h-[11rem]">
                <div className="flex items-center gap-4">
                  {item.icon && (
                    <span className="shrink-0 text-signal">
                      <span className="material-symbols-outlined !text-xl">{item.icon}</span>
                    </span>
                  )}
                  {item.index && (
                    <span className="font-mono text-[11px] tracking-[0.14em] text-signal">
                      {item.index}
                    </span>
                  )}
                </div>
                <div className="mt-4 min-w-0 md:mt-5">
                  <h3 className="text-base font-medium leading-snug text-paper">{item.title}</h3>
                  {item.description && (
                    <p className="mt-2 text-xs leading-6 text-fog">{item.description}</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-4">
                {item.icon && (
                  <span className="shrink-0 text-signal">
                    <span className="material-symbols-outlined !text-xl">{item.icon}</span>
                  </span>
                )}
                {item.index && (
                  <span className="pt-0.5 font-mono text-[11px] tracking-[0.14em] text-signal">
                    {item.index}
                  </span>
                )}
                <div className="min-w-0">
                  {item.label && (
                    <p className="text-[10px] text-fog">{item.label}</p>
                  )}
                  <h3 className={`${item.label ? 'mt-1.5' : 'mt-0.5'} text-base font-medium leading-snug text-paper`}>
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="mt-2 text-xs leading-6 text-fog">{item.description}</p>
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
