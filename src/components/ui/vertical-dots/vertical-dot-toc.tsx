import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, MotionConfig } from 'motion/react'
import { cn } from '@/lib/utils'
import { VerticalDotProgress, type DotItem } from './vertical-dot-progress'

interface VerticalDotTocProps {
  items: DotItem[]
  /** Duration in ms for each dot fill. Default = 3000 */
  fillDuration?: number
  /** Whether to loop after reaching the last item. Default = true */
  loop?: boolean
  className?: string
}

// Blur + slide animation variants
const textVariants = {
  initial: {
    y: 12,
    filter: 'blur(4px)',
    opacity: 0,
  },
  animate: {
    y: 0,
    filter: 'blur(0px)',
    opacity: 1,
  },
  exit: {
    y: -12,
    filter: 'blur(4px)',
    opacity: 0,
  },
} as const

export function VerticalDotToc({
  items,
  fillDuration = 3000,
  loop = true,
  className,
}: VerticalDotTocProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const advance = useCallback(() => {
    setActiveIndex(prev => {
      const next = prev + 1
      if (next >= items.length) {
        return loop ? 0 : prev
      }
      return next
    })
  }, [items.length, loop])

  useEffect(() => {
    const timer = setTimeout(advance, fillDuration)
    return () => clearTimeout(timer)
  }, [activeIndex, advance, fillDuration])

  const handleDotClick = (index: number) => {
    setActiveIndex(index)
  }

  const activeItem = items[activeIndex]
  const number = String(activeIndex + 1).padStart(2, '0')

  return (
    <MotionConfig transition={{ type: 'spring', duration: 0.4, bounce: 0 }}>
      <div
        className={cn(
          'flex items-start gap-4 rounded-sm p-4 w-[20rem] transition-colors duration-500',
          'bg-background border border-border',
          className
        )}
      >
        {/* Vertical Dots */}
        <VerticalDotProgress
          items={items}
          activeIndex={activeIndex}
          fillDuration={fillDuration}
          onDotClick={handleDotClick}
        />

        {/* Linked Text — swaps with blur + slide on each advance */}
        <div className="flex-1 min-w-0 overflow-hidden">
          <p className="text-[10px] font-mono font-normal uppercase mb-2 text-foreground-muted">
            On This Page
          </p>

          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={activeItem.id}
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex items-baseline gap-3"
            >
              <span className="text-[10px] font-mono shrink-0 text-foreground">{number}</span>
              <span className="text-xs font-mono uppercase leading-tight text-foreground">
                {activeItem.label}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </MotionConfig>
  )
}
