"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
import { STLLoader } from "three/addons/loaders/STLLoader.js"

export const PUMP_STL_MODELS = [
  { id: "casing", label: "Casing", path: "/portfolio-assets/centrifugal-pump/casing.stl" },
  { id: "impeller", label: "Impeller", path: "/portfolio-assets/centrifugal-pump/impeller.stl" },
  { id: "full", label: "Full design", path: "/portfolio-assets/centrifugal-pump/full%20design.stl" },
] as const

export type PumpModelId = (typeof PUMP_STL_MODELS)[number]["id"]

interface CentrifugalPumpViewerProps {
  activeId: PumpModelId
  className?: string
}

function disposeMesh(scene: THREE.Scene, mesh: THREE.Mesh | null) {
  if (!mesh) return
  scene.remove(mesh)
  mesh.geometry.dispose()
  const mat = mesh.material
  if (Array.isArray(mat)) mat.forEach((m) => m.dispose())
  else mat.dispose()
}

export function CentrifugalPumpViewer({ activeId, className }: CentrifugalPumpViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const ctxRef = useRef<{
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    renderer: THREE.WebGLRenderer
    controls: OrbitControls
    mesh: THREE.Mesh | null
    frame: number
  } | null>(null)
  const readyRef = useRef(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadModel = (active: PumpModelId) => {
    const ctx = ctxRef.current
    if (!ctx) return

    disposeMesh(ctx.scene, ctx.mesh)
    ctx.mesh = null

    const model = PUMP_STL_MODELS.find((m) => m.id === active) ?? PUMP_STL_MODELS[0]
    setLoading(true)
    setError(null)

    const loader = new STLLoader()
    loader.load(
      model.path,
      (geometry) => {
        const c = ctxRef.current
        if (!c) return

        geometry.computeVertexNormals()
        const material = new THREE.MeshStandardMaterial({
          color: 0x6b9bd2,
          metalness: 0.25,
          roughness: 0.45,
        })
        const mesh = new THREE.Mesh(geometry, material)
        geometry.computeBoundingBox()
        const box = geometry.boundingBox!
        const center = new THREE.Vector3()
        box.getCenter(center)
        geometry.translate(-center.x, -center.y, -center.z)

        const size = new THREE.Vector3()
        box.getSize(size)
        const maxDim = Math.max(size.x, size.y, size.z, 1)
        mesh.rotation.x = -Math.PI / 2
        c.scene.add(mesh)
        c.mesh = mesh

        c.camera.position.set(0, 0, maxDim * 2.8)
        c.camera.near = maxDim / 100
        c.camera.far = maxDim * 100
        c.camera.updateProjectionMatrix()
        c.controls.target.set(0, 0, 0)
        c.controls.update()

        setLoading(false)
      },
      undefined,
      () => {
        setError("Could not load this model.")
        setLoading(false)
      },
    )
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const w = container.clientWidth
    const h = Math.max(container.clientHeight, 320)

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x1a1a2e)

    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 2000)
    camera.position.set(0, 0, 120)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.08

    const ambient = new THREE.AmbientLight(0xffffff, 0.55)
    const d1 = new THREE.DirectionalLight(0xffffff, 0.9)
    d1.position.set(20, 40, 30)
    const d2 = new THREE.DirectionalLight(0xaaccff, 0.35)
    d2.position.set(-30, -10, -20)
    scene.add(ambient, d1, d2)

    let frame = 0
    const animate = () => {
      frame = requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    ctxRef.current = { scene, camera, renderer, controls, mesh: null, frame }
    readyRef.current = true

    const onResize = () => {
      if (!containerRef.current || !ctxRef.current) return
      const nw = containerRef.current.clientWidth
      const nh = Math.max(containerRef.current.clientHeight, 320)
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)
    }
    window.addEventListener("resize", onResize)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("resize", onResize)
      controls.dispose()
      const ctx = ctxRef.current
      if (ctx?.mesh) disposeMesh(ctx.scene, ctx.mesh)
      renderer.dispose()
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
      ctxRef.current = null
      readyRef.current = false
    }
    // Mount once; model switches use the second effect.
  }, [])

  useEffect(() => {
    if (!readyRef.current || !ctxRef.current) return
    loadModel(activeId)
  }, [activeId])

  return (
    <div className={`relative ${className ?? ""}`}>
      <div ref={containerRef} className="h-[min(55vh,520px)] w-full min-h-[320px] rounded-xl bg-[#1a1a2e]" />
      {loading && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl bg-[#1a1a2e]/60 text-sm text-[#e8eaed]">
          Loading model…
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-[#1a1a2e]/90 text-sm text-red-300">
          {error}
        </div>
      )}
    </div>
  )
}

export function CentrifugalPumpViewerControls({
  activeId,
  onChange,
}: {
  activeId: PumpModelId
  onChange: (id: PumpModelId) => void
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {PUMP_STL_MODELS.map((m) => (
        <button
          key={m.id}
          type="button"
          onClick={() => onChange(m.id)}
          className={`rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
            activeId === m.id
              ? "border-[#4285F4] bg-[#4285F4] text-white"
              : "border-[#dadce0] bg-white text-[#3c4043] hover:bg-[#f8f9fa]"
          }`}
        >
          {m.label}
        </button>
      ))}
    </div>
  )
}
