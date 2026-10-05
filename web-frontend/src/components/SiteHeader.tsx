"use client"

import { useCallback, useEffect, useId, useRef, useState } from "react"
import { useClientTheme } from "../lib/useClientTheme"
import { ThemeIconButton } from "./ThemeToggle"
import teleoLogo from "../assets/teleo.svg"

const NAV_LINKS = [
  { href: "#what-we-do", label: "What We Do" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
] as const

const linkClass =
  "font-nav tracking-tight transition-colors hover:underline hover:decoration-base-content/40 hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base-content rounded-sm"

export default function SiteHeader() {
  const menuId = useId()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { mounted, isDark, toggle } = useClientTheme()
  const closeMobile = useCallback(() => setMobileOpen(false), [])

  // Hide-on-scroll-down / show-on-scroll-up
  const [visible, setVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const lastScrollY = useRef(0)
  const anchorY = useRef(0) // position where current direction started

  useEffect(() => {
    const HIDE_AFTER = 64 // px scrolled down before hiding
    const SHOW_AFTER = 32 // px scrolled up before showing

    function onScroll() {
      const currentY = window.scrollY
      const delta = currentY - lastScrollY.current

      setScrolled(currentY > 10)

      if (currentY < 60) {
        // Always visible near the top
        setVisible(true)
        anchorY.current = currentY
      } else if (delta > 0) {
        // Scrolling down — hide after enough movement
        if (currentY - anchorY.current > HIDE_AFTER) {
          setVisible(false)
          anchorY.current = currentY
        }
      } else if (delta < 0) {
        // Scrolling up — show after enough movement
        if (anchorY.current - currentY > SHOW_AFTER) {
          setVisible(true)
          anchorY.current = currentY
        }
      }

      lastScrollY.current = currentY
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Always show nav when mobile menu is open
  const navVisible = visible || mobileOpen

  useEffect(() => {
    if (!mobileOpen) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeMobile()
    }
    document.addEventListener("keydown", onKeyDown)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = prev
    }
  }, [mobileOpen, closeMobile])

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)")
    function onMq() {
      if (mq.matches) setMobileOpen(false)
    }
    mq.addEventListener("change", onMq)
    return () => mq.removeEventListener("change", onMq)
  }, [])

  return (
    <nav
      style={{
        transform: navVisible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
        willChange: "transform",
      }}
      className={[
        "text-base-content fixed inset-x-0 top-0 z-50 px-6 py-4",
        scrolled
          ? "bg-base-100/90 border-base-300 border-b shadow-sm backdrop-blur-md"
          : "bg-base-100",
      ].join(" ")}
      aria-label="Primary"
    >
      <div className="relative mx-auto max-w-7xl">
        {/* Desktop */}
        <div className="hidden grid-cols-[1fr_auto_1fr] items-center gap-4 md:grid">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-display focus-visible:outline-base-content flex cursor-pointer items-center gap-1 justify-self-start rounded-sm text-2xl font-extrabold tracking-tight transition-opacity hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <img
              src={teleoLogo.src}
              alt="Teleo"
              className="h-14 w-14 dark:filter-[contrast(0.8)_invert(1)]"
            />
            <span className="-ml-2">Teleo</span>
          </button>
          <ul className="flex justify-center gap-6">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a href={href} className={`${linkClass} text-sm font-bold`}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3 justify-self-end">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("teleo:open-contact"))}
              className="font-nav bg-highlight text-on-highlight focus-visible:outline-highlight cursor-pointer rounded-md px-4 py-2 text-sm font-bold transition-[filter] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Let's Connect
            </button>
            <ThemeIconButton mounted={mounted} isDark={isDark} onToggle={toggle} />
          </div>
        </div>

        {/* Mobile top bar */}
        <div className="md:hidden">
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="font-display focus-visible:outline-base-content flex cursor-pointer items-center rounded-sm text-2xl font-extrabold tracking-tight transition-opacity hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <img
                src={teleoLogo.src}
                alt="Teleo"
                className="h-16 w-16 dark:filter-[contrast(0.8)_invert(1)]"
              />
              <span className="-ml-2">Teleo</span>
            </button>
            <button
              type="button"
              className="border-base-300 bg-base-100 text-base-content hover:bg-base-200 focus-visible:outline-base-content inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border focus-visible:outline-2 focus-visible:outline-offset-2"
              aria-expanded={mobileOpen}
              aria-controls={menuId}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>

          {mobileOpen ? (
            <>
              <button
                type="button"
                className="bg-base-content/20 fixed inset-0 z-40 backdrop-blur-sm md:hidden"
                aria-label="Close menu"
                onClick={closeMobile}
              />
              <div
                id={menuId}
                className="border-base-300 bg-base-100 absolute top-full right-0 left-0 z-60 mt-2 rounded-lg border p-4 shadow-lg md:hidden"
                role="dialog"
                aria-modal="true"
                aria-label="Main menu"
              >
                <ul className="flex flex-col gap-1">
                  <li>
                    <button
                      type="button"
                      className="font-nav bg-highlight text-on-highlight focus-visible:outline-highlight mb-2 block w-full cursor-pointer rounded-md px-4 py-3 text-center text-sm font-bold transition-[filter] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2"
                      onClick={() => {
                        closeMobile()
                        window.dispatchEvent(new CustomEvent("teleo:open-contact"))
                      }}
                    >
                      Let's Connect
                    </button>
                  </li>
                  {NAV_LINKS.map(({ href, label }) => (
                    <li key={href}>
                      <a
                        href={href}
                        className={`${linkClass} block py-3 text-sm font-bold`}
                        onClick={closeMobile}
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                  <li className="flex items-center py-3">
                    <ThemeIconButton mounted={mounted} isDark={isDark} onToggle={toggle} />
                  </li>
                </ul>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  )
}

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}
