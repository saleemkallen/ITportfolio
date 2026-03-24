import Link from "next/link"
import { portfolioData, type SearchResult } from "@/lib/portfolio-data"
import { GoogleLogo } from "@/components/google-logo"
import { ContactLinePreview } from "@/components/resource-preview-card"
import { DetailLinks } from "@/components/detail-links"
import { notFound } from "next/navigation"

interface DetailPageProps {
  params: Promise<{ id: string }>
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { id } = await params
  const item = portfolioData.find((p) => p.id === id)

  if (!item) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-[#f2f2f2] border-b border-[#ebebeb] px-4 py-4">
        <div className="flex items-center gap-8">
          <Link href="/">
            <GoogleLogo size="small" />
          </Link>
          <Link href={`/search?q=${item.category}`} className="text-[14px] text-[#1a0dab] hover:underline">
            ← Back to {item.category} results
          </Link>
        </div>
      </header>

      <main className="max-w-[800px] mx-auto py-8 px-4">
        <div className="text-[13px] text-[#006621] mb-2">{item.url}</div>

        <h1 className="text-[28px] text-[#1a0dab] mb-4">{item.title}</h1>

        <div className="inline-block px-3 py-1 bg-[#f2f2f2] text-[12px] text-[#5f6368] border border-[#dadce0] mb-6 capitalize">
          {item.category}
        </div>

        <div className="text-[16px] text-[#3c4043] leading-relaxed mb-8 border-l-4 border-[#4285f4] pl-4 py-2 bg-[#f8f9fa]">
          {item.description}
        </div>

        <DetailBody item={item} />

        <RelatedItems currentId={id} category={item.category} />
      </main>

      <footer className="bg-[#f2f2f2] border-t border-[#e4e4e4] py-4 px-4 mt-8">
        <div className="text-center text-[13px] text-[#70757a]">
          Portfolio of Muhammed Saleem Kallan · Built with love
        </div>
      </footer>
    </div>
  )
}

function ListSection({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null
  return (
    <section>
      <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">{title}</h2>
      <ul className="list-disc ml-6 text-[14px] text-[#3c4043] space-y-2">
        {items.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </section>
  )
}

function DetailBody({ item }: { item: SearchResult }) {
  const d = item.detail
  if (!d) return null

  return (
    <div className="space-y-6">
      {d.intro && <p className="text-[14px] text-[#3c4043] leading-relaxed">{d.intro}</p>}

      {d.techStack && d.techStack.length > 0 && (
        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Tech stack</h2>
          <div className="flex flex-wrap gap-2">
            {d.techStack.map((tech) => (
              <span key={tech} className="px-3 py-1 bg-white border border-[#dadce0] text-[13px] text-[#3c4043]">
                {tech}
              </span>
            ))}
          </div>
        </section>
      )}

      <ListSection title="Highlights" items={d.highlights ?? []} />
      <ListSection title="Responsibilities" items={d.responsibilities ?? []} />
      <ListSection title="Key achievements" items={d.achievements ?? []} />
      <ListSection title="Features" items={d.features ?? []} />
      <ListSection title="Topics" items={d.topics ?? []} />

      {d.contactLines && d.contactLines.length > 0 && (
        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Contact</h2>
          <div className="space-y-4">
            {d.contactLines.map((line) => (
              <ContactLinePreview key={line.label} label={line.label} value={line.value} href={line.href} />
            ))}
          </div>
        </section>
      )}

      {d.links && d.links.length > 0 && (
        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Links</h2>
          <DetailLinks links={d.links} />
        </section>
      )}

      {d.extraNote && (
        <p className="text-[13px] text-[#5f6368] leading-relaxed border-t border-[#ebebeb] pt-4">{d.extraNote}</p>
      )}
    </div>
  )
}

function RelatedItems({ currentId, category }: { currentId: string; category: string }) {
  const related = portfolioData.filter((p) => p.category === category && p.id !== currentId).slice(0, 3)

  if (related.length === 0) return null

  return (
    <section className="mt-10 pt-6 border-t border-[#ebebeb]">
      <h2 className="text-[16px] font-medium text-black mb-4">Related Results</h2>
      <div className="space-y-4">
        {related.map((r) => (
          <div key={r.id}>
            <cite className="text-[12px] text-[#006621] not-italic block">{r.url}</cite>
            <Link href={`/detail/${r.id}`} className="text-[14px] text-[#1a0dab] hover:underline">
              {r.title}
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
