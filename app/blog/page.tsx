import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { createBucketClient } from '@cosmicjs/sdk'

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
})

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Insights, tutorials, and growth strategies from the My Product team. Learn how to ship faster and grow smarter.',
  openGraph: {
    title: 'Blog — My Product',
    description: 'Insights, tutorials, and growth strategies from the My Product team.',
  },
}

async function getPosts() {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'blog-posts' })
      .props('id,title,slug,metadata,created_at')
      .sort('-created_at')
      .status('published')
    return objects
  } catch {
    return []
  }
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-widest text-indigo-600">Blog</span>
          <h1 className="mt-2 text-4xl font-extrabold text-gray-900">Insights & Guides</h1>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Practical strategies to help you ship faster and grow smarter.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts published yet. Check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col">
                {post.metadata?.cover_image?.imgix_url && (
                  <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
                    <Image
                      src={`${post.metadata.cover_image.imgix_url}?w=600&h=400&fit=crop&auto=format`}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="flex items-center gap-2 mb-2">
                  {post.metadata?.category && (
                    <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                      {post.metadata.category}
                    </span>
                  )}
                  {post.metadata?.reading_time && (
                    <span className="text-xs text-gray-400">{post.metadata.reading_time} min read</span>
                  )}
                </div>
                <h2 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors leading-snug">
                  {post.title}
                </h2>
                {post.metadata?.excerpt && (
                  <p className="mt-2 text-sm text-gray-500 line-clamp-3">{post.metadata.excerpt}</p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
