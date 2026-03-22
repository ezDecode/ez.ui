import { AnimateIn } from '@/components/ui/animate-in'
import { BadgeLink } from '@/components/ui/badge-link'
import { Preview } from '@/components/ui/preview'
import { StampCollection } from '@/components/ui/stamp-collection'
import type { ReactNode } from 'react'

/* ─── Section renderer types ───────────────────────────────────────────── */

interface ComponentSectionProps {
  children: ReactNode
  minHeight?: string
}

function ComponentSection({ children, minHeight = 'min-h-48' }: ComponentSectionProps) {
  return (
    <Preview className={minHeight}>
      {children}
    </Preview>
  )
}

/* ─── BadgeLink demo ────────────────────────────────────────────────────── */

function BadgeLinkDemo() {
  return (
    <div className="w-full max-w-xl">
      <p className="text-foreground-secondary mb-6">
        Check out my{' '}
        <BadgeLink href="https://github.com" icon="github">
          GitHub
        </BadgeLink>
        , follow me on{' '}
        <BadgeLink href="https://x.com" icon="x">
          X
        </BadgeLink>
        , or reach out via{' '}
        <BadgeLink href="mailto:hello@example.com" icon="mail">
          email
        </BadgeLink>
        .
      </p>
      <div className="flex flex-wrap gap-4">
        <BadgeLink href="https://github.com" icon="github">
          GitHub
        </BadgeLink>
        <BadgeLink href="https://x.com" icon="x">
          X
        </BadgeLink>
        <BadgeLink href="mailto:hello@example.com" icon="mail">
          Email
        </BadgeLink>
        <BadgeLink href="https://example.com" icon="link">
          Visit site
        </BadgeLink>
      </div>
    </div>
  )
}

/* ─── Registry ─────────────────────────────────────────────────────────── */

export interface RegistryEntry {
  id: string
  name: string
  description: string
  Section: ReactNode
}

export const registry: RegistryEntry[] = [
  {
    id: 'badge-link',
    name: 'BadgeLink',
    description: 'Inline links with icon tooltips. Icons appear on hover to show where each link goes before you click.',
    Section: (
      <ComponentSection>
        <BadgeLinkDemo />
      </ComponentSection>
    ),
  },
  {
    id: 'stamp-collection',
    name: 'StampCollection',
    description: 'Hover to scatter the stamps. Click any stamp to focus. Scroll down to subscribe.',
    Section: (
      <ComponentSection minHeight="min-h-96">
        <StampCollection />
      </ComponentSection>
    ),
  },
]

export type RegistryId = (typeof registry)[number]['id']
