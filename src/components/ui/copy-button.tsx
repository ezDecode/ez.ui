'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'

export function CopyButton({ command, className }: { command: string; className?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-foreground-secondary bg-neutral-800/60 hover:bg-neutral-800/80 hover:text-foreground transition-all duration-200',
        className
      )}
      title="Copy command"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          <span>Copy</span>
        </>
      )}
    </button>
  )
}
