'use client'

import { type ReactNode } from 'react'

interface PreviewProps {
  children: ReactNode
  className?: string
  minHeight?: string
  maxHeight?: string
  background?: 'subtle' | 'neutral' | 'dark'
}

export function Preview({
  children,
  className,
  minHeight = '120px',
  maxHeight = '500px',
  background = 'neutral',
}: PreviewProps) {
  const bgStyles = {
    subtle: 'bg-accent-subtle/30',
    neutral: 'bg-neutral-800/40',
    dark: 'bg-neutral-900/60',
  }

  return (
    <div
      className={`relative flex items-center justify-center p-6 sm:p-8 overflow-hidden ${bgStyles[background]} ${className ?? ''}`}
      style={{ minHeight, maxHeight }}
    >
      {children}
    </div>
  )
}

interface ComponentCardProps {
  id: string
  name: string
  description: string
  children: ReactNode
  index: number
}

export function ComponentCard({ id, name, description, children, index }: ComponentCardProps) {
  return (
    <article key={id} className="group flex flex-col overflow-hidden rounded-lg">
      <Preview>{children}</Preview>
      <div className="flex items-baseline justify-between gap-3 px-4 py-2.5 border-t border-neutral-700/50 bg-neutral-800/25">
        <span className="text-base font-medium text-foreground-secondary/70 transition-colors duration-200 group-hover:text-foreground-secondary truncate">
          {name}
        </span>
        <span className="shrink-0 text-base font-normal text-foreground-muted/60 transition-colors duration-200 group-hover:text-foreground-muted">
          {description}
        </span>
      </div>
    </article>
  )
}
