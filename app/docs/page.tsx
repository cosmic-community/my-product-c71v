import Link from 'next/link'
import SectionHeading from '@/components/SectionHeading'
import { getDocumentationPages, getMetafieldValue } from '@/lib/cosmic'
import type { DocumentationPage } from '@/types'

export const metadata = {
  title: 'Documentation — My Product',
  description: 'Learn how to get the most out of My Product.',
}

export default async function DocsPage() {
  const pages = await getDocumentationPages()

  // Group pages by category
  const grouped: Record<string, DocumentationPage[]> = {}
  for (const page of pages) {
    const category = getMetafieldValue(page.metadata?.category) || 'General'
    const existing = grouped[category]
    if (existing) {
      existing.push(page)
    } else {
      grouped[category] = [page]
    }
  }

  const categories = Object.keys(grouped)

  return (
    <div className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Documentation"
          title="Documentation & Guides"
          subtitle="Everything you need to get started and master My Product."
        />

        {pages.length > 0 ? (
          <div className="mt-16 space-y-12 max-w-4xl mx-auto">
            {categories.map((category) => {
              const categoryPages = grouped[category]
              if (!categoryPages || categoryPages.length === 0) {
                return null
              }
              return (
                <div key={category}>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    {category}
                  </h3>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {categoryPages.map((page) => {
                      const title =
                        getMetafieldValue(page.metadata?.title) || page.title
                      return (
                        <Link
                          key={page.id}
                          href={`/docs/${page.slug}`}
                          className="group flex items-center justify-between rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:border-brand-200 hover:shadow-md transition-all"
                        >
                          <span className="font-medium text-gray-900 group-hover:text-brand-600">
                            {title}
                          </span>
                          <svg className="h-5 w-5 text-gray-400 group-hover:text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <p className="mt-16 text-center text-gray-500">
            No documentation available yet.
          </p>
        )}
      </div>
    </div>
  )
}