import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react'
import { cn } from '@/lib/utils'

// ─────────────────────────────────────────────────────────────────────────────
// Hooks
// ─────────────────────────────────────────────────────────────────────────────

function useDiagonalPattern(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  isActive: boolean
) {
  const animationRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)
  const offsetRef = useRef<number>(0)

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return null

    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) return null

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    return { ctx, rect, dpr }
  }, [canvasRef])

  useEffect(() => {
    const setup = setupCanvas()
    if (!setup) return

    const { ctx, rect } = setup

    const lineSpacing = 10
    const lineWidth = 1
    const angle = -45 * (Math.PI / 180)
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    const diagonal = Math.sqrt(rect.width ** 2 + rect.height ** 2)
    const numLines = Math.ceil(diagonal / lineSpacing) * 2

    if (isActive && startTimeRef.current === 0) {
      startTimeRef.current = performance.now()
    }

    const draw = (now: number) => {
      ctx.clearRect(0, 0, rect.width, rect.height)

      const elapsed = now - startTimeRef.current
      const breathe = 0.12 + 0.06 * Math.sin(now * 0.003)

      for (let i = -numLines; i < numLines; i++) {
        const baseX = i * lineSpacing + (offsetRef.current % lineSpacing)
        const lineIndex = i + numLines
        const staggerDelay = lineIndex * 12
        const lineAge = Math.max(0, elapsed - staggerDelay)
        const lineFadeIn = Math.min(1, lineAge / 200)

        if (lineFadeIn <= 0) continue

        const lineOpacity = breathe * lineFadeIn

        const x1 = rect.width / 2 + baseX + cos * diagonal
        const y1 = rect.height / 2 + sin * diagonal
        const x2 = rect.width / 2 + baseX - cos * diagonal
        const y2 = rect.height / 2 - sin * diagonal

        const gradient = ctx.createLinearGradient(x1, y1, x2, y2)
        gradient.addColorStop(0, `rgba(255, 255, 255, 0)`)
        gradient.addColorStop(0.2, `rgba(255, 255, 255, ${lineOpacity})`)
        gradient.addColorStop(0.5, `rgba(255, 255, 255, ${lineOpacity * 1.2})`)
        gradient.addColorStop(0.8, `rgba(255, 255, 255, ${lineOpacity})`)
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`)

        ctx.strokeStyle = gradient
        ctx.lineWidth = lineWidth

        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
      }

      offsetRef.current -= 0.8
      animationRef.current = requestAnimationFrame(draw)
    }

    if (isActive) {
      animationRef.current = requestAnimationFrame(draw)
    } else {
      startTimeRef.current = 0
      cancelAnimationFrame(animationRef.current)
      ctx.clearRect(0, 0, rect.width, rect.height)
    }

    return () => cancelAnimationFrame(animationRef.current)
  }, [isActive, setupCanvas])
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

interface LoginButtonProps {
  onClick?: () => void
  label?: string
  className?: string
}

export function LoginButton({ onClick, label = 'LOG IN', className = '' }: LoginButtonProps) {
  const [isActive, setIsActive] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useDiagonalPattern(canvasRef, isActive)

  // Magnetic and Spotlight effects
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Subtle magnetic pull for the label
  const labelX = useSpring(useMotionValue(0), { stiffness: 150, damping: 15, mass: 0.1 })
  const labelY = useSpring(useMotionValue(0), { stiffness: 150, damping: 15, mass: 0.1 })

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const relativeX = e.clientX - rect.left
    const relativeY = e.clientY - rect.top

    mouseX.set(relativeX)
    mouseY.set(relativeY)

    // Calculate magnetic pull (max 4px displacement)
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    labelX.set((relativeX - centerX) * 0.1)
    labelY.set((relativeY - centerY) * 0.1)
  }

  const handlePointerLeave = () => {
    setIsActive(false)
    labelX.set(0)
    labelY.set(0)
  }

  const handlePointerEnter = () => {
    setIsActive(true)
  }

  const maskImage = useMotionTemplate`radial-gradient(100px at ${mouseX}px ${mouseY}px, white, transparent)`

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={cn(
        'group relative inline-flex items-center justify-center overflow-hidden',
        'min-w-[100px] px-6 py-2',
        'border rounded-sm',
        "font-['Iosevka',_var(--font-mono)] text-base font-medium tracking-[0.12em]",
        'transition-colors duration-500',
        'outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-400',
        'cursor-pointer select-none',
        isActive
          ? 'bg-neutral-900 border-neutral-700 text-white'
          : 'bg-background border-border text-foreground',
        className
      )}
      aria-label={label}
    >
      {/* Animated diagonal line background */}
      <canvas
        ref={canvasRef}
        className={cn(
          'absolute inset-0 w-full h-full pointer-events-none mix-blend-screen',
          'transition-opacity duration-300 ease-[cubic-bezier(0.77,0,0.175,1)]',
          isActive ? 'opacity-100' : 'opacity-0'
        )}
      />

      {/* Spotlight Hover Effect */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      />

      {/* Label with magnetic pull */}
      <motion.span
        style={{ x: labelX, y: labelY }}
        className={cn(
          'relative z-10 block leading-none',
          'transition-transform duration-300 ease-[cubic-bezier(0.77,0,0.175,1)]',
          isActive ? 'scale-[1.02]' : 'scale-100'
        )}
      >
        {label}
      </motion.span>
    </motion.button>
  )
}

export default LoginButton
