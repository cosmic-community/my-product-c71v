// app/docs/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  getDocumentationPage,
  getDocumentationPages,
  getMetafieldValue,
} from '@/lib/cosmic'

export default async function DocDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [page, allPages] = await Promise.all([
    getDocumentationPage(slug),
    getDocumentationPages(),
  ])

  if (!page) {
    notFound()
  }

  const title = getMetafieldValue(page.metadata?.title) || page.title
  const content = getMetafieldValue(page.metadata?.content)
  const category = getMetafieldValue(page.metadata?.category)

  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
                All Docs
              </h4>
              <nav className="space-y-1">
                {allPages.map((p) => {
                  const pTitle = getMetafieldValue(p.metadata?.title) || p.title
                  const isActive = p.slug === slug
                  return (
                    <Link
                      key={p.id}
                      href={`/docs/${p.slug}`}
                      className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                        isActive
                          ? 'bg-brand-50 text-brand-700 font-semibold'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      {pTitle}
                    </Link>
                  )
                })}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <article className="lg:col-span-3">
            <Link
              href="/docs"
              className="inline-flex items-center gap-1 text-sm text-brand-600 hover:text-brand-700 mb-6"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Docs
            </Link>

            {category && (
              <span className="text-sm font-semibold uppercase tracking-wide text-brand-600">
                {category}
              </span>
            )}
            <h1 className="mt-2 text-3xl font-extrabold text-gray-900">
              {title}
            </h1>

            {content && (
              <div
                className="prose prose-lg mt-8 max-w-none prose-headings:text-gray-900 prose-a:text-brand-600"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )}
          </article>
        </div>
      </div>
    </div>
  )
}