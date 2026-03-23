'use client'

import { registry } from '@/components/registry'
import { Preview, ComponentCard } from '@/components/ui/preview'
import { motion, useReducedMotion } from 'motion/react'

const customEase = [0.22, 1, 0.36, 1] as const

export default function Home() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="flex flex-col">
      {/* ── Hero pill ── */}
      <header>
        <span className="inline-flex items-center justify-center px-3.5 pt-[0.3125rem] pb-[0.375rem] bg-neutral-800/60 leading-none rounded-full">
          <span className="text-[0.8125rem] sm:text-sm font-medium font-[family-name:var(--font-components)] text-foreground-secondary leading-none whitespace-nowrap">
            Animated React Components
          </span>
        </span>
      </header>

      <p className="mt-5 mb-0 text-base leading-relaxed text-foreground-secondary">
        A collection of refined, purposeful animations and interactive components built with Motion.
        Copy, adapt, and ship.
      </p>

      {/* ── Divider ── */}
      <div className="h-px bg-border mt-10" />

      {/* ── Section heading ── */}
      <div className="flex items-center justify-between gap-3 mt-5 mb-4">
        <h2 className="text-base font-semibold text-foreground">Components</h2>
        <span className="text-base tabular-nums text-foreground-muted">
          {registry.length.toString().padStart(2, '0')}
        </span>
      </div>

      {/* ── Component grid ── */}
      <div className="grid gap-4">
        {registry.map((entry, i) => (
          <motion.div
            key={entry.id}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0.15 }
                : {
                    opacity: { duration: 0.3, delay: i * 0.06, ease: customEase },
                    y: { duration: 0.4, delay: i * 0.06, ease: customEase },
                  }
            }
          >
            <ComponentCard
              id={entry.id}
              name={entry.name}
              description={entry.description}
              index={i}
            >
              {entry.Section}
            </ComponentCard>
          </motion.div>
        ))}
      </div>

      {/* ── Footer ── */}
      <div className="h-px bg-border mt-16" />
      <footer className="flex items-center justify-between py-5 text-foreground-muted">
        <span className="text-base">
          by{' '}
          <a
            href="https://github.com/ezDecode"
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline text-foreground-secondary hover:text-foreground transition-colors duration-200"
          >
            @ezDecode
          </a>
        </span>
        <a
          href="https://github.com/ezDecode"
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline text-foreground-secondary hover:text-foreground transition-colors duration-200"
        >
          GitHub
        </a>
      </footer>
    </div>
  )
}
