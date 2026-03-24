"use client"

import Link from "next/link"
import { GoogleLogo } from "./google-logo"
import { SearchBar } from "./search-bar"

interface SearchHeaderProps {
  query: string
}

export function SearchHeader({ query }: SearchHeaderProps) {
  return (
    <header className="bg-[#f2f2f2] border-b border-[#dadce0]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 px-4 sm:px-6 py-3 min-w-0">
        <Link href="/" className="flex-shrink-0 self-start sm:self-center">
          <GoogleLogo size="small" />
        </Link>
        <div className="w-full min-w-0 sm:flex-1 sm:max-w-[572px]">
          <SearchBar initialQuery={query} compact />
        </div>
      </div>

      {/* Navigation Tabs — scroll on narrow screens */}
      <nav className="flex gap-0 overflow-x-auto border-t border-[#ebebeb] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-4 sm:px-6 lg:pl-[180px]">
        <span className="shrink-0 px-3 py-2 text-[13px] text-[#1a0dab] border-b-2 border-[#1a0dab] bg-white">All</span>
        <span className="shrink-0 px-3 py-2 text-[13px] text-[#5f6368] hover:text-black cursor-pointer">Images</span>
        <span className="shrink-0 px-3 py-2 text-[13px] text-[#5f6368] hover:text-black cursor-pointer">Videos</span>
        <span className="shrink-0 px-3 py-2 text-[13px] text-[#5f6368] hover:text-black cursor-pointer">News</span>
        <span className="shrink-0 px-3 py-2 text-[13px] text-[#5f6368] hover:text-black cursor-pointer">More</span>
      </nav>
    </header>
  )
}
