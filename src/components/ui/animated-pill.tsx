'use client'

import { motion } from 'motion/react'

const FLARE_DURATION = 0.6
const FLARE_DELAY = 0.4

interface AnimatedPillProps {
  text: string
  className?: string
}

export function AnimatedPill({ text, className }: AnimatedPillProps) {
  return (
    <motion.span
      className={`inline-flex items-center justify-center px-3.5 pt-[0.3125rem] pb-[0.375rem] rounded-full bg-neutral-800/60 leading-none ${className ?? ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="relative overflow-hidden text-[0.8125rem] sm:text-sm font-medium font-[family-name:var(--font-components)] text-foreground-secondary leading-none whitespace-nowrap">
        {text}
        {/* Light flare on text — sharp left-to-right sweep */}
        <motion.span
          className="pointer-events-none absolute inset-y-0 w-[40%] -skew-x-12"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, oklch(100% 0 0 / 0%) 20%, oklch(100% 0 0 / 50%) 50%, oklch(100% 0 0 / 0%) 80%, transparent 100%)',
            mixBlendMode: 'plus-lighter',
          }}
          initial={{ left: '-40%' }}
          animate={{ left: '110%' }}
          transition={{
            duration: FLARE_DURATION,
            delay: FLARE_DELAY,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </span>
    </motion.span>
  )
}
