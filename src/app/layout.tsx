import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const inter = localFont({
  src: '../../public/fonts/Inter-var.woff2',
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  weight: '100 900',
})

const louize = localFont({
  src: [
    { path: '../../public/fonts/LouizeRegular.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/LouizeItalic.woff2', weight: '400', style: 'italic' },
    { path: '../../public/fonts/LouizeMedium.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/LouizeMediumItalic.woff2', weight: '500', style: 'italic' },
  ],
  variable: '--font-louize',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: 'ez.ui — Animated React Components',
  description:
    'Animated React component library by @ezDecode, extracted from creativesky.me. Built with Tailwind CSS v4, Motion, and OKLCH colors.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${louize.variable} dark`}>
      <body className="min-h-screen antialiased font-sans bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
