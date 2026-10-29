import { ExternalLink } from 'lucide-react';
import type { ReactNode } from 'react';

interface OpenClawSourceLinkProps {
  href: string;
  children: ReactNode;
}

export default function OpenClawSourceLink({ href, children }: OpenClawSourceLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 text-fog transition-colors hover:text-paper"
    >
      <span>{children}</span>
      <ExternalLink className="size-3.5" aria-hidden="true" />
    </a>
  );
}
