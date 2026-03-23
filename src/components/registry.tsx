import { StampCollection } from '@/components/ui/stamp-collection'
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
]

export type RegistryId = (typeof registry)[number]['id']
