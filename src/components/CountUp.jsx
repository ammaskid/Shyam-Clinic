/* ============================================================
   CountUp — animates a number from 0 to its target value
   when it scrolls into view. Handles prefixes/suffixes like
   "₹", "+", "★", "%", decimals, and comma formatting.
   SAFE: if anything fails, shows the final value immediately.
   ============================================================ */

import { useEffect, useRef, useState } from 'react'

/**
 * props:
 *  - value: number (the target)
 *  - prefix / suffix: strings around the number
 *  - decimals: how many decimal places
 *  - duration: ms
 *  - separator: thousands separator (default ',')
 */
export default function CountUp({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 1600,
  separator = ',',
  className = '',
}) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(0)
  const started = useRef(false)

  const format = (n) => {
    const fixed = Number(n).toFixed(decimals)
    const [intPart, decPart] = fixed.split('.')
    const withSep = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    return prefix + withSep + (decPart ? '.' + decPart : '') + suffix
  }

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const run = () => {
      if (started.current) return
      started.current = true
      const reduce = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) { setDisplay(value); return }

      const start = performance.now()
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1)
        // easeOutExpo for a punchy 0->100 feel
        const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
        setDisplay(value * eased)
        if (p < 1) requestAnimationFrame(tick)
        else setDisplay(value)
      }
      requestAnimationFrame(tick)
    }

    if (typeof IntersectionObserver === 'undefined') { run(); return }

    // already visible?
    const rect = el.getBoundingClientRect()
    const vh = window.innerHeight || document.documentElement.clientHeight
    if (rect.top < vh * 0.92) { run(); return }

    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { run(); io.disconnect() } },
      { threshold: 0.2 }
    )
    io.observe(el)

    // safety: ensure final value shows no matter what
    const safety = setTimeout(() => { if (!started.current) { setDisplay(value) } }, 2000)

    return () => { io.disconnect(); clearTimeout(safety) }
  }, [value, duration, decimals])

  return <span ref={ref} className={className}>{format(display)}</span>
}
