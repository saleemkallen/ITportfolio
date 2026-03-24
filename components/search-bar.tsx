"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Sparkles } from "lucide-react"
import { searchSuggestions } from "@/lib/portfolio-data"

interface SearchBarProps {
  initialQuery?: string
  autoFocus?: boolean
  compact?: boolean
  /** Modern pill bar with icons (landing page only). */
  landing?: boolean
}

function ThinPlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}

function MicIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        fill="#5f6368"
        d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"
      />
    </svg>
  )
}

function GoogleLensIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="9" fill="none" stroke="#4285F4" strokeWidth="1.5" />
      <path d="M12 3a9 9 0 0 1 9 9" stroke="#EA4335" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M21 12a9 9 0 0 1-9 9" stroke="#FBBC05" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M12 21a9 9 0 0 1-9-9" stroke="#34A853" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3" fill="#4285F4" opacity="0.35" />
    </svg>
  )
}

export function SearchBar({ initialQuery = "", autoFocus = false, compact = false, landing = false }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const filteredSuggestions = searchSuggestions
    .filter((suggestion) => suggestion.toLowerCase().includes(query.toLowerCase()) && query.length > 0)
    .slice(0, 8)

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  const handleSearch = (searchQuery: string) => {
    const trimmed = searchQuery.trim()
    if (trimmed) {
      setShowSuggestions(false)
      router.push(`/search?q=${encodeURIComponent(trimmed)}`)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev < filteredSuggestions.length - 1 ? prev + 1 : prev))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (selectedIndex >= 0) {
        handleSearch(filteredSuggestions[selectedIndex])
      } else {
        handleSearch(query)
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(query)
  }

  const pillShadow = "0 1px 6px rgba(32, 33, 36, 0.28)"

  if (landing) {
    return (
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
        <div className="relative w-full max-w-[720px]">
          <div
            className="flex min-w-0 items-center gap-1.5 rounded-[28px] bg-white pl-3 pr-1.5 py-2 sm:gap-2 sm:pl-4 sm:pr-2 sm:py-2.5 border border-[#dfe1e5] hover:shadow-[0_2px_8px_rgba(32,33,36,0.2)] focus-within:shadow-[0_2px_8px_rgba(32,33,36,0.25)] focus-within:border-[#dfe1e5] transition-shadow"
            style={{ boxShadow: pillShadow }}
          >
            <button
              type="button"
              className="flex-shrink-0 p-1 text-[#5f6368] hover:text-[#202124] rounded-full hover:bg-[#f1f3f4]"
              aria-label="Add"
            >
              <ThinPlusIcon className="w-5 h-5" />
            </button>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setSelectedIndex(-1)
                setShowSuggestions(true)
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              onKeyDown={handleKeyDown}
              className="min-w-0 flex-1 bg-transparent text-[16px] text-[#202124] placeholder:text-[#70757a] outline-none border-0"
              placeholder="Search"
            />
            <div className="flex flex-shrink-0 items-center gap-0 pr-0.5 sm:gap-1 sm:pr-1">
              <button
                type="button"
                className="p-1.5 sm:p-2 rounded-full hover:bg-[#f1f3f4] text-[#5f6368]"
                aria-label="Voice search"
              >
                <MicIcon />
              </button>
              <button
                type="button"
                className="p-1.5 sm:p-2 rounded-full hover:bg-[#f1f3f4]"
                aria-label="Search by image"
              >
                <GoogleLensIcon />
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-full border border-[#e8eaed] bg-[#f1f3f4] px-2 py-1.5 text-[12px] text-[#5f6368] hover:bg-[#e8eaed] sm:px-3 sm:text-[13px]"
                aria-label="AI Mode"
              >
                <Sparkles className="w-[14px] h-[14px] text-[#4285F4]" strokeWidth={2} />
                <span className="hidden min-[380px]:inline">AI Mode</span>
              </button>
            </div>
          </div>

          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-2xl border border-[#dfe1e5] shadow-lg z-50 overflow-hidden">
              {filteredSuggestions.map((suggestion, index) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handleSearch(suggestion)}
                  className={`w-full text-left px-4 py-2.5 text-[14px] flex items-center gap-3 text-[#202124] ${
                    index === selectedIndex ? "bg-[#f1f3f4]" : "hover:bg-[#f8f9fa]"
                  }`}
                >
                  <svg className="w-4 h-4 text-[#9aa0a6] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <span>{suggestion}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button
            type="submit"
            className="px-5 py-2.5 text-[14px] text-[#3c4043] rounded border border-transparent bg-[#f8f9fa] hover:border-[#dadce0] hover:shadow-sm active:bg-[#f1f3f4]"
          >
            Google Search
          </button>
          <button
            type="button"
            onClick={() => {
              const categories = ["about", "projects", "experience", "experiments", "writing", "contact"]
              const random = categories[Math.floor(Math.random() * categories.length)]
              handleSearch(random)
            }}
            className="px-5 py-2.5 text-[14px] text-[#3c4043] rounded border border-transparent bg-[#f8f9fa] hover:border-[#dadce0] hover:shadow-sm active:bg-[#f1f3f4]"
          >
            I&apos;m Feeling Lucky
          </button>
        </div>
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
      <div className="relative w-full min-w-0">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setSelectedIndex(-1)
            setShowSuggestions(true)
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          onKeyDown={handleKeyDown}
          className={`w-full min-w-0 bg-white text-black
            border-2 border-[#c0c0c0] 
            focus:outline-none focus:border-[#4285f4]
            ${compact ? "px-2.5 py-2 text-[16px] sm:px-3 sm:text-[14px]" : "px-4 py-3 text-[16px]"}`}
          style={{
            boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.1)",
          }}
        />

        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white border-2 border-[#c0c0c0] border-t-0 z-50">
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => handleSearch(suggestion)}
                className={`w-full text-left px-4 py-2 text-[14px] flex items-center gap-2
                  ${index === selectedIndex ? "bg-[#eee]" : "hover:bg-[#eee]"}`}
              >
                <svg className="w-4 h-4 text-[#9aa0a6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span className="text-black">{suggestion}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {!compact && (
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            type="submit"
            className="px-4 py-1.5 text-[13px] text-black
              bg-[#f2f2f2] border border-[#f2f2f2]
              hover:border-[#c6c6c6] hover:shadow-sm
              active:border-[#666]"
            style={{
              background: "linear-gradient(to bottom, #f5f5f5 0%, #f1f1f1 100%)",
            }}
          >
            Google Search
          </button>
          <button
            type="button"
            onClick={() => {
              const categories = ["about", "projects", "experience", "experiments", "writing", "contact"]
              const random = categories[Math.floor(Math.random() * categories.length)]
              handleSearch(random)
            }}
            className="px-4 py-1.5 text-[13px] text-black
              bg-[#f2f2f2] border border-[#f2f2f2]
              hover:border-[#c6c6c6] hover:shadow-sm
              active:border-[#666]"
            style={{
              background: "linear-gradient(to bottom, #f5f5f5 0%, #f1f1f1 100%)",
            }}
          >
            I&apos;m Feeling Lucky
          </button>
        </div>
      )}

      {!compact && (
        <div className="mt-8 flex flex-wrap justify-center gap-3 text-[13px]">
          {["about", "projects", "experience", "experiments", "writing", "contact"].map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => handleSearch(term)}
              className="text-[#1a0dab] hover:underline capitalize"
            >
              {term}
            </button>
          ))}
        </div>
      )}
    </form>
  )
}
