/* ============================================================
   Scene3D — versatile dental 3D element for any page.
   variant: 'tooth' | 'sparkle' | 'shield' | 'orbit' | 'ring'
   Built from primitive geometry (Three r0.160+ safe).
   SAFE: WebGL/Three failure -> clean SVG fallback.
   ============================================================ */

import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'

const FALLBACK_ICON = {
  tooth: 'tooth', sparkle: 'sparkle', shield: 'shieldcheck',
  orbit: 'star', ring: 'heart',
}

export default function Scene3D({ variant = 'tooth', height = 320 }) {
  const mountRef = useRef(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let renderer, scene, camera, frameId
    let cancelled = false
    const mount = mountRef.current
    if (!mount) return

    const reduce = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    ;(async () => {
      try {
        const THREE = await import('three')
        if (cancelled || !mount) return

        const w = mount.clientWidth || 360
        const h = height

        scene = new THREE.Scene()
        camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100)
        camera.position.set(0, 0, 8)

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setSize(w, h)
        if (renderer.outputColorSpace !== undefined) {
          renderer.outputColorSpace = THREE.SRGBColorSpace
        }
        mount.appendChild(renderer.domElement)

        // glow halo behind everything
        const halo = new THREE.Mesh(
          new THREE.CircleGeometry(2.8, 48),
          new THREE.MeshBasicMaterial({ color: 0x43c9b0, transparent: true, opacity: 0.16 })
        )
        halo.position.z = -1.6
        scene.add(halo)

        const root = new THREE.Group()
        scene.add(root)

        const enamel = new THREE.MeshStandardMaterial({
          color: 0xfdfdfb, roughness: 0.13, metalness: 0.12,
          emissive: 0xdef7f0, emissiveIntensity: 0.2,
        })

        // ----- BUILD VARIANT -----
        const spinners = []  // extra objects animated each frame

        const buildTooth = () => {
          const crown = new THREE.Mesh(new THREE.SphereGeometry(1.25, 64, 64), enamel)
          crown.scale.set(1.05, 0.8, 0.95); crown.position.y = 0.6
          root.add(crown)
          const body = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 0.8, 1.4, 64), enamel)
          body.position.y = -0.3; root.add(body)
          const rg = new THREE.CylinderGeometry(0.5, 0.05, 1.8, 36)
          const rl = new THREE.Mesh(rg, enamel)
          rl.position.set(-0.42, -1.55, 0); rl.rotation.z = 0.25; root.add(rl)
          const rr = new THREE.Mesh(rg, enamel)
          rr.position.set(0.42, -1.55, 0); rr.rotation.z = -0.25; root.add(rr)
        }

        const buildShield = () => {
          // a rounded shield (dental protection / safety)
          const shieldMat = new THREE.MeshStandardMaterial({
            color: 0x16a394, roughness: 0.25, metalness: 0.35,
            emissive: 0x0f7268, emissiveIntensity: 0.3,
          })
          const top = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 0.4, 6), shieldMat)
          top.rotation.x = Math.PI / 2; top.position.y = 0.4
          root.add(top)
          const cone = new THREE.Mesh(new THREE.ConeGeometry(1.5, 1.8, 6), shieldMat)
          cone.rotation.x = Math.PI; cone.position.y = -0.9
          root.add(cone)
          // a white check mark made of two boxes
          const cm = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.3 })
          const c1 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.9, 0.3), cm)
          c1.position.set(-0.25, -0.1, 0.5); c1.rotation.z = 0.7
          root.add(c1)
          const c2 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.5, 0.3), cm)
          c2.position.set(0.35, 0.15, 0.5); c2.rotation.z = -0.7
          root.add(c2)
        }

        const buildSparkle = () => {
          // a big central gem + small ones
          const gem = new THREE.Mesh(
            new THREE.OctahedronGeometry(1.3),
            new THREE.MeshStandardMaterial({
              color: 0x43c9b0, roughness: 0.1, metalness: 0.5,
              emissive: 0x16a394, emissiveIntensity: 0.5,
            })
          )
          root.add(gem); spinners.push({ obj: gem, sx: 0.6, sy: 0.9 })
        }

        const buildRing = () => {
          // a torus 'ring' (aligner/retainer feel) + gem
          const torus = new THREE.Mesh(
            new THREE.TorusGeometry(1.4, 0.34, 28, 80),
            new THREE.MeshStandardMaterial({
              color: 0xfdfdfb, roughness: 0.12, metalness: 0.2,
              emissive: 0xd6f6ef, emissiveIntensity: 0.25,
            })
          )
          root.add(torus)
          const gem = new THREE.Mesh(
            new THREE.OctahedronGeometry(0.55),
            new THREE.MeshStandardMaterial({
              color: 0xe2a93b, roughness: 0.15, metalness: 0.5,
              emissive: 0xe2a93b, emissiveIntensity: 0.55,
            })
          )
          gem.position.y = 1.4
          root.add(gem); spinners.push({ obj: gem, sx: 1.2, sy: 1.5 })
        }

        if (variant === 'shield') buildShield()
        else if (variant === 'sparkle') buildSparkle()
        else if (variant === 'ring') buildRing()
        else buildTooth() // 'tooth' and 'orbit' both use a tooth core

        root.position.y = variant === 'tooth' || variant === 'orbit' ? 0.3 : 0

        // ----- ORBITING COLOURED CRYSTALS (all variants) -----
        const palette = [0x43c9b0, 0xe2a93b, 0x5b46c9, 0xff7a59, 0x16a394]
        const crystals = []
        const crystalCount = variant === 'orbit' ? 6 : 4
        for (let i = 0; i < crystalCount; i++) {
          const col = palette[i % palette.length]
          const geo = i % 2 === 0
            ? new THREE.TetrahedronGeometry(0.26)
            : new THREE.OctahedronGeometry(0.22)
          const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({
            color: col, emissive: col, emissiveIntensity: 0.7,
            roughness: 0.25, metalness: 0.4,
          }))
          m.userData = {
            radius: 2.4 + (i % 2) * 0.55,
            speed: 0.4 + i * 0.13,
            offset: (i / crystalCount) * Math.PI * 2,
            yAmp: 0.55 + (i % 3) * 0.35,
          }
          crystals.push(m); scene.add(m)
        }

        // ----- LIGHTING -----
        scene.add(new THREE.AmbientLight(0xffffff, 0.72))
        const key = new THREE.DirectionalLight(0xffffff, 1.1)
        key.position.set(4, 6, 6); scene.add(key)
        const teal = new THREE.PointLight(0x16a394, 1.0, 30)
        teal.position.set(-5, -1, 4); scene.add(teal)
        const gold = new THREE.PointLight(0xffd089, 0.75, 30)
        gold.position.set(5, 3, -2); scene.add(gold)

        // ----- POINTER -----
        let tY = 0, tX = 0, cY = 0, cX = 0
        const onMove = (e) => {
          const r = mount.getBoundingClientRect()
          const cx = e.touches ? e.touches[0].clientX : e.clientX
          const cy = e.touches ? e.touches[0].clientY : e.clientY
          tY = ((cx - r.left) / r.width - 0.5) * 1.0
          tX = ((cy - r.top) / r.height - 0.5) * 0.6
        }
        const onLeave = () => { tY = 0; tX = 0 }
        mount.addEventListener('pointermove', onMove)
        mount.addEventListener('pointerleave', onLeave)
        mount.addEventListener('touchmove', onMove, { passive: true })

        // ----- ANIMATE -----
        const clock = new THREE.Clock()
        const tick = () => {
          if (cancelled) return
          frameId = requestAnimationFrame(tick)
          const t = clock.getElapsedTime()
          cY += (tY - cY) * 0.06
          cX += (tX - cX) * 0.06
          root.rotation.y = (reduce ? 0 : t * 0.42) + cY
          root.rotation.x = cX
          root.position.y = (variant === 'tooth' || variant === 'orbit' ? 0.3 : 0) +
            (reduce ? 0 : Math.sin(t * 1.1) * 0.13)
          spinners.forEach((s) => {
            s.obj.rotation.x = t * s.sx
            s.obj.rotation.y = t * s.sy
          })
          crystals.forEach((c) => {
            const d = c.userData
            c.position.x = Math.cos(t * d.speed + d.offset) * d.radius
            c.position.z = Math.sin(t * d.speed + d.offset) * d.radius
            c.position.y = Math.sin(t * d.speed * 1.3 + d.offset) * d.yAmp
            c.rotation.x = t * 1.5; c.rotation.y = t * 1.2
            c.scale.setScalar(0.8 + Math.sin(t * 3 + d.offset) * 0.22)
          })
          halo.scale.setScalar(1 + Math.sin(t * 1.5) * 0.05)
          renderer.render(scene, camera)
        }
        tick()

        const onResize = () => {
          if (!mount) return
          const nw = mount.clientWidth || 360
          camera.aspect = nw / h
          camera.updateProjectionMatrix()
          renderer.setSize(nw, h)
        }
        window.addEventListener('resize', onResize)
        mount._cleanup = () => {
          window.removeEventListener('resize', onResize)
          mount.removeEventListener('pointermove', onMove)
          mount.removeEventListener('pointerleave', onLeave)
          mount.removeEventListener('touchmove', onMove)
        }
      } catch (e) {
        console.warn('Scene3D: 3D unavailable, fallback shown.', e)
        if (!cancelled) setFailed(true)
      }
    })()

    return () => {
      cancelled = true
      if (frameId) cancelAnimationFrame(frameId)
      if (mount && mount._cleanup) mount._cleanup()
      if (renderer) {
        renderer.dispose()
        if (renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement)
        }
      }
    }
  }, [variant, height])

  if (failed) {
    return (
      <div className="scene3d-fallback" style={{ height }}>
        <div className="scene3d-fallback-inner">
          <Icon name={FALLBACK_ICON[variant] || 'tooth'} size={120} />
        </div>
      </div>
    )
  }

  return <div className="scene3d" ref={mountRef} style={{ height }} aria-hidden="true" />
}
