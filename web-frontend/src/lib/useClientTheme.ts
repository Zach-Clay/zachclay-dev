import { useEffect, useState } from "react"
import { applyThemeToDocument, getStoredOrPreferredTheme, persistTheme, type Theme } from "./theme"

export function useClientTheme() {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<Theme>("light")

  useEffect(() => {
    setMounted(true)
    const initial = getStoredOrPreferredTheme()
    setTheme(initial)
    applyThemeToDocument(initial)
  }, [])

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark"
    setTheme(next)
    persistTheme(next)
    applyThemeToDocument(next)
  }

  return { mounted, theme, toggle, isDark: theme === "dark" } as const
}
