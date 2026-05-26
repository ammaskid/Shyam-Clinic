/* ============================================================
   Tooth3D — a realistic, colourful, engaging 3D tooth scene.
   Built from primitive geometry (works on any Three r0.160+).
   Features: glossy enamel, orbiting coloured sparkles, a glow
   halo, soft floating particles, pointer-rotation + auto-spin.
   SAFE: if WebGL/Three fails, shows a clean SVG fallback.
   ============================================================ */

import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'

export default function Tooth3D({ height = 400 }) {
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

        const w = mount.clientWidth || 400
        const h = height

        scene = new THREE.Scene()
        camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100)
        camera.position.set(0, 0, 8)

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setSize(w, h)
        if (renderer.outputColorSpace !== undefined) {
          renderer.outputColorSpace = THREE.SRGBColorSpace
        }
        mount.appendChild(renderer.domElement)

        // ---------- GLOW HALO (behind tooth) ----------
        const haloMat = new THREE.MeshBasicMaterial({
          color: 0x43c9b0, transparent: true, opacity: 0.18,
        })
        const halo = new THREE.Mesh(new THREE.CircleGeometry(2.9, 48), haloMat)
        halo.position.z = -1.5
        scene.add(halo)
        const halo2 = new THREE.Mesh(
          new THREE.CircleGeometry(2.2, 48),
          new THREE.MeshBasicMaterial({ color: 0x7fdcc6, transparent: true, opacity: 0.22 })
        )
        halo2.position.z = -1.2
        scene.add(halo2)

        // ---------- THE TOOTH ----------
        const toothGroup = new THREE.Group()

        // glossy pearl-white enamel with a faint warm tint
        const enamel = new THREE.MeshStandardMaterial({
          color: 0xfdfdfb, roughness: 0.12, metalness: 0.12,
          emissive: 0xdef7f0, emissiveIntensity: 0.22,
        })

        // Crown — wide rounded top (two lobes give a molar-ish realism)
        const crown = new THREE.Mesh(new THREE.SphereGeometry(1.3, 64, 64), enamel)
        crown.scale.set(1.05, 0.78, 0.95)
        crown.position.y = 0.7
        toothGroup.add(crown)

        // little cusp bumps on top for realism
        const cuspGeo = new THREE.SphereGeometry(0.42, 32, 32)
        ;[[-0.5, 1.35, 0.25], [0.5, 1.35, 0.25], [0, 1.4, -0.35]].forEach((p) => {
          const c = new THREE.Mesh(cuspGeo, enamel)
          c.position.set(p[0], p[1], p[2])
          c.scale.set(1, 0.7, 1)
          toothGroup.add(c)
        })

        // Body — smooth tapered transition
        const body = new THREE.Mesh(
          new THREE.CylinderGeometry(1.2, 0.82, 1.4, 64), enamel
        )
        body.position.y = -0.25
        toothGroup.add(body)

        // Two roots — tapered, slightly curved outward
        const rootGeo = new THREE.CylinderGeometry(0.52, 0.05, 1.9, 40)
        const rootL = new THREE.Mesh(rootGeo, enamel)
        rootL.position.set(-0.44, -1.55, 0)
        rootL.rotation.z = 0.26
        toothGroup.add(rootL)
        const rootR = new THREE.Mesh(rootGeo, enamel)
        rootR.position.set(0.44, -1.55, 0)
        rootR.rotation.z = -0.26
        toothGroup.add(rootR)

        // a soft mint "shine" stripe on the crown
        const shine = new THREE.Mesh(
          new THREE.SphereGeometry(0.34, 24, 24),
          new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.55 })
        )
        shine.position.set(-0.55, 1.05, 0.85)
        shine.scale.set(1, 1.6, 0.5)
        toothGroup.add(shine)

        toothGroup.position.y = 0.3
        scene.add(toothGroup)

        // ---------- ORBITING COLOURED SPARKLES ----------
        const sparkleColors = [0x43c9b0, 0xe2a93b, 0x5b46c9, 0xff7a59, 0x16a394]
        const sparkles = []
        sparkleColors.forEach((col, i) => {
          const geo = i % 2 === 0
            ? new THREE.OctahedronGeometry(0.2)
            : new THREE.TetrahedronGeometry(0.24)
          const mat = new THREE.MeshStandardMaterial({
            color: col, emissive: col, emissiveIntensity: 0.7,
            roughness: 0.25, metalness: 0.4,
          })
          const m = new THREE.Mesh(geo, mat)
          m.userData = {
            radius: 2.5 + (i % 2) * 0.5,
            speed: 0.4 + i * 0.12,
            offset: (i / sparkleColors.length) * Math.PI * 2,
            yAmp: 0.6 + (i % 3) * 0.4,
          }
          sparkles.push(m)
          scene.add(m)
        })

        // ---------- FLOATING PARTICLES ----------
        const particleCount = 90
        const pGeo = new THREE.BufferGeometry()
        const pPos = new Float32Array(particleCount * 3)
        for (let i = 0; i < particleCount; i++) {
          pPos[i * 3] = (Math.random() - 0.5) * 11
          pPos[i * 3 + 1] = (Math.random() - 0.5) * 9
          pPos[i * 3 + 2] = (Math.random() - 0.5) * 5 - 1
        }
        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
        const pMat = new THREE.PointsMaterial({
          color: 0x43c9b0, size: 0.07, transparent: true, opacity: 0.55,
          sizeAttenuation: true,
        })
        const particles = new THREE.Points(pGeo, pMat)
        scene.add(particles)

        // ---------- LIGHTING ----------
        scene.add(new THREE.AmbientLight(0xffffff, 0.7))
        const key = new THREE.DirectionalLight(0xffffff, 1.15)
        key.position.set(4, 6, 6)
        scene.add(key)
        const teal = new THREE.PointLight(0x16a394, 1.1, 30)
        teal.position.set(-5, -1, 4)
        scene.add(teal)
        const gold = new THREE.PointLight(0xffd089, 0.8, 30)
        gold.position.set(5, 3, -2)
        scene.add(gold)
        const violet = new THREE.PointLight(0x7c6cf0, 0.6, 26)
        violet.position.set(0, -4, 3)
        scene.add(violet)

        // ---------- POINTER INTERACTION ----------
        let targetY = 0, targetX = 0, curY = 0, curX = 0
        const onMove = (e) => {
          const r = mount.getBoundingClientRect()
          const cx = (e.touches ? e.touches[0].clientX : e.clientX)
          const cy = (e.touches ? e.touches[0].clientY : e.clientY)
          targetY = ((cx - r.left) / r.width - 0.5) * 1.1
          targetX = ((cy - r.top) / r.height - 0.5) * 0.7
        }
        const onLeave = () => { targetY = 0; targetX = 0 }
        mount.addEventListener('pointermove', onMove)
        mount.addEventListener('pointerleave', onLeave)
        mount.addEventListener('touchmove', onMove, { passive: true })

        // ---------- ANIMATE ----------
        const clock = new THREE.Clock()
        const tick = () => {
          if (cancelled) return
          frameId = requestAnimationFrame(tick)
          const t = clock.getElapsedTime()

          curY += (targetY - curY) * 0.06
          curX += (targetX - curX) * 0.06

          toothGroup.rotation.y = (reduce ? 0 : t * 0.4) + curY
          toothGroup.rotation.x = curX
          toothGroup.position.y = 0.3 + (reduce ? 0 : Math.sin(t * 1.1) * 0.14)

          sparkles.forEach((s) => {
            const d = s.userData
            s.position.x = Math.cos(t * d.speed + d.offset) * d.radius
            s.position.z = Math.sin(t * d.speed + d.offset) * d.radius
            s.position.y = Math.sin(t * d.speed * 1.3 + d.offset) * d.yAmp + 0.3
            s.rotation.x = t * 1.6
            s.rotation.y = t * 1.3
            const sc = 0.8 + Math.sin(t * 3 + d.offset) * 0.25
            s.scale.setScalar(sc)
          })

          if (!reduce) {
            particles.rotation.y = t * 0.04
            particles.rotation.x = Math.sin(t * 0.2) * 0.1
          }
          halo.scale.setScalar(1 + Math.sin(t * 1.5) * 0.05)
          halo2.scale.setScalar(1 + Math.cos(t * 1.8) * 0.06)

          renderer.render(scene, camera)
        }
        tick()

        // ---------- RESIZE ----------
        const onResize = () => {
          if (!mount) return
          const nw = mount.clientWidth || 400
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
        console.warn('Tooth3D: 3D unavailable, showing fallback.', e)
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
  }, [height])

  if (failed) {
    return (
      <div className="tooth3d-fallback" style={{ height }}>
        <div className="tooth3d-fallback-inner">
          <Icon name="tooth" size={150} />
        </div>
      </div>
    )
  }

  return <div className="tooth3d" ref={mountRef} style={{ height }} aria-hidden="true" />
}
