"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { portfolioAssets } from "@/lib/portfolio-data"

const FALLBACK = "/placeholder-logo.png"

/** Google brand colors — four contiguous arcs (no gaps between colours) */
const GOOGLE_RING = `conic-gradient(
  from -48deg,
  #ea4335 0deg 90deg,
  #4285f4 90deg 180deg,
  #34a853 180deg 270deg,
  #fbbc05 270deg 360deg
)`

interface ProfileAvatarProps {
  href?: string
  className?: string
  size?: number
}

/** Round account avatar with Google-style multi-color ring and inner photo. */
export function ProfileAvatar({ href = "/detail/about-1", className = "", size = 40 }: ProfileAvatarProps) {
  const [src, setSrc] = useState(portfolioAssets.photo)

  /** Thinner ring + gap so the photo fills more of the circle */
  const ringPx = Math.max(2, Math.min(3, size * 0.065))
  const gapPx = Math.max(1, Math.min(2, size * 0.042))

  return (
    <Link
      href={href}
      className={`inline-block shrink-0 rounded-full transition-transform hover:scale-[1.04] active:scale-[0.98] ${className}`}
      style={{ width: size, height: size }}
      aria-label="About — profile"
    >
      <span
        className="box-border block h-full w-full rounded-full shadow-sm"
        style={{
          background: GOOGLE_RING,
          padding: `${ringPx}px`,
        }}
      >
        <span
          className="box-border block h-full w-full rounded-full bg-white"
          style={{ padding: `${gapPx}px` }}
        >
          <span className="relative block h-full w-full min-h-0 min-w-0 overflow-hidden rounded-full bg-[#f1f3f4]">
            <Image
              key={src}
              src={src}
              alt="Profile photo"
              fill
              className="object-cover"
              sizes={`${size}px`}
              onError={() => setSrc(FALLBACK)}
            />
          </span>
        </span>
      </span>
    </Link>
  )
}
