/** Infer resource type from href for preview UI (detail pages). */
export type PortfolioLinkKind = "pdf" | "video" | "image" | "web" | "email" | "file" | "internal" | "other"

function pathForInference(href: string): string {
  const raw = href.trim()
  try {
    if (raw.startsWith("http://") || raw.startsWith("https://")) {
      return decodeURIComponent(new URL(raw).pathname)
    }
  } catch {
    /* ignore */
  }
  try {
    return decodeURIComponent(raw.split("?")[0] ?? raw)
  } catch {
    return raw.split("?")[0] ?? raw
  }
}

export function inferLinkKind(href: string): PortfolioLinkKind {
  const raw = href.trim()
  if (raw.startsWith("mailto:")) return "email"
  if (raw.startsWith("/detail/") || raw.startsWith("/viewer") || raw.startsWith("/search")) return "internal"

  const path = pathForInference(href)
  const lower = path.toLowerCase()

  if (lower.endsWith(".pdf")) return "pdf"
  if (/\.(mp4|webm|ogg|mov|m4v)$/.test(lower)) return "video"
  if (/\.(png|jpe?g|gif|webp|svg|bmp|ico)$/.test(lower)) return "image"
  if (raw.startsWith("http://") || raw.startsWith("https://")) return "web"
  if (raw.startsWith("/")) return "file"
  return "other"
}

export function displayHost(href: string): string {
  try {
    if (href.startsWith("http://") || href.startsWith("https://")) {
      return new URL(href).hostname.replace(/^www\./, "")
    }
  } catch {
    /* ignore */
  }
  return href
}
