// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Image structure from Cosmic file metafields
export interface CosmicImage {
  url: string;
  imgix_url: string;
}

// Feature object
export interface Feature extends CosmicObject {
  type: 'features';
  metadata: {
    title?: string;
    icon?: string;
    description?: string;
    image?: CosmicImage;
  };
}

// Pricing tier object
export interface PricingTier extends CosmicObject {
  type: 'pricing-tiers';
  metadata: {
    name?: string;
    price?: string;
    billing_period?: string;
    description?: string;
    included_features?: string;
    most_popular?: boolean;
    cta_label?: string;
  };
}

// FAQ object
export interface FAQ extends CosmicObject {
  type: 'faq';
  metadata: {
    question?: string;
    answer?: string;
  };
}

// Testimonial object
export interface Testimonial extends CosmicObject {
  type: 'testimonials';
  metadata: {
    customer_name?: string;
    role_company?: string;
    quote?: string;
    rating?: number;
    photo?: CosmicImage;
  };
}

// Documentation page object
export interface DocumentationPage extends CosmicObject {
  type: 'documentation-pages';
  metadata: {
    title?: string;
    content?: string;
    category?: string;
    display_order?: number;
  };
}

// API response wrapper
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards
export function isFeature(obj: CosmicObject): obj is Feature {
  return obj.type === 'features';
}

export function isPricingTier(obj: CosmicObject): obj is PricingTier {
  return obj.type === 'pricing-tiers';
}