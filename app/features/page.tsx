import type { Metadata } from 'next'
import SectionHeading from '@/components/SectionHeading'
import FeatureCard from '@/components/FeatureCard'
import { getFeatures } from '@/lib/cosmic'

export const metadata: Metadata = {
  title: 'Features',
  description:
    'Explore all the powerful features of My Product — the all-in-one SaaS platform built to help modern teams ship faster and grow smarter.',
  openGraph: {
    title: 'Features — My Product',
    description: 'Explore all the powerful features of My Product.',
  },
}

export default async function FeaturesPage() {
  const features = await getFeatures()

  return (
    <div className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Features"
          title="Powerful features for modern teams"
          subtitle="Everything you need to build, launch, and scale your business in one platform."
        />

        {features.length > 0 ? (
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.id} feature={feature} />
            ))}
          </div>
        ) : (
          <p className="mt-16 text-center text-gray-500">
            No features available yet.
          </p>
        )}
      </div>
    </div>
  )
}
