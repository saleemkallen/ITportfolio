"use client"

import { useRouter } from "next/navigation"

interface SearchFooterProps {
  query: string
}

export function SearchFooter({ query }: SearchFooterProps) {
  const router = useRouter()

  const relatedSearches = ["about", "projects", "experience", "experiments", "writing", "contact"].filter(
    (term) => term !== query.toLowerCase(),
  )

  return (
    <footer className="mt-auto">
      {/* Gooooogle Pagination */}
      <div className="flex items-center justify-center py-4">
        <span style={{ fontFamily: "'Times New Roman', serif", fontSize: "28px" }}>
          <span style={{ color: "#4285f4" }}>M</span>
          <span style={{ color: "#ea4335" }}>o</span>
          <span style={{ color: "#fbbc05" }}>o</span>
          <span style={{ color: "#4285f4" }}>o</span>
          <span style={{ color: "#34a853" }}>o</span>
          <span style={{ color: "#ea4335" }}>o</span>
          <span style={{ color: "#4285f4" }}>gle</span>
        </span>
      </div>

      {/* Page Numbers */}
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 px-2 pb-4 text-[13px]">
        <span className="text-[#d93025] font-bold">1</span>
        <span className="text-[#1a0dab] hover:underline cursor-pointer">2</span>
        <span className="text-[#1a0dab] hover:underline cursor-pointer">3</span>
        <span className="text-[#1a0dab] hover:underline cursor-pointer">4</span>
        <span className="text-[#1a0dab] hover:underline cursor-pointer">5</span>
        <span className="text-[#1a0dab] hover:underline cursor-pointer">Next &gt;</span>
      </div>

      {/* Related Searches */}
      <div className="border-t border-[#ebebeb] py-4 px-4 sm:px-6 lg:pl-[180px]">
        <p className="text-[13px] text-[#70757a] mb-3 break-words">Searches related to &quot;{query}&quot;</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 max-w-[500px]">
          {relatedSearches.slice(0, 6).map((term) => (
            <button
              key={term}
              onClick={() => router.push(`/search?q=${term}`)}
              className="text-left text-[13px] text-[#1a0dab] hover:underline flex items-start gap-2 min-w-0"
            >
              <svg className="w-4 h-4 text-[#9aa0a6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span className="break-words">
                {term} muhammed saleem kallan
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer - full width */}
      <div className="bg-[#f2f2f2] border-t border-[#dadce0] px-4 sm:px-6 py-3">
        <div className="flex flex-wrap gap-4 text-[13px] text-[#70757a]">
          <span className="hover:underline cursor-pointer">Help</span>
          <span className="hover:underline cursor-pointer">Send feedback</span>
          <span className="hover:underline cursor-pointer">Privacy</span>
          <span className="hover:underline cursor-pointer">Terms</span>
        </div>
      </div>
    </footer>
  )
}
