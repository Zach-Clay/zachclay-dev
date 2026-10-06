"use client"

import { useClientTheme } from "../lib/useClientTheme"

const iconClass = "h-5 w-5 shrink-0 text-base-content"

function MoonIcon() {
  return (
    <svg
      className={iconClass}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg
      className={iconClass}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

export const themeToggleButtonClass =
  "inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-sm border border-base-content/25 bg-base-100/40 text-base-content backdrop-blur-sm hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base-content"

type ThemeIconButtonProps = {
  mounted: boolean
  isDark: boolean
  onToggle: () => void
  className?: string
}

export function ThemeIconButton({
  mounted,
  isDark,
  onToggle,
  className = "",
}: ThemeIconButtonProps) {
  const combined = `${themeToggleButtonClass} ${className}`.trim()

  if (!mounted) {
    return (
      <span className={`${combined} pointer-events-none opacity-0`} aria-hidden>
        <MoonIcon />
      </span>
    )
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={combined}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}

export default function ThemeToggle() {
  const { mounted, isDark, toggle } = useClientTheme()
  return <ThemeIconButton mounted={mounted} isDark={isDark} onToggle={toggle} />
}
