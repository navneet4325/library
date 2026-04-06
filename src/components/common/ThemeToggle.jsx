import { MoonStar, SunMedium } from 'lucide-react'
import { useAppStore } from '../../hooks/useAppStore'

export function ThemeToggle() {
  const { theme, toggleTheme } = useAppStore()
  const isLight = theme === 'light'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="soft-button h-12 w-12"
      aria-label={`Activate ${isLight ? 'dark' : 'light'} mode`}
    >
      {isLight ? <MoonStar className="h-5 w-5" /> : <SunMedium className="h-5 w-5" />}
    </button>
  )
}
