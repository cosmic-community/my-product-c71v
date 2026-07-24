// app/about/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { getPage, getMetafieldValue } from '@/lib/cosmic'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('about')
  if (!page) {
    return { title: 'About' }
  }
  const heading = getMetafieldValue(page.metadata?.heading) || page.title
  const subheading = getMetafieldValue(page.metadata?.subheading)
  return {
    title: heading,
    description: subheading || undefined,
  }
}

export default async function AboutPage() {
  const page = await getPage('about')

  if (!page) {
    notFound()
  }

  const heading = getMetafieldValue(page.metadata?.heading) || page.title
  const subheading = getMetafieldValue(page.metadata?.subheading)
  const content = getMetafieldValue(page.metadata?.content)
  const heroImage = page.metadata?.hero_image

  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            {heading}
          </h1>
          {subheading && (
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              {subheading}
            </p>
          )}
        </div>

        {heroImage?.imgix_url && (
          <img
            src={`${heroImage.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress`}
            alt={heading}
            width={800}
            height={400}
            className="mt-10 w-full rounded-2xl object-cover shadow-lg"
          />
        )}

        {/* Content */}
        {content && (
          <div className="prose prose-lg mt-12 max-w-none prose-headings:text-gray-900 prose-a:text-brand-600">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  )
}