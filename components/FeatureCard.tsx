import type { Feature } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function FeatureCard({ feature }: { feature: Feature }) {
  const title = getMetafieldValue(feature.metadata?.title) || feature.title
  const icon = getMetafieldValue(feature.metadata?.icon)
  const description = getMetafieldValue(feature.metadata?.description)
  const image = feature.metadata?.image

  return (
    <div className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md hover:border-brand-200 transition-all">
      {image?.imgix_url ? (
        <div className="mb-5 overflow-hidden rounded-xl">
          <img
            src={`${image.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
            alt={title}
            width={400}
            height={200}
            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        icon && (
          <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-2xl">
            {icon}
          </div>
        )
      )}
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {description && (
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">{description}</p>
      )}
    </div>
  )
}