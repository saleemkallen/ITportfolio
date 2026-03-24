import { ChevronDown } from "lucide-react"
import { GoogleLogo } from "@/components/google-logo"
import { LandingProjects } from "@/components/landing-projects"
import { SearchBar } from "@/components/search-bar"
import {
  portfolioEngineeringExperiments,
  portfolioExperience,
  portfolioLandingProjects,
  portfolioWebProjects,
} from "@/lib/portfolio-data"

const LANDING_GROUPS = [
  {
    id: "data-ai",
    title: "Data, AI & analytics",
    subtitle:
      "Enterprise RAG, BI platforms, time series, responsible-AI research, and GIS / remote sensing — thesis-grade and production-oriented work.",
    items: portfolioLandingProjects,
  },
  {
    id: "experience",
    title: "Professional experience",
    subtitle:
      "Internships and cross-functional roles — process engineering and airport systems — with full narratives on each detail page.",
    items: portfolioExperience,
  },
  {
    id: "engineering",
    title: "Engineering & research experiments",
    subtitle: "Parametric CAD in Lua/IceSL and MATLAB-based research — supplementary builds alongside the main portfolio.",
    items: portfolioEngineeringExperiments,
    viewerCta: {
      href: "/viewer/centrifugal-pump",
      title: "Interactive 3D — centrifugal pump (STL)",
      description:
        "Rotate and zoom the casing, impeller, or full assembly in the browser. Uses the same STL files as the legacy portfolio.",
    },
  },
  {
    id: "web",
    title: "Web projects",
    subtitle: "Client-facing sites: multilingual content, reservations, booking, and responsive UI.",
    categoryOverview: {
      title: "Web projects — overview",
      description:
        "Commercial and ongoing site work in HTML/CSS/JS ecosystems. Use search to browse the whole experiments category, or open each live site below.",
      href: "/search?q=experiments",
    },
    items: portfolioWebProjects,
  },
]

export default function HomePage() {
  return (
    <div className="w-full bg-white m-0 p-0">
      {/* Hero — full viewport */}
      <div className="flex min-h-screen flex-col">
        <header className="flex justify-end items-center gap-4 px-6 py-4 text-[13px] text-[#202124]">
          <a
            href="https://www.linkedin.com/in/muhammed-saleem-kallan-499227127/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            LinkedIn
          </a>
          <a href="https://github.com/saleemkallen" target="_blank" rel="noopener noreferrer" className="hover:underline">
            GitHub
          </a>
        </header>

        <main className="flex flex-1 flex-col items-center justify-center px-4 pb-10 -mt-6">
          <GoogleLogo size="large" />

          <div className="mt-8 w-full max-w-[720px]">
            <SearchBar autoFocus landing />
          </div>

          <p className="mt-10 text-[13px] text-[#3c4043] text-center max-w-lg">
            Portfolio search — try: about, projects, experience, experiments, writing, contact
          </p>

          <div className="mt-14 flex flex-col items-center gap-1 text-[#70757a]">
            <span className="text-[12px]">Scroll for work & projects</span>
            <ChevronDown className="h-5 w-5 animate-bounce" aria-hidden />
          </div>
        </main>
      </div>

      <LandingProjects groups={[...LANDING_GROUPS]} />

      <footer className="py-6 text-center text-[13px] text-[#4d5156]">
        <p>
          Google offered in:{" "}
          <a href="#" className="text-[#1a0dab] hover:underline">
            Deutsch
          </a>
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-6 text-[#70757a] text-[12px] border-t border-transparent pt-2">
          <span>Germany</span>
          <a href="#" className="hover:underline">
            Privacy
          </a>
          <a href="#" className="hover:underline">
            Terms
          </a>
          <a href="#" className="hover:underline">
            Settings
          </a>
        </div>
      </footer>
    </div>
  )
}
