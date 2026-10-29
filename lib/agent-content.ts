export interface FeaturedSkill {
  name: string;
  category: 'featured';
  descriptionKey: string;
  structureKey: string;
}

export interface FeaturedMcp {
  name: string;
  descriptionKey: string;
  useKey: string;
  url: string;
}

export const FEATURED_SKILLS: FeaturedSkill[] = [
  { name: 'frontend-design', category: 'featured', descriptionKey: 'frontendDesign', structureKey: 'frontendDesign' },
  { name: 'skill-creator', category: 'featured', descriptionKey: 'skillCreator', structureKey: 'skillCreator' },
  { name: 'imagegen', category: 'featured', descriptionKey: 'imagegen', structureKey: 'imagegen' },
  { name: 'docx / pdf / xlsx / pptx', category: 'featured', descriptionKey: 'artifacts', structureKey: 'artifacts' },
];

export const FEATURED_MCPS: FeaturedMcp[] = [
  {
    name: 'Playwright MCP',
    descriptionKey: 'playwright',
    useKey: 'playwright',
    url: 'https://github.com/microsoft/playwright-mcp',
  },
  {
    name: 'GitNexus MCP',
    descriptionKey: 'gitnexus',
    useKey: 'gitnexus',
    url: 'https://github.com/abhigyanpatwari/GitNexus',
  },
];
