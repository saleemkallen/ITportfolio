"use client"

import Link from "next/link"
import { ExternalLink, FileText, ImageIcon, Link2, Lock, Mail, Play } from "lucide-react"
import type { PortfolioLink } from "@/lib/portfolio-data"
import { displayHost, inferLinkKind, type PortfolioLinkKind } from "@/lib/link-inference"
import { ProtectedLink } from "@/components/protected-link"

function kindLabel(kind: PortfolioLinkKind): string {
  switch (kind) {
    case "pdf":
      return "PDF"
    case "video":
      return "Video"
    case "image":
      return "Image"
    case "web":
      return "Link"
    case "email":
      return "Email"
    case "file":
      return "File"
    case "internal":
      return "Page"
    default:
      return "Resource"
  }
}

function KindIcon({ kind, className }: { kind: PortfolioLinkKind; className?: string }) {
  const c = className ?? "h-4 w-4"
  switch (kind) {
    case "pdf":
      return <FileText className={c} aria-hidden />
    case "video":
      return <Play className={c} aria-hidden />
    case "image":
      return <ImageIcon className={c} aria-hidden />
    case "web":
      return <Link2 className={c} aria-hidden />
    case "email":
      return <Mail className={c} aria-hidden />
    case "internal":
      return <Link2 className={c} aria-hidden />
    default:
      return <FileText className={c} aria-hidden />
  }
}

