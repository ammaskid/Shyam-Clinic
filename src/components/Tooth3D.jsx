/* ============================================================
   Tooth3D — a gently rotating 3D tooth (Three.js)
   Built from primitive geometry so it works on any Three r160+.
   SAFE: if WebGL or Three fails, shows a clean SVG tooth instead.
   Pointer-rotatable on desktop, auto-rotates everywhere.
   ============================================================ */

import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'

export default function Tooth3D({ height = 360 }) {
  const mountRef = useRef(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let renderer, scene, camera, frameId, three
    let cancelled = false
    const mount = mountRef.current
    if (!mount) return

    // respect reduced motion
    const reduce = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    ;(async () => {
      try {
        three = await import('three')
        if (cancelled || !mount) return

        const THREE = three
        const w = mount.clientWidth || 360
        const h = height

        scene = new THREE.Scene()
        camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100)
        camera.position.set(0, 0, 7.5)

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setSize(w, h)
        mount.appendChild(renderer.domElement)

        // ---- Build a tooth from primitives ----
        const toothGroup = new THREE.Group()
        const enamel = new THREE.MeshStandardMaterial({
          color: 0xffffff, roughness: 0.18, metalness: 0.05,
          emissive: 0xeafff9, emissiveIntensity: 0.15,
        })

        // Crown — rounded top (sphere squashed)
        const crown = new THREE.Mesh(new THREE.SphereGeometry(1.25, 48, 48), enamel)
        crown.scale.set(1, 0.85, 1)
        crown.position.y = 0.55
        toothGroup.add(crown)

        // Body — tapered cylinder
        const body = new THREE.Mesh(
          new THREE.CylinderGeometry(1.15, 0.78, 1.5, 48), enamel
        )
        body.position.y = -0.35
        toothGroup.add(body)

        // Two roots — tapered cones
        const rootGeo = new THREE.CylinderGeometry(0.5, 0.06, 1.7, 32)
        const rootL = new THREE.Mesh(rootGeo, enamel)
        rootL.position.set(-0.42, -1.7, 0)
        rootL.rotation.z = 0.22
        toothGroup.add(rootL)
        const rootR = new THREE.Mesh(rootGeo, enamel)
        rootR.position.set(0.42, -1.7, 0)
        rootR.rotation.z = -0.22
        toothGroup.add(rootR)

        toothGroup.position.y = 0.35
        scene.add(toothGroup)

        // sparkle accent
        const sparkleMat = new THREE.MeshStandardMaterial({
          color: 0x43c9b0, roughness: 0.2, metalness: 0.3,
          emissive: 0x43c9b0, emissiveIntensity: 0.5,
        })
        const sparkle = new THREE.Mesh(new THREE.OctahedronGeometry(0.22), sparkleMat)
        sparkle.position.set(1.05, 1.35, 0.9)
        scene.add(sparkle)

        // ---- Lighting ----
        scene.add(new THREE.AmbientLight(0xffffff, 0.65))
        const key = new THREE.DirectionalLight(0xffffff, 1.1)
        key.position.set(4, 6, 5)
        scene.add(key)
        const teal = new THREE.PointLight(0x16a394, 0.9, 30)
        teal.position.set(-5, -2, 4)
        scene.add(teal)
        const warm = new THREE.PointLight(0xffe2b8, 0.6, 30)
        warm.position.set(5, 3, -3)
        scene.add(warm)

        // ---- Pointer interaction ----
        let targetRotY = 0, targetRotX = 0
        let curRotY = 0, curRotX = 0
        function onMove(e) {
          const r = mount.getBoundingClientRect()
          const px = (e.clientX - r.left) / r.width - 0.5
          const py = (e.clientY - r.top) / r.height - 0.5
          targetRotY = px * 0.9
          targetRotX = py * 0.6
        }
        function onLeave() { targetRotY = 0; targetRotX = 0 }
        mount.addEventListener('pointermove', onMove)
        mount.addEventListener('pointerleave', onLeave)

        // ---- Animate ----
        const clock = new THREE.Clock()
        function tick() {
          if (cancelled) return
          frameId = requestAnimationFrame(tick)
          const t = clock.getElapsedTime()
          curRotY += (targetRotY - curRotY) * 0.06
          curRotX += (targetRotX - curRotX) * 0.06
          const spin = reduce ? 0 : t * 0.35
          toothGroup.rotation.y = spin + curRotY
          toothGroup.rotation.x = curRotX
          toothGroup.position.y = 0.35 + (reduce ? 0 : Math.sin(t * 1.2) * 0.12)
          sparkle.rotation.x = t * 1.5
          sparkle.rotation.y = t * 1.2
          sparkle.scale.setScalar(0.85 + Math.sin(t * 3) * 0.15)
          renderer.render(scene, camera)
        }
        tick()

        // ---- Resize ----
        function onResize() {
          if (!mount) return
          const nw = mount.clientWidth || 360
          camera.aspect = nw / h
          camera.updateProjectionMatrix()
          renderer.setSize(nw, h)
        }
        window.addEventListener('resize', onResize)

        // cleanup store
        mount._cleanup = () => {
          window.removeEventListener('resize', onResize)
          mount.removeEventListener('pointermove', onMove)
          mount.removeEventListener('pointerleave', onLeave)
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

  // SVG fallback — used if WebGL/Three is unavailable
  if (failed) {
    return (
      <div className="tooth3d-fallback" style={{ height }}>
        <div className="tooth3d-fallback-inner">
          <Icon name="tooth" size={140} />
        </div>
      </div>
    )
  }

  return <div className="tooth3d" ref={mountRef} style={{ height }} aria-hidden="true" />
}
