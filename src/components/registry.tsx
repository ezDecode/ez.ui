import { StampCollection } from '@/components/ui/stamp-collection'
import type { ReactNode } from 'react'

/* ─── Registry ─────────────────────────────────────────────────────────── */

export interface RegistryEntry {
  id: string
  name: string
  description: string
  Section: ReactNode
}

export const registry: RegistryEntry[] = [
  {
    id: 'stamp-collection',
    name: 'Stamp Collection',
    description: 'Scatter · hover · zoom',
    Section: <StampCollection />,
  },
]

export type RegistryId = (typeof registry)[number]['id']
