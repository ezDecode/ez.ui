'use client'

import React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useTheme, type Theme } from './theme-context'
import { cn } from '@/lib/utils'

const modes: { value: Theme; label: string }[] = [
  { value: 'dark', label: 'DARK' },
  { value: 'light', label: 'LIGHT' },
  { value: 'system', label: 'SYSTEM' },
]

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        fill="currentColor"
        d="M12 22c5.523 0 10-4.477 10-10c0-.463-.694-.54-.933-.143a6.5 6.5 0 1 1-8.924-8.924C12.54 2.693 12.463 2 12 2C6.477 2 2 6.477 2 12s4.477 10 10 10"
      />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path fill="currentColor" d="M17 12a5 5 0 1 1-10 0a5 5 0 0 1 10 0" />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 1.25a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0V2a.75.75 0 0 1 .75-.75M3.669 3.716a.75.75 0 0 1 1.06-.047L6.95 5.7a.75.75 0 1 1-1.012 1.107L3.716 4.776a.75.75 0 0 1-.047-1.06m16.662 0a.75.75 0 0 1-.047 1.06l-2.222 2.031A.75.75 0 0 1 17.05 5.7l2.222-2.031a.75.75 0 0 1 1.06.047M1.25 12a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 0 1.5H2a.75.75 0 0 1-.75-.75m18 0a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1-.75-.75m-2.224 5.025a.75.75 0 0 1 1.06 0l2.222 2.223a.75.75 0 0 1-1.06 1.06l-2.222-2.222a.75.75 0 0 1 0-1.06m-10.051 0a.75.75 0 0 1 0 1.061l-2.223 2.222a.75.75 0 0 1-1.06-1.06l2.222-2.223a.75.75 0 0 1 1.06 0M12 19.25a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 1 .75-.75"
        clipRule="evenodd"
      />
    </svg>
  )
}

function MonitorIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        fill="currentColor"
        d="M9.95 16.05c.93-.93 1.396-1.396 1.97-1.427q.08-.003.159 0c.574.03 1.04.496 1.971 1.427c2.026 2.026 3.039 3.039 2.755 3.913a1.5 1.5 0 0 1-.09.218C16.297 21 14.865 21 12 21s-4.298 0-4.715-.819a1.5 1.5 0 0 1-.09-.218c-.284-.874.729-1.887 2.755-3.913"
      />
      <path
        fill="currentColor"
        d="M14 3h-4C6.229 3 4.343 3 3.172 4.172S2 7.229 2 11s0 5.657 1.172 6.828c.242.243.514.435.828.587c.481.234 1.06.375 1.77.459c.167-.533.473-.992.745-1.347c.532-.696 1.35-1.514 2.297-2.46l.13-.131c.42-.42.827-.827 1.207-1.122c.426-.331.977-.651 1.693-.689a3 3 0 0 1 .316 0c.716.038 1.267.358 1.693.69c.38.294.787.702 1.206 1.12l.13.131c.948.947 1.766 1.765 2.298 2.46c.272.356.577.815.744 1.348c.712-.084 1.29-.225 1.771-.459a3 3 0 0 0 .828-.587C22 16.657 22 14.771 22 11s0-5.657-1.172-6.828S17.771 3 14 3"
      />
    </svg>
  )
}

const iconMap: Record<Theme, React.FC> = {
  dark: MoonIcon,
  light: SunIcon,
  system: MonitorIcon,
}

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <div
      className={cn(
        'relative flex items-center gap-0.5 p-1 w-fit rounded-sm transition-colors duration-500',
        'bg-neutral-800 border border-border shadow-sm'
      )}
    >
      {modes.map(mode => {
        const isActive = theme === mode.value
        const Icon = iconMap[mode.value]

        return (
          <motion.button
            key={mode.value}
            onClick={() => setTheme(mode.value)}
            whileTap={{ scale: 0.92 }}
            className={cn(
              'relative z-10 flex items-center justify-center gap-1.5 rounded-sm cursor-pointer transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-neutral-800',
              isActive ? 'text-background' : 'text-foreground-muted hover:text-foreground',
              isActive ? 'px-3 py-1.5' : 'px-2 py-1.5'
            )}
          >
            {/* Sliding pill */}
            {isActive && (
              <motion.div
                layoutId="theme-pill"
                className="absolute inset-0 rounded-sm bg-foreground -z-10 shadow-sm"
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 25,
                  mass: 0.8,
                }}
              />
            )}

            <motion.div
              initial={false}
              animate={{
                rotate: isActive ? 0 : -15,
                scale: isActive ? 1 : 0.9,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Icon />
            </motion.div>

            <AnimatePresence mode="popLayout" initial={false}>
              {isActive && (
                <motion.span
                  key={mode.value}
                  initial={{ opacity: 0, width: 0, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, width: 'auto', filter: 'blur(0px)' }}
                  exit={{ opacity: 0, width: 0, filter: 'blur(4px)' }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 25,
                    mass: 0.8,
                  }}
                  className="text-[10px] font-normal tracking-wide whitespace-nowrap overflow-hidden leading-none font-mono origin-left"
                >
                  {mode.label}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        )
      })}
    </div>
  )
}
