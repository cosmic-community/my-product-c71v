# My Product — SaaS Landing Page

![App Preview](https://imgix.cosmicjs.com/849b9aa0-8711-11f1-ac64-27ec44a0100e-autopilot-photo-1461749280684-dccba630e2f6-1784864473409.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A beautiful, modern, fully responsive SaaS landing page built with **Next.js 16** and **Cosmic**. It features a hero section, product features, pricing tiers, customer testimonials, an FAQ section, and a full documentation area — all powered dynamically by your existing Cosmic content model.

## Features

- 🚀 **Dynamic Homepage** — Hero, features grid, pricing preview, testimonials, and FAQ
- ⭐ **Features Page** — Showcase every product feature with icons, descriptions, and images
- 💰 **Pricing Page** — Beautiful pricing tiers with "most popular" highlighting and included feature lists
- 💬 **Testimonials Page** — Customer quotes with star ratings and photos
- ❓ **FAQ Section** — Accordion-style expandable questions and answers
- 📄 **Documentation** — Full docs with category grouping, sidebar navigation, and per-page detail views
- 📱 **Fully Responsive** — Optimized for mobile, tablet, and desktop
- ⚡ **Server Components** — Fast, SEO-friendly data fetching directly from Cosmic

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a62de6dd8e32f8df93cabaf&clone_repository=6a62df9fd8e32f8df93cac18)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a SaaS product website with features, pricing tiers, documentation pages, and customer testimonials.
>
> User instructions: A SaaS landing page with features, pricing tiers, FAQ, and testimonials"

### Code Generation Prompt

> Build a Next.js application for an online business called "My Product". The content is managed in Cosmic CMS with the following object types: features, pricing-tiers, faq, testimonials, documentation-pages. Create a beautiful, modern, responsive design with a homepage and pages for each content type. User instructions: A SaaS landing page with features, pricing tiers, FAQ, and testimonials

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Cosmic](https://www.cosmicjs.com) — [Docs](https://www.cosmicjs.com/docs)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) or Node.js 18+
- A Cosmic account with the bucket containing your content

### Installation

1. Clone this repository
2. Install dependencies:

```bash
bun install
```

3. Set up environment variables (these are provided automatically when cloned via Cosmic):

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all features
const { objects: features } = await cosmic.objects
  .find({ type: 'features' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)

// Fetch a single documentation page
const { object: page } = await cosmic.objects
  .findOne({ type: 'documentation-pages', slug: 'getting-started' })
  .depth(1)
```

## Cosmic CMS Integration

This app reads from the following Cosmic object types:

- **features** — title, icon, description, image
- **pricing-tiers** — name, price, billing_period, description, included_features, most_popular, cta_label
- **faq** — question, answer
- **testimonials** — customer_name, role_company, quote, rating, photo
- **documentation-pages** — title, content, category, display_order

All data is fetched using Server Components with the [Cosmic SDK](https://www.cosmicjs.com/docs). Learn more in the [Cosmic docs](https://www.cosmicjs.com/docs).

## Deployment Options

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables: `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`
4. Deploy

### Netlify

1. Push your code to GitHub
2. Import the project in [Netlify](https://netlify.com)
3. Add the same environment variables
4. Deploy
<!-- README_END -->