'use client'

import { useState } from 'react'
import type { FAQ } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

function FAQItem({ faq }: { faq: FAQ }) {
  const [open, setOpen] = useState(false)
  const question = getMetafieldValue(faq.metadata?.question) || faq.title
  const answer = getMetafieldValue(faq.metadata?.answer)

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-base font-semibold text-gray-900 pr-4">
          {question}
        </span>
        <svg
          className={`h-5 w-5 flex-shrink-0 text-brand-600 transition-transform ${
            open ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && answer && (
        <div className="pb-5 text-gray-600 leading-relaxed">{answer}</div>
      )}
    </div>
  )
}

export default function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  if (!faqs || faqs.length === 0) {
    return <p className="text-center text-gray-500">No FAQs available.</p>
  }

  return (
    <div className="mx-auto max-w-3xl divide-y divide-gray-200">
      {faqs.map((faq) => (
        <FAQItem key={faq.id} faq={faq} />
      ))}
    </div>
  )
}