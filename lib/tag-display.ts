import type { Language } from './i18n';

const TAG_LABELS: Record<Language, Record<string, string>> = {
  cn: {
    'AI & Machine Learning': 'AI 与机器学习',
    'AI Agents': 'AI 智能体',
    'System Architecture': '系统架构',
    'Distributed Systems': '分布式系统',
    'Data Visualization': '数据可视化',
    'Real-time': '实时',
    Fintech: '金融科技',
    'Machine Learning': '机器学习',
    'Distributed System': '分布式系统',
  },
  en: {
    '人工智能': 'AI',
    '机器学习': 'Machine Learning',
    '系统架构': 'System Architecture',
    '分布式系统': 'Distributed Systems',
    '数据可视化': 'Data Visualization',
    实时: 'Real-time',
    金融科技: 'Fintech',
    前端: 'Frontend',
    开源: 'Open Source',
    协议: 'Licenses',
    法律: 'Law',
    趋势: 'Trends',
    社区: 'Community',
    生态: 'Ecosystem',
    可持续性: 'Sustainability',
    运维: 'DevOps',
  },
};

export function getDisplayTag(tag: string, lang: string): string {
  const language: Language = lang === 'en' ? 'en' : 'cn';
  return TAG_LABELS[language][tag] || tag;
}
