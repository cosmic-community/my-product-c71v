import type { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/Hero'
import SectionHeading from '@/components/SectionHeading'
import FeatureCard from '@/components/FeatureCard'
import PricingCard from '@/components/PricingCard'
import TestimonialCard from '@/components/TestimonialCard'
import FAQAccordion from '@/components/FAQAccordion'
import {
  getFeatures,
  getPricingTiers,
  getTestimonials,
  getFAQs,
} from '@/lib/cosmic'

export const metadata: Metadata = {
  title: 'My Product — Ship Faster, Grow Smarter',
  description:
    'My Product is the all-in-one SaaS platform to help your business grow. Explore features, pricing, testimonials, and documentation.',
  openGraph: {
    title: 'My Product — Ship Faster, Grow Smarter',
    description:
      'My Product is the all-in-one SaaS platform to help your business grow. Explore features, pricing, testimonials, and documentation.',
  },
}

export default async function HomePage() {
  const [features, pricingTiers, testimonials, faqs] = await Promise.all([
    getFeatures(),
    getPricingTiers(),
    getTestimonials(),
    getFAQs(),
  ])

  // JSON-LD structured data for the home page
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'My Product',
    applicationCategory: 'BusinessApplication',
    description:
      'My Product is the all-in-one SaaS platform to help your business grow.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://my-product.vercel.app',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  }

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero />

      {/* Features */}
      {features.length > 0 && (
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Features"
              title="Everything you need to succeed"
              subtitle="Powerful tools designed to help your team move faster and build better products."
            />
            <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.slice(0, 6).map((feature) => (
                <FeatureCard key={feature.id} feature={feature} />
              ))}
            </div>
            {features.length > 6 && (
              <div className="mt-12 text-center">
                <Link
                  href="/features"
                  className="inline-flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-700"
                >
                  View all features
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Pricing */}
      {pricingTiers.length > 0 && (
        <section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Pricing"
              title="Simple, transparent pricing"
              subtitle="Choose the plan that fits your needs. No hidden fees, cancel anytime."
            />
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              {pricingTiers.map((tier) => (
                <PricingCard key={tier.id} tier={tier} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Testimonials"
              title="Loved by teams worldwide"
              subtitle="See what our customers have to say about My Product."
            />
            <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.slice(0, 6).map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section id="faq" className="py-24 bg-gray-50 scroll-mt-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="FAQ"
              title="Frequently asked questions"
              subtitle="Everything you need to know about My Product."
            />
            <div className="mt-16">
              <FAQAccordion faqs={faqs} />
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-brand-600 to-brand-500">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to get started?
          </h2>
          <p className="mt-4 text-lg text-brand-100">
            Join thousands of teams already growing with My Product.
          </p>
          <Link
            href="/pricing"
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-white px-8 py-3.5 text-base font-semibold text-brand-600 hover:bg-gray-100 transition-colors shadow-lg"
          >
            Start Free Today
          </Link>
        </div>
      </section>
    </div>
  )
}
