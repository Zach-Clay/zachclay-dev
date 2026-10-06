"use client"

import { useEffect, useRef } from "react"

const MARQUEE = "ZACHARY CLAY · "
const FIRST = "Zachary"
const LAST = "Clay"

function LetterLine({
  text,
  delayMs,
  className,
}: {
  text: string
  delayMs: number
  className?: string
}) {
  return (
    <span className={className}>
      {Array.from(text).map((ch, i) => (
        <span className="hero-letter-mask" key={`${ch}-${i}`}>
          <span className="hero-letter" style={{ animationDelay: `${delayMs + i * 45}ms` }}>
            {ch}
          </span>
        </span>
      ))}
    </span>
  )
}

export default function Hero() {
  const stageRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (motion.matches) return

    let px = 0.5
    let py = 0.42
    let tx = 0.5
    let ty = 0.42
    let raf = 0

    function onMove(e: PointerEvent) {
      tx = e.clientX / window.innerWidth
      ty = e.clientY / window.innerHeight
    }

    function tick() {
      px += (tx - px) * 0.07
      py += (ty - py) * 0.07
      stage?.style.setProperty("--px", `${px * 100}%`)
      stage?.style.setProperty("--py", `${py * 100}%`)
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("pointermove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  const marqueeText = MARQUEE.repeat(8)

  return (
    <section
      ref={stageRef}
      id="home"
      className="hero-stage bg-base-100 text-base-content relative isolate flex min-h-dvh flex-col overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="hero-orbs" aria-hidden>
        <div className="hero-orb hero-orb-a" />
        <div className="hero-orb hero-orb-b" />
        <div className="hero-orb hero-orb-c" />
      </div>
      <div className="hero-spotlight" aria-hidden />
      <div className="hero-grain" aria-hidden />
      <div className="hero-shutter" aria-hidden />

      <div className="hero-marquee-wrap" aria-hidden>
        <div className="hero-marquee">
          <span>{marqueeText}</span>
          <span>{marqueeText}</span>
        </div>
        <div className="hero-marquee hero-marquee-reverse">
          <span>{marqueeText}</span>
          <span>{marqueeText}</span>
        </div>
      </div>

      <div className="hero-viewfinder" aria-hidden>
        <span className="hero-corner hero-corner-tl" />
        <span className="hero-corner hero-corner-tr" />
        <span className="hero-corner hero-corner-bl" />
        <span className="hero-corner hero-corner-br" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-center px-8 py-28 md:px-16">
        <h1
          id="hero-heading"
          className="font-display text-base-content text-[clamp(3.4rem,12vw,9.5rem)] leading-[0.92] font-medium tracking-[-0.04em]"
        >
          <span className="sr-only">Zachary Clay</span>
          <span aria-hidden>
            <LetterLine text={FIRST} delayMs={220} className="block" />
            <LetterLine text={LAST} delayMs={480} className="mt-[0.06em] block" />
          </span>
        </h1>

        <div className="hero-rule mt-8 max-w-48 md:max-w-72" aria-hidden />

        <p className="hero-domain text-secondary mt-8 text-[0.68rem] tracking-[0.28em] lowercase">
          zachclay.dev
        </p>
      </div>
    </section>
  )
}
