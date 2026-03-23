'use client'

import { registry } from '@/components/registry'
import { CopyButton } from '@/components/ui/copy-button'
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'

const HOVER_SPRING = { type: 'spring', stiffness: 420, damping: 32, mass: 0.7 } as const

export default function Home() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const featured = registry.slice(0, 1)
  const rest = registry.slice(1)

  return (
    <div className="flex flex-col">
      {/* ── Hero pill ── */}
      <header>
        <span className="inline-flex items-center justify-center px-2 py-1.5 rounded-full bg-neutral-800/60 text-[0.8125rem] sm:text-sm font-medium font-[family-name:var(--font-components)] text-foreground-secondary leading-none whitespace-nowrap">
          Animated React Components
        </span>
      </header>

      <p className="mt-5 mb-0 text-base leading-relaxed text-foreground-secondary">
        A collection of refined, purposeful animations and interactive components built with Motion.
        Copy, adapt, and ship.
      </p>

      {/* ── Divider — generous breathing before content ── */}
      <div className="h-px bg-border mt-10" />

      {/* ── Section heading — tight to content below ── */}
      <div className="flex items-center justify-between gap-3 mt-5 mb-4">
        <h2 className="text-base font-semibold text-foreground">Components</h2>
        <span className="text-base tabular-nums text-foreground-muted">
          {registry.length.toString().padStart(2, '0')}
        </span>
      </div>

      {/* ── Featured component — large preview ── */}
      {featured.map((entry, i) => (
        <motion.article
          key={entry.id}
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0.15 }
              : {
                  opacity: { duration: 0.3, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
                  y: { duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
                }
          }
          className="group flex flex-col overflow-hidden rounded-[var(--radius-md)]"
        >
          <div className="relative flex items-center justify-center p-6 sm:p-8 bg-neutral-800/40">
            {entry.Section}
          </div>
          <div className="flex items-center justify-between gap-4 px-3.5 py-2 border-t border-neutral-700/50 bg-neutral-800/25">
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-sm font-medium tracking-tight text-foreground/80 transition-colors duration-200 group-hover:text-foreground truncate">
                {entry.name}
              </span>
            </div>
            <CopyButton command={entry.command} />
          </div>
        </motion.article>
      ))}

      {/* ── Rest — hover list with dot leaders ── */}
      {rest.length > 0 && (
        <LayoutGroup>
          <ol className="flex flex-col list-none m-0 p-0 mt-3">
            {rest.map((entry, i) => (
              <motion.li
                key={entry.id}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0.15 }
                    : {
                        opacity: {
                          duration: 0.3,
                          delay: (featured.length + i) * 0.06,
                          ease: [0.22, 1, 0.36, 1],
                        },
                        y: {
                          duration: 0.4,
                          delay: (featured.length + i) * 0.06,
                          ease: [0.22, 1, 0.36, 1],
                        },
                      }
                }
              >
                <div
                  className="group relative flex items-center gap-4 w-full text-left -mx-2 px-2 py-1.5 leading-tight rounded-md transition-colors duration-200"
                  onMouseEnter={() => setHoveredId(entry.id)}
                  onMouseLeave={() => setHoveredId(prev => (prev === entry.id ? null : prev))}
                >
                  {!prefersReducedMotion && (
                    <span className="pointer-events-none absolute inset-0 rounded-md">
                      {hoveredId === entry.id && (
                        <motion.span
                          layoutId="component-hover"
                          className="absolute inset-x-0 inset-y-0.5 rounded-md bg-accent-subtle"
                          transition={HOVER_SPRING}
                        />
                      )}
                    </span>
                  )}
                  <span className="block shrink-0 min-w-0 text-sm font-normal text-foreground-secondary/80 transition-colors duration-300 group-hover:text-foreground truncate max-w-[30%] sm:max-w-none">
                    {entry.name}
                  </span>
                  <span className="shrink-0 text-xs font-normal text-foreground-muted/40 transition-colors duration-300 group-hover:text-foreground-muted/60 truncate max-w-[40%] sm:max-w-none">
                    {entry.description}
                  </span>
                  <span
                    className='h-[1em] flex-1 overflow-hidden text-base tracking-[6px] text-foreground-muted/10 font-light leading-none transition-colors duration-300 after:content-["······································································"] group-hover:text-foreground-muted/20'
                    aria-hidden="true"
                  />
                  <div className="flex items-center gap-2 shrink-0">
                    <CopyButton
                      command={entry.command}
                      className="opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-200"
                    />
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </LayoutGroup>
      )}

      {/* ── Footer — closing rhythm ── */}
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
  )
}
