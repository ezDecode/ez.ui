export const TOC_ITEMS = [
  { id: 'introduction', label: 'Introduction', level: 1 },
  { id: 'getting-started', label: 'Getting Started', level: 1 },
  { id: 'installation', label: 'Installation', level: 2 },
  { id: 'configuration', label: 'Configuration', level: 2 },
  { id: 'components', label: 'Components', level: 1 },
  { id: 'api-reference', label: 'API Reference', level: 1 },
  { id: 'examples', label: 'Examples', level: 2 },
  { id: 'conclusion', label: 'Conclusion', level: 1 },
] as const

export const DemoHelpers = {
  TOC_ITEMS,
} as const
