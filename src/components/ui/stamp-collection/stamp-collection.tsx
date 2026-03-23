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

const MailIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="block size-5 shrink-0"
  >
    <path
      d="M2.34086 6.38914C2.1622 6.8145 2.08371 7.26454 2.0442 7.74818C1.99998 8.28936 1.99999 8.95371 2 9.75867V14.2413C1.99999 15.0463 1.99998 15.7106 2.0442 16.2518C2.09012 16.8139 2.18868 17.3306 2.43598 17.816C2.81947 18.5686 3.43139 19.1805 4.18404 19.564C4.66938 19.8113 5.18608 19.9099 5.74818 19.9558C6.28936 20 6.95371 20 7.75866 20H16.2413C17.0462 20 17.7106 20 18.2518 19.9558C18.8139 19.9099 19.3306 19.8113 19.816 19.564C20.5686 19.1805 21.1805 18.5686 21.564 17.816C21.8113 17.3306 21.9099 16.8139 21.9558 16.2518C22 15.7106 22 15.0463 22 14.2413V9.75868C22 8.95372 22 8.28937 21.9558 7.74818C21.9163 7.26453 21.8378 6.81449 21.6591 6.38912L14.5329 12.2196C13.0595 13.4252 10.9405 13.4252 9.46703 12.2196L2.34086 6.38914Z"
      fill="currentColor"
    />
    <path
      d="M20.4224 4.8169C20.233 4.67277 20.0302 4.54512 19.816 4.43598C19.3306 4.18868 18.8139 4.09012 18.2518 4.0442C17.7106 3.99998 17.0463 3.99999 16.2413 4H7.7587C6.95375 3.99999 6.28936 3.99998 5.74818 4.0442C5.18608 4.09012 4.66938 4.18868 4.18404 4.43598C3.96982 4.54512 3.76701 4.67278 3.57762 4.81691L10.7335 10.6717C11.4702 11.2745 12.5297 11.2745 13.2665 10.6717L20.4224 4.8169Z"
      fill="currentColor"
    />
  </svg>
)

const StampCollection = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const validateEmail = (email: string) => {
    if (!email) return 'Email address is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email'
    return ''
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const error = validateEmail(email)
    if (error) {
      setEmailError(error)
      return
    }
    setEmailError('')
    setIsSubmitting(true)
    setTimeout(() => {
      setEmail('')
      setIsSubmitting(false)
    }, 1500)
  }

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
    <div className="relative flex flex-col items-center justify-center w-full h-full min-h-[480px] py-12 gap-16">
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

      {/* Newsletter Section */}
      <div
        className={`flex flex-col items-center gap-4 w-full max-w-[320px] sm:max-w-[360px] transition-all duration-500 ease-in-out ${
          isAnythingSelected ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        <p className="text-xl text-foreground-secondary font-serif text-center">
          Subscribe to the newsletter!
        </p>
        <form className="relative w-full group" onSubmit={handleSubmit} noValidate>
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <div className="absolute left-4 top-[50%] -translate-y-1/2 text-foreground-muted pointer-events-none group-focus-within:text-accent transition-colors duration-300">
            <MailIcon />
          </div>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={e => {
              setEmail(e.target.value)
              if (emailError) setEmailError('')
            }}
            placeholder="Email address"
            aria-invalid={!!emailError}
            aria-describedby={emailError ? 'email-error' : undefined}
            className="w-full h-11 pl-11 pr-24 rounded-full bg-surface/60 border border-border/40 text-foreground text-base placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 focus:bg-surface/80 transition-all duration-300"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="absolute right-1 top-1 bottom-1 px-5 rounded-full bg-foreground text-background text-sm font-semibold hover:bg-foreground/90 active:scale-[0.97] disabled:opacity-50 transition-all duration-200"
          >
            {isSubmitting ? '...' : 'Join'}
          </button>
        </form>
        {emailError && (
          <p id="email-error" className="text-sm text-red-400" role="alert">
            {emailError}
          </p>
        )}
      </div>
    </div>
  )
}

export { StampCollection }
