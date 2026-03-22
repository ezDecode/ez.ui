import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Docs',
}

const components = [
  {
    name: 'Badge Link',
    description: 'Inline text links with spring-animated icon tooltips on hover.',
    href: '/docs/components/badge-link',
  },
  {
    name: 'Stamp Collection',
    description: 'A playful, interactive stack of stamps with physics-based animations.',
    href: '/docs/components/stamp-collection',
  },
]

export default function DocsPage() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold text-foreground">ez.ui</h1>
        <p className="text-foreground-secondary">
          A minimal, dark-first design system built with precision.
        </p>
      </div>

      <div className="h-px bg-border" />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-medium text-foreground">Getting Started</h2>
        <div className="flex flex-col gap-4">
          <Link 
            href="/docs/react/getting-started/agent-skills"
            className="inline-flex items-center gap-2 text-foreground-secondary hover:text-foreground transition-colors"
          >
            <span className="text-foreground-muted">→</span>
            Agent Skills
          </Link>
        </div>
      </section>

      <div className="h-px bg-border" />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-medium text-foreground">Components</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {components.map((component) => (
            <Link
              key={component.name}
              href={component.href}
              className="group flex flex-col gap-2 p-4 rounded-lg border border-border hover:border-foreground-muted transition-colors"
            >
              <h3 className="font-medium text-foreground group-hover:text-accent transition-colors">
                {component.name}
              </h3>
              <p className="text-sm text-foreground-secondary">
                {component.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
