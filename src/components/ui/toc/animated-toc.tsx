import { useEffect, useLayoutEffect, useRef, useCallback, useState, useMemo } from 'react'
import type { CSSProperties, MouseEvent, KeyboardEvent } from 'react'
import { motion, animate, useMotionValue, useTransform, useMotionTemplate } from 'motion/react'
import { cn } from '@/lib/utils'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface TocItem {
  id: string
  label: string
  level: number
}

export interface TocColors {
  track?: string
  active?: string
  text?: string
  textActive?: string
  textHover?: string
}

export interface AnimatedTocProps {
  items: TocItem[]
  className?: string
  style?: CSSProperties
  colors?: TocColors
  strokeWidth?: number
  indentSize?: number
  linkPadding?: number
  fontSize?: number | string
  rootMargin?: string
  activeIds?: string[]
  onActiveChange?: (activeIds: string[]) => void
  ariaLabel?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// Defaults
// ─────────────────────────────────────────────────────────────────────────────

const DEFAULTS = {
  colors: {
    track: 'var(--color-neutral-800)',
    active: 'var(--color-foreground)',
    text: 'var(--color-foreground-muted)',
    textActive: 'var(--color-foreground)',
    textHover: 'var(--color-foreground-secondary)',
  },
  strokeWidth: 2,
  indentSize: 16,
  linkPadding: 6,
  fontSize: 14,
  rootMargin: '-80px 0px -30% 0px',
} as const

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export function AnimatedToc({
  items,
  className = '',
  style,
  colors: colorsProp,
  strokeWidth = DEFAULTS.strokeWidth,
  indentSize = DEFAULTS.indentSize,
  linkPadding = DEFAULTS.linkPadding,
  fontSize = DEFAULTS.fontSize,
  rootMargin = DEFAULTS.rootMargin,
  activeIds: controlledActiveIds,
  onActiveChange,
  ariaLabel = 'Table of contents',
}: AnimatedTocProps) {
  const colors = useMemo(() => ({ ...DEFAULTS.colors, ...colorsProp }), [colorsProp])

  const navRef = useRef<HTMLElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const trackRef = useRef<SVGPathElement>(null)
  const linkEndsRef = useRef<Map<string, number>>(new Map())
  const onActiveChangeRef = useRef(onActiveChange)
  const rafIdRef = useRef(0)

  const [internalActiveIds, setInternalActiveIds] = useState<Set<string>>(new Set())
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [totalLength, setTotalLength] = useState(0)

  const progressEnd = useMotionValue(0)

  const isControlled = controlledActiveIds !== undefined
  const activeIds = useMemo(
    () => (isControlled ? new Set(controlledActiveIds) : internalActiveIds),
    [isControlled, controlledActiveIds, internalActiveIds]
  )

  const minLevel = useMemo(
    () => (items.length === 0 ? 1 : Math.min(...items.map(i => i.level))),
    [items]
  )

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    onActiveChangeRef.current = onActiveChange
  })

  useEffect(() => {
    onActiveChangeRef.current?.(Array.from(activeIds))
  }, [activeIds])

  const drawPath = useCallback(() => {
    const path = pathRef.current
    const track = trackRef.current
    const nav = navRef.current
    if (!path || !track || !nav) return

    const links = Array.from(nav.querySelectorAll('a[data-toc-link]')) as HTMLAnchorElement[]
    if (!links.length) return

    let d = ''
    let currentX = 4
    let currentY = 0
    linkEndsRef.current.clear()

    links.forEach((link, i) => {
      const itemId = link.dataset.tocId || ''
      const indent = parseInt(link.dataset.indent || '0', 10)
      const targetX = 4 + indent
      const linkTop = link.offsetTop + 4
      const linkBottom = link.offsetTop + link.offsetHeight - 4

      if (i === 0) {
        d += `M ${targetX} ${linkTop} L ${targetX} ${linkBottom}`
        currentY = linkBottom
      } else {
        const xDiff = Math.abs(targetX - currentX)
        if (targetX !== currentX) {
          const diagonalStartY = linkTop - xDiff
          if (diagonalStartY > currentY) d += ` L ${currentX} ${diagonalStartY}`
        }
        d += ` L ${targetX} ${linkTop} L ${targetX} ${linkBottom}`
        currentY = linkBottom
      }
      currentX = targetX

      path.setAttribute('d', d)
      linkEndsRef.current.set(itemId, path.getTotalLength())
    })

    track.setAttribute('d', d)
    setTotalLength(path.getTotalLength())
  }, [])

  const updatePath = useCallback(() => {
    const path = pathRef.current
    if (!path) return

    const pathLength = path.getTotalLength() || 0
    let targetEnd = 0

    activeIds.forEach(id => {
      const end = linkEndsRef.current.get(id)
      if (end !== undefined) targetEnd = Math.max(targetEnd, end)
    })

    if (prefersReducedMotion) {
      progressEnd.set(targetEnd)
    } else {
      animate(progressEnd, targetEnd, {
        type: 'spring',
        stiffness: 120,
        damping: 24,
        mass: 1,
        restDelta: 0.01,
      })
    }
  }, [activeIds, prefersReducedMotion, progressEnd])

  useIsomorphicLayoutEffect(() => {
    if (!navRef.current) return

    drawPath()

    if (!isControlled) {
      const observer = new IntersectionObserver(
        entries => {
          setInternalActiveIds(prev => {
            const next = new Set(prev)
            entries.forEach(entry => {
              const id = entry.target.id
              if (!id) return
              if (entry.isIntersecting) {
                next.add(id)
              } else {
                next.delete(id)
              }
            })
            return next
          })
        },
        { rootMargin, threshold: 0 }
      )

      items.forEach(item => {
        const el = document.getElementById(item.id)
        if (el) observer.observe(el)
      })

      const resizeObserver = new ResizeObserver(() => {
        cancelAnimationFrame(rafIdRef.current)
        rafIdRef.current = requestAnimationFrame(drawPath)
      })
      resizeObserver.observe(navRef.current)

      return () => {
        observer.disconnect()
        resizeObserver.disconnect()
        cancelAnimationFrame(rafIdRef.current)
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = requestAnimationFrame(drawPath)
    })
    resizeObserver.observe(navRef.current)

    return () => {
      resizeObserver.disconnect()
      cancelAnimationFrame(rafIdRef.current)
    }
  }, [items, rootMargin, drawPath, isControlled])

  useEffect(() => {
    updatePath()
  }, [activeIds, updatePath])

  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault()
      const behavior = prefersReducedMotion ? ('instant' as const) : ('smooth' as const)
      document.getElementById(id)?.scrollIntoView({ behavior, block: 'start' })
      history.pushState(null, '', `#${id}`)
    },
    [prefersReducedMotion]
  )

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLAnchorElement>, index: number) => {
    const links = navRef.current?.querySelectorAll(
      'a[data-toc-link]'
    ) as NodeListOf<HTMLAnchorElement>
    if (!links) return

    const actions: Record<string, () => void> = {
      ArrowDown: () => links[index + 1]?.focus(),
      ArrowUp: () => links[index - 1]?.focus(),
      Home: () => links[0]?.focus(),
      End: () => links[links.length - 1]?.focus(),
    }

    if (actions[e.key]) {
      e.preventDefault()
      actions[e.key]()
    }
  }, [])

  const strokeDasharray = useMotionTemplate`${progressEnd} ${totalLength}`

  return (
    <nav
      ref={navRef}
      className={cn('relative pl-6', className)}
      style={style}
      aria-label={ariaLabel}
    >
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        aria-hidden="true"
      >
        <path
          ref={trackRef}
          fill="none"
          stroke={colors.track}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Glow effect on the active path */}
        <motion.path
          fill="none"
          stroke={colors.active}
          strokeWidth={strokeWidth * 3}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="blur-sm opacity-30"
          style={{ strokeDasharray }}
        />
        <motion.path
          ref={pathRef}
          fill="none"
          stroke={colors.active}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ strokeDasharray }}
        />
      </svg>

      <ul className="list-none m-0 p-0 relative z-10">
        {items.map((item, i) => {
          const isActive = activeIds.has(item.id)
          const isHovered = hoveredId === item.id
          const indent = (item.level - minLevel) * indentSize

          return (
            <li key={item.id} className="m-0 p-0" style={{ paddingLeft: indent }}>
              <motion.a
                href={`#${item.id}`}
                data-toc-link
                data-toc-id={item.id}
                data-indent={indent}
                animate={{
                  color: isActive ? colors.textActive : isHovered ? colors.textHover : colors.text,
                  x: isActive ? 4 : 0,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className={cn('block font-medium leading-tight no-underline outline-offset-2')}
                style={{
                  padding: `${linkPadding}px 0`,
                  fontSize: typeof fontSize === 'number' ? `${fontSize}px` : fontSize,
                }}
                onClick={e => handleClick(e, item.id)}
                onKeyDown={e => handleKeyDown(e, i)}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(item.id)}
                onBlur={() => setHoveredId(null)}
                aria-current={isActive ? 'location' : undefined}
              >
                {item.label}
              </motion.a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default AnimatedToc
