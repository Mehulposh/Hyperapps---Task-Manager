/** @fileoverview Theme toggle button. */

/**
 * Toggle button for switching between light and dark themes.
 * @param {{ theme: 'light' | 'dark', onToggle: () => void }} props
 * @returns {JSX.Element} The theme switch control.
 */
export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isDark}
      className="rounded-md border border-ink/20 px-3 py-1 text-sm font-medium hover:bg-ink/5"
    >
      {isDark ? 'Dark' : 'Light'} theme
    </button>
  )
}
