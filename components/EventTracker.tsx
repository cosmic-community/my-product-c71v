'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    cosmicInsights?: (event: string, props?: Record<string, unknown>) => void
  }
}

/**
 * Utility to safely fire a Cosmic Insights custom event.
 * Works client-side only; no-ops if the tracker isn't loaded yet.
 */
export function trackEvent(
  eventName: string,
  props?: Record<string, unknown>
) {
  if (typeof window !== 'undefined' && typeof window.cosmicInsights === 'function') {
    window.cosmicInsights(eventName, props)
  }
}

/**
 * Hook: fire a Cosmic Insights event once on mount.
 */
export function useTrackEvent(
  eventName: string,
  props?: Record<string, unknown>,
  enabled = true
) {
  useEffect(() => {
    if (!enabled) return
    // Small delay to ensure the tracker script has initialised
    const t = setTimeout(() => trackEvent(eventName, props), 500)
    return () => clearTimeout(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventName, enabled])
}

/**
 * Component: fire an event once when the pricing page mounts.
 */
export function PricingViewTracker() {
  useTrackEvent('pricing_view')
  return null
}

/**
 * HOF: wrap an onClick handler to also fire a CTA click event.
 */
export function withCtaTracking(
  onClick: (() => void) | undefined,
  label: string
): () => void {
  return () => {
    trackEvent('cta_click', { label })
    onClick?.()
  }
}
