'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Preview({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('flex items-center justify-center', className)}>{children}</div>
}
