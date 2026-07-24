import type { Metadata } from 'next'
import SectionHeading from '@/components/SectionHeading'
import PricingCard from '@/components/PricingCard'
import FAQAccordion from '@/components/FAQAccordion'
import { getPricingTiers, getFAQs } from '@/lib/cosmic'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Simple, transparent pricing for teams of all sizes. No hidden fees. Choose the plan that fits your business — upgrade or cancel anytime.',
  openGraph: {
    title: 'Pricing — My Product',
    description: 'Simple, transparent pricing for teams of all sizes. No hidden fees.',
  },
}

export default async function PricingPage() {
  const [pricingTiers, faqs] = await Promise.all([
    getPricingTiers(),
    getFAQs(),
  ])

  return (
    <div className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title="Choose the perfect plan"
          subtitle="Simple, transparent pricing that grows with your business. No hidden fees."
        />

        {pricingTiers.length > 0 ? (
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {pricingTiers.map((tier) => (
              <PricingCard key={tier.id} tier={tier} />
            ))}
          </div>
        ) : (
          <p className="mt-16 text-center text-gray-500">
            No pricing tiers available yet.
          </p>
        )}

        {faqs.length > 0 && (
          <div className="mt-32">
            <SectionHeading
              eyebrow="FAQ"
              title="Frequently asked questions"
            />
            <div className="mt-16">
              <FAQAccordion faqs={faqs} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
