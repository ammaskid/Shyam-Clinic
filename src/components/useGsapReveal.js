/* ============================================================
   GSAP animation system
   - usePageAnimations(): one hook that animates an entire page.
     It auto-targets common classes (.section-head, cards, etc.)
     and animates them on scroll with stagger.
   SAFE: lazy-loads GSAP; if it fails, content stays fully
   visible (CSS keeps everything at opacity 1 by default).
   ============================================================ */

import { useEffect, useRef } from 'react'

let gsapLib = null
let scrollTriggerLib = null
let loadPromise = null

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
      console.warn('GSAP unavailable — content still visible.', e)
      return false
    }
  })()
  return loadPromise
}

/**
 * usePageAnimations — attach the returned ref to a page wrapper.
 * Everything with class `.anim` inside animates up+fade on scroll.
 * Add `.anim-stagger` to a container to stagger its direct children.
 */
export function usePageAnimations() {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const reduce = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    let ctx = null
    let cancelled = false

    loadGsap().then((ok) => {
      if (cancelled || !ok) return

      ctx = gsapLib.context(() => {
        // 1) single elements with .anim
        const singles = root.querySelectorAll('.anim')
        singles.forEach((el) => {
          gsapLib.from(el, {
            y: 44,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 86%', once: true },
          })
        })

        // 2) staggered groups: .anim-stagger animates its children
        const groups = root.querySelectorAll('.anim-stagger')
        groups.forEach((group) => {
          const kids = group.children
          if (!kids.length) return
          gsapLib.from(kids, {
            y: 50,
            opacity: 0,
            scale: 0.96,
            duration: 0.7,
            ease: 'power2.out',
            stagger: 0.1,
            scrollTrigger: { trigger: group, start: 'top 82%', once: true },
          })
        })

        // 3) gentle parallax on .anim-parallax elements
        const parallax = root.querySelectorAll('.anim-parallax')
        parallax.forEach((el) => {
          gsapLib.to(el, {
            yPercent: -12,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          })
        })

        scrollTriggerLib.refresh()
      }, root)
    })

    return () => {
      cancelled = true
      if (ctx) ctx.revert()
    }
  }, [])

  return ref
}
