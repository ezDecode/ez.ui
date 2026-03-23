'use client'

import { registry } from '@/components/registry'
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'

const HOVER_SPRING = { type: 'spring', stiffness: 420, damping: 32, mass: 0.7 } as const

export default function Home() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const featured = registry.slice(0, 1)
  const rest = registry.slice(1)

  return (
    <div className="flex flex-col gap-10 mt-12 sm:mt-24">
      {/* Hero — creativesky-style: quiet, weighted hierarchy */}
      <header className="flex flex-col gap-1">
        <h1 className="m-0 text-base font-semibold leading-snug tracking-tight text-foreground">
          ez.ui
        </h1>
        <p className="m-0 text-base font-normal leading-snug tracking-normal text-foreground-muted">
          Animated React Components
        </p>
      </header>

      {/* Description */}
      <div className="flex flex-col gap-5 text-base leading-relaxed text-foreground-secondary">
        <p className="m-0">
          A collection of refined, purposeful animations and interactive components built with
          Motion. Copy, adapt, and ship.
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-border" />

      {/* Section heading */}
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-foreground">Components</h2>
        <span className="text-base tabular-nums text-foreground-muted">
          {registry.length.toString().padStart(2, '0')}
        </span>
      </div>

      {/* Featured component — large preview card */}
      {featured.map((entry, i) => (
        <motion.div
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
          className="group flex flex-col overflow-hidden rounded-2xl"
        >
          <div className="relative flex min-h-[240px] sm:min-h-[360px] items-center justify-center p-6 bg-neutral-800/40">
            {entry.Section}
          </div>
          <div className="flex items-baseline justify-between gap-3 px-4 py-2.5 bg-neutral-800/40">
            <span className="m-0 text-sm font-medium leading-tight text-foreground-secondary/70 transition-colors duration-200 group-hover:text-foreground-secondary truncate">
              {entry.name}
            </span>
            <span className="shrink-0 text-sm font-medium text-foreground-muted/60 transition-colors duration-200 group-hover:text-foreground-muted">
              {entry.description}
            </span>
          </div>
        </motion.div>
      ))}

      {/* Rest — hover list with dot leaders */}
      {rest.length > 0 && (
        <LayoutGroup>
          <ol className="flex flex-col list-none m-0 p-0">
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
                <button
                  type="button"
                  className="group relative flex items-baseline gap-4 w-full text-left -mx-2 px-2 py-1.5 leading-tight rounded-md transition-colors duration-200 focus-visible:bg-accent-subtle focus-visible:outline-none"
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
                  <span className="block shrink-0 min-w-0 text-base font-normal text-foreground-secondary transition-colors duration-300 group-hover:text-foreground truncate max-w-[60%] sm:max-w-none">
                    {entry.name}
                  </span>
                  <span
                    className='h-[1em] flex-1 overflow-hidden text-base tracking-[6px] text-foreground-secondary/55 font-light leading-none transition-colors duration-300 after:content-["······································································"] group-hover:text-foreground/70'
                    aria-hidden="true"
                  />
                  <span className="shrink-0 text-base font-normal text-foreground-muted transition-colors duration-300 group-hover:text-foreground-secondary truncate max-w-[40%] sm:max-w-none text-right">
                    {entry.description}
                  </span>
                </button>
              </motion.li>
            ))}
          </ol>
        </LayoutGroup>
      )}

      {/* Footer */}
      <footer className="flex items-center justify-between pt-8 pb-16 text-foreground-muted">
        <span className="text-base">
          by{' '}
          <a
            href="https://github.com/ezDecode"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground-secondary hover:text-foreground transition-colors duration-200"
          >
            @ezDecode
          </a>
        </span>
        <a
          href="https://github.com/ezDecode"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground-secondary hover:text-foreground transition-colors duration-200"
        >
          GitHub
        </a>
      </footer>
    </div>
  )
}
