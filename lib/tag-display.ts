import type { Language } from './i18n';

const TAG_LABELS: Record<Language, Record<string, string>> = {
  cn: {},
  en: {
    大数据: 'Big Data',
    数据可视化: 'Data Visualization',
    效率: 'Efficiency',
    自动化: 'Automation',
    代码图谱: 'Code Graph',
    多智能体: 'Multi-agent',
    记忆: 'Memory',
    工作流: 'Workflow',
    技能: 'Skills',
    安全: 'Security',
  },
};

export function getDisplayTag(tag: string, lang: string): string {
  const language: Language = lang === 'en' ? 'en' : 'cn';
  return TAG_LABELS[language][tag] || tag;
}
