import { MetadataRoute } from 'next'
import { createBucketClient } from '@cosmicjs/sdk'

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
})

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://my-product.vercel.app'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/features`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/docs`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]

  // Dynamic blog posts
  let blogPages: MetadataRoute.Sitemap = []
  try {
    const { objects: posts } = await cosmic.objects
      .find({ type: 'blog-posts' })
      .props('slug,modified_at')
      .status('published')
    blogPages = posts.map((post: { slug: string; modified_at: string }) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.modified_at),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  } catch (e) {
    // blog-posts type may not exist yet
  }

  // Dynamic docs
  let docPages: MetadataRoute.Sitemap = []
  try {
    const { objects: docs } = await cosmic.objects
      .find({ type: 'documentation-pages' })
      .props('slug,modified_at')
      .status('published')
    docPages = docs.map((doc: { slug: string; modified_at: string }) => ({
      url: `${baseUrl}/docs/${doc.slug}`,
      lastModified: new Date(doc.modified_at),
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    }))
  } catch (e) {
    // docs type may not exist yet
  }

  return [...staticPages, ...blogPages, ...docPages]
}
