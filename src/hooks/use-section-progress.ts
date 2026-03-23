import { useState, useEffect } from 'react'

export function useSectionProgress(sectionIds: string[]) {
  const [progress, setProgress] = useState<Record<string, number>>({})

  useEffect(() => {
    const handleScroll = () => {
      const newProgress: Record<string, number> = {}
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      sectionIds.forEach(id => {
        const element = document.getElementById(id)
        if (!element) {
          newProgress[id] = 0
          return
        }

        const rect = element.getBoundingClientRect()
        const elementTop = rect.top + scrollPosition
        const elementHeight = rect.height

        // Calculate visible progress
        // We consider the section "active" when it enters the viewport
        // and "complete" when it leaves or scrolls past a certain point.
        // A simple approach:
        // 0% when top of section is at bottom of viewport
        // 100% when bottom of section is at bottom of viewport (or top of viewport?)

        // Let's refine: The user wants "behave according to content length".
        // Usually this means: how much of this section has been read?
        // Progress = (Scrolled Distance into Section) / (Section Height)

        // Distance into section = (Scroll + WindowHeight) - ElementTop?
        // No, standard reading progress usually tracks top of view relative to element.

        // Let's try:
        // Start: Top of section hits bottom of viewport? Or top of viewport?
        // For a "reading" progress bar, usually:
        // 0 = Section just started entering view (or is about to be read)
        // 1 = Section finished reading (bottom of section aligned with bottom of view)

        // Let's stick to a standard logic:
        // We want the progress bar to fill as we scroll DOWN through the section.
        // So progress should be 0, then enter >0 when we start reading it.
        // Let's say we read it when it crosses the middle of the screen?
        // Or simply: What percentage of the section has passed the top of the viewport?

        // But for a continuous "timeline", we probably want:
        // If we are BEFORE the section, it's 0.
        // If we are AFTER the section, it's 1.
        // If we are INSIDE, it's 0..1.

        // Actually, let's keep it simple:
        // Progress based on how much of the section has passed a reference line (e.g. top of screen + offset)

        const referenceLine = scrollPosition + windowHeight * 0.3 // 30% down the screen

        if (referenceLine < elementTop) {
          newProgress[id] = 0
        } else if (referenceLine > elementTop + elementHeight) {
          newProgress[id] = 1
        } else {
          const returned = (referenceLine - elementTop) / elementHeight
          newProgress[id] = Math.max(0, Math.min(1, returned))
        }
      })

      setProgress(newProgress)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionIds])

  return progress
}
