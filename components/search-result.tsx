import Link from "next/link"
import type { SearchResult as SearchResultType } from "@/lib/portfolio-data"

interface SearchResultProps {
  result: SearchResultType
}

export function SearchResult({ result }: SearchResultProps) {
  return (
    <article className="max-w-[600px] mb-6">
      {/* URL - green classic style */}
      <cite className="text-[14px] text-[#006621] not-italic block mb-1">{result.url}</cite>

      {/* Title - blue link that opens detail page */}
      <h3 className="text-[18px] leading-tight mb-1">
        <Link href={`/detail/${result.id}`} className="text-[#1a0dab] hover:underline visited:text-[#660099]">
          {result.title}
        </Link>
      </h3>

      {/* Description */}
      <p className="text-[13px] text-[#545454] leading-[1.4]">{result.description}</p>
    </article>
  )
}
