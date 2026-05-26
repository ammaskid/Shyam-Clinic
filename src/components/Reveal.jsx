/* ============================================================
   Reveal — scroll-triggered fade-in wrapper
   BULLETPROOF: content can never stay permanently hidden.
   - reveals immediately if already on screen
   - safety timeout always reveals after 1.2s
   - fails OPEN if IntersectionObserver is unavailable
   ============================================================ */

import { useEffect, useRef, useState } from 'react'

export default function Reveal({ children, delay = 0, className = '', as = 'div' }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }

    // Already on/near screen at mount -> show immediately.
    const rect = el.getBoundingClientRect()
    const vh = window.innerHeight || document.documentElement.clientHeight
    if (rect.top < vh * 0.95) {
      setShown(true)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.unobserve(el)
        }
      },
      { threshold: 0, rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(el)

    // SAFETY NET: always reveal after 1.2s so content is never
    // stuck invisible (the bug that broke mobile before).
    const safety = setTimeout(() => setShown(true), 1200)

    return () => {
      io.disconnect()
      clearTimeout(safety)
    }
  }, [])

  const Tag = as
  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? 'in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </Tag>
  )
}
