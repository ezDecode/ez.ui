'use client'

import { registry } from '@/components/registry'
import { CopyButton } from '@/components/ui/copy-button'
import { motion, useReducedMotion } from 'motion/react'

export default function Home() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="flex flex-col">
      {/* ── Intro Section ── */}
      <div className="w-full max-w-content mx-auto">
        {/* ── Hero pill ── */}
        <header>
          <span className="inline-flex items-center justify-center px-2 py-1.5 rounded-full bg-neutral-800/60 text-[0.8125rem] sm:text-sm font-medium font-components text-foreground-secondary leading-none whitespace-nowrap">
            Animated React Components
          </span>
        </header>

        <p className="mt-5 mb-0 text-base leading-relaxed text-foreground-secondary">
          A collection of refined, purposeful animations and interactive components built with
          Motion. Copy, adapt, and ship.
        </p>

        {/* ── Divider — generous breathing before content ── */}
        <div className="h-px bg-border mt-10" />

        {/* ── Section heading — tight to content below ── */}
        <div className="flex items-center justify-between gap-3 mt-5 mb-8">
          <h2 className="text-base font-semibold text-foreground">Components</h2>
          <span className="text-base tabular-nums text-foreground-muted">
            {registry.length.toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* ── Component Previews — responsive grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {registry.map((entry, i) => (
          <motion.article
            key={entry.id}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={
              prefersReducedMotion
                ? { duration: 0.15 }
                : {
                    opacity: { duration: 0.3, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
                    y: { duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
                  }
            }
            className="group flex flex-col overflow-hidden rounded-md"
          >
            <div className="relative flex items-center justify-center p-4 sm:p-8 bg-neutral-800/40 rounded-t-md min-h-[300px]">
              {entry.Section}
            </div>
            <div className="flex items-center justify-between gap-4 px-3.5 py-2 border-t border-neutral-700/50 bg-neutral-800/25 rounded-b-md">
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-sm font-medium tracking-tight text-foreground/80 transition-colors duration-200 group-hover:text-foreground truncate">
                  {entry.name}
                </span>
                <span className="text-xs text-foreground-muted/60 truncate">
                  {entry.description}
                </span>
              </div>
              <CopyButton command={entry.command} />
            </div>
          </motion.article>
        ))}
      </div>

      {/* ── Footer — closing rhythm ── */}
      <div className="w-full max-w-content mx-auto">
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
            href="https://github.com/ezDecode/ez.ui"
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline text-foreground-secondary hover:text-foreground transition-colors duration-200"
          >
            GitHub
          </a>
        </footer>
      </div>
    </div>
  )
}
