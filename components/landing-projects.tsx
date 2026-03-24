"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, Box, Globe, LayoutGrid } from "lucide-react"
import type { SearchResult } from "@/lib/portfolio-data"

const ACCENT = [
  "from-[#4285F4]/15 via-white to-white border-[#4285F4]/20",
  "from-[#34A853]/15 via-white to-white border-[#34A853]/20",
  "from-[#FBBC05]/15 via-white to-white border-[#FBBC05]/25",
  "from-[#EA4335]/12 via-white to-white border-[#EA4335]/20",
  "from-[#4285F4]/12 via-[#34A853]/8 to-white border-[#dadce0]",
] as const

const CATEGORY_ACCENT = "from-[#4285F4]/20 via-white to-[#34A853]/10 border-[#4285F4]/25"

function tileHeading(title: string) {
  const main = title.split(" — ")[0]?.trim() ?? title
  return main.length > 72 ? `${main.slice(0, 70)}…` : main
}

function ProjectTile({
  project,
  globalIndex,
  visible,
  badge,
}: {
  project: SearchResult
  globalIndex: number
  visible: boolean
  badge?: string
}) {
  const accent = ACCENT[globalIndex % ACCENT.length]

  return (
    <Link
      href={`/detail/${project.id}`}
      className={`
        group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-gradient-to-br p-5 min-h-[200px] sm:min-h-[220px]
        shadow-sm transition-all duration-700 ease-out motion-reduce:duration-0
        hover:shadow-xl hover:-translate-y-1 hover:border-[#4285F4]/40
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]
        motion-reduce:opacity-100 motion-reduce:translate-y-0
        ${accent}
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
      style={{ transitionDelay: visible ? `${Math.min(globalIndex, 20) * 55}ms` : "0ms" }}
    >
      <div>
        <span className="inline-flex items-center rounded-full bg-white/80 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-[#5f6368] ring-1 ring-black/5">
          {badge ?? `Item ${globalIndex + 1}`}
        </span>
        <h3 className="mt-3 text-[17px] font-semibold leading-snug text-[#202124] group-hover:text-[#1a0dab] transition-colors">
          {tileHeading(project.title)}
        </h3>
        <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-[#5f6368]">{project.description}</p>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2">
        <span className="text-[13px] font-medium text-[#1a0dab] group-hover:underline">View details</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          <ArrowUpRight className="h-4 w-4 text-[#4285F4]" aria-hidden />
        </span>
      </div>
    </Link>
  )
}

function CategoryOverviewTile({
  globalIndex,
  visible,
  title,
  description,
  href,
}: {
  globalIndex: number
  visible: boolean
  title: string
  description: string
  href: string
}) {
  return (
    <Link
      href={href}
      className={`
        group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-gradient-to-br p-5 min-h-[200px] sm:min-h-[220px] col-span-1 sm:col-span-2 lg:col-span-3 w-full
        shadow-sm transition-all duration-700 ease-out motion-reduce:duration-0
        hover:shadow-xl hover:-translate-y-1 hover:border-[#4285F4]/40
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]
        motion-reduce:opacity-100 motion-reduce:translate-y-0
        ${CATEGORY_ACCENT}
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
      style={{ transitionDelay: visible ? `${Math.min(globalIndex, 20) * 55}ms` : "0ms" }}
    >
      <div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-[#4285F4] ring-1 ring-[#4285F4]/20">
          <Globe className="h-3 w-3" aria-hidden />
          Category
        </span>
        <h3 className="mt-3 text-[19px] font-semibold leading-snug text-[#202124] group-hover:text-[#1a0dab] transition-colors">
          {title}
        </h3>
        <p className="mt-2 text-[14px] leading-relaxed text-[#5f6368]">{description}</p>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2">
        <span className="text-[13px] font-medium text-[#1a0dab] group-hover:underline">Open related search</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          <LayoutGrid className="h-4 w-4 text-[#4285F4]" aria-hidden />
        </span>
      </div>
    </Link>
  )
}

function ViewerCtaTile({
  globalIndex,
  visible,
  href,
  title,
  description,
}: {
  globalIndex: number
  visible: boolean
  href: string
  title: string
  description: string
}) {
  return (
    <Link
      href={href}
      className={`
        group mt-4 flex flex-col justify-between overflow-hidden rounded-2xl border bg-gradient-to-br from-[#1a1a2e]/90 via-[#4285F4]/10 to-white p-5 min-h-[160px] sm:min-h-[180px]
        shadow-sm transition-all duration-700 ease-out motion-reduce:duration-0
        hover:shadow-xl hover:-translate-y-0.5 hover:border-[#4285F4]/50
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]
        motion-reduce:opacity-100 motion-reduce:translate-y-0
        col-span-1 sm:col-span-2 lg:col-span-3 w-full
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
      style={{ transitionDelay: visible ? `${Math.min(globalIndex, 20) * 55}ms` : "0ms" }}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-[#4285F4] ring-1 ring-[#4285F4]/25">
            <Box className="h-3 w-3" aria-hidden />
            3D
          </span>
          <h3 className="mt-3 text-[18px] font-semibold leading-snug text-[#202124] group-hover:text-[#1a0dab] transition-colors">
            {title}
          </h3>
          <p className="mt-2 line-clamp-3 text-[14px] leading-relaxed text-[#5f6368]">{description}</p>
        </div>
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center self-end rounded-full bg-white shadow-sm ring-1 ring-black/5 transition-transform group-hover:translate-x-0.5 sm:self-center">
          <ArrowUpRight className="h-5 w-5 text-[#4285F4]" aria-hidden />
        </span>
      </div>
    </Link>
  )
}

export type LandingProjectGroup = {
  id: string
  title: string
  subtitle: string
  items: SearchResult[]
  /** Web projects: show a wide category tile before individual site tiles. */
  categoryOverview?: {
    title: string
    description: string
    href: string
  }
  /** e.g. link to 3D STL viewer after engineering tiles. */
  viewerCta?: {
    href: string
    title: string
    description: string
  }
}

export function LandingProjects({ groups }: { groups: LandingProjectGroup[] }) {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setVisible(true)
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  let globalIndex = 0

  return (
    <section
      ref={sectionRef}
      className="border-t border-[#ebebeb] bg-[#fafafa] px-4 py-16 sm:py-20"
      aria-labelledby="landing-projects-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center sm:mb-14">
          <h2 id="landing-projects-heading" className="text-2xl font-semibold tracking-tight text-[#202124] sm:text-3xl">
            Work & projects
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-[14px] text-[#5f6368]">
            Organized by focus — AI and application projects (GIS sits last in that row), professional experience,
            engineering experiments with the 3D viewer, then web builds. Each card opens the full detail page.
          </p>
        </div>

        <div className="flex flex-col gap-14 sm:gap-16">
          {groups.map((group) => {
            const block = (
              <div key={group.id} className="scroll-mt-8" id={group.id}>
                <div className="mb-5 flex flex-col gap-1 border-b border-[#e8eaed] pb-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#4285F4]">{group.title}</p>
                    <p className="mt-1 max-w-3xl text-[14px] text-[#5f6368]">{group.subtitle}</p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.categoryOverview && (
                    <CategoryOverviewTile
                      globalIndex={globalIndex++}
                      visible={visible}
                      title={group.categoryOverview.title}
                      description={group.categoryOverview.description}
                      href={group.categoryOverview.href}
                    />
                  )}
                  {group.items.map((project, i) => (
                    <ProjectTile
                      key={project.id}
                      project={project}
                      globalIndex={globalIndex++}
                      visible={visible}
                      badge={
                        group.id === "data-ai" && project.id === "proj-5"
                          ? "GIS"
                          : group.id === "data-ai" && project.id === "proj-6"
                            ? "WIP"
                            : group.id === "data-ai"
                              ? `Project ${i + 1}`
                              : group.id === "experience"
                                ? `Role ${i + 1}`
                                : group.id === "web"
                                  ? `Web ${i + 1}`
                                  : group.id === "engineering"
                                    ? `Lab ${i + 1}`
                                    : `${i + 1}`
                      }
                    />
                  ))}
                </div>
                {group.viewerCta && (
                  <ViewerCtaTile
                    globalIndex={globalIndex++}
                    visible={visible}
                    href={group.viewerCta.href}
                    title={group.viewerCta.title}
                    description={group.viewerCta.description}
                  />
                )}
              </div>
            )
            return block
          })}
        </div>
      </div>
    </section>
  )
}
