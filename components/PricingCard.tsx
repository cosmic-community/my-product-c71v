import Link from 'next/link'
import type { PricingTier } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function PricingCard({ tier }: { tier: PricingTier }) {
  const name = getMetafieldValue(tier.metadata?.name) || tier.title
  const price = getMetafieldValue(tier.metadata?.price)
  const billingPeriod = getMetafieldValue(tier.metadata?.billing_period)
  const description = getMetafieldValue(tier.metadata?.description)
  const includedFeatures = getMetafieldValue(tier.metadata?.included_features)
  const mostPopular = tier.metadata?.most_popular === true
  const ctaLabel = getMetafieldValue(tier.metadata?.cta_label) || 'Get Started'

  const featureList = includedFeatures
    ? includedFeatures.split('\n').map((f) => f.trim()).filter(Boolean)
    : []

  // Determine if price is numeric (paid) or a word like "Free"
  const isNumericPrice = price !== null && price !== undefined && !isNaN(Number(price))
  const isFree = Number(price) === 0

  return (
    <div
      className={`relative flex flex-col rounded-2xl p-8 ${
        mostPopular
          ? 'border-2 border-brand-600 bg-white shadow-xl shadow-brand-600/10'
          : 'border border-gray-200 bg-white shadow-sm'
      }`}
    >
      {mostPopular && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-4 py-1 text-xs font-semibold text-white">
          Most Popular
        </span>
      )}

      <h3 className="text-xl font-bold text-gray-900">{name}</h3>
      {description && (
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      )}

      <div className="mt-6 flex items-baseline gap-1">
        {isFree ? (
          <span className="text-4xl font-extrabold text-gray-900">Free</span>
        ) : isNumericPrice ? (
          <>
            <span className="text-2xl font-bold text-gray-900">$</span>
            <span className="text-4xl font-extrabold text-gray-900">{price}</span>
          </>
        ) : (
          <span className="text-4xl font-extrabold text-gray-900">{price}</span>
        )}
        {billingPeriod && !isFree && (
          <span className="text-sm text-gray-500">/{billingPeriod}</span>
        )}
      </div>

      {featureList.length > 0 && (
        <ul className="mt-8 space-y-3 flex-1">
          {featureList.map((item, index) => (
            <li key={index} className="flex items-start gap-3 text-sm text-gray-600">
              <svg
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      <Link
        href="/pricing"
        className={`mt-8 inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-colors ${
          mostPopular
            ? 'bg-brand-600 text-white hover:bg-brand-700'
            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
        }`}
      >
        {ctaLabel}
      </Link>
    </div>
  )
}