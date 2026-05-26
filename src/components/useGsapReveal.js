/* ============================================================
   useGsapReveal — GSAP ScrollTrigger animation hook
   Animates children of a container as they scroll into view.
   SAFE: if GSAP fails to load, content stays fully visible
   (no opacity:0 left behind — the mobile bug must never return).
   ============================================================ */

import { useEffect, useRef } from 'react'

let gsapLib = null
let scrollTriggerLib = null
let loadPromise = null

// Lazy-load GSAP so a load failure can't block the whole app.
function loadGsap() {
  if (loadPromise) return loadPromise
  loadPromise = (async () => {
    try {
      const g = await import('gsap')
      const st = await import('gsap/ScrollTrigger')
      gsapLib = g.gsap || g.default
      scrollTriggerLib = st.ScrollTrigger || st.default
      gsapLib.registerPlugin(scrollTriggerLib)
      return true
    } catch (e) {
      console.warn('GSAP failed to load — animations disabled, content still visible.', e)
      return false
    }
  })()
  return loadPromise
}

/**
 * Attach to a section. All elements matching `selector` inside it
 * will fade + slide up in a stagger as the section enters view.
 */
export function useGsapReveal(selector = '.g-item', opts = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const reduce = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let ctx = null
    let cancelled = false

    loadGsap().then((ok) => {
      if (cancelled || !ok || reduce) return
      const els = root.querySelectorAll(selector)
      if (!els.length) return

      ctx = gsapLib.context(() => {
        gsapLib.from(els, {
          y: opts.y ?? 40,
          opacity: 0,
          duration: opts.duration ?? 0.7,
          ease: opts.ease ?? 'power2.out',
          stagger: opts.stagger ?? 0.09,
          scrollTrigger: {
            trigger: root,
            start: opts.start ?? 'top 82%',
            once: true,
          },
        })
      }, root)
    })

    return () => {
      cancelled = true
      if (ctx) ctx.revert()
    }
  }, [selector])

  return ref
}

/** Simple one-element fade-up (e.g. headings). */
export function useGsapFadeUp(opts = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let ctx = null
    let cancelled = false

    loadGsap().then((ok) => {
      if (cancelled || !ok || reduce) return
      ctx = gsapLib.context(() => {
        gsapLib.from(el, {
          y: opts.y ?? 30,
          opacity: 0,
          duration: opts.duration ?? 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        })
      }, el)
    })

    return () => {
      cancelled = true
      if (ctx) ctx.revert()
    }
  }, [])

  return ref
}
