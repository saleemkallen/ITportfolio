"use client"

import Link from "next/link"
import { useState } from "react"
import { GoogleLogo } from "@/components/google-logo"
import {
  CentrifugalPumpViewer,
  CentrifugalPumpViewerControls,
  type PumpModelId,
} from "@/components/centrifugal-pump-viewer"
import { ResourcePreviewCard } from "@/components/resource-preview-card"

export default function CentrifugalPumpViewerPage() {
  const [activeId, setActiveId] = useState<PumpModelId>("casing")

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="border-b border-[#ebebeb] bg-white px-4 py-3">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-4 text-[14px] text-[#1a0dab] hover:underline">
            <GoogleLogo size="small" />
            <span>← Back to search</span>
          </Link>
          <p className="text-[13px] text-[#5f6368]">Drag to rotate · scroll to zoom</p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-semibold text-[#202124]">Centrifugal pump — 3D STL</h1>
        <p className="mt-2 max-w-3xl text-[14px] text-[#5f6368]">
          Parametric design (Lua / IceSL). Switch between casing, impeller, and full assembly — same assets as the legacy
          portfolio.
        </p>

        <div className="mt-6 space-y-4">
          <CentrifugalPumpViewerControls activeId={activeId} onChange={setActiveId} />
          <CentrifugalPumpViewer activeId={activeId} />
        </div>

        <div className="mt-8 space-y-4">
          <p className="text-[13px] font-medium text-[#202124]">Resources</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <ResourcePreviewCard
              link={{ label: "Pump Lua source (Pump_muhammed.lua)", href: "/portfolio-assets/centrifugal-pump/Pump_muhammed.lua" }}
            />
            <ResourcePreviewCard link={{ label: "Project detail — 3D Lua pump", href: "/detail/exp-1" }} />
          </div>
        </div>
      </main>
    </div>
  )
}
