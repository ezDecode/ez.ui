export const COMPONENTS = {
  'stamp-collection': {
    name: 'StampCollection',
    description: 'Interactive stamp deck with hover physics',
    dependencies: ['motion', 'next', 'react'],
    files: ['components/ui/stamp-collection.tsx'],
    registries: [
      'https://raw.githubusercontent.com/ez-ui/ez.ui/main/packages/components/src/components/ui/stamp-collection.tsx',
    ],
    tailwindConfig: {},
    cssVars: {},
  },
} as const

export type ComponentName = keyof typeof COMPONENTS

export const COMPONENT_NAMES = Object.keys(COMPONENTS) as ComponentName[]
