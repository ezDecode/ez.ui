'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Preview({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('relative rounded-lg overflow-hidden', 'bg-neutral-500/10', className)}>
      <div className="flex items-center justify-center min-h-48 p-8">{children}</div>
    </div>
  )
}
