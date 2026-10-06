"use client"

import { useClientTheme } from "../lib/useClientTheme"
import { ThemeIconButton } from "./ThemeToggle"

export default function SiteHeader() {
  const { mounted, isDark, toggle } = useClientTheme()

  return (
    <nav
      className="text-base-content pointer-events-none fixed inset-x-0 top-0 z-50 px-6 py-5 md:px-8"
      aria-label="Primary"
    >
      <div className="pointer-events-auto flex items-center justify-between">
        <a
          href="#home"
          aria-label="Zachary Clay home"
          className="focus-visible:outline-base-content inline-flex items-center focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          <img src="/favicon.svg" alt="" aria-hidden="true" className="h-8 w-8" />
        </a>
        <ThemeIconButton mounted={mounted} isDark={isDark} onToggle={toggle} />
      </div>
    </nav>
  )
}
