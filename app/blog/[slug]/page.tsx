import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { createBucketClient } from '@cosmicjs/sdk'

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
})

async function getPost(slug: string) {
  try {
    const { object } = await cosmic.objects
      .findOne({ type: 'blog-posts', slug })
      .props('id,title,slug,metadata,created_at,modified_at')
      .status('published')
    return object
  } catch {
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) return { title: 'Post Not Found' }

  const title = post.metadata?.seo_title || post.title
  const description = post.metadata?.seo_description || post.metadata?.excerpt || ''
  const image = post.metadata?.cover_image?.imgix_url

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.created_at,
      modifiedTime: post.modified_at,
      authors: post.metadata?.author ? [post.metadata.author] : undefined,
      images: image ? [{ url: `${image}?w=1200&h=630&fit=crop&auto=format`, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [`${image}?w=1200&h=630&fit=crop&auto=format`] : [],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metadata?.excerpt || '',
    author: {
      '@type': 'Person',
      name: post.metadata?.author || 'My Product Team',
    },
    datePublished: post.created_at,
    dateModified: post.modified_at,
    image: post.metadata?.cover_image?.imgix_url,
    publisher: {
      '@type': 'Organization',
      name: 'My Product',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://my-product.vercel.app',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link href="/blog" className="text-sm text-indigo-600 hover:underline mb-8 inline-block">
            ← Back to Blog
          </Link>

          {/* Category + Reading time */}
          <div className="flex items-center gap-3 mb-4">
            {post.metadata?.category && (
              <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                {post.metadata.category}
              </span>
            )}
            {post.metadata?.reading_time && (
              <span className="text-xs text-gray-400">{post.metadata.reading_time} min read</span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
            {post.title}
          </h1>

          {/* Author + date */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            {post.metadata?.author && <span>By {post.metadata.author}</span>}
            <span>·</span>
            <time dateTime={post.created_at}>
              {new Date(post.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>

          {/* Cover image */}
          {post.metadata?.cover_image?.imgix_url && (
            <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden mb-10">
              <Image
                src={`${post.metadata.cover_image.imgix_url}?w=900&h=500&fit=crop&auto=format`}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Content */}
          {post.metadata?.content && (
            <div
              className="prose prose-lg prose-indigo max-w-none"
              dangerouslySetInnerHTML={{ __html: post.metadata.content }}
            />
          )}
        </div>
      </article>
    </>
  )
}
