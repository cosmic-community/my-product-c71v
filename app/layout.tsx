import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://my-product.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'My Product — Ship Faster, Grow Smarter',
    template: '%s | My Product',
  },
  description:
    'My Product is the all-in-one SaaS platform to help your business grow. Explore features, pricing, testimonials, and documentation.',
  keywords: ['SaaS platform', 'ship faster', 'grow smarter', 'business software', 'team productivity'],
  authors: [{ name: 'My Product Team' }],
  creator: 'My Product',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'My Product',
    title: 'My Product — Ship Faster, Grow Smarter',
    description:
      'My Product is the all-in-one SaaS platform to help your business grow. Explore features, pricing, testimonials, and documentation.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'My Product — Ship Faster, Grow Smarter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Product — Ship Faster, Grow Smarter',
    description:
      'My Product is the all-in-one SaaS platform to help your business grow.',
    images: ['/og-image.png'],
    creator: '@myproduct',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your Google Search Console verification token here:
    // google: 'YOUR_VERIFICATION_TOKEN',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🚀</text></svg>"
        />
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js" />
        <script defer src="https://insights.cosmicinsights.dev/script.js" data-project="6a62de6dd8e32f8df93cabad" />
      </head>
      <body className="font-sans flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}
