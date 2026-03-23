'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export type Theme = 'dark' | 'light' | 'system'

interface ThemeContextValue {
  theme: Theme
  resolvedTheme: 'dark' | 'light'
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

function getSystemTheme(): 'dark' | 'light' {
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system')

  // Initialize theme from localStorage after mount
  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null
    if (stored) setTheme(stored)
  }, [])

  const resolvedTheme = theme === 'system' ? getSystemTheme() : theme

  // Listen for system theme changes
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      if (theme === 'system') {
        // Force re-render
        setTheme('system')
      }
    }
    media.addEventListener('change', handler)
    return () => media.removeEventListener('change', handler)
  }, [theme])

  // Apply theme class to <html>
  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(resolvedTheme)
    localStorage.setItem('theme', theme)
  }, [theme, resolvedTheme])

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
  return ctx
}
