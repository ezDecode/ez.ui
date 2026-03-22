import type { Metadata } from 'next'
import { BadgeLink } from '../../../packages/ui/src/badge-link'

export const metadata: Metadata = {
  title: 'Badge Link',
  description: 'Inline text links with spring-animated icon tooltips on hover.',
}

export default function BadgeLinkPage() {
  return (
    <article className="flex flex-col gap-8">
      <header className="flex flex-col gap-4">
        <p className="text-sm font-medium text-foreground-muted">Components</p>
        <h1 className="text-2xl font-semibold text-foreground">Badge Link</h1>
        <p className="text-foreground-secondary">
          Inline text links with spring-animated icon tooltips that pop on hover.
        </p>
      </header>

      <div className="h-px bg-border" />

      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-medium text-foreground">Demo</h2>
        <div className="flex flex-col gap-4 p-6 rounded-lg border border-border bg-[oklch(31.4%_0_0/30%)]">
          <p className="text-foreground-secondary">
            Find me on{' '}
            <BadgeLink href="https://github.com/ezDecode" icon="github">
              GitHub
            </BadgeLink>
            ,{' '}
            <BadgeLink href="https://x.com/ezDecode" icon="x">
              @ezDecode
            </BadgeLink>
            , and{' '}
            <BadgeLink href="mailto:ezdecode@gmail.com" icon="mail">
              Contact me
            </BadgeLink>
            .
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-medium text-foreground">Usage</h2>
        <pre className="p-4 rounded-lg bg-[oklch(31.4%_0_0/60%)] text-sm font-mono text-foreground overflow-x-auto">
          {`import { BadgeLink } from '@ez.ui/ui/badge-link'

<BadgeLink href="https://github.com/ezDecode" icon="github">
  GitHub
</BadgeLink>`}
        </pre>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-medium text-foreground">Props</h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 p-4 rounded-lg border border-border">
            <div className="flex items-center gap-4">
              <code className="px-2 py-1 rounded bg-[oklch(31.4%_0_0/60%)] font-mono text-sm">href</code>
              <span className="text-sm text-foreground-secondary">string</span>
              <span className="px-2 py-0.5 rounded text-xs bg-accent-subtle text-foreground">required</span>
            </div>
            <p className="text-sm text-foreground-muted">The URL the link points to.</p>
          </div>
          <div className="flex flex-col gap-2 p-4 rounded-lg border border-border">
            <div className="flex items-center gap-4">
              <code className="px-2 py-1 rounded bg-[oklch(31.4%_0_0/60%)] font-mono text-sm">icon</code>
              <span className="text-sm text-foreground-secondary">&apos;github&apos; | &apos;x&apos; | &apos;mail&apos; | &apos;link&apos; | ReactNode</span>
            </div>
            <p className="text-sm text-foreground-muted">Built-in icon name or custom icon.</p>
          </div>
          <div className="flex flex-col gap-2 p-4 rounded-lg border border-border">
            <div className="flex items-center gap-4">
              <code className="px-2 py-1 rounded bg-[oklch(31.4%_0_0/60%)] font-mono text-sm">children</code>
              <span className="text-sm text-foreground-secondary">ReactNode</span>
              <span className="px-2 py-0.5 rounded text-xs bg-accent-subtle text-foreground">required</span>
            </div>
            <p className="text-sm text-foreground-muted">The content of the link.</p>
          </div>
        </div>
      </section>
    </article>
  )
}
