import { useMemo, useState, useEffect } from 'react'
import { motion, LayoutGroup } from 'motion/react'
import type { MouseEvent } from 'react'
import { cn } from '@/lib/utils'
import { useSectionProgress } from '@/hooks/use-section-progress'
import { SegmentedProgressBar } from './segmented-progress-bar'

export interface TocItem {
  id: string
  label: string
  level: number
}

export interface SegmentedTocProps {
  items: TocItem[]
  activeId?: string
  onSectionClick?: (id: string) => void
}

export function SegmentedToc({
  items,
  activeId: externalActiveId,
  onSectionClick,
}: SegmentedTocProps) {
  const sectionIds = useMemo(() => items.map(item => item.id), [items])
  const progressMap = useSectionProgress(sectionIds)
  const [internalActiveId, setInternalActiveId] = useState<string | null>(null)

  // Derived active ID prioritized: External Prop > Manual Click > Scroll Heuristic
  const currentActiveId = useMemo(() => {
    if (externalActiveId) return externalActiveId

    // Heuristic: Find first section that is partially in view (0 < progress < 1)
    const inProgressId = sectionIds.find(id => {
      const p = progressMap[id] || 0
      return p > 0 && p < 1
    })
    if (inProgressId) return inProgressId

    // Fallback: Find the last section that is fully read (progress >= 0.99)
    for (let i = sectionIds.length - 1; i >= 0; i--) {
      if ((progressMap[sectionIds[i]] || 0) >= 0.99) return sectionIds[i]
    }

    return internalActiveId || sectionIds[0]
  }, [externalActiveId, progressMap, sectionIds, internalActiveId])

  const activeIndex = useMemo(
    () => sectionIds.indexOf(currentActiveId),
    [sectionIds, currentActiveId]
  )

  const handleItemClick = (id: string) => {
    setInternalActiveId(id)
    if (onSectionClick) {
      onSectionClick(id)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Effect to sync internal state when scroll logic detects a change
  useEffect(() => {
    if (!externalActiveId) {
      setInternalActiveId(currentActiveId)
    }
  }, [currentActiveId, externalActiveId])

  return (
    <nav
      className={cn(
        'w-full max-w-sm rounded-sm p-5 transition-colors duration-500',
        'bg-background border border-border'
      )}
      aria-label="Table of contents"
    >
      <h2 className="mb-3 text-[10px] font-mono font-medium uppercase tracking-wider text-foreground-muted">
        Table of Contents
      </h2>

      <SegmentedProgressBar
        items={items}
        activeIndex={activeIndex}
        progressMap={progressMap}
        onItemClick={handleItemClick}
      />

      <LayoutGroup id="segmented-toc-layout">
        <ul className="space-y-1 mt-5 relative">
          {items.map((item, index) => (
            <TocLink
              key={item.id}
              item={item}
              index={index}
              isActive={index === activeIndex}
              onClick={() => handleItemClick(item.id)}
            />
          ))}
        </ul>
      </LayoutGroup>
    </nav>
  )
}

function TocLink({
  item,
  index,
  isActive,
  onClick,
}: {
  item: TocItem
  index: number
  isActive: boolean
  onClick?: () => void
}) {
  const number = String(index + 1).padStart(2, '0')

  return (
    <motion.li
      className="relative rounded-sm"
      animate={{ opacity: isActive ? 1 : 0.6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <motion.a
        href={`#${item.id}`}
        onClick={(e: MouseEvent<HTMLAnchorElement>) => {
          e.preventDefault()
          if (onClick) onClick()
        }}
        whileTap={{ scale: 0.96, x: -2 }}
        className="flex items-baseline gap-3 text-xs font-mono uppercase tracking-wide leading-tight px-3 py-2 outline-none rounded-sm focus-visible:ring-2 focus-visible:ring-neutral-400 no-underline"
        initial={false}
        animate={{
          color: isActive ? 'var(--color-foreground)' : 'var(--color-foreground-muted)',
          x: isActive ? 8 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <span
          className={cn(
            'text-[10px] transition-colors duration-500 font-semibold',
            isActive ? 'text-foreground' : 'text-foreground-muted/70'
          )}
        >
          {number}
        </span>
        <span className="font-medium">{item.label}</span>
      </motion.a>
    </motion.li>
  )
}

export default SegmentedToc
