import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'

export interface DotItem {
  id: string
  label: string
}

interface VerticalDotProgressProps {
  items: DotItem[]
  activeIndex: number
  fillDuration?: number
  onDotClick?: (index: number) => void
}

export function VerticalDotProgress({
  items,
  activeIndex,
  fillDuration = 3000,
  onDotClick,
}: VerticalDotProgressProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-1 p-1.5 rounded-full w-fit',
        'bg-neutral-800 border border-white/5 shadow-sm'
      )}
    >
      {items.map((_, index) => {
        const isActive = index === activeIndex
        const isComplete = index < activeIndex

        return (
          <DotPill
            key={index}
            active={isActive}
            complete={isComplete}
            fillDuration={fillDuration}
            onClick={() => onDotClick?.(index)}
          />
        )
      })}
    </div>
  )
}

interface DotPillProps {
  active: boolean
  complete: boolean
  fillDuration: number
  onClick: () => void
}

function DotPill({ active, complete, fillDuration, onClick }: DotPillProps) {
  return (
    <motion.div
      layout
      onClick={onClick}
      className="relative w-1.5 rounded-full cursor-pointer isolate overflow-hidden"
      initial={false}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      animate={{
        height: active ? 27 : 6,
        backgroundColor: active ? 'var(--color-neutral-700)' : 'var(--color-neutral-600)',
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 25,
        mass: 0.8,
      }}
    >
      <AnimatePresence>
        {/* Active fill — grows from top to bottom, synced to fillDuration */}
        {active && (
          <motion.div
            key="active-fill"
            className="absolute left-0 right-0 top-0 rounded-full z-10 shadow-[0_0_8px_rgba(249,115,22,0.3)]"
            style={{ backgroundColor: '#f97316' }}
            initial={{ height: '0%', opacity: 0 }}
            animate={{ height: '100%', opacity: 1 }}
            exit={{ opacity: 0, height: '0%' }}
            transition={{
              height: { duration: fillDuration / 1000, ease: 'linear' },
              opacity: { duration: 0.15 },
            }}
          />
        )}

        {/* Complete state */}
        {!active && complete && (
          <motion.div
            key="complete-fill"
            className="absolute inset-0 rounded-full z-0"
            style={{ backgroundColor: 'var(--color-neutral-600)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
