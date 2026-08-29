import { Network, Cloud, Terminal, BarChart3, Globe, Cpu, Sparkles, Gauge, Server, Bot, type LucideIcon } from 'lucide-react';

/* frontmatter 里的 icon 字段值 → lucide 图表（见 content/projects/*.mdx） */
const PROJECT_ICONS: Record<string, LucideIcon> = {
  globe: Globe,
  bot: Bot,
  chart: BarChart3,
  network: Network,
  cloud: Cloud,
  terminal: Terminal,
  cpu: Cpu,
  sparkles: Sparkles,
  gauge: Gauge,
  server: Server,
};

export default function ProjectIcon({ name, className }: { name?: string; className?: string }) {
  const Icon = (name && PROJECT_ICONS[name]) || BarChart3;
  return <Icon className={className} />;
}
