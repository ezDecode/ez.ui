import { StampCollection } from '@/components/ui/stamp-collection'
import { AnimatedLines } from '@/components/ui/animated-lines'
import { SegmentedToc, DemoHelpers } from '@/components/ui/toc'
import { VerticalDotToc } from '@/components/ui/vertical-dots'
import type { ReactNode } from 'react'

/* ─── Registry ─────────────────────────────────────────────────────────── */

export interface RegistryEntry {
  id: string
  name: string
  description: string
  Section: ReactNode
  command: string
}

export const registry: RegistryEntry[] = [
  {
    id: 'stamp-collection',
    name: 'Stamp Collection',
    description: 'Scatter · hover · zoom',
    Section: <StampCollection />,
    command: 'npx shadcn@latest add https://ez-ui-pi.vercel.app/r/stamp-collection.json',
  },
  {
    id: 'animated-lines',
    name: 'Animated Lines',
    description: 'Diagonal · hover · canvas',
    Section: <AnimatedLines />,
    command: 'npx shadcn@latest add https://ez-ui-pi.vercel.app/r/animated-lines.json',
  },
  {
    id: 'toc',
    name: 'Segmented TOC',
    description: 'Progress · segments · toc',
    Section: (
      <div className="flex flex-col gap-8 w-full items-center">
        <SegmentedToc items={DemoHelpers.TOC_ITEMS.slice(0, 4)} />
      </div>
    ),
    command: 'npx shadcn@latest add https://ez-ui-pi.vercel.app/r/toc.json',
  },
  {
    id: 'vertical-dots',
    name: 'Vertical Dot TOC',
    description: 'Dots · auto · advance',
    Section: <VerticalDotToc items={DemoHelpers.TOC_ITEMS.slice(0, 4)} />,
    command: 'npx shadcn@latest add https://ez-ui-pi.vercel.app/r/vertical-dots.json',
  },
]

export type RegistryId = (typeof registry)[number]['id']
