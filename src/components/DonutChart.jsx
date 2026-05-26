/* ============================================================
   DonutChart — animated SVG donut/ring chart.
   Pure SVG, animates the stroke on mount. No library.
   ============================================================ */

import { useEffect, useState } from 'react'

export default function DonutChart({
  segments = [],   // [{ label, value, color }]
  size = 170,
  thickness = 22,
  centerLabel = '',
  centerSub = '',
}) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const reduce = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { setProgress(1); return }
    let raf
    const start = performance.now()
    const dur = 1100
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1)
      setProgress(1 - Math.pow(1 - p, 3))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const total = segments.reduce((s, x) => s + x.value, 0) || 1
  const r = (size - thickness) / 2
  const cx = size / 2
  const circ = 2 * Math.PI * r

  let offset = 0
  const arcs = segments.map((seg) => {
    const frac = (seg.value / total) * progress
    const len = frac * circ
    const arc = {
      color: seg.color,
      dash: `${len} ${circ - len}`,
      rot: (offset / circ) * 360 - 90,
    }
    offset += (seg.value / total) * circ
    return arc
  })

  return (
    <div className="donut" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={cx} cy={cx} r={r} fill="none"
                stroke="var(--sand)" strokeWidth={thickness} />
        {arcs.map((a, i) => (
          <circle key={i} cx={cx} cy={cx} r={r} fill="none"
                  stroke={a.color} strokeWidth={thickness}
                  strokeDasharray={a.dash} strokeLinecap="round"
                  transform={`rotate(${a.rot} ${cx} ${cx})`} />
        ))}
      </svg>
      <div className="donut-center">
        <b>{centerLabel}</b>
        <span>{centerSub}</span>
      </div>
    </div>
  )
}
