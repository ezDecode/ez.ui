import { BadgeLink } from '@/components/ui/badge-link'
import { StampCollection } from '@/components/ui/stamp-collection/stamp-collection'

export default function Home() {
  return (
    <main className="min-h-screen max-w-content mx-auto px-6 py-16">
      <div className="mb-16">
        <h1 className="text-3xl font-bold tracking-tight leading-tight mb-6">ez.ui</h1>
        <p className="text-foreground-secondary mb-4">
          Animated React components extracted from{' '}
          <BadgeLink href="https://creativesky.me" icon="link">
            creativesky.me
          </BadgeLink>
          . Built with Tailwind CSS v4, Motion, and OKLCH colors.
        </p>
        <p className="text-sm text-foreground-muted">
          created by{' '}
          <BadgeLink href="https://github.com/ezDecode" icon="github" className="text-sm">
            @ezDecode
          </BadgeLink>
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-lg font-semibold tracking-tight mb-2">BadgeLink</h2>
        <p className="text-foreground-secondary text-sm mb-6">
          Inline links with spring-animated icon tooltips on hover. Supports github, x, mail, link
          icons and custom ReactNode.
        </p>
        <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-8">
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
              X (Twitter)
            </BadgeLink>
            <BadgeLink href="mailto:hello@example.com" icon="mail">
              Email
            </BadgeLink>
            <BadgeLink href="https://example.com" icon="link">
              External Link
            </BadgeLink>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-lg font-semibold tracking-tight mb-2">StampCollection</h2>
        <p className="text-foreground-secondary text-sm mb-6">
          Interactive stamp stack with hover physics. Hover to scatter, click to focus/expand.
          Includes newsletter signup.
        </p>
        <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-8 min-h-[200px] flex items-center justify-center">
          <StampCollection />
        </div>
      </section>

      <footer className="mt-16 pt-8 border-t border-border">
        <p className="text-sm text-foreground-muted">
          ez.ui — based on{' '}
          <BadgeLink href="https://creativesky.me" icon="link" className="text-sm">
            creativesky.me
          </BadgeLink>{' '}
          by{' '}
          <BadgeLink href="https://github.com/ezDecode" icon="github" className="text-sm">
            @ezDecode
          </BadgeLink>
        </p>
      </footer>
    </main>
  )
}
