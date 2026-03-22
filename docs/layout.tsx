import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: {
    template: `%s — ez.ui`,
    default: 'ez.ui — Design System',
  },
  description: 'A minimal, dark-first design system built with precision.',
}

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground antialiased">
        <div className="min-h-dvh">
          <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
            <div className="mx-auto flex h-14 max-w-content items-center justify-between px-6">
              <Link href="/docs" className="font-semibold text-foreground hover:text-accent transition-colors">
                ez.ui
              </Link>
              <nav className="flex items-center gap-6 text-sm text-foreground-secondary">
                <Link href="/docs/components" className="hover:text-foreground transition-colors">
                  Components
                </Link>
                <Link href="/docs/react/getting-started/agent-skills" className="hover:text-foreground transition-colors">
                  Agent Skills
                </Link>
              </nav>
            </div>
          </header>
          <main className="mx-auto max-w-content px-6 py-12">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
