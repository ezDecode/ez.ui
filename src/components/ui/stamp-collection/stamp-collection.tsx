'use client'

import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import stamp01 from './assets/stamp_01.webp'
import stamp02 from './assets/stamp_02.webp'
import stamp03 from './assets/stamp_03.webp'
import stamp04 from './assets/stamp_04.webp'
import stamp05 from './assets/stamp_05.webp'

// Inspiration: https://omou.app/

// 1. Define the persistent Stamp data (Identity)
const STAMP_ITEMS = [
  { id: 'stamp-1', src: stamp01, label: 'Stamp 1' },
  { id: 'stamp-2', src: stamp02, label: 'Stamp 2' },
  { id: 'stamp-3', src: stamp03, label: 'Stamp 3' },
  { id: 'stamp-4', src: stamp04, label: 'Stamp 4' },
  { id: 'stamp-5', src: stamp05, label: 'Stamp 5' },
]

// 2. Define the fixed Visual Slots (Layout)
// Re-ordered so index 4 is the visual center for both fanned and stacked states
const SLOTS = [
  { fanned: { x: -148, y: 10, rotate: -18 }, stacked: { x: -8, y: 2, rotate: -9 } }, // 0: Far Left
  { fanned: { x: 148, y: 10, rotate: 18 }, stacked: { x: 8, y: 2, rotate: 9 } }, // 1: Far Right
  { fanned: { x: -74, y: -3, rotate: -9 }, stacked: { x: -4, y: -1, rotate: -5 } }, // 2: Mid Left
  { fanned: { x: 74, y: -3, rotate: 9 }, stacked: { x: 4, y: -1, rotate: 5 } }, // 3: Mid Right
  { fanned: { x: 0, y: -10, rotate: 0 }, stacked: { x: 0, y: 0, rotate: 0 } }, // 4: Center
]

const TRANSITION = {
  duration: 0.38,
  ease: [0.32, 0.72, 0, 1],
} as const

const FOCUS_TRANSITION = {
  duration: 0.5,
  ease: [0.32, 0.72, 0, 1],
} as const

const StampCollection = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  // Define initial layout order: Stamp 3 (index 2) is the visual center
  const INITIAL_STAMPS = [
    STAMP_ITEMS[0], // Stamp 1 -> Far Left
    STAMP_ITEMS[1], // Stamp 2 -> Far Right
    STAMP_ITEMS[3], // Stamp 4 -> Mid Left
    STAMP_ITEMS[4], // Stamp 5 -> Mid Right
    STAMP_ITEMS[2], // Stamp 3 -> Center (Top of stack)
  ]

  const [stackOrder, setStackOrder] = useState(() => INITIAL_STAMPS.map(item => item.id))

  const [currentMapping, setCurrentMapping] = useState(() =>
    INITIAL_STAMPS.map((stamp, index) => ({ ...stamp, slot: SLOTS[index] }))
  )

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Trigger "hover" state on mount to show scattering animation
    setIsHovered(true)
    const timer = setTimeout(() => {
      setIsHovered(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handlePointerEnter = () => {
    if (selectedId) return // Don't randomize while focused

    const shuffledStamps = [...STAMP_ITEMS]
    for (let i = shuffledStamps.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffledStamps[i], shuffledStamps[j]] = [shuffledStamps[j], shuffledStamps[i]]
    }

    const nextMapping = shuffledStamps.map((stamp, index) => ({
      ...stamp,
      slot: SLOTS[index],
    }))

    setCurrentMapping(nextMapping)
    setIsHovered(true)
  }

  const handleStampClick = (id: string) => {
    if (selectedId !== id) {
      // Bring to front of stack when selected
      setStackOrder(prevOrder => [...prevOrder.filter(itemId => itemId !== id), id])
    }
    setSelectedId(selectedId === id ? null : id)
  }

  const isAnythingSelected = selectedId !== null

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full min-h-[340px] sm:min-h-[400px] py-8 gap-10">
      {/* Background Overlay for Focus Mode */}
      <AnimatePresence>
        {selectedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
            className="fixed inset-0 z-40 cursor-zoom-out"
          />
        )}
      </AnimatePresence>

      <div
        className="relative mx-auto h-[154px] w-[280px] cursor-default sm:h-[176px] sm:w-[420px]"
        onPointerEnter={handlePointerEnter}
        onPointerLeave={() => setIsHovered(false)}
      >
        {currentMapping.map(item => {
          const isSelected = selectedId === item.id
          const isDimmed = selectedId !== null && !isSelected

          // Determine the visual state
          let targetX = mounted && isHovered ? item.slot.fanned.x : item.slot.stacked.x
          let targetY = mounted && isHovered ? item.slot.fanned.y : item.slot.stacked.y
          let targetRotate =
            mounted && isHovered ? item.slot.fanned.rotate : item.slot.stacked.rotate

          const zIndex = stackOrder.indexOf(item.id) + 1
          const slotZ = SLOTS.indexOf(item.slot) + 1

          // Use slot-based zIndex when scattering on hover (center is highest: 5)
          // Otherwise use the persistent stack order
          let targetZ = mounted && isHovered && !selectedId ? slotZ : zIndex
          let targetScale = 1

          // Override if something is focused
          if (mounted && isSelected) {
            targetX = 0
            targetY = 0
            targetRotate = 0
            targetZ = 100
            targetScale = 1.8 // Pop it up
          }

          return (
            <motion.button
              key={item.id}
              id={item.id}
              type="button"
              aria-label={item.label}
              onClick={() => handleStampClick(item.id)}
              className="absolute left-1/2 top-1/2 inline-flex items-center justify-center focus-visible:outline-none motion-reduce:transition-none"
              initial={false}
              animate={{
                x: `calc(-50% + ${targetX}px)`,
                y: `calc(-50% + ${targetY}px)`,
                rotate: targetRotate,
                zIndex: targetZ,
                scale: targetScale,
                opacity: isDimmed ? 0.3 : 1,
                filter: isDimmed
                  ? 'blur(4px) brightness(0.7)'
                  : isHovered && !selectedId
                    ? 'drop-shadow(0 12px 24px oklch(0% 0 0 / 21%))'
                    : 'drop-shadow(0 2px 4px oklch(0% 0 0 / 10%))',
              }}
              transition={isSelected || selectedId === null ? FOCUS_TRANSITION : TRANSITION}
              style={{
                pointerEvents: selectedId && !isSelected ? 'none' : 'auto',
                willChange: 'transform',
                cursor: isSelected ? 'zoom-out' : 'zoom-in',
              }}
            >
              <Image
                src={item.src}
                alt={item.label}
                className="h-[118px] w-auto object-contain sm:h-[136px]"
              />
            </motion.button>
          )
        })}
      </div>

      {/* Description */}
      <p
        className={`text-sm font-[family-name:var(--font-components)] text-foreground-muted text-center max-w-[320px] sm:max-w-[360px] transition-all duration-500 ease-in-out ${
          isAnythingSelected ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        Hover to shuffle, click to inspect. A playful stamp deck with spring-based motion.
      </p>
    </div>
  )
}

export { StampCollection }
