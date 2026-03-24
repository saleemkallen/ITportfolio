"use client"

import type { PortfolioLink } from "@/lib/portfolio-data"
import { ResourcePreviewCard } from "@/components/resource-preview-card"

export function DetailLinks({ links }: { links: PortfolioLink[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-1">
      {links.map((link) => (
        <ResourcePreviewCard key={`${link.label}-${link.href}`} link={link} />
      ))}
    </div>
  )
}
