import { StampCollection } from '@/components/ui/stamp-collection'
import { LoginButton } from '@/components/ui/login-button'
import { ThemeSwitcher } from '@/components/ui/theme-switcher'
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
    command: 'npx shadcn@latest add @ez-pi/stamp-collection',
  },
  {
    id: 'login-button',
    name: 'Login Button',
    description: 'Diagonal · hover · canvas',
    Section: <LoginButton />,
    command: 'npx shadcn@latest add @ez-pi/login-button',
  },
  {
    id: 'theme-switcher',
    name: 'Theme Switcher',
    description: 'Slide · pill · theme',
    Section: <ThemeSwitcher />,
    command: 'npx shadcn@latest add @ez-pi/theme-switcher',
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
    command: 'npx shadcn@latest add @ez-pi/toc',
  },
  {
    id: 'vertical-dots',
    name: 'Vertical Dot TOC',
    description: 'Dots · auto · advance',
    Section: <VerticalDotToc items={DemoHelpers.TOC_ITEMS.slice(0, 4)} />,
    command: 'npx shadcn@latest add @ez-pi/vertical-dots',
  },
]

export type RegistryId = (typeof registry)[number]['id']
