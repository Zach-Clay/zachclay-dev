export const THEME_STORAGE_KEY = "theme"

export type Theme = "light" | "dark"

/** When nothing is stored: OS dark → dark, OS light → light, no-preference → dark, errors → light. */
export function getPreferredThemeWithoutStorage(): Theme {
  if (typeof window === "undefined") return "light"
  try {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark"
    }
    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      return "light"
    }
    return "dark"
  } catch {
    return "light"
  }
}

export function getStoredOrPreferredTheme(): Theme {
  if (typeof window === "undefined") return "light"
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === "light" || stored === "dark") return stored
  } catch {
    /* ignore */
  }
  return getPreferredThemeWithoutStorage()
}

export function applyThemeToDocument(theme: Theme): void {
  document.documentElement.classList.toggle("dark", theme === "dark")
}

export function persistTheme(theme: Theme): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    /* ignore */
  }
}
