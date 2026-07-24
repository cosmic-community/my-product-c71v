'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    cosmicInsights?: (event: string, props?: Record<string, unknown>) => void
  }
}

export function trackEvent(
  eventName: string,
  props?: Record<string, unknown>
) {
  if (typeof window !== 'undefined' && typeof window.cosmicInsights === 'function') {
    window.cosmicInsights(eventName, props)
  }
}

export function useTrackEvent(
  eventName: string,
  props?: Record<string, unknown>,
  enabled = true
) {
  useEffect(() => {
    if (!enabled) return
    const t = setTimeout(() => trackEvent(eventName, props), 500)
    return () => clearTimeout(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventName, enabled])
}

export function PricingViewTracker() {
  useTrackEvent('pricing_view')
  return null
}

export function withCtaTracking(
  onClick: (() => void) | undefined,
  label: string
): () => void {
  return () => {
    trackEvent('cta_click', { label })
    onClick?.()
  }
}
