/* ============================================================
   ParticleBackground — subtle floating dental particles
   behind the whole site. Pure <canvas> + requestAnimationFrame
   (no library), so it's light and can't break the build.
   Respects reduced-motion. Sits fixed behind all content.
   ============================================================ */

import { useEffect, useRef } from 'react'

export default function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const reduce = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0, h = 0, frameId = null
    const DPR = Math.min(window.devicePixelRatio || 1, 2)

    // particle palette — minty dental tones
    const colors = ['#43c9b0', '#7fdcc6', '#a9eade', '#e2a93b']
    const COUNT = window.innerWidth < 760 ? 22 : 40
    let particles = []

    const make = () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 3 + Math.random() * 9,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -0.15 - Math.random() * 0.35,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.012,
      color: colors[(Math.random() * colors.length) | 0],
      alpha: 0.12 + Math.random() * 0.22,
      shape: Math.random() < 0.5 ? 'tooth' : (Math.random() < 0.5 ? 'circle' : 'spark'),
    })

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * DPR
      canvas.height = h * DPR
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }
    resize()
    particles = Array.from({ length: COUNT }, make)

    // draw a tiny tooth silhouette
    const drawTooth = (s) => {
      ctx.beginPath()
      ctx.moveTo(0, -s)
      ctx.bezierCurveTo(-s, -s * 1.1, -s * 1.1, s * 0.2, -s * 0.5, s * 0.5)
      ctx.bezierCurveTo(-s * 0.3, s, -s * 0.15, s, 0, s * 0.55)
      ctx.bezierCurveTo(s * 0.15, s, s * 0.3, s, s * 0.5, s * 0.5)
      ctx.bezierCurveTo(s * 1.1, s * 0.2, s, -s * 1.1, 0, -s)
      ctx.closePath()
    }
    const drawSpark = (s) => {
      ctx.beginPath()
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2
        ctx.lineTo(Math.cos(a) * s, Math.sin(a) * s)
        const a2 = a + Math.PI / 4
        ctx.lineTo(Math.cos(a2) * s * 0.35, Math.sin(a2) * s * 0.35)
      }
      ctx.closePath()
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of particles) {
        if (!reduce) {
          p.x += p.vx
          p.y += p.vy
          p.rot += p.vr
        }
        // wrap around
        if (p.y < -20) { p.y = h + 20; p.x = Math.random() * w }
        if (p.x < -20) p.x = w + 20
        if (p.x > w + 20) p.x = -20

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.globalAlpha = p.alpha
        ctx.fillStyle = p.color
        if (p.shape === 'tooth') drawTooth(p.r)
        else if (p.shape === 'spark') drawSpark(p.r)
        else { ctx.beginPath(); ctx.arc(0, 0, p.r * 0.6, 0, Math.PI * 2) }
        ctx.fill()
        ctx.restore()
      }
      frameId = requestAnimationFrame(draw)
    }
    draw()

    window.addEventListener('resize', resize)
    return () => {
      if (frameId) cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-bg" aria-hidden="true" />
}
