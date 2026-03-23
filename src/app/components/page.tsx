import Link from 'next/link'
import { AnimateIn } from '@/components/ui/animate-in'
import { registry } from '@/components/registry'

export default function ComponentsPage() {
  return (
    <div className="flex flex-col gap-10 mt-12 sm:mt-24">
      <AnimateIn>
        <header className="flex flex-col gap-1">
          <Link
            href="/"
            className="inline-flex items-center text-base text-foreground-muted hover:text-foreground mb-6 group transition-colors duration-200"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span className="ml-2">Home</span>
          </Link>
          <h1 className="m-0 text-base font-semibold leading-snug tracking-tight text-foreground">
            Components
          </h1>
          <p className="m-0 text-base font-normal leading-snug tracking-normal text-foreground-muted">
            Browse the full collection
          </p>
        </header>
      </AnimateIn>

      <div className="h-px bg-border" />

      <div className="flex flex-col gap-6">
        {registry.map((entry, index) => (
          <AnimateIn key={entry.id} delay={0.06 * (index + 1)}>
            <article className="group flex flex-col overflow-hidden rounded-2xl">
              <div className="relative flex min-h-[240px] sm:min-h-[320px] items-center justify-center p-6 bg-neutral-800/40">
                {entry.Section}
              </div>
              <div className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-neutral-800/40">
                <span className="text-sm font-medium text-foreground-secondary/70 transition-colors duration-200 group-hover:text-foreground-secondary truncate">
                  {entry.name}
                </span>
                <span className="shrink-0 text-sm font-medium text-foreground-muted/60 transition-colors duration-200 group-hover:text-foreground-muted">
                  {entry.description}
                </span>
              </div>
            </article>
          </AnimateIn>
        ))}
      </div>

      {registry.length === 0 && (
        <AnimateIn>
          <p className="text-foreground-muted">Nothing here yet. Check back soon.</p>
        </AnimateIn>
      )}
    </div>
  )
}
