import type { Metadata } from 'next'
import { StampCollection } from '../../../packages/ui/src/stamp-collection'

export const metadata: Metadata = {
  title: 'Stamp Collection',
  description: 'A playful, interactive stack of stamps with physics-based animations.',
}

export default function StampCollectionPage() {
  return (
    <article className="flex flex-col gap-8">
      <header className="flex flex-col gap-4">
        <p className="text-sm font-medium text-foreground-muted">Components</p>
        <h1 className="text-2xl font-semibold text-foreground">Stamp Collection</h1>
        <p className="text-foreground-secondary">
          A playful, interactive stack of stamps that scatter on hover with physics-based spring animations.
        </p>
      </header>

      <div className="h-px bg-border" />

      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-medium text-foreground">Demo</h2>
        <div className="flex items-center justify-center p-6 rounded-lg border border-border bg-[oklch(31.4%_0_0/30%)] min-h-[480px]">
          <StampCollection />
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-medium text-foreground">Usage</h2>
        <pre className="p-4 rounded-lg bg-[oklch(31.4%_0_0/60%)] text-sm font-mono text-foreground overflow-x-auto">
          {`import { StampCollection } from '@ez.ui/ui/stamp-collection'

<StampCollection />`}
        </pre>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-medium text-foreground">Features</h2>
        <ul className="flex flex-col gap-2 pl-6 list-disc text-foreground-secondary">
          <li>Interactive stamp stack with hover scatter effect</li>
          <li>Physics-based spring animations using Motion</li>
          <li>Click to focus/zoom individual stamps</li>
          <li>Newsletter signup form with email input</li>
          <li>Responsive design for mobile and desktop</li>
        </ul>
      </section>
    </article>
  )
}
