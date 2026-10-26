interface OpenClawSectionHeadingProps {
  index: number;
  label: string;
  title: string;
  subtitle: string;
}

export default function OpenClawSectionHeading({
  index,
  label,
  title,
  subtitle,
}: OpenClawSectionHeadingProps) {
  return (
    <header className="mb-6 md:mb-10">
      <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-lobster">
        {String(index).padStart(2, '0')} / {label}
      </span>
      <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-lobster">{title}</h2>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-400 md:text-base">{subtitle}</p>
    </header>
  );
}
