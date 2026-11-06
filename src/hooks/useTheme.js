/** @fileoverview Theme management hook for light/dark switching. */

import { useEffect, useState } from 'react'

const THEME_KEY = 'task-manager.theme'

function getInitialTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY)
    if (saved === 'dark' || saved === 'light') return saved
  } catch {
    // Ignore blocked storage and fall back to the system preference.
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * Manage the current UI theme and persist it to local storage.
 * @returns {{ theme: 'light' | 'dark', toggleTheme: () => void }} The active theme and a toggle callback.
 */
export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch {
      // Theme still applies for this session.
    }
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  return { theme, toggleTheme }
}