export function ResourcePreviewCard({ link }: { link: PortfolioLink }) {
  const kind = inferLinkKind(link.href)
  const isProtected = Boolean(link.requiresPassword)

  if (isProtected && kind === "pdf") {
    return (
      <div className="rounded-lg border border-[#dadce0] bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between gap-2 border-b border-[#ebebeb] bg-[#f8f9fa] px-3 py-2">
          <div className="flex min-w-0 items-center gap-2">
            <Lock className="h-4 w-4 flex-shrink-0 text-[#5f6368]" aria-hidden />
            <span className="truncate text-[13px] font-medium text-[#202124]">{link.label}</span>
          </div>
          <span className="flex-shrink-0 rounded bg-[#e8f0fe] px-2 py-0.5 text-[11px] font-medium uppercase text-[#1967d2]">
            Protected
          </span>
        </div>
        <div className="flex h-[180px] flex-col items-center justify-center gap-3 bg-[#fafafa] px-4 text-center">
          <p className="text-[13px] text-[#5f6368]">Preview is available after you unlock this document.</p>
          <ProtectedLink
            href={link.href}
            className="inline-flex items-center gap-2 rounded border border-[#dadce0] bg-white px-4 py-2 text-[13px] font-medium text-[#1a0dab] shadow-sm hover:bg-[#f8f9fa]"
          >
            <Lock className="h-3.5 w-3.5" />
            Unlock & open
          </ProtectedLink>
        </div>
      </div>
    )
  }

  const previewBody = () => {
    switch (kind) {
      case "video":
        return (
          <video
            controls
            className="mx-auto max-h-[240px] w-full rounded border border-[#e8eaed] bg-black"
            preload="metadata"
            src={link.href}
          />
        )
      case "pdf":
        return (
          <iframe title={link.label} src={link.href} className="h-[280px] w-full rounded border border-[#e8eaed] bg-white" />
        )
      case "image":
        return (
          // eslint-disable-next-line @next/next/no-img-element -- dynamic portfolio asset URLs
          <img
            src={link.href}
            alt=""
            className="mx-auto max-h-[240px] w-auto max-w-full rounded border border-[#e8eaed] object-contain"
          />
        )
      case "web":
        if (link.previewImage) {
          return (
            // eslint-disable-next-line @next/next/no-img-element -- optional screenshot for external URLs
            <img
              src={link.previewImage}
              alt=""
              className="mx-auto max-h-[240px] w-full rounded border border-[#e8eaed] object-cover object-top"
            />
          )
        }
        return (
          <div className="flex flex-col items-center justify-center gap-2 rounded border border-dashed border-[#dadce0] bg-white py-8 px-4 text-center">
            <p className="text-[12px] text-[#5f6368] break-all">{displayHost(link.href)}</p>
            <p className="text-[11px] text-[#80868b]">External site — use Open below</p>
          </div>
        )
      case "email":
        return (
          <div className="flex flex-col items-center justify-center gap-2 rounded border border-dashed border-[#dadce0] bg-white py-6 px-4 text-center">
            <Mail className="h-8 w-8 text-[#5f6368]" aria-hidden />
            <p className="text-[13px] text-[#202124] break-all">{link.href.replace(/^mailto:/i, "")}</p>
          </div>
        )
      case "internal":
        return (
          <div className="flex flex-col items-center justify-center gap-2 rounded border border-dashed border-[#dadce0] bg-white py-8 px-4 text-center">
            <p className="text-[12px] font-medium text-[#202124]">Portfolio page</p>
            <p className="text-[12px] text-[#5f6368] break-all">{link.href}</p>
          </div>
        )
      case "file": {
        const lower = link.href.toLowerCase()
        if (lower.includes(".pdf")) {
          return (
            <iframe title={link.label} src={link.href} className="h-[280px] w-full rounded border border-[#e8eaed] bg-white" />
          )
        }
        if (/\.(mp4|webm|ogg|mov|m4v)(\?|$)/i.test(link.href)) {
          return (
            <video
              controls
              className="mx-auto max-h-[240px] w-full rounded border border-[#e8eaed] bg-black"
              preload="metadata"
              src={link.href}
            />
          )
        }
        return (
          <div className="flex min-h-[120px] flex-col items-center justify-center gap-2 rounded border border-dashed border-[#dadce0] bg-white py-6 text-center">
            <FileText className="h-8 w-8 text-[#9aa0a6]" aria-hidden />
            <p className="text-[12px] text-[#5f6368] px-2 break-all">{link.href}</p>
          </div>
        )
      }
      default:
        return (
          <div className="flex min-h-[120px] flex-col items-center justify-center gap-2 rounded border border-dashed border-[#dadce0] bg-white py-6 text-center">
            <FileText className="h-8 w-8 text-[#9aa0a6]" aria-hidden />
            <p className="text-[12px] text-[#5f6368] px-2 break-all">{link.href}</p>
          </div>
        )
    }
  }

  const showDownload = kind !== "web" && kind !== "email" && kind !== "internal"

  return (
    <div className="rounded-lg border border-[#dadce0] bg-white shadow-sm overflow-hidden">
      <div className="flex items-center justify-between gap-2 border-b border-[#ebebeb] bg-[#f8f9fa] px-3 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <KindIcon kind={kind} className="h-4 w-4 flex-shrink-0 text-[#5f6368]" />
          <span className="truncate text-[13px] font-medium text-[#202124]">{link.label}</span>
        </div>
        <span className="flex-shrink-0 rounded bg-white px-2 py-0.5 text-[11px] font-medium uppercase text-[#5f6368] ring-1 ring-[#e8eaed]">
          {kindLabel(kind)}
        </span>
      </div>

      <div className="bg-[#fafafa] p-3">{previewBody()}</div>

      <div className="flex flex-wrap gap-2 border-t border-[#ebebeb] bg-white px-3 py-2">
        {kind === "internal" ? (
          <Link
            href={link.href}
            className="inline-flex items-center gap-1.5 rounded border border-[#dadce0] bg-[#f8f9fa] px-3 py-1.5 text-[13px] text-[#202124] hover:bg-[#f1f3f4]"
          >
            Open page
          </Link>
        ) : (
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded border border-[#dadce0] bg-[#f8f9fa] px-3 py-1.5 text-[13px] text-[#202124] hover:bg-[#f1f3f4]"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            {kind === "email" ? "Open in mail" : "Open in new tab"}
          </a>
        )}
        {showDownload && (
          <a
            href={link.href}
            download
            className="inline-flex items-center gap-1.5 rounded border border-[#dadce0] bg-white px-3 py-1.5 text-[13px] text-[#1a0dab] hover:bg-[#f8f9fa]"
          >
            Download
          </a>
        )}
      </div>
    </div>
  )
}

/** Contact row with optional preview for mailto / https */
export function ContactLinePreview({
  label,
  value,
  href,
}: {
  label: string
  value: string
  href?: string
}) {
  if (!href) {
    return (
      <p className="text-[14px]">
        <span className="text-[#5f6368]">{label}:</span> <span className="text-[#3c4043]">{value}</span>
      </p>
    )
  }

  const kind = inferLinkKind(href)

  if (kind === "email") {
    return (
      <div className="rounded-lg border border-[#dadce0] bg-white p-3 shadow-sm">
        <p className="text-[12px] font-medium uppercase tracking-wide text-[#5f6368]">{label}</p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <a href={href} className="text-[14px] text-[#1a0dab] hover:underline break-all">
            {value}
          </a>
          <a
            href={href}
            className="inline-flex items-center gap-1 rounded border border-[#dadce0] bg-[#f8f9fa] px-2.5 py-1 text-[12px] text-[#202124] hover:bg-[#f1f3f4]"
          >
            <Mail className="h-3 w-3" />
            Compose
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <p className="text-[12px] font-medium uppercase tracking-wide text-[#5f6368]">{label}</p>
      <ResourcePreviewCard link={{ label: `${label}: ${value}`, href }} />
    </div>
  )
}
