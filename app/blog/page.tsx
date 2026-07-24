import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import SectionHeading from '@/components/SectionHeading'
import { createBucketClient } from '@cosmicjs/sdk'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Insights, how-tos, and industry deep-dives from the My Product team. Level up your SaaS knowledge.',
  openGraph: {
    title: 'Blog — My Product',
    description: 'Insights, how-tos, and industry deep-dives from the My Product team.',
  },
}

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
})

async function getBlogPosts() {
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
  const posts = await getBlogPosts()

  return (
    <div className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Blog"
          title="Insights & how-tos"
          subtitle="Deep dives into product, growth, and SaaS strategy from our team."
        />

        {posts.length > 0 ? (
          <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                <article className="h-full rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                  {post.metadata?.cover_image?.imgix_url && (
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={`${post.metadata.cover_image.imgix_url}?w=600&h=300&fit=crop&auto=format`}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      {post.metadata?.category && (
                        <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                          {post.metadata.category}
                        </span>
                      )}
                      {post.metadata?.reading_time && (
                        <span className="text-xs text-gray-400">{post.metadata.reading_time} min read</span>
                      )}
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors leading-snug mb-2">
                      {post.title}
                    </h2>
                    {post.metadata?.excerpt && (
                      <p className="text-sm text-gray-500 line-clamp-3">{post.metadata.excerpt}</p>
                    )}
                    {post.metadata?.author && (
                      <p className="mt-4 text-xs text-gray-400">By {post.metadata.author}</p>
                    )}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-16 text-center text-gray-500">No posts yet. Check back soon.</p>
        )}
      </div>
    </div>
  )
}
