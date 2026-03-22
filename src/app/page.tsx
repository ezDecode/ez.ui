import { AnimateIn } from '@/components/ui/animate-in'
import { BadgeLink } from '@/components/ui/badge-link'
import { registry } from '@/components/registry'

export default function Home() {
  return (
    <main className="min-h-screen max-w-content mx-auto px-6 py-16">
      <AnimateIn className="mb-16">
        <h1 className="text-3xl font-semibold tracking-tight leading-tight mb-6">ez.ui</h1>
        <p className="text-foreground-secondary mb-4">
          Animated React components built with Motion and Tailwind CSS, inspired by{' '}
          <BadgeLink href="https://creativesky.me" icon="link">
            creativesky.me
          </BadgeLink>
          .
        </p>
        <p className="text-foreground-muted">
          by{' '}
          <BadgeLink href="https://github.com/ezDecode" icon="github">
            @ezDecode
          </BadgeLink>
        </p>
      </AnimateIn>

      {registry.map((entry, index) => (
        <AnimateIn key={entry.id} delay={0.1 * (index + 1)} className="mb-12">
          <section>
            <h2 className="text-lg font-semibold tracking-tight mb-2">{entry.name}</h2>
            <p className="text-foreground-secondary mb-6">{entry.description}</p>
            {entry.Section}
          </section>
        </AnimateIn>
      ))}

      <AnimateIn delay={0.1 * (registry.length + 1)} className="mt-16 pt-8 border-t border-border">
        <p className="text-foreground-muted">
          a component playground by{' '}
          <BadgeLink href="https://github.com/ezDecode" icon="github">
            @ezDecode
          </BadgeLink>
        </p>
      </AnimateIn>
    </main>
  )
}
