import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'

export interface TocItem {
  id: string
  label: string
  level: number
}

interface SegmentedProgressBarProps {
  items: TocItem[]
  activeIndex: number
  progressMap: Record<string, number>
  onItemClick: (id: string) => void
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const pillVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
}

export function SegmentedProgressBar({
  items,
  activeIndex,
  progressMap,
  onItemClick,
}: SegmentedProgressBarProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        'flex items-center gap-1.5 p-1.5 rounded-full w-fit transition-colors duration-500',
        'bg-neutral-800 border border-white/5 shadow-inner'
      )}
    >
      {items.map((item, index) => {
        const isActive = index === activeIndex
        const progress = progressMap[item.id] || 0

        return (
          <ProgressPill
            key={item.id}
            active={isActive}
            progress={progress}
            onClick={() => onItemClick(item.id)}
          />
        )
      })}
    </motion.div>
  )
}

interface ProgressPillProps {
  active: boolean
  progress: number
  onClick: () => void
}

function ProgressPill({ active, progress, onClick }: ProgressPillProps) {
  const isComplete = !active && progress >= 0.99

  return (
    <motion.div
      variants={pillVariants}
      layout
      onClick={onClick}
      className="relative h-1.5 rounded-full cursor-pointer isolate overflow-hidden"
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      transition={{
        layout: {
          type: 'spring',
          stiffness: 400,
          damping: 30,
          mass: 0.8,
        },
      }}
      style={{
        width: active ? 52 : 6,
        backgroundColor: active ? 'var(--color-neutral-700)' : 'var(--color-neutral-600)',
      }}
    >
      <AnimatePresence>
        {/* Active Progress Fill */}
        {active && (
          <motion.div
            key="active-fill"
            className="absolute left-0 top-0 bottom-0 rounded-full z-10 shadow-[0_0_10px_rgba(249,115,22,0.4)]"
            style={{
              backgroundColor: '#f97316',
              width: `${Math.min(100, Math.max(0, progress * 100))}%`,
              transformOrigin: 'left center',
            }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0, scaleX: 0 }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        )}

        {/* Completed State */}
        {!active && isComplete && (
          <motion.div
            key="complete-fill"
            className="absolute inset-0 rounded-full z-0"
            style={{ backgroundColor: 'var(--color-neutral-500)' }}
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
