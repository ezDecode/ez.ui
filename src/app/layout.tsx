import type { Metadata, Viewport } from 'next'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import './globals.css'

export const metadata: Metadata = {
  title: 'ez.ui — Animated React Components',
  description:
    'A collection of refined, purposeful animations and interactive components built with Motion.',
}

export const viewport: Viewport = {
  maximumScale: 1,
  colorScheme: 'dark',
  themeColor: 'oklch(19.8% 0 0)',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistMono.variable} ${GeistSans.variable} overflow-x-hidden touch-manipulation`}
      suppressHydrationWarning
    >
      <body className="w-full min-h-dvh relative font-sans text-base bg-background text-foreground antialiased [text-rendering:optimizeLegibility] [-webkit-tap-highlight-color:transparent] selection:bg-accent-subtle selection:text-accent">
        <main className="relative mx-auto w-full max-w-content px-6 sm:px-8 lg:px-0 pt-16 sm:pt-20 pb-24">
          {children}
        </main>
      </body>
    </html>
  )
}
