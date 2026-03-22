import Link from 'next/link'
import { BadgeLink } from '../../packages/ui/src/badge-link'

const features = [
  {
    title: 'Minimal Design',
    description: 'Dark-first aesthetic with precise typography and spacing.',
  },
  {
    title: 'Motion-Ready',
    description: 'Components optimized for smooth animations and interactions.',
  },
  {
    title: 'TypeScript First',
    description: 'Full TypeScript support with comprehensive type definitions.',
  },
]

const components = [
  {
    name: 'Badge Link',
    description: 'Inline text links with spring-animated icon tooltips.',
    href: '/docs/components/badge-link',
  },
  {
    name: 'Stamp Collection',
    description: 'Interactive stamp stack with physics-based animations.',
    href: '/docs/components/stamp-collection',
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16">
      <section className="flex flex-col gap-6">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          ez.ui
        </h1>
        <p className="text-lg text-foreground-secondary leading-relaxed max-w-xl">
          A minimal, dark-first design system built with precision. 
          Crafted for designers and developers who value attention to detail.
        </p>
      </section>

      <div className="h-px bg-border" />

      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-medium text-foreground">Features</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col gap-2">
              <h3 className="font-medium text-foreground">{feature.title}</h3>
              <p className="text-sm text-foreground-secondary">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="h-px bg-border" />

      <section className="flex flex-col gap-6">
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

      <div className="h-px bg-border" />

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-medium text-foreground">Get Started</h2>
        <p className="text-foreground-secondary">
          Check out the{' '}
          <BadgeLink href="/docs/react/getting-started/agent-skills" icon="link">
            Agent Skills
          </BadgeLink>
          {' '}documentation to integrate ez.ui with your AI assistant.
        </p>
      </section>
    </div>
  )
}
