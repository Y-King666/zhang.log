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
    <header className="mb-8 md:mb-12">
      <span className="font-mono text-[10px] tracking-[0.14em] text-fog">
        {String(index).padStart(2, '0')} / {label}
      </span>
      <h2 className="mt-4 text-[clamp(2rem,4vw,3.4rem)] font-medium tracking-[-0.05em] text-paper">{title}</h2>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-fog md:text-base">{subtitle}</p>
    </header>
  );
}
